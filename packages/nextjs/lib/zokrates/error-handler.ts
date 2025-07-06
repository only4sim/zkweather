/**
 * Error Handler for ZoKrates Operations
 *
 * This module provides comprehensive error handling and retry logic
 * for ZoKrates operations including compilation, proof generation, and setup.
 */
import { ZOKRATES_CONFIG } from "./config";

export interface ErrorInfo {
  message: string;
  code?: string;
  stack?: string;
  context?: Record<string, any>;
  timestamp: number;
  operation: string;
  attempt: number;
}

export type OperationType = "compile" | "setup" | "generateProof" | "exportVerifier";

export class ErrorHandler {
  private errorLog: ErrorInfo[] = [];
  private maxLogSize = 100;

  /**
   * Execute operation with retry logic
   */
  async withRetry<T>(
    operation: () => Promise<T>,
    operationType: OperationType,
    maxRetries: number = ZOKRATES_CONFIG.ERROR_HANDLING.MAX_COMPILATION_ATTEMPTS,
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        this.logError(lastError, operationType, attempt);

        if (attempt < maxRetries) {
          const delay = this.getRetryDelay(attempt);
          console.log(`🔄 Retrying ${operationType} in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
          await this.sleep(delay);
        }
      }
    }

    throw new Error(`${operationType} failed after ${maxRetries} attempts. Last error: ${lastError?.message}`);
  }

  /**
   * Log error with context
   */
  private logError(error: Error, operation: OperationType, attempt: number): void {
    const errorInfo: ErrorInfo = {
      message: error.message,
      code: (error as any).code,
      stack: ZOKRATES_CONFIG.ERROR_HANDLING.ENABLE_DETAILED_ERRORS ? error.stack : undefined,
      context: {
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "Node.js",
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
      operation,
      attempt,
    };

    this.errorLog.push(errorInfo);

    // Keep log size manageable
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();
    }

    console.error(`❌ ${operation} error (attempt ${attempt}):`, errorInfo);
  }

  /**
   * Get retry delay based on attempt number
   */
  private getRetryDelay(attempt: number): number {
    const delays = ZOKRATES_CONFIG.ERROR_HANDLING.RETRY_DELAYS;
    return delays[Math.min(attempt - 1, delays.length - 1)];
  }

  /**
   * Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get error statistics
   */
  getErrorStats(): {
    total: number;
    byOperation: Record<OperationType, number>;
    recent: ErrorInfo[];
  } {
    const byOperation = {} as Record<OperationType, number>;

    this.errorLog.forEach(error => {
      byOperation[error.operation as OperationType] = (byOperation[error.operation as OperationType] || 0) + 1;
    });

    return {
      total: this.errorLog.length,
      byOperation,
      recent: this.errorLog.slice(-10), // Last 10 errors
    };
  }

  /**
   * Clear error log
   */
  clearErrors(): void {
    this.errorLog = [];
  }

  /**
   * Get formatted error report
   */
  getErrorReport(): string {
    const stats = this.getErrorStats();

    let report = `
🚨 ZoKrates Error Report
═══════════════════════

Total Errors: ${stats.total}

Errors by Operation:
`;

    Object.entries(stats.byOperation).forEach(([operation, count]) => {
      report += `  ${operation}: ${count}\n`;
    });

    if (stats.recent.length > 0) {
      report += "\nRecent Errors:\n";
      stats.recent.forEach((error, index) => {
        report += `  ${index + 1}. [${error.operation}] ${error.message} (${new Date(error.timestamp).toLocaleString()})\n`;
      });
    }

    return report;
  }

  /**
   * Check if error is retryable
   */
  isRetryableError(error: Error): boolean {
    const retryablePatterns = ["timeout", "network", "connection", "temporary", "rate limit", "service unavailable"];

    const message = error.message.toLowerCase();
    return retryablePatterns.some(pattern => message.includes(pattern));
  }

  /**
   * Create user-friendly error message
   */
  createUserFriendlyMessage(error: Error, operation: OperationType): string {
    const operationMessages = {
      compile: "Failed to compile ZoKrates circuit",
      setup: "Failed to generate proving and verification keys",
      generateProof: "Failed to generate zero-knowledge proof",
      exportVerifier: "Failed to export Solidity verifier contract",
    };

    let message = operationMessages[operation];

    // Add specific error context
    if (error.message.includes("timeout")) {
      message += ". The operation took too long to complete.";
    } else if (error.message.includes("memory")) {
      message += ". Insufficient memory available.";
    } else if (error.message.includes("syntax")) {
      message += ". There may be a syntax error in the circuit code.";
    } else if (error.message.includes("witness")) {
      message += ". Invalid witness data provided.";
    } else {
      message += ". Please check the console for detailed error information.";
    }

    return message;
  }

  /**
   * Handle WebAssembly specific errors
   */
  handleWasmError(error: Error): Error {
    if (error.message.includes("WebAssembly")) {
      return new Error(
        "WebAssembly is not supported or failed to initialize. " +
          "Please ensure your browser supports WebAssembly and try again.",
      );
    }

    return error;
  }

  /**
   * Handle memory-related errors
   */
  handleMemoryError(error: Error): Error {
    if (error.message.includes("memory") || error.message.includes("heap")) {
      return new Error(
        "Insufficient memory for ZoKrates operation. " + "Try reducing the circuit size or closing other browser tabs.",
      );
    }

    return error;
  }
}

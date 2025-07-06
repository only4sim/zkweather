/**
 * Performance Monitor for ZoKrates Operations
 *
 * This module tracks and reports performance metrics for ZoKrates operations
 * including compilation time, proof generation time, and memory usage.
 */
import { ZOKRATES_CONFIG } from "./config";

export interface PerformanceMetrics {
  compilations: {
    count: number;
    totalTime: number;
    averageTime: number;
    minTime: number;
    maxTime: number;
  };
  proofGenerations: {
    count: number;
    totalTime: number;
    averageTime: number;
    minTime: number;
    maxTime: number;
  };
  memoryUsage: {
    current: number;
    peak: number;
    samples: number[];
  };
  errors: {
    compilationErrors: number;
    proofGenerationErrors: number;
    setupErrors: number;
  };
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    compilations: {
      count: 0,
      totalTime: 0,
      averageTime: 0,
      minTime: Infinity,
      maxTime: 0,
    },
    proofGenerations: {
      count: 0,
      totalTime: 0,
      averageTime: 0,
      minTime: Infinity,
      maxTime: 0,
    },
    memoryUsage: {
      current: 0,
      peak: 0,
      samples: [],
    },
    errors: {
      compilationErrors: 0,
      proofGenerationErrors: 0,
      setupErrors: 0,
    },
  };

  /**
   * Record compilation performance
   */
  recordCompilation(time: number): void {
    const comp = this.metrics.compilations;
    comp.count++;
    comp.totalTime += time;
    comp.averageTime = comp.totalTime / comp.count;
    comp.minTime = Math.min(comp.minTime, time);
    comp.maxTime = Math.max(comp.maxTime, time);

    if (ZOKRATES_CONFIG.PERFORMANCE_MONITORING.LOG_COMPILATION_TIME) {
      console.log(`📊 Compilation #${comp.count}: ${time}ms (avg: ${comp.averageTime.toFixed(2)}ms)`);
    }
  }

  /**
   * Record proof generation performance
   */
  recordProofGeneration(time: number): void {
    const proof = this.metrics.proofGenerations;
    proof.count++;
    proof.totalTime += time;
    proof.averageTime = proof.totalTime / proof.count;
    proof.minTime = Math.min(proof.minTime, time);
    proof.maxTime = Math.max(proof.maxTime, time);

    if (ZOKRATES_CONFIG.PERFORMANCE_MONITORING.LOG_PROOF_GENERATION_TIME) {
      console.log(`📊 Proof generation #${proof.count}: ${time}ms (avg: ${proof.averageTime.toFixed(2)}ms)`);
    }
  }

  /**
   * Record memory usage
   */
  recordMemoryUsage(): void {
    if (typeof window !== "undefined" && "memory" in performance) {
      const memInfo = (performance as any).memory;
      const current = memInfo.usedJSHeapSize;

      this.metrics.memoryUsage.current = current;
      this.metrics.memoryUsage.peak = Math.max(this.metrics.memoryUsage.peak, current);
      this.metrics.memoryUsage.samples.push(current);

      // Keep only last 100 samples
      if (this.metrics.memoryUsage.samples.length > 100) {
        this.metrics.memoryUsage.samples.shift();
      }

      if (ZOKRATES_CONFIG.PERFORMANCE_MONITORING.LOG_MEMORY_USAGE) {
        console.log(`📊 Memory usage: ${(current / 1024 / 1024).toFixed(2)}MB`);
      }
    }
  }

  /**
   * Record error occurrence
   */
  recordError(errorType: "compilation" | "proofGeneration" | "setup"): void {
    switch (errorType) {
      case "compilation":
        this.metrics.errors.compilationErrors++;
        break;
      case "proofGeneration":
        this.metrics.errors.proofGenerationErrors++;
        break;
      case "setup":
        this.metrics.errors.setupErrors++;
        break;
    }
  }

  /**
   * Get current metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Get formatted metrics report
   */
  getReport(): string {
    const m = this.metrics;
    return `
📊 ZoKrates Performance Report
═══════════════════════════════

Compilations:
  Count: ${m.compilations.count}
  Total Time: ${m.compilations.totalTime.toFixed(2)}ms
  Average Time: ${m.compilations.averageTime.toFixed(2)}ms
  Min Time: ${m.compilations.minTime === Infinity ? "N/A" : m.compilations.minTime.toFixed(2) + "ms"}
  Max Time: ${m.compilations.maxTime.toFixed(2)}ms

Proof Generations:
  Count: ${m.proofGenerations.count}
  Total Time: ${m.proofGenerations.totalTime.toFixed(2)}ms
  Average Time: ${m.proofGenerations.averageTime.toFixed(2)}ms
  Min Time: ${m.proofGenerations.minTime === Infinity ? "N/A" : m.proofGenerations.minTime.toFixed(2) + "ms"}
  Max Time: ${m.proofGenerations.maxTime.toFixed(2)}ms

Memory Usage:
  Current: ${(m.memoryUsage.current / 1024 / 1024).toFixed(2)}MB
  Peak: ${(m.memoryUsage.peak / 1024 / 1024).toFixed(2)}MB
  Samples: ${m.memoryUsage.samples.length}

Errors:
  Compilation Errors: ${m.errors.compilationErrors}
  Proof Generation Errors: ${m.errors.proofGenerationErrors}
  Setup Errors: ${m.errors.setupErrors}
    `;
  }

  /**
   * Reset all metrics
   */
  reset(): void {
    this.metrics = {
      compilations: {
        count: 0,
        totalTime: 0,
        averageTime: 0,
        minTime: Infinity,
        maxTime: 0,
      },
      proofGenerations: {
        count: 0,
        totalTime: 0,
        averageTime: 0,
        minTime: Infinity,
        maxTime: 0,
      },
      memoryUsage: {
        current: 0,
        peak: 0,
        samples: [],
      },
      errors: {
        compilationErrors: 0,
        proofGenerationErrors: 0,
        setupErrors: 0,
      },
    };
  }

  /**
   * Start monitoring memory usage at intervals
   */
  startMemoryMonitoring(intervalMs: number = 5000): void {
    if (typeof window !== "undefined") {
      setInterval(() => {
        this.recordMemoryUsage();
      }, intervalMs);
    }
  }
}

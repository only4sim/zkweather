/**
 * ZoKrates Core Integration
 *
 * This module provides the core integration with ZoKrates for compiling circuits,
 * generating proofs, and managing the ZoKrates workflow.
 */
import { ZOKRATES_CONFIG } from "./config";
import { ErrorHandler } from "./error-handler";
import { PerformanceMonitor } from "./performance";
import { ZokratesProvider, initialize } from "zokrates-js";

export interface CompilationResult {
  program: Uint8Array;
  abi: any;
  success: boolean;
  error?: string;
  compilationTime?: number;
}

export interface SetupResult {
  provingKey: Uint8Array;
  verificationKey: Uint8Array;
  success: boolean;
  error?: string;
  setupTime?: number;
}

export interface ProofResult {
  proof: any;
  inputs: string[];
  success: boolean;
  error?: string;
  proofGenerationTime?: number;
}

export class ZoKratesCore {
  private provider: ZokratesProvider | null = null;
  private performanceMonitor: PerformanceMonitor;
  private errorHandler: ErrorHandler;
  private initializationPromise: Promise<void> | null = null;

  constructor() {
    this.performanceMonitor = new PerformanceMonitor();
    this.errorHandler = new ErrorHandler();
  }

  /**
   * Initialize ZoKrates provider (lazy initialization)
   */
  private async initializeProvider(): Promise<ZokratesProvider> {
    if (this.provider) {
      return this.provider;
    }

    if (!this.initializationPromise) {
      this.initializationPromise = this.doInitialization();
    }

    await this.initializationPromise;
    return this.provider!;
  }

  private async doInitialization(): Promise<void> {
    try {
      console.log("🔄 Initializing ZoKrates...");
      const startTime = performance.now();

      const zokrates = await initialize();

      const endTime = performance.now();
      console.log(`✅ ZoKrates initialized in ${endTime - startTime}ms`);

      this.provider = zokrates;
    } catch (error) {
      console.error("❌ Failed to initialize ZoKrates:", error);
      throw new Error(`ZoKrates initialization failed: ${error}`);
    }
  }

  /**
   * Compile a ZoKrates circuit
   */
  async compileCircuit(source: string): Promise<CompilationResult> {
    const provider = await this.initializeProvider();

    return this.errorHandler.withRetry(async () => {
      const startTime = performance.now();

      try {
        console.log("🔨 Compiling ZoKrates circuit...");
        const result = await provider.compile(source);

        const endTime = performance.now();
        const compilationTime = endTime - startTime;

        if (ZOKRATES_CONFIG.PERFORMANCE_MONITORING.LOG_COMPILATION_TIME) {
          console.log(`✅ Circuit compiled in ${compilationTime}ms`);
        }

        this.performanceMonitor.recordCompilation(compilationTime);

        return {
          ...result,
          compilationTime,
          success: true,
        };
      } catch (error) {
        console.error("❌ Circuit compilation failed:", error);
        return {
          program: new Uint8Array(),
          abi: null,
          success: false,
          error: error instanceof Error ? error.message : "Unknown compilation error",
        };
      }
    }, "compile");
  }

  /**
   * Setup proving and verification keys
   */
  async setupKeys(program: Uint8Array): Promise<SetupResult> {
    const provider = await this.initializeProvider();

    return this.errorHandler.withRetry(async () => {
      const startTime = performance.now();

      try {
        console.log("🔑 Setting up proving and verification keys...");
        const result = await provider.setup(program);

        const endTime = performance.now();
        const setupTime = endTime - startTime;

        console.log(`✅ Keys setup completed in ${setupTime}ms`);

        return {
          ...result,
          setupTime,
          success: true,
        };
      } catch (error) {
        console.error("❌ Keys setup failed:", error);
        return {
          provingKey: new Uint8Array(),
          verificationKey: new Uint8Array(),
          success: false,
          error: error instanceof Error ? error.message : "Unknown setup error",
        };
      }
    }, "setup");
  }

  /**
   * Generate a ZK proof
   */
  async generateProof(program: Uint8Array, provingKey: Uint8Array, inputs: string[]): Promise<ProofResult> {
    const provider = await this.initializeProvider();

    return this.errorHandler.withRetry(async () => {
      const startTime = performance.now();

      try {
        console.log("🔐 Generating ZK proof...");
        const result = await provider.generateProof(program, provingKey, inputs);

        const endTime = performance.now();
        const proofGenerationTime = endTime - startTime;

        if (ZOKRATES_CONFIG.PERFORMANCE_MONITORING.LOG_PROOF_GENERATION_TIME) {
          console.log(`✅ Proof generated in ${proofGenerationTime}ms`);
        }

        this.performanceMonitor.recordProofGeneration(proofGenerationTime);

        return {
          ...result,
          proofGenerationTime,
          success: true,
        };
      } catch (error) {
        console.error("❌ Proof generation failed:", error);
        return {
          proof: null,
          inputs: [],
          success: false,
          error: error instanceof Error ? error.message : "Unknown proof generation error",
        };
      }
    }, "generateProof");
  }

  /**
   * Export Solidity verifier contract
   */
  async exportVerifier(verificationKey: Uint8Array): Promise<string> {
    const provider = await this.initializeProvider();

    try {
      console.log("📄 Exporting Solidity verifier...");
      const verifierContract = await provider.exportVerifier(verificationKey);
      console.log("✅ Verifier contract exported successfully");
      return verifierContract;
    } catch (error) {
      console.error("❌ Verifier export failed:", error);
      throw new Error(`Verifier export failed: ${error}`);
    }
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics() {
    return this.performanceMonitor.getMetrics();
  }

  /**
   * Reset performance metrics
   */
  resetPerformanceMetrics() {
    this.performanceMonitor.reset();
  }

  /**
   * Check if ZoKrates is initialized
   */
  isInitialized(): boolean {
    return this.provider !== null;
  }
}

// Export singleton instance
export const zoKratesCore = new ZoKratesCore();

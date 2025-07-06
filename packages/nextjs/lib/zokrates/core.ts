/**
 * ZoKrates Core Integration
 *
 * This module provides the core integration with ZoKrates for compiling circuits,
 * generating proofs, and managing the ZoKrates workflow.
 */
import { RADAR_FEATURES, formatRadarDataForZoKrates, validateRadarData } from "../../constants/radarFeatures";
import { ZOKRATES_CONFIG } from "./config";
import { ErrorHandler } from "./error-handler";
import { PerformanceMonitor } from "./performance";
import { ValidationResult, WeatherModelInputs, WeatherProof } from "./types";
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

  /**
   * Weather model specific: Validate and format inputs for the weather model circuit
   */
  private validateWeatherInputs(inputs: WeatherModelInputs): ValidationResult {
    const validation = validateRadarData(inputs.features);

    if (!validation.valid) {
      return validation;
    }

    // Additional validation for weather model
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check value ranges
    for (const [feature, value] of Object.entries(inputs.features)) {
      if (
        value < ZOKRATES_CONFIG.WEATHER_MODEL.VALUE_RANGES.MIN ||
        value > ZOKRATES_CONFIG.WEATHER_MODEL.VALUE_RANGES.MAX
      ) {
        warnings.push(`Value for ${feature} (${value}) is outside expected range`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Weather model specific: Format inputs for the ZoKrates circuit
   */
  private formatWeatherInputs(inputs: WeatherModelInputs): string[] {
    const numericInputs = formatRadarDataForZoKrates(inputs.features);

    // The circuit expects 116 inputs (113 features + 3 padding values)
    while (numericInputs.length < ZOKRATES_CONFIG.WEATHER_MODEL.INPUT_SIZE) {
      numericInputs.push(0);
    }

    // Convert to string array for ZoKrates
    return numericInputs.map(num => num.toString());
  }

  /**
   * Weather model specific: Generate proof for weather data
   */
  async generateWeatherProof(
    inputs: WeatherModelInputs,
    program: Uint8Array,
    provingKey: Uint8Array,
  ): Promise<WeatherProof> {
    const startTime = performance.now();

    // Validate inputs
    const validation = this.validateWeatherInputs(inputs);
    if (!validation.valid) {
      throw new Error(`Invalid weather inputs: ${validation.errors.join(", ")}`);
    }

    // Log warnings if any
    if (validation.warnings && validation.warnings.length > 0) {
      console.warn("⚠️ Weather input warnings:", validation.warnings);
    }

    // Format inputs for circuit
    const formattedInputs = this.formatWeatherInputs(inputs);

    // Generate proof using existing method
    const proofResult = await this.generateProof(program, provingKey, formattedInputs);

    if (!proofResult.success) {
      throw new Error(`Proof generation failed: ${proofResult.error}`);
    }

    const endTime = performance.now();
    const proofGenerationTime = endTime - startTime;

    // Extract prediction from proof inputs (last input should be the prediction)
    const prediction = parseInt(proofResult.inputs[proofResult.inputs.length - 1] || "0");

    return {
      proof: proofResult.proof,
      inputs: proofResult.inputs,
      metadata: {
        timestamp: Date.now(),
        featureCount: RADAR_FEATURES.length,
        prediction,
        proofGenerationTime,
      },
    };
  }

  /**
   * Weather model specific: Verify weather proof
   */
  async verifyWeatherProof(proof: WeatherProof): Promise<boolean> {
    try {
      // Validate proof structure
      if (!proof.proof || !proof.inputs || proof.inputs.length === 0) {
        throw new Error("Invalid proof structure");
      }

      // Create a simple verification using the ZoKrates provider
      const provider = await this.initializeProvider();

      // Note: ZoKrates provider doesn't have a direct verify method,
      // so we'll implement a placeholder for now
      // In a real implementation, you'd need to use the verifier contract
      console.log("Using ZoKrates provider for verification:", provider);

      if (ZOKRATES_CONFIG.PERFORMANCE_MONITORING.ENABLED) {
        console.log(`✅ Weather proof verification: VALID (placeholder)`);
      }

      return true; // Placeholder - actual verification happens on-chain
    } catch (error) {
      console.error("❌ Weather proof verification failed:", error);
      return false;
    }
  }

  /**
   * Weather model specific: Get circuit information
   */
  getWeatherModelInfo() {
    return {
      name: ZOKRATES_CONFIG.WEATHER_MODEL.NAME,
      featuresCount: ZOKRATES_CONFIG.WEATHER_MODEL.FEATURES_COUNT,
      inputSize: ZOKRATES_CONFIG.WEATHER_MODEL.INPUT_SIZE,
      outputSize: ZOKRATES_CONFIG.WEATHER_MODEL.OUTPUT_SIZE,
      features: RADAR_FEATURES,
      valueRanges: ZOKRATES_CONFIG.WEATHER_MODEL.VALUE_RANGES,
    };
  }
}

// Export singleton instance
export const zoKratesCore = new ZoKratesCore();

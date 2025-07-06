/**
 * ZoKrates Factory
 *
 * This module provides a high-level interface for ZoKrates operations
 * including circuit management, proof generation workflows, and utilities.
 */
import { ZOKRATES_CONFIG } from "./config";
import { zoKratesCore } from "./core";

export interface CircuitCompilationOptions {
  source: string;
  savePath?: string;
  enableOptimizations?: boolean;
}

export interface ProofGenerationOptions {
  program: Uint8Array;
  provingKey: Uint8Array;
  inputs: string[];
  timeout?: number;
}

export interface WeatherProofData {
  features: number[];
  prediction: number;
  confidence: number;
}

export class ZoKratesFactory {
  private static instance: ZoKratesFactory;

  private constructor() {}

  static getInstance(): ZoKratesFactory {
    if (!ZoKratesFactory.instance) {
      ZoKratesFactory.instance = new ZoKratesFactory();
    }
    return ZoKratesFactory.instance;
  }

  /**
   * Compile a ZoKrates circuit from source code
   */
  async compileCircuit(options: CircuitCompilationOptions) {
    console.log("🔨 Starting circuit compilation...");

    try {
      const result = await zoKratesCore.compileCircuit(options.source);

      if (!result.success) {
        throw new Error(`Circuit compilation failed: ${result.error}`);
      }

      console.log("✅ Circuit compiled successfully");
      return result;
    } catch (error) {
      console.error("❌ Circuit compilation failed:", error);
      throw error;
    }
  }

  /**
   * Generate proving and verification keys for a compiled circuit
   */
  async generateKeys(program: Uint8Array) {
    console.log("🔑 Generating proving and verification keys...");

    try {
      const result = await zoKratesCore.setupKeys(program);

      if (!result.success) {
        throw new Error(`Key generation failed: ${result.error}`);
      }

      console.log("✅ Keys generated successfully");
      return result;
    } catch (error) {
      console.error("❌ Key generation failed:", error);
      throw error;
    }
  }

  /**
   * Generate a ZK proof for weather data
   */
  async generateWeatherProof(options: ProofGenerationOptions) {
    console.log("🔐 Generating weather proof...");

    try {
      // Set timeout for proof generation
      const timeoutMs = options.timeout || ZOKRATES_CONFIG.PROOF_GENERATION_TIMEOUT;

      const proofPromise = zoKratesCore.generateProof(options.program, options.provingKey, options.inputs);

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Proof generation timeout")), timeoutMs);
      });

      const result = (await Promise.race([proofPromise, timeoutPromise])) as any;

      if (!result.success) {
        throw new Error(`Proof generation failed: ${result.error}`);
      }

      console.log("✅ Weather proof generated successfully");
      return result;
    } catch (error) {
      console.error("❌ Weather proof generation failed:", error);
      throw error;
    }
  }

  /**
   * Complete workflow: compile circuit and generate keys
   */
  async setupWeatherCircuit(circuitSource: string) {
    console.log("🚀 Setting up weather circuit...");

    try {
      // Step 1: Compile circuit
      const compilationResult = await this.compileCircuit({
        source: circuitSource,
      });

      // Step 2: Generate keys
      const keysResult = await this.generateKeys(compilationResult.program);

      console.log("✅ Weather circuit setup completed");

      return {
        program: compilationResult.program,
        abi: compilationResult.abi,
        provingKey: keysResult.provingKey,
        verificationKey: keysResult.verificationKey,
        compilationTime: compilationResult.compilationTime,
        setupTime: keysResult.setupTime,
      };
    } catch (error) {
      console.error("❌ Weather circuit setup failed:", error);
      throw error;
    }
  }

  /**
   * Convert weather data to ZoKrates inputs
   */
  convertWeatherDataToInputs(data: WeatherProofData): string[] {
    const inputs: string[] = [];

    // Convert features to string array
    data.features.forEach(feature => {
      inputs.push(feature.toString());
    });

    // Add prediction and confidence
    inputs.push(data.prediction.toString());
    inputs.push(Math.floor(data.confidence * 1000).toString()); // Convert to integer

    return inputs;
  }

  /**
   * Validate weather data format
   */
  validateWeatherData(data: WeatherProofData): boolean {
    // Check if we have the expected number of features
    if (data.features.length !== ZOKRATES_CONFIG.WEATHER_MODEL.FEATURES_COUNT) {
      console.error(`Expected ${ZOKRATES_CONFIG.WEATHER_MODEL.FEATURES_COUNT} features, got ${data.features.length}`);
      return false;
    }

    // Check if all features are numbers
    if (!data.features.every(f => typeof f === "number" && !isNaN(f))) {
      console.error("All features must be valid numbers");
      return false;
    }

    // Check prediction
    if (typeof data.prediction !== "number" || isNaN(data.prediction)) {
      console.error("Prediction must be a valid number");
      return false;
    }

    // Check confidence
    if (typeof data.confidence !== "number" || data.confidence < 0 || data.confidence > 1) {
      console.error("Confidence must be a number between 0 and 1");
      return false;
    }

    return true;
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics() {
    return zoKratesCore.getPerformanceMetrics();
  }

  /**
   * Get performance report
   */
  getPerformanceReport(): string {
    const metrics = this.getPerformanceMetrics();
    return `
📊 ZoKrates Performance Summary
════════════════════════════════

Circuit Compilations: ${metrics.compilations.count}
Average Compilation Time: ${metrics.compilations.averageTime.toFixed(2)}ms

Proof Generations: ${metrics.proofGenerations.count}
Average Proof Time: ${metrics.proofGenerations.averageTime.toFixed(2)}ms

Memory Usage: ${(metrics.memoryUsage.current / 1024 / 1024).toFixed(2)}MB
Peak Memory: ${(metrics.memoryUsage.peak / 1024 / 1024).toFixed(2)}MB

Total Errors: ${metrics.errors.compilationErrors + metrics.errors.proofGenerationErrors + metrics.errors.setupErrors}
    `;
  }

  /**
   * Reset performance metrics
   */
  resetMetrics() {
    zoKratesCore.resetPerformanceMetrics();
  }

  /**
   * Check if ZoKrates is ready
   */
  isReady(): boolean {
    return zoKratesCore.isInitialized();
  }
}

// Export singleton instance
export const zoKratesFactory = ZoKratesFactory.getInstance();

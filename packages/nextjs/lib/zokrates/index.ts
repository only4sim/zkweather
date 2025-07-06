// Import types for weather model
import { CircuitManager, circuitManager } from "./circuit-manager";
import { ZOKRATES_CONFIG } from "./config";
import { ZoKratesCore, zoKratesCore } from "./core";
import { zoKratesFactory } from "./factory";
import type { WeatherModelInputs, WeatherProof } from "./types";

/**
 * ZoKrates Integration Library
 *
 * Main entry point for ZoKrates functionality in the weather insurance dApp.
 * Provides a unified API for circuit compilation, proof generation, and verification.
 */

// Core exports
export { ZoKratesCore, zoKratesCore } from "./core";
export { zoKratesFactory } from "./factory";
export { CircuitManager, circuitManager } from "./circuit-manager";
export { PerformanceMonitor } from "./performance";
export { ErrorHandler } from "./error-handler";

// Configuration and types
export { ZOKRATES_CONFIG } from "./config";
export type { ZoKratesConfig } from "./config";

// Types
export type { CompilationResult, SetupResult, ProofResult } from "./core";
export type { CircuitCompilationOptions, ProofGenerationOptions, WeatherProofData } from "./factory";
export type { PerformanceMetrics } from "./performance";
export type { ErrorInfo, OperationType } from "./error-handler";

// Weather model specific exports
export {
  RADAR_FEATURES,
  FEATURE_DESCRIPTIONS,
  FEATURE_GROUPS,
  RADAR_FEATURE_COUNT,
  validateRadarData,
  formatRadarDataForZoKrates,
} from "../../constants/radarFeatures";

// Main service class
export class WeatherModelService {
  private core: ZoKratesCore;
  private circuitManager: CircuitManager;

  constructor() {
    this.core = zoKratesCore;
    this.circuitManager = circuitManager;
  }

  /**
   * Initialize the weather model (compile and setup if needed)
   */
  async initialize(): Promise<{
    success: boolean;
    error?: string;
    status: {
      compiled: boolean;
      keysSetup: boolean;
      ready: boolean;
    };
  }> {
    return await this.circuitManager.initializeWeatherModel();
  }

  /**
   * Generate proof for weather data
   */
  async generateProof(inputs: WeatherModelInputs): Promise<WeatherProof> {
    // Ensure circuit is initialized
    const initResult = await this.initialize();
    if (!initResult.success) {
      throw new Error(`Failed to initialize weather model: ${initResult.error}`);
    }

    // Load compiled circuit and proving key
    const program = await this.circuitManager.loadCompiledCircuit(ZOKRATES_CONFIG.WEATHER_MODEL.NAME);
    const provingKey = await this.circuitManager.loadProvingKey(ZOKRATES_CONFIG.WEATHER_MODEL.NAME);

    // Generate proof
    return await this.core.generateWeatherProof(inputs, program, provingKey);
  }

  /**
   * Verify weather proof
   */
  async verifyProof(proof: WeatherProof): Promise<boolean> {
    // Load verification key
    await this.circuitManager.loadVerificationKey(ZOKRATES_CONFIG.WEATHER_MODEL.NAME);

    // Verify proof
    return await this.core.verifyWeatherProof(proof);
  }

  /**
   * Get weather model information
   */
  getModelInfo() {
    return this.core.getWeatherModelInfo();
  }

  /**
   * Get circuit status
   */
  async getStatus() {
    return await this.circuitManager.getCircuitStatus(ZOKRATES_CONFIG.WEATHER_MODEL.NAME);
  }

  /**
   * Get performance metrics
   */
  getMetrics() {
    return this.core.getPerformanceMetrics();
  }

  /**
   * Reset performance metrics
   */
  resetMetrics() {
    this.core.resetPerformanceMetrics();
  }
}

// Export singleton instance
export const weatherModelService = new WeatherModelService();

// Utilities
export const ZoKratesUtils = {
  /**
   * Format proof for blockchain submission
   */
  formatProofForBlockchain(proof: any): {
    a: [string, string];
    b: [[string, string], [string, string]];
    c: [string, string];
    inputs: string[];
  } {
    return {
      a: [proof.proof.a[0], proof.proof.a[1]],
      b: [
        [proof.proof.b[0][0], proof.proof.b[0][1]],
        [proof.proof.b[1][0], proof.proof.b[1][1]],
      ],
      c: [proof.proof.c[0], proof.proof.c[1]],
      inputs: proof.inputs,
    };
  },

  /**
   * Convert BigInt values to strings for JSON serialization
   */
  serializeProof(proof: any): string {
    return JSON.stringify(proof, (key, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    });
  },

  /**
   * Parse serialized proof back to object
   */
  deserializeProof(proofJson: string): any {
    return JSON.parse(proofJson);
  },

  /**
   * Validate proof format
   */
  validateProofFormat(proof: any): boolean {
    try {
      return (
        proof &&
        proof.proof &&
        Array.isArray(proof.proof.a) &&
        Array.isArray(proof.proof.b) &&
        Array.isArray(proof.proof.c) &&
        Array.isArray(proof.inputs)
      );
    } catch {
      return false;
    }
  },

  /**
   * Generate random test inputs for development
   */
  generateTestInputs(count: number): string[] {
    const inputs: string[] = [];
    for (let i = 0; i < count; i++) {
      inputs.push(Math.floor(Math.random() * 1000).toString());
    }
    return inputs;
  },
};

// Default export
const ZoKrates = {
  core: zoKratesCore,
  factory: zoKratesFactory,
  circuitManager: circuitManager,
  weatherModelService: weatherModelService,
  config: ZOKRATES_CONFIG,
  utils: ZoKratesUtils,
};

export default ZoKrates;

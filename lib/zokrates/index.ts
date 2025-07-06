/**
 * ZoKrates Library Index
 * 
 * This file exports all ZoKrates modules and utilities for easy importing.
 */

// Core modules
export { zoKratesCore, ZoKratesCore } from './core';
export { zoKratesFactory } from './factory';
export { PerformanceMonitor } from './performance';
export { ErrorHandler } from './error-handler';

// Configuration
export { ZOKRATES_CONFIG } from './config';
export type { ZoKratesConfig } from './config';

// Re-import for default export
import { zoKratesCore } from './core';
import { zoKratesFactory } from './factory';
import { ZOKRATES_CONFIG } from './config';

// Types
export type {
  CompilationResult,
  SetupResult,
  ProofResult,
} from './core';

export type {
  CircuitCompilationOptions,
  ProofGenerationOptions,
  WeatherProofData,
} from './factory';

export type {
  PerformanceMetrics,
} from './performance';

export type {
  ErrorInfo,
  OperationType,
} from './error-handler';

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
      if (typeof value === 'bigint') {
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
export default {
  core: zoKratesCore,
  factory: zoKratesFactory,
  config: ZOKRATES_CONFIG,
  utils: ZoKratesUtils,
};

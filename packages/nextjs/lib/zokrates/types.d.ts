/**
 * Type definitions for zokrates-js and weather insurance application
 *
 * This file provides TypeScript type definitions for the zokrates-js library
 * and additional types for weather insurance functionality.
 */
import { RADAR_FEATURES } from "../../constants/radarFeatures";

declare module "zokrates-js" {
  export interface ZokratesProvider {
    compile(source: string): Promise<{
      program: Uint8Array;
      abi: any;
    }>;

    setup(program: Uint8Array): Promise<{
      provingKey: Uint8Array;
      verificationKey: Uint8Array;
    }>;

    generateProof(
      program: Uint8Array,
      provingKey: Uint8Array,
      inputs: string[],
    ): Promise<{
      proof: any;
      inputs: string[];
    }>;

    exportVerifier(verificationKey: Uint8Array): Promise<string>;
  }

  export function initialize(): Promise<ZokratesProvider>;
}

// Weather model specific types
export type RadarFeature = (typeof RADAR_FEATURES)[number];

export interface WeatherModelInputs {
  features: Record<RadarFeature, number>;
  metadata?: {
    timestamp?: number;
    location?: string;
    source?: string;
  };
}

export interface WeatherModelOutput {
  prediction: number;
  confidence?: number;
  metadata?: {
    processingTime: number;
    modelVersion: string;
  };
}

// ZK Proof types for weather insurance
export interface WeatherProof {
  proof: {
    a: [string, string];
    b: [[string, string], [string, string]];
    c: [string, string];
  };
  inputs: string[];
  metadata: {
    timestamp: number;
    featureCount: number;
    prediction: number;
    proofGenerationTime: number;
  };
}

// Performance monitoring types
export interface PerformanceMetrics {
  compilationTime?: number;
  witnessComputationTime?: number;
  proofGenerationTime?: number;
  verificationTime?: number;
  memoryUsage?: number;
  circuitSize?: number;
  constraintCount?: number;
}

// Error handling types
export interface ZoKratesError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
}

export interface ZoKratesOperation {
  type: "compile" | "setup" | "witness" | "prove" | "verify";
  status: "pending" | "success" | "error";
  startTime: number;
  endTime?: number;
  error?: ZoKratesError;
  metrics?: PerformanceMetrics;
}

// Service types
export interface ZoKratesService {
  compileCircuit: (circuitName: string) => Promise<any>;
  setupProving: (circuitName: string) => Promise<any>;
  generateProof: (inputs: WeatherModelInputs) => Promise<WeatherProof>;
  verifyProof: (proof: WeatherProof) => Promise<boolean>;
  getMetrics: () => PerformanceMetrics;
  reset: () => void;
}

// Input validation types
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings?: string[];
}

export interface InputValidator {
  validateRadarData: (data: Record<string, number>) => ValidationResult;
  validateInputRange: (value: number, min: number, max: number) => boolean;
  formatForCircuit: (inputs: WeatherModelInputs) => number[];
}

// Batch processing types
export interface BatchProofRequest {
  id: string;
  inputs: WeatherModelInputs[];
  options?: {
    parallel?: boolean;
    maxConcurrency?: number;
  };
}

export interface BatchProofResult {
  id: string;
  results: Array<{
    success: boolean;
    proof?: WeatherProof;
    error?: ZoKratesError;
  }>;
  metrics: {
    totalTime: number;
    averageProofTime: number;
    successRate: number;
  };
}

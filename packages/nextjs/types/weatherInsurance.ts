/**
 * TypeScript type definitions for Weather Insurance Platform
 */

/**
 * ZK-SNARK proof structure as expected by the Verifier contract
 */
export interface ZKProof {
  a: {
    X: string;
    Y: string;
  };
  b: {
    X: [string, string];
    Y: [string, string];
  };
  c: {
    X: string;
    Y: string;
  };
}

/**
 * Public inputs for the ZK proof (2 uint256 values)
 */
export type PublicInputs = [string, string];

/**
 * Radar feature data structure
 */
export interface RadarFeature {
  name: string;
  description: string;
  value: string;
  category: string;
  unit?: string;
  min?: number;
  max?: number;
}

/**
 * Complete radar data with all 113 features
 */
export interface RadarData {
  features: RadarFeature[];
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
}

/**
 * Proof verification result
 */
export interface VerificationResult {
  isValid: boolean;
  transactionHash: string;
  blockNumber: number;
  timestamp: Date;
  gasUsed: bigint;
  verifier: string;
}

/**
 * Proof generation status
 */
export interface ProofGenerationStatus {
  status: "idle" | "generating" | "completed" | "failed";
  progress: number;
  elapsedTime?: number;
  error?: string;
}

/**
 * Weather insurance claim data
 */
export interface InsuranceClaim {
  claimId: string;
  radarData: RadarData;
  proof: ZKProof;
  publicInputs: PublicInputs;
  verificationResult?: VerificationResult;
  status: "pending" | "verified" | "rejected";
  submittedAt: Date;
  submittedBy: string;
}

/**
 * File upload types
 */
export interface FileUploadResult {
  success: boolean;
  data?: RadarData;
  error?: string;
}

/**
 * CSV parsing options
 */
export interface CSVParseOptions {
  delimiter?: string;
  hasHeader?: boolean;
  skipEmptyLines?: boolean;
}

/**
 * Transaction monitoring data
 */
export interface TransactionMonitor {
  hash: string;
  status: "pending" | "confirmed" | "failed";
  confirmations: number;
  gasUsed?: bigint;
  effectiveGasPrice?: bigint;
  timestamp?: Date;
}

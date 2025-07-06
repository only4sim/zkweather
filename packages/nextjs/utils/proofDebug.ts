/**
 * Utility functions for debugging ZK proof verification
 */
import { PublicInputs, ZKProof } from "~~/types/weatherInsurance";

/**
 * Validate ZK proof format
 */
export function validateProofFormat(proof: ZKProof): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check a field
  if (!proof.a) {
    errors.push("Missing 'a' field");
  } else {
    if (!proof.a.X || typeof proof.a.X !== "string") {
      errors.push("Invalid 'a.X' field");
    }
    if (!proof.a.Y || typeof proof.a.Y !== "string") {
      errors.push("Invalid 'a.Y' field");
    }
  }

  // Check b field
  if (!proof.b) {
    errors.push("Missing 'b' field");
  } else {
    if (!Array.isArray(proof.b.X) || proof.b.X.length !== 2) {
      errors.push("Invalid 'b.X' field - must be array of 2 strings");
    }
    if (!Array.isArray(proof.b.Y) || proof.b.Y.length !== 2) {
      errors.push("Invalid 'b.Y' field - must be array of 2 strings");
    }
  }

  // Check c field
  if (!proof.c) {
    errors.push("Missing 'c' field");
  } else {
    if (!proof.c.X || typeof proof.c.X !== "string") {
      errors.push("Invalid 'c.X' field");
    }
    if (!proof.c.Y || typeof proof.c.Y !== "string") {
      errors.push("Invalid 'c.Y' field");
    }
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Validate public inputs format
 */
export function validatePublicInputs(inputs: PublicInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!Array.isArray(inputs) || inputs.length !== 2) {
    errors.push("Public inputs must be array of 2 strings");
  } else {
    inputs.forEach((input, index) => {
      if (typeof input !== "string") {
        errors.push(`Input ${index} must be string`);
      }
      if (!input.startsWith("0x")) {
        errors.push(`Input ${index} must start with '0x'`);
      }
    });
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Check if hex string is valid bigint
 */
export function isValidHexBigInt(hex: string): boolean {
  try {
    if (!hex.startsWith("0x")) return false;
    BigInt(hex);
    return true;
  } catch {
    return false;
  }
}

/**
 * Format proof for debugging display
 */
export function formatProofForDebug(proof: ZKProof): string {
  return JSON.stringify(
    {
      a: {
        X: proof.a.X.substring(0, 10) + "...",
        Y: proof.a.Y.substring(0, 10) + "...",
      },
      b: {
        X: proof.b.X.map(x => x.substring(0, 10) + "..."),
        Y: proof.b.Y.map(y => y.substring(0, 10) + "..."),
      },
      c: {
        X: proof.c.X.substring(0, 10) + "...",
        Y: proof.c.Y.substring(0, 10) + "...",
      },
    },
    null,
    2,
  );
}

/**
 * Log proof validation details
 */
export function debugProofValidation(proof: ZKProof, inputs: PublicInputs): void {
  console.log("=== ZK Proof Validation Debug ===");

  const proofValidation = validateProofFormat(proof);
  console.log("Proof format validation:", proofValidation);

  const inputValidation = validatePublicInputs(inputs);
  console.log("Input validation:", inputValidation);

  console.log("Proof summary:", formatProofForDebug(proof));
  console.log("Inputs:", inputs);

  // Check hex validity
  console.log("Hex validation:");
  console.log("  a.X:", isValidHexBigInt(proof.a.X));
  console.log("  a.Y:", isValidHexBigInt(proof.a.Y));
  console.log("  b.X[0]:", isValidHexBigInt(proof.b.X[0]));
  console.log("  b.X[1]:", isValidHexBigInt(proof.b.X[1]));
  console.log("  b.Y[0]:", isValidHexBigInt(proof.b.Y[0]));
  console.log("  b.Y[1]:", isValidHexBigInt(proof.b.Y[1]));
  console.log("  c.X:", isValidHexBigInt(proof.c.X));
  console.log("  c.Y:", isValidHexBigInt(proof.c.Y));
  console.log("  input[0]:", isValidHexBigInt(inputs[0]));
  console.log("  input[1]:", isValidHexBigInt(inputs[1]));

  console.log("=== End Debug ===");
}

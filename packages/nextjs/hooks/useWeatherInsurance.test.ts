/**
 * Validation utilities for useWeatherInsurance hook
 *
 * This file contains basic validation functions for the hook functionality.
 * For a complete test suite, proper testing framework setup is needed.
 */
import { PublicInputs, ZKProof } from "~~/types/weatherInsurance";

/**
 * Validates the structure of a ZK proof object
 * @param proof - The ZK proof to validate
 * @returns boolean indicating if the proof structure is valid
 */
export function validateZKProof(proof: ZKProof): boolean {
  try {
    // Check if all required fields exist
    if (!proof.a || !proof.b || !proof.c) return false;

    // Check a component
    if (!proof.a.X || !proof.a.Y) return false;

    // Check b component (arrays)
    if (!Array.isArray(proof.b.X) || !Array.isArray(proof.b.Y)) return false;
    if (proof.b.X.length !== 2 || proof.b.Y.length !== 2) return false;

    // Check c component
    if (!proof.c.X || !proof.c.Y) return false;

    return true;
  } catch (error) {
    console.error("Error validating ZK proof:", error);
    return false;
  }
}

/**
 * Validates the structure of public inputs
 * @param inputs - The public inputs to validate
 * @returns boolean indicating if the inputs structure is valid
 */
export function validatePublicInputs(inputs: PublicInputs): boolean {
  try {
    // Check if it's an array with exactly 2 elements
    if (!Array.isArray(inputs) || inputs.length !== 2) return false;

    // Check if both elements are strings
    if (typeof inputs[0] !== "string" || typeof inputs[1] !== "string") return false;

    return true;
  } catch (error) {
    console.error("Error validating public inputs:", error);
    return false;
  }
}

/**
 * Example usage and validation
 */
export function runValidationTests(): void {
  // Test valid proof
  const validProof: ZKProof = {
    a: { X: "0x1", Y: "0x2" },
    b: { X: ["0x3", "0x4"], Y: ["0x5", "0x6"] },
    c: { X: "0x7", Y: "0x8" },
  };

  const validInputs: PublicInputs = ["0x1", "0x2"];

  console.log("Valid proof validation:", validateZKProof(validProof));
  console.log("Valid inputs validation:", validatePublicInputs(validInputs));

  // Test invalid proof
  const invalidProof = {
    a: { X: "0x1" }, // Missing Y
    b: { X: ["0x3"], Y: ["0x5", "0x6"] }, // Wrong array length
    c: { X: "0x7", Y: "0x8" },
  } as unknown as ZKProof;

  console.log("Invalid proof validation:", validateZKProof(invalidProof));
}

/**
 * Type definitions for zokrates-js
 *
 * This file provides TypeScript type definitions for the zokrates-js library
 * since it may not have built-in TypeScript support.
 */

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

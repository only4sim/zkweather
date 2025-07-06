"use client";

import { useAccount } from "wagmi";
import { ContractStatsDisplay } from "~~/components/ContractStatsDisplay";
import { ProofVerificationTest } from "~~/components/ProofVerificationTest";
import { Address } from "~~/components/scaffold-eth";

/**
 * Test page for ZK proof verification functionality
 */
export default function VerificationTestPage() {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex items-center flex-col grow pt-10">
      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">ZK Weather Insurance</span>
          <span className="block text-4xl font-bold">Proof Verification Test</span>
        </h1>

        <div className="flex justify-center items-center space-x-2 flex-col my-6">
          <p className="my-2 font-medium">Connected Address:</p>
          <Address address={connectedAddress} />
        </div>

        <div className="text-center mb-8">
          <p className="text-lg">
            This page tests the useScaffoldWriteContract integration for verifyTx function calls.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Make sure you&apos;re connected to the Zircuit network and have some test tokens.
          </p>
        </div>
      </div>

      <div className="grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Contract Statistics Display */}
          <ContractStatsDisplay />

          {/* Proof Verification Test Component */}
          <ProofVerificationTest />
        </div>
      </div>
    </div>
  );
}

import { useWaitForTransactionReceipt } from "wagmi";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

/**
 * Custom hook for weather insurance contract interactions
 * Provides functionality to verify ZK proofs and read contract state
 */
export const useWeatherInsurance = () => {
  const { address } = useAccount();
  const { writeContractAsync: writeVerifierAsync, isPending: isWriting } = useScaffoldWriteContract({
    contractName: "Verifier",
  });

  // Read contract state using useScaffoldReadContract
  const { data: totalVerifications } = useScaffoldReadContract({
    contractName: "Verifier",
    functionName: "totalVerifications",
  });

  const { data: successfulVerifications } = useScaffoldReadContract({
    contractName: "Verifier",
    functionName: "successfulVerifications",
  });

  const { data: userVerifications } = useScaffoldReadContract({
    contractName: "Verifier",
    functionName: "userVerifications",
    args: [address],
  });

  const { data: userSuccessfulVerifications } = useScaffoldReadContract({
    contractName: "Verifier",
    functionName: "userSuccessfulVerifications",
    args: [address],
  });

  const { data: verificationStats } = useScaffoldReadContract({
    contractName: "Verifier",
    functionName: "getVerificationStats",
  });

  const { data: userStats } = useScaffoldReadContract({
    contractName: "Verifier",
    functionName: "getUserStats",
    args: [address],
  });

  /**
   * Verify a ZK proof using the verifyTx function
   * @param proof - The ZK proof object containing a, b, c components
   * @param input - Array of two uint256 values (the public inputs)
   * @returns Promise that resolves to transaction hash or throws error
   */
  const verifyProof = async (
    proof: {
      a: { X: string; Y: string };
      b: { X: [string, string]; Y: [string, string] };
      c: { X: string; Y: string };
    },
    input: [string, string],
  ) => {
    try {
      // Convert string values to bigint for contract call
      const proofArgs = {
        a: { X: BigInt(proof.a.X), Y: BigInt(proof.a.Y) },
        b: {
          X: [BigInt(proof.b.X[0]), BigInt(proof.b.X[1])] as const,
          Y: [BigInt(proof.b.Y[0]), BigInt(proof.b.Y[1])] as const,
        },
        c: { X: BigInt(proof.c.X), Y: BigInt(proof.c.Y) },
      };
      const inputArgs = [BigInt(input[0]), BigInt(input[1])] as const;

      const txHash = await writeVerifierAsync({
        functionName: "verifyTx",
        args: [proofArgs, inputArgs],
      });

      notification.success("Proof verification submitted successfully!");
      return txHash;
    } catch (error) {
      console.error("Error verifying proof:", error);
      notification.error("Failed to submit proof verification");
      throw error;
    }
  };

  return {
    // Write functions
    verifyProof,
    isWriting,

    // Read contract state - organized for better usability
    contractStats: {
      totalVerifications: totalVerifications || BigInt(0),
      successfulVerifications: successfulVerifications || BigInt(0),
      detailedStats: verificationStats || [BigInt(0), BigInt(0), BigInt(0)],
    },

    // User-specific stats
    userStats: {
      totalVerifications: userVerifications || BigInt(0),
      successfulVerifications: userSuccessfulVerifications || BigInt(0),
      detailedStats: userStats || [BigInt(0), BigInt(0), BigInt(0)],
    },

    // Raw data (for backward compatibility)
    raw: {
      totalVerifications,
      successfulVerifications,
      userVerifications,
      userSuccessfulVerifications,
      verificationStats,
      userStats,
    },
  };
};

/**
 * Custom hook for monitoring transaction status
 * @param txHash - Transaction hash to monitor
 */
export const useTransactionStatus = (txHash: string | undefined) => {
  const {
    data: receipt,
    isError,
    isLoading,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,
  });

  return {
    receipt,
    isError,
    isLoading,
    isSuccess,
  };
};

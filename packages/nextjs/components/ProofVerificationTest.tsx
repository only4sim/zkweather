import { useState } from "react";
import { TransactionMonitor } from "./TransactionMonitor";
import { Hash } from "viem";
import { useWeatherInsurance } from "~~/hooks/useWeatherInsurance";
import { PublicInputs, ZKProof } from "~~/types/weatherInsurance";
import { debugProofValidation } from "~~/utils/proofDebug";

/**
 * Test component for ZK proof verification
 * This component demonstrates the usage of useScaffoldWriteContract for verifyTx function
 */
export const ProofVerificationTest = () => {
  const [txHash, setTxHash] = useState<Hash>();
  const { verifyProof, isWriting } = useWeatherInsurance();

  // Sample proof data from ZoKrates (valid proof for testing)
  const sampleProof: ZKProof = {
    a: {
      X: "0x088d3d758b6e47c3474e97fdd340bf5164895c6f276ae35a218cb6ac132787fb",
      Y: "0x2825e016431e25eff7b0cfdca8064317240fa70ad8e18fa24d945e77fc929746",
    },
    b: {
      X: [
        "0x1462d5af37afa28f4584d86d19bbcea88997224048ca5efe87e399c9911cf2ba",
        "0x02d341a650f79d892a6a7f55f14460ca72d941dcccaaa0b2deadda2bb3914d69",
      ],
      Y: [
        "0x13b1d00824982e984c52dd8f3225c5dac68f7e9f43df45e0e9a68a9bdafd52ae",
        "0x2e2056252ad291ffe6635c4bde6af8aedf1144d4a803d95d4b360d303d999100",
      ],
    },
    c: {
      X: "0x10b176d29fea1a181363ad494165f48ee0649d93398583af2e79975745977235",
      Y: "0x0e448b0e1d3c231bd9728aa2d2c24586e21bfda0b9f860b6334b23aa30a433a1",
    },
  };

  const sampleInputs: PublicInputs = [
    "0x0000000000000000000000000000000000000000000000000000000000000001",
    "0x000000000000000000000000000000000000000000000000000000000973b757",
  ];

  const handleVerifyProof = async () => {
    try {
      console.log("Starting proof verification...");
      debugProofValidation(sampleProof, sampleInputs);

      const hash = await verifyProof(sampleProof, sampleInputs);
      setTxHash(hash);
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 py-8 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">ZK Proof Verification Test</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Sample Proof Data (ZoKrates Generated):</h3>
          <div className="bg-base-200 p-3 rounded-lg text-sm">
            <p>
              <strong>A.X:</strong> {sampleProof.a.X.substring(0, 20)}...
            </p>
            <p>
              <strong>A.Y:</strong> {sampleProof.a.Y.substring(0, 20)}...
            </p>
            <p>
              <strong>B.X[0]:</strong> {sampleProof.b.X[0].substring(0, 20)}...
            </p>
            <p>
              <strong>B.X[1]:</strong> {sampleProof.b.X[1].substring(0, 20)}...
            </p>
            <p>
              <strong>Inputs:</strong> [{sampleInputs[0].substring(0, 20)}..., {sampleInputs[1].substring(0, 20)}...]
            </p>
          </div>
        </div>

        <button className="btn btn-primary w-full" onClick={handleVerifyProof} disabled={isWriting}>
          {isWriting ? "Verifying..." : "Verify Proof"}
        </button>

        {txHash && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Transaction Hash:</strong>
              </p>
              <p className="text-xs font-mono bg-base-200 p-2 rounded break-all">{txHash}</p>
            </div>

            <TransactionMonitor txHash={txHash} />
          </div>
        )}
      </div>
    </div>
  );
};

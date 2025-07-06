/**
 * ZoKrates Test Page
 *
 * This page provides a comprehensive testing interface for the ZoKrates environment
 * and demonstrates the zero-knowledge proof generation capabilities.
 */
import type { NextPage } from "next";
import ZoKratesTestComponent from "~~/components/ZoKratesTestComponent";

const ZoKratesTestPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🔬 ZoKrates Environment Test</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test and validate the ZoKrates zero-knowledge proof generation environment for the Weather Insurance dApp.
            This tool helps ensure all components are working correctly before generating real weather proofs.
          </p>
        </div>

        <ZoKratesTestComponent />

        <div className="mt-12 text-center">
          <div className="bg-blue-50 p-6 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">🚀 Next Steps</h2>
            <div className="text-left text-blue-700 space-y-2">
              <p>
                ✅ <strong>Environment Setup:</strong> Validate all tests pass
              </p>
              <p>
                🔨 <strong>Circuit Development:</strong> Create weather model circuits
              </p>
              <p>
                📊 <strong>Data Integration:</strong> Connect radar data inputs
              </p>
              <p>
                🔐 <strong>Proof Generation:</strong> Generate weather proofs
              </p>
              <p>
                ⛓️ <strong>Blockchain Integration:</strong> Submit proofs to contract
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoKratesTestPage;

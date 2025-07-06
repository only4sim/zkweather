/**
 * ZoKrates Integration Test Component
 *
 * This React component provides a UI for testing ZoKrates environment setup
 * and demonstrates the integration with the weather insurance application.
 */
"use client";

import React, { useEffect, useState } from "react";
import { zoKratesFactory } from "~~/lib/zokrates";
import ZoKratesEnvironmentTest from "~~/lib/zokrates/test";

/**
 * ZoKrates Integration Test Component
 *
 * This React component provides a UI for testing ZoKrates environment setup
 * and demonstrates the integration with the weather insurance application.
 */

/**
 * ZoKrates Integration Test Component
 *
 * This React component provides a UI for testing ZoKrates environment setup
 * and demonstrates the integration with the weather insurance application.
 */

/**
 * ZoKrates Integration Test Component
 *
 * This React component provides a UI for testing ZoKrates environment setup
 * and demonstrates the integration with the weather insurance application.
 */

/**
 * ZoKrates Integration Test Component
 *
 * This React component provides a UI for testing ZoKrates environment setup
 * and demonstrates the integration with the weather insurance application.
 */

/**
 * ZoKrates Integration Test Component
 *
 * This React component provides a UI for testing ZoKrates environment setup
 * and demonstrates the integration with the weather insurance application.
 */

/**
 * ZoKrates Integration Test Component
 *
 * This React component provides a UI for testing ZoKrates environment setup
 * and demonstrates the integration with the weather insurance application.
 */

/**
 * ZoKrates Integration Test Component
 *
 * This React component provides a UI for testing ZoKrates environment setup
 * and demonstrates the integration with the weather insurance application.
 */

/**
 * ZoKrates Integration Test Component
 *
 * This React component provides a UI for testing ZoKrates environment setup
 * and demonstrates the integration with the weather insurance application.
 */

/**
 * ZoKrates Integration Test Component
 *
 * This React component provides a UI for testing ZoKrates environment setup
 * and demonstrates the integration with the weather insurance application.
 */

/**
 * ZoKrates Integration Test Component
 *
 * This React component provides a UI for testing ZoKrates environment setup
 * and demonstrates the integration with the weather insurance application.
 */

interface TestResults {
  initialization: boolean | null;
  proofGeneration: boolean | null;
  utilities: boolean | null;
  systemRequirements: {
    webAssembly: boolean;
    memory: boolean;
    browser: boolean;
  };
}

export const ZoKratesTestComponent: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResults>({
    initialization: null,
    proofGeneration: null,
    utilities: null,
    systemRequirements: {
      webAssembly: false,
      memory: false,
      browser: false,
    },
  });

  const [isRunning, setIsRunning] = useState(false);
  const [performanceReport, setPerformanceReport] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([]);

  // Check system requirements on mount
  useEffect(() => {
    const requirements = ZoKratesEnvironmentTest.getSystemRequirements();
    setTestResults(prev => ({
      ...prev,
      systemRequirements: requirements,
    }));
  }, []);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setLogs([]);
    addLog("Starting ZoKrates environment tests...");

    try {
      // Test initialization
      addLog("Testing initialization...");
      const initResult = await ZoKratesEnvironmentTest.testInitialization();
      setTestResults(prev => ({ ...prev, initialization: initResult }));
      addLog(`Initialization test: ${initResult ? "PASSED" : "FAILED"}`);

      // Test proof generation
      addLog("Testing proof generation...");
      const proofResult = await ZoKratesEnvironmentTest.testProofGeneration();
      setTestResults(prev => ({ ...prev, proofGeneration: proofResult }));
      addLog(`Proof generation test: ${proofResult ? "PASSED" : "FAILED"}`);

      // Test utilities
      addLog("Testing utilities...");
      const utilsResult = ZoKratesEnvironmentTest.testUtilities();
      setTestResults(prev => ({ ...prev, utilities: utilsResult }));
      addLog(`Utilities test: ${utilsResult ? "PASSED" : "FAILED"}`);

      // Get performance report
      const report = zoKratesFactory.getPerformanceReport();
      setPerformanceReport(report);
      addLog("Performance report generated");

      addLog("All tests completed!");
    } catch (error) {
      addLog(`Error during testing: ${error}`);
      console.error("Test error:", error);
    } finally {
      setIsRunning(false);
    }
  };

  const testSimpleCircuit = async () => {
    setIsRunning(true);
    addLog("Testing simple circuit compilation...");

    try {
      const simpleCircuit = `
        def main(private field a, field b) -> field {
          return a + b;
        }
      `;

      const result = await zoKratesFactory.compileCircuit({
        source: simpleCircuit,
      });

      if (result.success) {
        addLog("✅ Simple circuit compiled successfully");
        addLog(`Compilation time: ${result.compilationTime}ms`);
      } else {
        addLog("❌ Simple circuit compilation failed");
        addLog(`Error: ${result.error}`);
      }
    } catch (error) {
      addLog(`Circuit compilation error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
    zoKratesFactory.resetMetrics();
    setPerformanceReport("");
  };

  const getStatusIcon = (status: boolean | null) => {
    if (status === null) return "⏳";
    return status ? "✅" : "❌";
  };

  const getStatusColor = (status: boolean | null) => {
    if (status === null) return "text-yellow-500";
    return status ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🧪 ZoKrates Environment Test</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System Requirements */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">System Requirements</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>WebAssembly Support</span>
                <span className={getStatusColor(testResults.systemRequirements.webAssembly)}>
                  {getStatusIcon(testResults.systemRequirements.webAssembly)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Memory Available</span>
                <span className={getStatusColor(testResults.systemRequirements.memory)}>
                  {getStatusIcon(testResults.systemRequirements.memory)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Browser Compatibility</span>
                <span className={getStatusColor(testResults.systemRequirements.browser)}>
                  {getStatusIcon(testResults.systemRequirements.browser)}
                </span>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Test Results</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Initialization</span>
                <span className={getStatusColor(testResults.initialization)}>
                  {getStatusIcon(testResults.initialization)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Proof Generation</span>
                <span className={getStatusColor(testResults.proofGeneration)}>
                  {getStatusIcon(testResults.proofGeneration)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Utilities</span>
                <span className={getStatusColor(testResults.utilities)}>{getStatusIcon(testResults.utilities)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={runTests}
            disabled={isRunning}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            {isRunning ? "🔄 Running Tests..." : "🚀 Run All Tests"}
          </button>

          <button
            onClick={testSimpleCircuit}
            disabled={isRunning}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            {isRunning ? "🔄 Testing..." : "🔨 Test Circuit"}
          </button>

          <button
            onClick={clearLogs}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            🧹 Clear Logs
          </button>
        </div>
      </div>

      {/* Logs */}
      {logs.length > 0 && (
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">📋 Test Logs</h3>
          <div className="space-y-1 max-h-64 overflow-y-auto font-mono text-sm">
            {logs.map((log, index) => (
              <div key={index} className="whitespace-pre-wrap">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Report */}
      {performanceReport && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">📊 Performance Report</h3>
          <pre className="text-sm text-blue-700 whitespace-pre-wrap">{performanceReport}</pre>
        </div>
      )}

      {/* Usage Example */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">💡 Usage Example</h3>
        <pre className="text-sm text-yellow-700 whitespace-pre-wrap">
          {`// Basic ZoKrates usage
import { zoKratesFactory } from '@/lib/zokrates';

// Compile a circuit
const result = await zoKratesFactory.compileCircuit({
  source: circuitCode,
});

// Generate keys
const keys = await zoKratesFactory.generateKeys(result.program);

// Generate proof
const proof = await zoKratesFactory.generateWeatherProof({
  program: result.program,
  provingKey: keys.provingKey,
  inputs: ['1', '2', '3'],
});`}
        </pre>
      </div>
    </div>
  );
};

export default ZoKratesTestComponent;

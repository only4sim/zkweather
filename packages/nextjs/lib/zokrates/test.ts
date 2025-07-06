/**
 * ZoKrates Environment Test
 *
 * This file tests the ZoKrates environment setup and basic functionality.
 */
import { ZoKratesUtils, zoKratesFactory } from "./index";

export class ZoKratesEnvironmentTest {
  /**
   * Test ZoKrates initialization
   */
  static async testInitialization(): Promise<boolean> {
    try {
      console.log("🧪 Testing ZoKrates initialization...");

      // Test with a simple circuit
      const simpleCircuit = `
        def main(private field a, field b) -> field {
          return a + b;
        }
      `;

      const result = await zoKratesFactory.compileCircuit({
        source: simpleCircuit,
      });

      if (result.success) {
        console.log("✅ ZoKrates initialization test passed");
        return true;
      } else {
        console.log("❌ ZoKrates initialization test failed");
        return false;
      }
    } catch (error) {
      console.error("❌ ZoKrates initialization test failed:", error);
      return false;
    }
  }

  /**
   * Test proof generation workflow
   */
  static async testProofGeneration(): Promise<boolean> {
    try {
      console.log("🧪 Testing proof generation workflow...");

      // Simple circuit for testing
      const testCircuit = `
        def main(private field a, field b) -> field {
          return a * b;
        }
      `;

      // Step 1: Compile circuit
      const compilationResult = await zoKratesFactory.compileCircuit({
        source: testCircuit,
      });

      if (!compilationResult.success) {
        console.log("❌ Circuit compilation failed in test");
        return false;
      }

      // Step 2: Generate keys
      const keysResult = await zoKratesFactory.generateKeys(compilationResult.program);

      if (!keysResult.success) {
        console.log("❌ Key generation failed in test");
        return false;
      }

      // Step 3: Generate proof
      const proofResult = await zoKratesFactory.generateWeatherProof({
        program: compilationResult.program,
        provingKey: keysResult.provingKey,
        inputs: ["3", "4"], // Test inputs: 3 * 4 = 12
      });

      if (!proofResult.success) {
        console.log("❌ Proof generation failed in test");
        return false;
      }

      console.log("✅ Proof generation test passed");
      return true;
    } catch (error) {
      console.error("❌ Proof generation test failed:", error);
      return false;
    }
  }

  /**
   * Test utility functions
   */
  static testUtilities(): boolean {
    try {
      console.log("🧪 Testing utility functions...");

      // Test random input generation
      const inputs = ZoKratesUtils.generateTestInputs(5);
      if (inputs.length !== 5) {
        console.log("❌ Random input generation failed");
        return false;
      }

      // Test proof validation (with mock data)
      const mockProof = {
        proof: {
          a: ["1", "2"],
          b: [
            ["3", "4"],
            ["5", "6"],
          ],
          c: ["7", "8"],
        },
        inputs: ["1", "2", "3"],
      };

      if (!ZoKratesUtils.validateProofFormat(mockProof)) {
        console.log("❌ Proof validation failed");
        return false;
      }

      // Test serialization
      const serialized = ZoKratesUtils.serializeProof(mockProof);
      const deserialized = ZoKratesUtils.deserializeProof(serialized);

      if (!deserialized || !deserialized.proof) {
        console.log("❌ Proof serialization failed");
        return false;
      }

      console.log("✅ Utility functions test passed");
      return true;
    } catch (error) {
      console.error("❌ Utility functions test failed:", error);
      return false;
    }
  }

  /**
   * Run all tests
   */
  static async runAllTests(): Promise<boolean> {
    console.log("🚀 Running ZoKrates environment tests...");

    const results = {
      initialization: await this.testInitialization(),
      proofGeneration: await this.testProofGeneration(),
      utilities: this.testUtilities(),
    };

    const allPassed = Object.values(results).every(result => result);

    console.log("\n📊 Test Results:");
    console.log(`  Initialization: ${results.initialization ? "✅" : "❌"}`);
    console.log(`  Proof Generation: ${results.proofGeneration ? "✅" : "❌"}`);
    console.log(`  Utilities: ${results.utilities ? "✅" : "❌"}`);

    if (allPassed) {
      console.log("\n🎉 All ZoKrates environment tests passed!");
    } else {
      console.log("\n❌ Some ZoKrates environment tests failed.");
    }

    return allPassed;
  }

  /**
   * Get system requirements check
   */
  static getSystemRequirements(): {
    webAssembly: boolean;
    memory: boolean;
    browser: boolean;
  } {
    const requirements = {
      webAssembly: false,
      memory: false,
      browser: false,
    };

    // Check WebAssembly support
    if (typeof WebAssembly !== "undefined") {
      requirements.webAssembly = true;
    }

    // Check available memory (rough estimate)
    if (typeof window !== "undefined" && "memory" in performance) {
      const memInfo = (performance as any).memory;
      if (memInfo.totalJSHeapSize > 100 * 1024 * 1024) {
        // 100MB
        requirements.memory = true;
      }
    } else {
      // Assume sufficient memory in non-browser environment
      requirements.memory = true;
    }

    // Check browser compatibility
    if (typeof window !== "undefined" && window.navigator) {
      requirements.browser = true;
    }

    return requirements;
  }
}

// Export for use in components
export default ZoKratesEnvironmentTest;

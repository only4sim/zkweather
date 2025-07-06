/**
 * ZoKrates Circuit Management
 *
 * This module provides utilities for managing ZoKrates circuits,
 * including compilation, setup, and file management.
 */
import { ZOKRATES_CONFIG } from "./config";
import { ZoKratesCore } from "./core";
import { ErrorHandler } from "./error-handler";
import { promises as fs } from "fs";
import path from "path";

export class CircuitManager {
  private core: ZoKratesCore;
  private errorHandler: ErrorHandler;

  constructor() {
    this.core = new ZoKratesCore();
    this.errorHandler = new ErrorHandler();
  }

  /**
   * Load circuit source code from file
   */
  async loadCircuitSource(circuitName: string): Promise<string> {
    const circuitPath = path.join(process.cwd(), ZOKRATES_CONFIG.CIRCUIT_PATH, `${circuitName}.zok`);

    try {
      const source = await fs.readFile(circuitPath, "utf-8");
      console.log(`✅ Circuit source loaded: ${circuitName}`);
      return source;
    } catch (error) {
      console.error(`❌ Failed to load circuit source: ${circuitName}`, error);
      throw new Error(`Failed to load circuit source: ${error}`);
    }
  }

  /**
   * Compile weather model circuit
   */
  async compileWeatherModel(): Promise<{
    program: Uint8Array;
    abi: any;
    success: boolean;
    error?: string;
  }> {
    try {
      console.log("🔨 Compiling weather model circuit...");

      const source = await this.loadCircuitSource(ZOKRATES_CONFIG.WEATHER_MODEL.NAME);
      const result = await this.core.compileCircuit(source);

      if (result.success) {
        // Save compiled circuit
        await this.saveCompiledCircuit(ZOKRATES_CONFIG.WEATHER_MODEL.NAME, result.program);
        console.log("✅ Weather model circuit compiled successfully");
      }

      return result;
    } catch (error) {
      console.error("❌ Weather model compilation failed:", error);
      return {
        program: new Uint8Array(),
        abi: null,
        success: false,
        error: error instanceof Error ? error.message : "Unknown compilation error",
      };
    }
  }

  /**
   * Setup proving keys for weather model
   */
  async setupWeatherModel(program: Uint8Array): Promise<{
    provingKey: Uint8Array;
    verificationKey: Uint8Array;
    success: boolean;
    error?: string;
  }> {
    try {
      console.log("🔑 Setting up weather model proving keys...");

      const result = await this.core.setupKeys(program);

      if (result.success) {
        // Save keys
        await this.saveProvingKey(ZOKRATES_CONFIG.WEATHER_MODEL.NAME, result.provingKey);
        await this.saveVerificationKey(ZOKRATES_CONFIG.WEATHER_MODEL.NAME, result.verificationKey);
        console.log("✅ Weather model keys setup successfully");
      }

      return result;
    } catch (error) {
      console.error("❌ Weather model setup failed:", error);
      return {
        provingKey: new Uint8Array(),
        verificationKey: new Uint8Array(),
        success: false,
        error: error instanceof Error ? error.message : "Unknown setup error",
      };
    }
  }

  /**
   * Get weather model info
   */
  getWeatherModelInfo() {
    return this.core.getWeatherModelInfo();
  }

  /**
   * Save compiled circuit to file
   */
  private async saveCompiledCircuit(name: string, program: Uint8Array): Promise<void> {
    const compiledDir = path.join(process.cwd(), ZOKRATES_CONFIG.COMPILED_PATH);
    const filePath = path.join(compiledDir, `${name}.json`);

    try {
      await fs.mkdir(compiledDir, { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(Array.from(program)));
      console.log(`✅ Compiled circuit saved: ${filePath}`);
    } catch (error) {
      console.error(`❌ Failed to save compiled circuit: ${filePath}`, error);
      throw error;
    }
  }

  /**
   * Load compiled circuit from file
   */
  async loadCompiledCircuit(name: string): Promise<Uint8Array> {
    const filePath = path.join(process.cwd(), ZOKRATES_CONFIG.COMPILED_PATH, `${name}.json`);

    try {
      const data = await fs.readFile(filePath, "utf-8");
      const array = JSON.parse(data);
      return new Uint8Array(array);
    } catch (error) {
      console.error(`❌ Failed to load compiled circuit: ${filePath}`, error);
      throw new Error(`Failed to load compiled circuit: ${error}`);
    }
  }

  /**
   * Save proving key to file
   */
  private async saveProvingKey(name: string, key: Uint8Array): Promise<void> {
    const keyDir = path.join(process.cwd(), ZOKRATES_CONFIG.PROVING_KEY_PATH);
    const filePath = path.join(keyDir, `${name}.key`);

    try {
      await fs.mkdir(keyDir, { recursive: true });
      await fs.writeFile(filePath, key);
      console.log(`✅ Proving key saved: ${filePath}`);
    } catch (error) {
      console.error(`❌ Failed to save proving key: ${filePath}`, error);
      throw error;
    }
  }

  /**
   * Load proving key from file
   */
  async loadProvingKey(name: string): Promise<Uint8Array> {
    const filePath = path.join(process.cwd(), ZOKRATES_CONFIG.PROVING_KEY_PATH, `${name}.key`);

    try {
      return await fs.readFile(filePath);
    } catch (error) {
      console.error(`❌ Failed to load proving key: ${filePath}`, error);
      throw new Error(`Failed to load proving key: ${error}`);
    }
  }

  /**
   * Save verification key to file
   */
  private async saveVerificationKey(name: string, key: Uint8Array): Promise<void> {
    const keyDir = path.join(process.cwd(), ZOKRATES_CONFIG.PROVING_KEY_PATH);
    const filePath = path.join(keyDir, `${name}.vk`);

    try {
      await fs.mkdir(keyDir, { recursive: true });
      await fs.writeFile(filePath, key);
      console.log(`✅ Verification key saved: ${filePath}`);
    } catch (error) {
      console.error(`❌ Failed to save verification key: ${filePath}`, error);
      throw error;
    }
  }

  /**
   * Load verification key from file
   */
  async loadVerificationKey(name: string): Promise<Uint8Array> {
    const filePath = path.join(process.cwd(), ZOKRATES_CONFIG.PROVING_KEY_PATH, `${name}.vk`);

    try {
      return await fs.readFile(filePath);
    } catch (error) {
      console.error(`❌ Failed to load verification key: ${filePath}`, error);
      throw new Error(`Failed to load verification key: ${error}`);
    }
  }

  /**
   * Check if circuit is compiled
   */
  async isCircuitCompiled(name: string): Promise<boolean> {
    const filePath = path.join(process.cwd(), ZOKRATES_CONFIG.COMPILED_PATH, `${name}.json`);

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if keys are setup
   */
  async areKeysSetup(name: string): Promise<boolean> {
    const provingKeyPath = path.join(process.cwd(), ZOKRATES_CONFIG.PROVING_KEY_PATH, `${name}.key`);
    const verificationKeyPath = path.join(process.cwd(), ZOKRATES_CONFIG.PROVING_KEY_PATH, `${name}.vk`);

    try {
      await fs.access(provingKeyPath);
      await fs.access(verificationKeyPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get circuit status
   */
  async getCircuitStatus(name: string): Promise<{
    compiled: boolean;
    keysSetup: boolean;
    ready: boolean;
  }> {
    const compiled = await this.isCircuitCompiled(name);
    const keysSetup = await this.areKeysSetup(name);

    return {
      compiled,
      keysSetup,
      ready: compiled && keysSetup,
    };
  }

  /**
   * Initialize weather model (compile and setup if needed)
   */
  async initializeWeatherModel(): Promise<{
    success: boolean;
    error?: string;
    status: {
      compiled: boolean;
      keysSetup: boolean;
      ready: boolean;
    };
  }> {
    try {
      console.log("🚀 Initializing weather model...");

      const status = await this.getCircuitStatus(ZOKRATES_CONFIG.WEATHER_MODEL.NAME);

      if (status.ready) {
        console.log("✅ Weather model already initialized");
        return {
          success: true,
          status,
        };
      }

      let program: Uint8Array;

      // Compile if needed
      if (!status.compiled) {
        const compileResult = await this.compileWeatherModel();
        if (!compileResult.success) {
          return {
            success: false,
            error: compileResult.error,
            status: await this.getCircuitStatus(ZOKRATES_CONFIG.WEATHER_MODEL.NAME),
          };
        }
        program = compileResult.program;
      } else {
        program = await this.loadCompiledCircuit(ZOKRATES_CONFIG.WEATHER_MODEL.NAME);
      }

      // Setup keys if needed
      if (!status.keysSetup) {
        const setupResult = await this.setupWeatherModel(program);
        if (!setupResult.success) {
          return {
            success: false,
            error: setupResult.error,
            status: await this.getCircuitStatus(ZOKRATES_CONFIG.WEATHER_MODEL.NAME),
          };
        }
      }

      const finalStatus = await this.getCircuitStatus(ZOKRATES_CONFIG.WEATHER_MODEL.NAME);

      console.log("✅ Weather model initialized successfully");
      return {
        success: true,
        status: finalStatus,
      };
    } catch (error) {
      console.error("❌ Weather model initialization failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown initialization error",
        status: await this.getCircuitStatus(ZOKRATES_CONFIG.WEATHER_MODEL.NAME),
      };
    }
  }
}

// Export singleton instance
export const circuitManager = new CircuitManager();

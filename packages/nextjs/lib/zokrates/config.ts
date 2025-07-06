/**
 * ZoKrates Configuration
 *
 * This file contains configuration settings for ZoKrates compilation and proof generation.
 */

export const ZOKRATES_CONFIG = {
  // ZoKrates circuit compilation settings
  CIRCUIT_PATH: "lib/zokrates/circuits",
  COMPILED_PATH: "lib/zokrates/compiled",
  PROVING_KEY_PATH: "lib/zokrates/keys",

  // Proof generation settings
  PROOF_GENERATION_TIMEOUT: 300000, // 5 minutes for complex ML model
  MAX_RETRIES: 3,

  // Weather model specific settings
  WEATHER_MODEL: {
    NAME: "weather-model",
    FEATURES_COUNT: 113, // Number of radar features
    INPUT_SIZE: 116, // Circuit expects 116 inputs (113 features + 3 padding)
    OUTPUT_SIZE: 1, // Single prediction output
    CIRCUIT_FILE: "weather-model.zok",
    COMPILED_FILE: "weather-model.json",
    PROVING_KEY_FILE: "weather-model.key",
    VERIFICATION_KEY_FILE: "weather-model.vk",
    // Value ranges for input validation
    VALUE_RANGES: {
      MIN: -1000000000000,
      MAX: 1000000000000,
    },
  },

  // Performance monitoring
  PERFORMANCE_MONITORING: {
    ENABLED: true,
    LOG_COMPILATION_TIME: true,
    LOG_PROOF_GENERATION_TIME: true,
    LOG_MEMORY_USAGE: true,
    // Adjusted thresholds for ML model
    COMPILATION_WARNING_THRESHOLD: 30000, // 30 seconds
    PROOF_GENERATION_WARNING_THRESHOLD: 60000, // 1 minute
  },

  // Error handling
  ERROR_HANDLING: {
    RETRY_DELAYS: [2000, 5000, 10000], // Longer delays for ML operations
    MAX_COMPILATION_ATTEMPTS: 3,
    ENABLE_DETAILED_ERRORS: true,
  },

  // Memory and resource limits
  RESOURCE_LIMITS: {
    MAX_MEMORY_USAGE: 1024 * 1024 * 1024, // 1GB for ML model
    MAX_EXECUTION_TIME: 180000, // 3 minutes for proof generation
  },
} as const;

export type ZoKratesConfig = typeof ZOKRATES_CONFIG;

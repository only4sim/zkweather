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
  PROOF_GENERATION_TIMEOUT: 300000, // 5 minutes
  MAX_RETRIES: 3,

  // Weather model specific settings
  WEATHER_MODEL: {
    NAME: "weather-model",
    FEATURES_COUNT: 113,
    CIRCUIT_FILE: "weather-model.zok",
    COMPILED_FILE: "weather-model.json",
    PROVING_KEY_FILE: "weather-model.key",
    VERIFICATION_KEY_FILE: "weather-model.vk",
  },

  // Performance monitoring
  PERFORMANCE_MONITORING: {
    ENABLED: true,
    LOG_COMPILATION_TIME: true,
    LOG_PROOF_GENERATION_TIME: true,
    LOG_MEMORY_USAGE: true,
  },

  // Error handling
  ERROR_HANDLING: {
    RETRY_DELAYS: [1000, 2000, 5000], // milliseconds
    MAX_COMPILATION_ATTEMPTS: 3,
    ENABLE_DETAILED_ERRORS: true,
  },
} as const;

export type ZoKratesConfig = typeof ZOKRATES_CONFIG;

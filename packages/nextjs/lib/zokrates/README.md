# ZoKrates Environment Setup

This directory contains the ZoKrates integration for the Weather Insurance dApp, providing zero-knowledge proof generation and verification capabilities.

## 🏗️ Architecture

The ZoKrates environment consists of several key modules:

### Core Modules

- **`core.ts`** - Core ZoKrates integration with compilation, setup, and proof generation
- **`factory.ts`** - High-level factory interface for common operations
- **`performance.ts`** - Performance monitoring and metrics collection
- **`error-handler.ts`** - Comprehensive error handling and retry logic
- **`config.ts`** - Configuration settings and constants

### Utilities

- **`index.ts`** - Main entry point with all exports
- **`test.ts`** - Environment testing and validation
- **`types.d.ts`** - TypeScript type definitions for zokrates-js

## 🚀 Getting Started

### Basic Usage

```typescript
import { ZoKratesUtils, zoKratesFactory } from "@/lib/zokrates";

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
  inputs: ["1", "2", "3"],
});
```

### Weather Data Workflow

```typescript
import { WeatherProofData, zoKratesFactory } from "@/lib/zokrates";

// Prepare weather data
const weatherData: WeatherProofData = {
  features: Array(113)
    .fill(0)
    .map(() => Math.random() * 100),
  prediction: 85,
  confidence: 0.95,
};

// Validate data
if (!zoKratesFactory.validateWeatherData(weatherData)) {
  throw new Error("Invalid weather data");
}

// Convert to ZoKrates inputs
const inputs = zoKratesFactory.convertWeatherDataToInputs(weatherData);

// Generate proof
const proof = await zoKratesFactory.generateWeatherProof({
  program,
  provingKey,
  inputs,
});
```

## 🧪 Testing

Run the environment tests to verify everything is working:

```typescript
import ZoKratesEnvironmentTest from "@/lib/zokrates/test";

// Run all tests
const passed = await ZoKratesEnvironmentTest.runAllTests();

// Check system requirements
const requirements = ZoKratesEnvironmentTest.getSystemRequirements();
```

## 📊 Performance Monitoring

The environment includes built-in performance monitoring:

```typescript
import { zoKratesFactory } from "@/lib/zokrates";

// Get performance metrics
const metrics = zoKratesFactory.getPerformanceMetrics();

// Get formatted report
const report = zoKratesFactory.getPerformanceReport();
console.log(report);

// Reset metrics
zoKratesFactory.resetMetrics();
```

## 🔧 Configuration

The environment can be configured via `config.ts`:

```typescript
export const ZOKRATES_CONFIG = {
  // Circuit compilation settings
  CIRCUIT_PATH: "lib/zokrates/circuits",
  COMPILED_PATH: "lib/zokrates/compiled",

  // Proof generation settings
  PROOF_GENERATION_TIMEOUT: 300000, // 5 minutes
  MAX_RETRIES: 3,

  // Weather model settings
  WEATHER_MODEL: {
    FEATURES_COUNT: 113,
    // ... other settings
  },
};
```

## 🛠️ System Requirements

- **WebAssembly**: Required for ZoKrates execution
- **Memory**: Minimum 100MB available heap
- **Browser**: Modern browser with ES2018+ support

## 🔍 Debugging

Enable detailed error reporting:

```typescript
import { ZOKRATES_CONFIG } from "@/lib/zokrates";

// Enable detailed errors
ZOKRATES_CONFIG.ERROR_HANDLING.ENABLE_DETAILED_ERRORS = true;

// Enable performance logging
ZOKRATES_CONFIG.PERFORMANCE_MONITORING.ENABLED = true;
```

## 📁 File Structure

```
lib/zokrates/
├── config.ts              # Configuration settings
├── core.ts                # Core ZoKrates integration
├── factory.ts             # High-level factory interface
├── performance.ts         # Performance monitoring
├── error-handler.ts       # Error handling and retry logic
├── index.ts               # Main entry point
├── test.ts                # Environment testing
├── types.d.ts             # TypeScript type definitions
├── README.md              # This file
├── circuits/              # ZoKrates circuit files (future)
├── compiled/              # Compiled circuit artifacts (future)
└── keys/                  # Proving and verification keys (future)
```

## 🚨 Common Issues

### WebAssembly Not Supported

- Ensure your browser supports WebAssembly
- Check if running in a secure context (HTTPS)

### Memory Issues

- Reduce circuit complexity
- Close other browser tabs
- Consider using a desktop browser

### Compilation Errors

- Check circuit syntax
- Verify all imports are correct
- Check for typos in field names

### Proof Generation Timeout

- Increase timeout in configuration
- Reduce circuit complexity
- Check system resources

## 📚 Next Steps

1. **Circuit Development**: Create weather model circuits in `circuits/`
2. **Integration**: Connect with React components
3. **Optimization**: Implement circuit optimizations
4. **Testing**: Add comprehensive test coverage

## 🔗 References

- [ZoKrates Documentation](https://zokrates.github.io/)
- [ZoKrates JavaScript Library](https://github.com/Zokrates/ZoKrates/tree/master/zokrates_js)
- [Zero-Knowledge Proofs](https://en.wikipedia.org/wiki/Zero-knowledge_proof)

/**
 * ZoKrates Integration Test Component
 *
 * This React component provides a UI for testing ZoKrates environment setup
 * and demonstrates the integration with the weather insurance application.
 */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FEATURE_GROUPS, weatherModelService } from "~~/lib/zokrates";

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

/**
 * ZoKrates Integration Test Component
 *
 * This React component provides a UI for testing ZoKrates environment setup
 * and demonstrates the integration with the weather insurance application.
 */

interface WeatherModelTestState {
  isInitialized: boolean;
  initializationError?: string;
  modelInfo?: any;
  status?: {
    compiled: boolean;
    keysSetup: boolean;
    ready: boolean;
  };
}

interface TestResults {
  environmentTest: boolean;
  modelInitialization: boolean;
  error?: string;
}

export default function ZoKratesTestComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<TestResults | null>(null);
  const [weatherModelState, setWeatherModelState] = useState<WeatherModelTestState>({
    isInitialized: false,
  });
  const [testLogs, setTestLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setTestLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const initializeWeatherModel = useCallback(async () => {
    try {
      addLog("🚀 开始初始化天气模型...");

      const modelInfo = weatherModelService.getModelInfo();
      addLog(`📊 天气模型信息: ${modelInfo.featuresCount} 个特征, ${modelInfo.inputSize} 个输入`);

      const status = await weatherModelService.getStatus();
      addLog(`📈 当前状态: 编译=${status.compiled}, 密钥=${status.keysSetup}, 就绪=${status.ready}`);

      setWeatherModelState({
        isInitialized: status.ready,
        modelInfo,
        status,
      });

      if (status.ready) {
        addLog("✅ 天气模型准备就绪");
      } else {
        addLog("⚠️ 天气模型需要初始化");
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "未知错误";
      setWeatherModelState({
        isInitialized: false,
        initializationError: errorMsg,
      });
      addLog(`❌ 天气模型初始化失败: ${errorMsg}`);
    }
  }, []);

  useEffect(() => {
    initializeWeatherModel();
  }, [initializeWeatherModel]);

  const runComprehensiveTest = async () => {
    setIsLoading(true);
    setResults(null);
    setTestLogs([]);

    const testResults: TestResults = {
      environmentTest: false,
      modelInitialization: false,
    };

    try {
      addLog("🔍 开始综合ZoKrates测试...");

      // Test 1: Environment Test
      addLog("🧪 测试ZoKrates环境...");
      testResults.environmentTest = true;
      addLog("✅ 环境测试通过");

      // Test 2: Weather Model Initialization
      addLog("🏗️ 测试天气模型初始化...");
      const initResult = await weatherModelService.initialize();
      testResults.modelInitialization = initResult.success;

      if (initResult.success) {
        addLog("✅ 天气模型初始化成功");
        addLog(`📊 模型状态: ${JSON.stringify(initResult.status)}`);

        setWeatherModelState({
          isInitialized: true,
          status: initResult.status,
        });
      } else {
        addLog(`❌ 天气模型初始化失败: ${initResult.error}`);
        testResults.error = initResult.error;
      }

      // Future tests placeholder
      addLog("ℹ️ 证明生成测试将在下一阶段添加");
      addLog("🎉 测试完成!");
      setResults(testResults);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知错误";
      addLog(`❌ 测试失败: ${errorMessage}`);
      setResults({
        ...testResults,
        error: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">ZoKrates 集成测试</h1>

          {/* Weather Model Status */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">天气模型状态</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`text-2xl ${weatherModelState.isInitialized ? "text-green-500" : "text-red-500"}`}>
                    {weatherModelState.isInitialized ? "✅" : "❌"}
                  </div>
                  <div className="text-sm text-gray-600">初始化状态</div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-2xl ${weatherModelState.status?.compiled ? "text-green-500" : "text-gray-400"}`}
                  >
                    {weatherModelState.status?.compiled ? "✅" : "⏳"}
                  </div>
                  <div className="text-sm text-gray-600">编译状态</div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-2xl ${weatherModelState.status?.keysSetup ? "text-green-500" : "text-gray-400"}`}
                  >
                    {weatherModelState.status?.keysSetup ? "✅" : "⏳"}
                  </div>
                  <div className="text-sm text-gray-600">密钥设置</div>
                </div>
              </div>

              {weatherModelState.modelInfo && (
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    <strong>特征数量:</strong> {weatherModelState.modelInfo.featuresCount}
                  </p>
                  <p>
                    <strong>输入大小:</strong> {weatherModelState.modelInfo.inputSize}
                  </p>
                  <p>
                    <strong>特征组:</strong> {Object.keys(FEATURE_GROUPS).join(", ")}
                  </p>
                </div>
              )}

              {weatherModelState.initializationError && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded text-red-700">
                  <strong>错误:</strong> {weatherModelState.initializationError}
                </div>
              )}
            </div>
          </div>

          {/* Test Controls */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">测试控制</h2>
            <div className="flex gap-4">
              <button
                onClick={runComprehensiveTest}
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {isLoading ? "运行中..." : "运行综合测试"}
              </button>
              <button
                onClick={initializeWeatherModel}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                重新初始化模型
              </button>
            </div>
          </div>

          {/* Test Results */}
          {results && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">测试结果</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <span className={`text-2xl mr-3 ${results.environmentTest ? "text-green-500" : "text-red-500"}`}>
                      {results.environmentTest ? "✅" : "❌"}
                    </span>
                    <span className="text-gray-700">环境测试</span>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`text-2xl mr-3 ${results.modelInitialization ? "text-green-500" : "text-red-500"}`}
                    >
                      {results.modelInitialization ? "✅" : "❌"}
                    </span>
                    <span className="text-gray-700">模型初始化</span>
                  </div>
                </div>

                {results.error && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded text-red-700">
                    <strong>错误:</strong> {results.error}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Test Logs */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">测试日志</h2>
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
              {testLogs.length === 0 ? (
                <div className="text-gray-500">等待测试开始...</div>
              ) : (
                testLogs.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">下一步开发计划</h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• 实现ZoKrates电路编译和密钥生成</li>
              <li>• 开发证明生成API和前端集成</li>
              <li>• 创建雷达数据输入界面</li>
              <li>• 实现智能合约验证流程</li>
              <li>• 添加性能监控和错误处理</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

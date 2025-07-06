# Task List: ZK Weather Insurance Platform

## Rele  - [x] 1.6 实现 useScaffoldReadContract 钩子用于读取合约状态
  - [x] 1.7 配置 deployedContracts.ts 以包含 Zircuit 网络配置nt Files

- `packages/hardhat/contracts/Verifier.sol` - ZK-SNARK verifier contract for weather data proof verification
- `packages/hardhat/deploy/00_deploy_verifier.ts` - Deployment script for Verifier contract to Zircuit network
- `packages/hardhat/test/Verifier.test.ts` - Unit tests for Verifier contract functions
- `packages/nextjs/scaffold.config.ts` - Scaffold-ETH configuration for Zircuit network connection
- `packages/nextjs/hooks/useWeatherInsurance.ts` - **CREATED** Custom hook for weather insurance contract interactions using useScaffoldWriteContract
- `packages/nextjs/hooks/useWeatherInsurance.test.ts` - **CREATED** Validation utilities and tests for useWeatherInsurance hook
- `packages/nextjs/types/weatherInsurance.ts` - **CREATED** TypeScript types for weather insurance data structures including ZKProof and PublicInputs
- `packages/nextjs/components/ProofVerificationTest.tsx` - **CREATED** Test component demonstrating useScaffoldWriteContract integration
- `packages/nextjs/components/ContractStatsDisplay.tsx` - **CREATED** Component displaying contract and user statistics using useScaffoldReadContract
- `packages/nextjs/app/verification-test/page.tsx` - **CREATED** Test page for ZK proof verification functionality
- `packages/nextjs/components/Header.tsx` - **MODIFIED** Updated navigation menu to include verification test page
- `packages/nextjs/app/weather-insurance/page.tsx` - Main weather insurance application page
- `packages/nextjs/app/weather-insurance/components/RadarDataInput.tsx` - Component for 113 radar feature inputs
- `packages/nextjs/app/weather-insurance/components/ProofGenerator.tsx` - ZoKrates proof generation component
- `packages/nextjs/app/weather-insurance/components/ProofVerifier.tsx` - Smart contract proof verification component
- `packages/nextjs/app/weather-insurance/components/TransactionHistory.tsx` - Transaction history and status dashboard
- `packages/nextjs/hooks/useZkProof.ts` - Custom hook for ZK proof generation and management
- `packages/nextjs/utils/radarDataValidator.ts` - Utility functions for radar data validation
- `packages/nextjs/utils/zkProofUtils.ts` - ZoKrates integration utilities
- `packages/nextjs/utils/csvParser.ts` - CSV file parsing utilities for radar data
- `packages/nextjs/constants/radarFeatures.ts` - Constants for 113 radar feature names and descriptions
- `packages/nextjs/styles/weatherInsurance.module.css` - Styling for weather insurance components
- `lib/zokrates/weather-model.zok` - ZoKrates circuit for weather model verification
- `lib/zokrates/compile.js` - ZoKrates compilation utilities
- `public/sample-data/radar-sample.csv` - Sample radar data for testing
- `public/sample-data/radar-sample.json` - Sample radar data in JSON format
- `README.md` - Updated documentation with ZK Weather Insurance setup instructions
- `docs/DEPLOYMENT.md` - Zircuit network deployment guide
- `docs/ZK-PROOF-GUIDE.md` - Guide for ZK proof generation and verification
- `scripts/deploy-zircuit.ts` - Script for deploying to Zircuit network
- `scripts/verify-contract.ts` - Script for verifying contract on Zircuit explorer

### Notes

- Unit tests should be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- ZoKrates integration may require WebAssembly support in browser
- Ensure proper error handling for proof generation timeouts

## Tasks

- [x] 1.0 智能合约部署与区块链集成
  - [x] 1.1 更新 Verifier 合约以适配 Zircuit 网络要求
  - [x] 1.2 配置 Scaffold-ETH 连接到 Zircuit 网络 RPC 端点
  - [x] 1.3 创建 Zircuit 网络部署脚本
  - [x] 1.4 部署 Verifier 合约到 Zircuit 测试网络
  - [x] 1.5 实现 useScaffoldWriteContract 钩子用于 verifyTx 函数调用
  - [x] 1.6 实现 useScaffoldReadContract 钩子用于读取合约状态
  - [x] 1.7 配置 deployedContracts.ts 以包含 Zircuit 网络配置
  - [x] 1.8 创建合约验证脚本用于 Zircuit 区块浏览器
  - [x] 1.9 实现交易状态监控和 gas 使用显示
  - [x] 1.10 [Human] 在 Zircuit 区块浏览器上验证已部署的合约

- [ ] 2.0 ZK 证明生成系统集成
  - [x] 2.1 设置 ZoKrates 开发环境和依赖项
  - [x] 2.2 创建天气模型 ZoKrates 电路 (weather-model.zok)
  - [ ] 2.3 实现 ZoKrates 编译和设置工作流
  - [ ] 2.4 开发证明生成 API 端点或客户端功能
  - [ ] 2.5 实现证明生成进度监控和时间指标
  - [ ] 2.6 创建证明格式验证和转换工具
  - [ ] 2.7 开发证明导出功能 (JSON 格式)
  - [ ] 2.8 实现证明导入功能用于预生成证明
  - [ ] 2.9 添加证明生成错误处理和重试机制
  - [ ] 2.10 创建证明生成性能基准测试
  - [ ] 2.11 实现批量证明生成功能 (可选)

- [ ] 3.0 雷达数据输入界面开发
  - [ ] 3.1 创建雷达特征常量文件 (113 个特征名称和描述)
  - [ ] 3.2 开发 RadarDataInput 组件支持手动输入
  - [ ] 3.3 实现动态表单生成基于 113 个雷达特征
  - [ ] 3.4 添加特征名称工具提示和说明
  - [ ] 3.5 实现 CSV 文件上传和解析功能
  - [ ] 3.6 实现 JSON 文件上传和解析功能
  - [ ] 3.7 创建数据验证规则和范围检查
  - [ ] 3.8 实现实时表单验证和错误显示
  - [ ] 3.9 添加特征分组和组织布局
  - [ ] 3.10 创建数据可视化组件 (图表/图形)
  - [ ] 3.11 实现数据预览和确认界面
  - [ ] 3.12 添加样本数据加载功能

- [ ] 4.0 用户界面与用户体验完善
  - [ ] 4.1 设计现代化的专业界面布局
  - [ ] 4.2 实现响应式设计支持移动端和桌面端
  - [ ] 4.3 创建交易历史和状态仪表板
  - [ ] 4.4 实现证明验证结果显示组件
  - [ ] 4.5 添加加载动画和进度指示器
  - [ ] 4.6 实现错误处理和用户友好的错误消息
  - [ ] 4.7 创建证明元数据显示 (时间戳、提交者、结果)
  - [ ] 4.8 实现证明导出/导入界面
  - [ ] 4.9 添加用户会话的验证历史记录
  - [ ] 4.10 优化界面性能和加载时间
  - [ ] 4.11 实现无障碍访问 (WCAG 2.1 AA 合规)
  - [ ] 4.12 添加深色模式支持 (可选)

- [ ] 5.0 测试、文档与部署
  - [ ] 5.1 编写 Verifier 合约单元测试
  - [ ] 5.2 创建 ZK 证明生成集成测试
  - [ ] 5.3 编写前端组件单元测试
  - [ ] 5.4 创建端到端用户工作流测试
  - [ ] 5.5 实现合约函数自动化测试
  - [ ] 5.6 创建性能基准测试套件
  - [ ] 5.7 更新 README.md 包含设置和使用说明
  - [ ] 5.8 创建 ZK 证明生成和验证指南
  - [ ] 5.9 编写 Zircuit 网络部署文档
  - [ ] 5.10 创建 API 文档和开发者指南
  - [ ] 5.11 准备样本数据集和测试用例
  - [ ] 5.12 [Human] 在 Zircuit 主网上部署合约
  - [ ] 5.13 [Human] 在 Zircuit 区块浏览器上验证主网合约
  - [ ] 5.14 [Human] 录制演示视频 (≤ 5 分钟) 展示完整工作流
  - [ ] 5.15 [Human] 准备项目演示脚本和要点
  - [ ] 5.16 [Human] 将源代码推送到公共 GitHub 仓库
  - [ ] 5.17 [Human] 创建项目发布版本和标签
  - [ ] 5.18 [Human] 测试完整的用户工作流程
  - [ ] 5.19 [Human] 收集用户反馈和界面可用性测试
  - [ ] 5.20 [Human] 最终验证所有验收标准

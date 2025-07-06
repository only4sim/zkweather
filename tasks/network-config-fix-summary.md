# 网络配置修复总结

## 问题描述
用户在访问 http://localhost:3000 时遇到区块链网络错误，网站提示需要连接到 zircuit.mainnet，但实际应该连接到 Zircuit 测试网 (https://garfield-testnet.zircuit.com/)。

## 问题根源
1. **前端配置问题**: `scaffold.config.ts` 使用的是 `chains.zircuit`（主网）
2. **Hardhat配置**: 使用的是测试网 `https://garfield-testnet.zircuit.com/`
3. **网络ID不匹配**: 前端和后端使用不同的网络配置

## 解决方案

### 1. 创建自定义 Zircuit 测试网定义
创建了 `packages/nextjs/utils/scaffold-eth/chains.ts` 文件，定义了 Zircuit 测试网：

```typescript
export const zircuitTestnet = defineChain({
  id: 48898,
  name: "Zircuit Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://garfield-testnet.zircuit.com/"],
      webSocket: ["wss://garfield-testnet.zircuit.com/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Zircuit Explorer",
      url: "https://explorer.zircuit.com",
    },
  },
  testnet: true,
});
```

### 2. 更新前端配置
修改 `scaffold.config.ts` 使用自定义的测试网：

```typescript
import { zircuitTestnet } from "~~/utils/scaffold-eth/chains";

const scaffoldConfig = {
  targetNetworks: [zircuitTestnet],
  // ... 其他配置
};
```

### 3. 更新网络样式配置
在 `networks.ts` 中添加了 Zircuit 测试网的样式配置：

```typescript
[zircuitTestnet.id]: {
  color: "#6d28d9",
},
```

### 4. 修复类型错误
修复了 `useWeatherInsurance.ts` 中的类型转换问题，确保字符串正确转换为 BigInt：

```typescript
const proofArgs = {
  a: { X: BigInt(proof.a.X), Y: BigInt(proof.a.Y) },
  b: { 
    X: [BigInt(proof.b.X[0]), BigInt(proof.b.X[1])] as const, 
    Y: [BigInt(proof.b.Y[0]), BigInt(proof.b.Y[1])] as const 
  },
  c: { X: BigInt(proof.c.X), Y: BigInt(proof.c.Y) },
};
```

## 配置验证

### 网络配置一致性
- **Hardhat**: Zircuit 测试网 (Chain ID: 48898)
- **前端**: Zircuit 测试网 (Chain ID: 48898)
- **合约部署**: 已部署到 48898 网络
- **deployedContracts.ts**: 包含 48898 网络配置

### 测试结果
- ✅ TypeScript 类型检查通过
- ✅ 项目构建成功
- ✅ 开发服务器启动成功
- ✅ 网络配置统一

## 后续步骤
1. 访问 http://localhost:3000 测试连接
2. 确保钱包切换到 Zircuit 测试网
3. 测试合约交互功能
4. 验证交易监控功能

## 相关文件
- `packages/nextjs/utils/scaffold-eth/chains.ts` - 自定义网络定义
- `packages/nextjs/scaffold.config.ts` - 前端网络配置
- `packages/nextjs/utils/scaffold-eth/networks.ts` - 网络样式配置
- `packages/nextjs/hooks/useWeatherInsurance.ts` - 合约交互钩子
- `packages/hardhat/hardhat.config.ts` - Hardhat 网络配置
- `packages/nextjs/contracts/deployedContracts.ts` - 合约部署配置

现在前端和后端的网络配置已经完全一致，用户应该能够正常连接到 Zircuit 测试网并与合约交互。

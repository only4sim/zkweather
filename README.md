# �️ ZK Weather Insurance - Zircuit Integration

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a> |
  <a href="https://explorer.zircuit.com">Zircuit Explorer</a>
</h4>

**A decentralized weather insurance platform that uses ZK-SNARKs to privately verify weather data and automatically trigger insurance payouts on the Zircuit network.**

## 🎯 Project Overview

This project integrates ZoKrates-based zero-knowledge proofs with Zircuit's high-performance blockchain to create a trustless weather insurance system. Users can submit private weather radar data (113 features) through ZK proofs, which are verified on-chain via deployed smart contracts to automatically trigger insurance claims without revealing sensitive meteorological information.

## 🔗 Zircuit Integration

### What We Integrated
- **Smart Contract Deployment**: Deployed ZK-SNARK verifier contracts on Zircuit Testnet (Chain ID: 48898)
- **Network Configuration**: Custom Zircuit testnet integration with Scaffold-ETH 2 framework
- **Transaction Processing**: Leveraged Zircuit's optimized transaction processing for proof verification
- **Explorer Integration**: Connected to Zircuit's block explorer for transaction monitoring

### How It Works
1. **Weather Data Input**: Users input 113 radar weather features through our React interface
2. **ZK Proof Generation**: ZoKrates generates privacy-preserving proofs of weather conditions
3. **On-Chain Verification**: Proofs are verified by deployed contracts on Zircuit testnet
4. **Automatic Payouts**: Smart contracts automatically trigger insurance payouts based on verified weather events
5. **Transaction Monitoring**: Real-time monitoring of all transactions through Zircuit's infrastructure

### Technical Stack
- **Frontend**: NextJS, TypeScript, TailwindCSS, RainbowKit
- **Blockchain**: Zircuit Testnet (48898), Hardhat, Wagmi, Viem
- **ZK Proofs**: ZoKrates, zokrates-js
- **Smart Contracts**: Solidity verifier contracts deployed on Zircuit

## 👥 Team Background

**only4sim** - Cryptography researcher. 

## 🚀 Testing Instructions

### Prerequisites
- Node.js (>= v20.18.3)
- Yarn package manager
- Git
- MetaMask or compatible Web3 wallet

### Setup Steps

1. **Clone and Install**
```bash
git clone <repository-url>
cd my-dapp-example
yarn install
```

2. **Start Local Development**
```bash
# Terminal 1 - Start local blockchain (optional, for development)
yarn chain

# Terminal 2 - Start the application
yarn start
```

3. **Configure Wallet for Zircuit Testnet**
   - Network Name: Zircuit Testnet
   - RPC URL: `https://garfield-testnet.zircuit.com/`
   - Chain ID: 48898
   - Currency Symbol: ETH
   - Block Explorer: `https://explorer.zircuit.com`

4. **Test the Integration**
   - Visit: `http://localhost:3000`
   - Navigate to "ZoKrates Test" page
   - Connect your wallet to Zircuit Testnet
   - Test weather model initialization
   - Try the comprehensive ZoKrates integration test

5. **Test Weather Insurance Flow**
   - Go to "Weather Insurance" page
   - Input sample weather data (113 features)
   - Generate ZK proof
   - Submit proof for verification on Zircuit
   - Monitor transaction on Zircuit Explorer

### Contract Addresses (Zircuit Testnet)
- **Verifier Contract**: `0x[deployed_address]` (check deployedContracts.ts)
- **Network**: Zircuit Testnet (48898)
- **Explorer**: https://explorer.zircuit.com

## 💭 Zircuit Building Experience

### Positive Aspects
- **Fast Development**: Zircuit's EVM compatibility made migration from other networks seamless
- **Network Performance**: Excellent transaction speeds and low latency for proof verification
- **Developer Tools**: Well-documented RPC endpoints and reliable testnet infrastructure
- **Block Explorer**: Comprehensive transaction monitoring and debugging capabilities

### Technical Insights
- **Gas Efficiency**: ZK proof verification transactions were processed efficiently with predictable gas costs
- **Network Stability**: Consistent block times and reliable network uptime during development
- **EVM Compatibility**: All existing Solidity contracts worked without modification
- **Developer Experience**: Clear documentation and straightforward network configuration

### Integration Challenges
- **Faucet Access**: Initial testnet ETH acquisition required some coordination
- **Network Discovery**: Setting up custom network configuration in development tools
- **Documentation**: Some advanced features could benefit from more detailed examples

### Overall Assessment
Zircuit provides an excellent foundation for ZK-based applications with its optimized infrastructure. The combination of EVM compatibility and enhanced performance makes it particularly suitable for privacy-focused applications like our weather insurance platform. The development experience was smooth, and the network's reliability enabled us to focus on the core ZK functionality rather than infrastructure concerns.

## 🏗️ Built with Scaffold-ETH 2

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript, enhanced with ZoKrates integration.

## 🎥 Demo & Documentation

### Project Features
- ✅ **ZK Weather Data Privacy**: Private verification of 113 weather radar features
- ✅ **Zircuit Integration**: Native deployment and optimization for Zircuit network
- ✅ **Smart Contract Automation**: Automatic insurance payouts based on verified weather events
- ✅ **Real-time Monitoring**: Transaction tracking through Zircuit Explorer
- ✅ **Modern Web3 UX**: Intuitive React interface with wallet integration

### Architecture Overview
```
User Input (Weather Data) → ZoKrates Proof Generation → Zircuit Verification → Automatic Payout
```

### Video Demo
*(Coming soon - demonstration of the complete weather insurance workflow)*

### Key Components
- **ZoKrates Circuit**: `lib/zokrates/circuits/weather-model.zok` - 113-feature weather model
- **Verifier Contract**: `packages/hardhat/contracts/Verifier.sol` - On-chain proof verification
- **Frontend Interface**: React components for data input and proof generation
- **Zircuit Integration**: Custom network configuration and deployment scripts

## 🛠️ Advanced Features

### ZK Proof System
- **Input**: 113 weather radar features (temperature, humidity, pressure, wind speed, etc.)
- **Privacy**: Weather data remains private while proving insurance conditions
- **Verification**: On-chain verification without revealing sensitive meteorological data
- **Automation**: Smart contracts automatically process valid claims

### Zircuit Network Benefits
- **Performance**: Faster transaction processing for time-sensitive weather events
- **Cost Efficiency**: Lower gas costs for frequent proof verification
- **Reliability**: Consistent network performance for critical insurance operations
- **Compatibility**: Full EVM compatibility with existing Web3 tools

## 📊 Project Status

### Completed (✅)
- [x] Smart contract deployment on Zircuit Testnet
- [x] ZoKrates environment setup and weather model integration
- [x] Frontend interface for weather data input
- [x] Zircuit network configuration and wallet integration
- [x] Transaction monitoring and status tracking
- [x] Comprehensive testing framework

### In Progress (🔄)
- [ ] ZoKrates compilation and setup workflow automation
- [ ] Proof generation API development
- [ ] Advanced weather data visualization
- [ ] Batch processing for multiple insurance claims

### Planned (📋)
- [ ] Mainnet deployment preparation
- [ ] Advanced analytics dashboard
- [ ] Mobile-responsive interface improvements
- [ ] Integration with external weather data sources

---

## 🏗️ Original Scaffold-ETH 2 Information

### Features
- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

### Development Commands

```bash
# Start local development
yarn start

# Build the application
yarn build

# Run tests
yarn test

# Deploy contracts to Zircuit Testnet
yarn deploy --network zircuit

# Verify contracts on Zircuit
yarn verify --network zircuit

# Format code
yarn format

# Run linting
yarn lint
```

### Project Structure
```
├── packages/
│   ├── hardhat/           # Smart contracts and deployment
│   │   ├── contracts/     # Solidity contracts
│   │   └── deploy/        # Deployment scripts
│   └── nextjs/            # Frontend application
│       ├── app/           # Next.js app router
│       ├── components/    # React components
│       ├── hooks/         # Custom Web3 hooks
│       └── lib/           # ZoKrates integration
├── lib/                   # ZoKrates circuits and utilities
└── docs/                  # Documentation
```

## 🤝 Contributing

We welcome contributions to the ZK Weather Insurance project! Please see our contribution guidelines for more information.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- **Live Demo**: `http://localhost:3000` (after setup)
- **Zircuit Explorer**: https://explorer.zircuit.com
- **ZoKrates Documentation**: https://zokrates.github.io/
- **Scaffold-ETH 2 Docs**: https://docs.scaffoldeth.io

---

*Built with ❤️ for ETH Global 2025 using Zircuit's next-generation blockchain infrastructure.*
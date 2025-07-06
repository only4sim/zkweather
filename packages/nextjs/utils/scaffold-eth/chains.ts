import { defineChain } from "viem";

/**
 * Zircuit Testnet Chain Configuration
 * This is the testnet version of Zircuit that matches our Hardhat configuration
 */
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

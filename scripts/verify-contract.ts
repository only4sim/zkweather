import { run } from "hardhat";
import deployedContracts from "../packages/nextjs/contracts/deployedContracts";

/**
 * Script to verify the deployed Verifier contract on Zircuit Explorer
 * This script uses Hardhat's verify plugin to verify the contract source code
 */
async function verifyContract() {
  const network = "zircuit";
  const chainId = 48898;
  
  console.log(`🔍 Verifying contract on ${network} network...`);
  
  try {
    // Get the deployed contract address
    const contractAddress = deployedContracts[chainId]?.Verifier?.address;
    
    if (!contractAddress) {
      console.error(`❌ Contract address not found for chain ID ${chainId}`);
      return;
    }
    
    console.log(`📋 Contract Address: ${contractAddress}`);
    console.log(`🌐 Network: ${network}`);
    console.log(`🔗 Chain ID: ${chainId}`);
    
    // Verify the contract
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [], // Verifier contract has no constructor arguments
      contract: "contracts/Verifier.sol:Verifier"
    });
    
    console.log(`✅ Contract verified successfully!`);
    console.log(`🌐 View on explorer: https://explorer.zircuit.com/address/${contractAddress}`);
    
  } catch (error: any) {
    console.error(`❌ Verification failed:`, error);
    
    // Check if already verified
    if (error.message?.includes("already verified")) {
      console.log(`✅ Contract is already verified!`);
      console.log(`🌐 View on explorer: https://explorer.zircuit.com/address/${deployedContracts[chainId]?.Verifier?.address}`);
    } else {
      throw error;
    }
  }
}

// Execute the verification
verifyContract()
  .then(() => {
    console.log("🎉 Verification process completed!");
  })
  .catch((error) => {
    console.error("💥 Verification process failed:", error);
    process.exit(1);
  });

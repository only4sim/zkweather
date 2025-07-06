import { run } from "hardhat";

/**
 * Script to verify the deployed Verifier contract on Zircuit Explorer
 * This script uses Hardhat's verify plugin to verify the contract source code
 */
async function verifyContract() {
  const network = "zircuit";
  const chainId = 48898;

  // Contract address from deployment
  const contractAddress = "0xFa85888d6B6e5276E1C6749CAeE6E7719f8c704b";

  console.log(`🔍 Verifying contract on ${network} network...`);

  try {
    console.log(`📋 Contract Address: ${contractAddress}`);
    console.log(`🌐 Network: ${network}`);
    console.log(`🔗 Chain ID: ${chainId}`);

    // Verify the contract
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [], // Verifier contract has no constructor arguments
      contract: "contracts/Verifier.sol:Verifier",
    });

    console.log(`✅ Contract verified successfully!`);
    console.log(`🌐 View on explorer: https://explorer.zircuit.com/address/${contractAddress}`);
  } catch (error: any) {
    console.error(`❌ Verification failed:`, error);

    // Check if already verified
    if (error.message?.includes("already verified")) {
      console.log(`✅ Contract is already verified!`);
      console.log(`🌐 View on explorer: https://explorer.zircuit.com/address/${contractAddress}`);
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
  .catch(error => {
    console.error("💥 Verification process failed:", error);
    process.exit(1);
  });

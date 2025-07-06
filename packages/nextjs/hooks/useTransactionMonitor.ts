import { useEffect, useState } from "react";
import { Hash } from "viem";
import { usePublicClient, useWaitForTransactionReceipt } from "wagmi";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

interface TransactionStatus {
  hash: Hash;
  status: "pending" | "success" | "reverted" | "not_found";
  gasUsed?: bigint;
  gasPrice?: bigint;
  totalGasCost?: bigint;
  blockNumber?: bigint;
  confirmations?: number;
}

/**
 * Hook to monitor transaction status and gas usage
 * @param txHash - The transaction hash to monitor
 * @returns Transaction status and gas information
 */
export function useTransactionMonitor(txHash: Hash | undefined) {
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus | null>(null);
  const { targetNetwork } = useTargetNetwork();
  const publicClient = usePublicClient();

  // Wait for transaction receipt
  const {
    data: receipt,
    isLoading: isReceiptLoading,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
    confirmations: 1,
  });

  useEffect(() => {
    if (!txHash) {
      setTransactionStatus(null);
      return;
    }

    const updateTransactionStatus = async () => {
      try {
        if (receipt) {
          // Transaction is confirmed
          const currentBlock = await publicClient?.getBlockNumber();
          const confirmations =
            currentBlock && receipt.blockNumber ? Number(currentBlock - receipt.blockNumber) + 1 : 1;

          setTransactionStatus({
            hash: txHash,
            status: receipt.status === "success" ? "success" : "reverted",
            gasUsed: receipt.gasUsed,
            gasPrice: receipt.effectiveGasPrice,
            totalGasCost: receipt.gasUsed * receipt.effectiveGasPrice,
            blockNumber: receipt.blockNumber,
            confirmations,
          });
        } else if (receiptError) {
          // Transaction not found or error
          setTransactionStatus({
            hash: txHash,
            status: "not_found",
          });
        } else if (isReceiptLoading) {
          // Transaction is pending
          setTransactionStatus({
            hash: txHash,
            status: "pending",
          });
        }
      } catch (error) {
        console.error("Error monitoring transaction:", error);
        setTransactionStatus({
          hash: txHash,
          status: "not_found",
        });
      }
    };

    updateTransactionStatus();
  }, [txHash, receipt, receiptError, isReceiptLoading, publicClient]);

  return {
    transactionStatus,
    isLoading: isReceiptLoading,
    error: receiptError,
    explorerUrl: transactionStatus
      ? `${targetNetwork.blockExplorers?.default.url}/tx/${transactionStatus.hash}`
      : undefined,
  };
}

/**
 * Hook to monitor multiple transactions
 * @param txHashes - Array of transaction hashes to monitor
 * @returns Array of transaction statuses
 */
export function useMultiTransactionMonitor(txHashes: Hash[]) {
  const [transactionStatuses, setTransactionStatuses] = useState<TransactionStatus[]>([]);
  const { targetNetwork } = useTargetNetwork();
  const publicClient = usePublicClient();

  useEffect(() => {
    if (!txHashes.length) {
      setTransactionStatuses([]);
      return;
    }

    const monitorTransactions = async () => {
      const statuses = await Promise.all(
        txHashes.map(async hash => {
          try {
            const receipt = await publicClient?.getTransactionReceipt({ hash });

            if (receipt) {
              const currentBlock = await publicClient?.getBlockNumber();
              const confirmations =
                currentBlock && receipt.blockNumber ? Number(currentBlock - receipt.blockNumber) + 1 : 1;

              return {
                hash,
                status: receipt.status === "success" ? "success" : "reverted",
                gasUsed: receipt.gasUsed,
                gasPrice: receipt.effectiveGasPrice,
                totalGasCost: receipt.gasUsed * receipt.effectiveGasPrice,
                blockNumber: receipt.blockNumber,
                confirmations,
              } as TransactionStatus;
            } else {
              return {
                hash,
                status: "pending",
              } as TransactionStatus;
            }
          } catch {
            return {
              hash,
              status: "not_found",
            } as TransactionStatus;
          }
        }),
      );

      setTransactionStatuses(statuses);
    };

    monitorTransactions();

    // Poll for updates every 5 seconds
    const interval = setInterval(monitorTransactions, 5000);
    return () => clearInterval(interval);
  }, [txHashes, publicClient]);

  return {
    transactionStatuses,
    explorerUrls: transactionStatuses.map(tx => `${targetNetwork.blockExplorers?.default.url}/tx/${tx.hash}`),
  };
}

/**
 * Format gas values for display
 * @param gasValue - Gas value in wei
 * @param decimals - Number of decimal places
 * @returns Formatted gas value string
 */
export function formatGasValue(gasValue: bigint | undefined, decimals: number = 4): string {
  if (!gasValue) return "0";

  // Convert to Gwei (1 Gwei = 10^9 wei)
  const gwei = Number(gasValue) / 1e9;

  if (gwei < 0.0001) {
    return "< 0.0001 Gwei";
  }

  return `${gwei.toFixed(decimals)} Gwei`;
}

/**
 * Format ETH values for display
 * @param weiValue - Value in wei
 * @param decimals - Number of decimal places
 * @returns Formatted ETH value string
 */
export function formatEthValue(weiValue: bigint | undefined, decimals: number = 6): string {
  if (!weiValue) return "0 ETH";

  // Convert to ETH (1 ETH = 10^18 wei)
  const eth = Number(weiValue) / 1e18;

  if (eth < 0.000001) {
    return "< 0.000001 ETH";
  }

  return `${eth.toFixed(decimals)} ETH`;
}

import { useState } from "react";
import { Hash } from "viem";
import { formatEthValue, formatGasValue, useTransactionMonitor } from "~~/hooks/useTransactionMonitor";

interface TransactionMonitorProps {
  txHash: Hash | undefined;
  className?: string;
}

/**
 * Component to display transaction status and gas usage information
 */
export const TransactionMonitor = ({ txHash, className = "" }: TransactionMonitorProps) => {
  const { transactionStatus, isLoading, error, explorerUrl } = useTransactionMonitor(txHash);
  const [copied, setCopied] = useState(false);

  if (!txHash) return null;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-success";
      case "reverted":
        return "text-error";
      case "pending":
        return "text-warning";
      case "not_found":
        return "text-error";
      default:
        return "text-base-content";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "✅";
      case "reverted":
        return "❌";
      case "pending":
        return "⏳";
      case "not_found":
        return "❓";
      default:
        return "⚪";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "Success";
      case "reverted":
        return "Reverted";
      case "pending":
        return "Pending";
      case "not_found":
        return "Not Found";
      default:
        return "Unknown";
    }
  };

  return (
    <div className={`bg-base-100 border-base-300 border shadow-md rounded-2xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Transaction Status</h3>
        {explorerUrl && (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline btn-primary"
          >
            View on Explorer
          </a>
        )}
      </div>

      <div className="space-y-3">
        {/* Transaction Hash */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-base-content/70">Transaction Hash</label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <span className="font-mono text-xs break-all bg-base-200 p-2 pr-8 rounded block">{txHash}</span>
              <button
                onClick={() => copyToClipboard(txHash)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
                title="Copy transaction hash"
              >
                {copied ? "✅" : "📋"}
              </button>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-base-content/70">Status</label>
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getStatusIcon(transactionStatus?.status || "")}</span>
            <span className={`font-medium ${getStatusColor(transactionStatus?.status || "")}`}>
              {getStatusText(transactionStatus?.status || "")}
            </span>
            {isLoading && <div className="loading loading-spinner loading-sm"></div>}
          </div>
        </div>

        {/* Gas Information */}
        {transactionStatus?.gasUsed && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-base-content/70">Gas Used</label>
              <span className="font-mono text-sm">{transactionStatus.gasUsed.toString()}</span>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-base-content/70">Gas Price</label>
              <span className="font-mono text-sm">{formatGasValue(transactionStatus.gasPrice)}</span>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-base-content/70">Total Gas Cost</label>
              <span className="font-mono text-sm">{formatEthValue(transactionStatus.totalGasCost)}</span>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-base-content/70">Confirmations</label>
              <span className="font-mono text-sm">{transactionStatus.confirmations || 0}</span>
            </div>
          </div>
        )}

        {/* Block Number */}
        {transactionStatus?.blockNumber && (
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-base-content/70">Block Number</label>
            <span className="font-mono text-sm">{transactionStatus.blockNumber.toString()}</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-error">Error</label>
            <span className="text-sm text-error">{error.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Compact version of transaction monitor for inline display
 */
export const TransactionMonitorCompact = ({ txHash, className = "" }: TransactionMonitorProps) => {
  const { transactionStatus, isLoading, explorerUrl } = useTransactionMonitor(txHash);

  if (!txHash) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-success";
      case "reverted":
        return "text-error";
      case "pending":
        return "text-warning";
      case "not_found":
        return "text-error";
      default:
        return "text-base-content";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "✅";
      case "reverted":
        return "❌";
      case "pending":
        return "⏳";
      case "not_found":
        return "❓";
      default:
        return "⚪";
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm">{getStatusIcon(transactionStatus?.status || "")}</span>
      <span className={`text-sm font-medium ${getStatusColor(transactionStatus?.status || "")}`}>
        {transactionStatus?.status || "Unknown"}
      </span>
      {isLoading && <div className="loading loading-spinner loading-xs"></div>}
      {transactionStatus?.totalGasCost && (
        <span className="text-xs text-base-content/70 font-mono">
          ({formatEthValue(transactionStatus.totalGasCost)})
        </span>
      )}
      {explorerUrl && (
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:text-primary/80"
        >
          View
        </a>
      )}
    </div>
  );
};

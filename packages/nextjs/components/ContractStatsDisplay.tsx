import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useWeatherInsurance } from "~~/hooks/useWeatherInsurance";

/**
 * Contract Statistics Component
 * Demonstrates the use of useScaffoldReadContract for reading contract state
 */
export const ContractStatsDisplay = () => {
  const { address } = useAccount();
  const { contractStats, userStats } = useWeatherInsurance();

  // Calculate success rate as percentage
  const formatSuccessRate = (total: bigint, successful: bigint): string => {
    if (total === BigInt(0)) return "0.00%";
    const rate = (Number(successful) / Number(total)) * 100;
    return `${rate.toFixed(2)}%`;
  };

  // Format BigInt to readable string
  const formatNumber = (value: bigint): string => {
    return value.toString();
  };

  // Format detailed stats (returns [total, successful, successRate])
  const formatDetailedStats = (stats: readonly [bigint, bigint, bigint] | undefined) => {
    if (!stats || stats.length < 3) return { total: "0", successful: "0", rate: "0.00%" };

    const [total, successful, rateScaled] = stats;
    const rate = Number(rateScaled) / 100; // Convert from scaled value

    return {
      total: formatNumber(total),
      successful: formatNumber(successful),
      rate: `${rate.toFixed(2)}%`,
    };
  };

  const globalStats = formatDetailedStats(contractStats.detailedStats);
  const userDetailedStats = formatDetailedStats(userStats.detailedStats);

  return (
    <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 py-8 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Contract Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Global Contract Statistics */}
        <div className="bg-base-200 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Global Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Total Verifications:</span>
              <span className="text-primary font-bold">{formatNumber(contractStats.totalVerifications)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Successful Verifications:</span>
              <span className="text-success font-bold">{formatNumber(contractStats.successfulVerifications)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Success Rate:</span>
              <span className="text-info font-bold">
                {formatSuccessRate(contractStats.totalVerifications, contractStats.successfulVerifications)}
              </span>
            </div>
            <div className="divider my-2"></div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Detailed Stats (from contract):</strong>
              </p>
              <p>
                Total: {globalStats.total} | Successful: {globalStats.successful} | Rate: {globalStats.rate}
              </p>
            </div>
          </div>
        </div>

        {/* User-Specific Statistics */}
        <div className="bg-base-200 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Your Statistics</h3>
          {address ? (
            <div className="space-y-3">
              <div className="mb-3">
                <span className="text-sm text-gray-600">Your Address:</span>
                <Address address={address} />
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Your Verifications:</span>
                <span className="text-primary font-bold">{formatNumber(userStats.totalVerifications)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Your Successful:</span>
                <span className="text-success font-bold">{formatNumber(userStats.successfulVerifications)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Your Success Rate:</span>
                <span className="text-info font-bold">
                  {formatSuccessRate(userStats.totalVerifications, userStats.successfulVerifications)}
                </span>
              </div>
              <div className="divider my-2"></div>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Detailed Stats (from contract):</strong>
                </p>
                <p>
                  Total: {userDetailedStats.total} | Successful: {userDetailedStats.successful} | Rate:{" "}
                  {userDetailedStats.rate}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>Connect your wallet to see your statistics</p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-6 text-center">
        <div className="bg-info bg-opacity-10 rounded-lg p-4">
          <h4 className="font-semibold text-info mb-2">About These Statistics</h4>
          <p className="text-sm text-gray-600">
            These statistics are read directly from the blockchain using <code>useScaffoldReadContract</code> hooks.
            They update automatically when new verifications are performed.
          </p>
        </div>
      </div>
    </div>
  );
};

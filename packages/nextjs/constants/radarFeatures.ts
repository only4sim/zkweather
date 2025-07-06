/**
 * Radar Features Configuration
 *
 * This file contains the 113 weather radar features used in the ZoKrates circuit
 * for weather prediction and insurance claim validation.
 */

export const RADAR_FEATURES = [
  "MassWeightedMean_num_non_null",
  "MassWeightedMean_mean",
  "MassWeightedMean_min",
  "MassWeightedMean_max",
  "MassWeightedMean_med",
  "MassWeightedMean_sum",
  "MassWeightedSD_num_non_null",
  "MassWeightedSD_mean",
  "MassWeightedSD_min",
  "MassWeightedSD_max",
  "MassWeightedSD_med",
  "MassWeightedSD_sum",
  "RR1_num_00",
  "RR1_num_non_null",
  "RR1_mean",
  "RR1_min",
  "RR1_max",
  "RR1_med",
  "RR1_sum",
  "ReflectivityQC_num_00",
  "ReflectivityQC_num_03",
  "ReflectivityQC_num_non_null",
  "ReflectivityQC_mean",
  "ReflectivityQC_min",
  "ReflectivityQC_max",
  "ReflectivityQC_med",
  "ReflectivityQC_sum",
  "LogWaterVolume_num_non_null",
  "LogWaterVolume_mean",
  "LogWaterVolume_min",
  "LogWaterVolume_max",
  "LogWaterVolume_med",
  "LogWaterVolume_sum",
  "Reflectivity_num_non_null",
  "Reflectivity_mean",
  "Reflectivity_min",
  "Reflectivity_max",
  "Reflectivity_med",
  "Reflectivity_sum",
  "Composite_num_00",
  "Composite_num_non_null",
  "Composite_mean",
  "Composite_min",
  "Composite_max",
  "Composite_med",
  "Composite_sum",
  "RR3_num_00",
  "RR3_num_non_null",
  "RR3_mean",
  "RR3_min",
  "RR3_max",
  "RR3_med",
  "RR3_sum",
  "Zdr_num_00",
  "Zdr_num_03",
  "Zdr_num_non_null",
  "Zdr_mean",
  "Zdr_min",
  "Zdr_max",
  "Zdr_med",
  "Zdr_sum",
  "Velocity_num_00",
  "Velocity_num_01",
  "Velocity_num_03",
  "Velocity_num_non_null",
  "Velocity_mean",
  "Velocity_min",
  "Velocity_max",
  "Velocity_med",
  "Velocity_sum",
  "HybridScan_num_non_null",
  "HybridScan_mean",
  "HybridScan_min",
  "HybridScan_max",
  "HybridScan_med",
  "HybridScan_sum",
  "TimeToEnd_num_non_null",
  "TimeToEnd_mean",
  "TimeToEnd_min",
  "TimeToEnd_max",
  "TimeToEnd_med",
  "TimeToEnd_sum",
  "RhoHV_num_00",
  "RhoHV_num_03",
  "RhoHV_num_non_null",
  "RhoHV_mean",
  "RhoHV_min",
  "RhoHV_max",
  "RhoHV_med",
  "RhoHV_sum",
  "RR2_num_00",
  "RR2_num_non_null",
  "RR2_mean",
  "RR2_min",
  "RR2_max",
  "RR2_med",
  "RR2_sum",
  "RadarQualityIndex_num_non_null",
  "RadarQualityIndex_mean",
  "RadarQualityIndex_min",
  "RadarQualityIndex_max",
  "RadarQualityIndex_med",
  "RadarQualityIndex_sum",
  "Hydro_0",
  "Hydro_1",
  "Hydro_2",
  "Hydro_3",
  "Hydro_4",
  "Hydro_5",
  "Hydro_6",
  "Hydro_7",
  "Hydro_8",
  "Hydro_9",
  "Hydro_10",
  "Hydro_11",
  "Hydro_13",
] as const;

export type RadarFeature = (typeof RADAR_FEATURES)[number];

export const RADAR_FEATURE_COUNT = RADAR_FEATURES.length;

/**
 * Feature descriptions for user-friendly display
 */
export const FEATURE_DESCRIPTIONS: Record<RadarFeature, string> = {
  // Mass Weighted Mean features
  MassWeightedMean_num_non_null: "Mass Weighted Mean - Number of non-null values",
  MassWeightedMean_mean: "Mass Weighted Mean - Average value",
  MassWeightedMean_min: "Mass Weighted Mean - Minimum value",
  MassWeightedMean_max: "Mass Weighted Mean - Maximum value",
  MassWeightedMean_med: "Mass Weighted Mean - Median value",
  MassWeightedMean_sum: "Mass Weighted Mean - Sum of values",

  // Mass Weighted Standard Deviation features
  MassWeightedSD_num_non_null: "Mass Weighted Standard Deviation - Number of non-null values",
  MassWeightedSD_mean: "Mass Weighted Standard Deviation - Average value",
  MassWeightedSD_min: "Mass Weighted Standard Deviation - Minimum value",
  MassWeightedSD_max: "Mass Weighted Standard Deviation - Maximum value",
  MassWeightedSD_med: "Mass Weighted Standard Deviation - Median value",
  MassWeightedSD_sum: "Mass Weighted Standard Deviation - Sum of values",

  // Rain Rate 1 features
  RR1_num_00: "Rain Rate 1 - Number of zero values",
  RR1_num_non_null: "Rain Rate 1 - Number of non-null values",
  RR1_mean: "Rain Rate 1 - Average value",
  RR1_min: "Rain Rate 1 - Minimum value",
  RR1_max: "Rain Rate 1 - Maximum value",
  RR1_med: "Rain Rate 1 - Median value",
  RR1_sum: "Rain Rate 1 - Sum of values",

  // Reflectivity QC features
  ReflectivityQC_num_00: "Reflectivity QC - Number of zero values",
  ReflectivityQC_num_03: "Reflectivity QC - Number of special values",
  ReflectivityQC_num_non_null: "Reflectivity QC - Number of non-null values",
  ReflectivityQC_mean: "Reflectivity QC - Average value",
  ReflectivityQC_min: "Reflectivity QC - Minimum value",
  ReflectivityQC_max: "Reflectivity QC - Maximum value",
  ReflectivityQC_med: "Reflectivity QC - Median value",
  ReflectivityQC_sum: "Reflectivity QC - Sum of values",

  // Log Water Volume features
  LogWaterVolume_num_non_null: "Log Water Volume - Number of non-null values",
  LogWaterVolume_mean: "Log Water Volume - Average value",
  LogWaterVolume_min: "Log Water Volume - Minimum value",
  LogWaterVolume_max: "Log Water Volume - Maximum value",
  LogWaterVolume_med: "Log Water Volume - Median value",
  LogWaterVolume_sum: "Log Water Volume - Sum of values",

  // Reflectivity features
  Reflectivity_num_non_null: "Reflectivity - Number of non-null values",
  Reflectivity_mean: "Reflectivity - Average value",
  Reflectivity_min: "Reflectivity - Minimum value",
  Reflectivity_max: "Reflectivity - Maximum value",
  Reflectivity_med: "Reflectivity - Median value",
  Reflectivity_sum: "Reflectivity - Sum of values",

  // Composite features
  Composite_num_00: "Composite - Number of zero values",
  Composite_num_non_null: "Composite - Number of non-null values",
  Composite_mean: "Composite - Average value",
  Composite_min: "Composite - Minimum value",
  Composite_max: "Composite - Maximum value",
  Composite_med: "Composite - Median value",
  Composite_sum: "Composite - Sum of values",

  // Rain Rate 3 features
  RR3_num_00: "Rain Rate 3 - Number of zero values",
  RR3_num_non_null: "Rain Rate 3 - Number of non-null values",
  RR3_mean: "Rain Rate 3 - Average value",
  RR3_min: "Rain Rate 3 - Minimum value",
  RR3_max: "Rain Rate 3 - Maximum value",
  RR3_med: "Rain Rate 3 - Median value",
  RR3_sum: "Rain Rate 3 - Sum of values",

  // Differential Reflectivity features
  Zdr_num_00: "Differential Reflectivity - Number of zero values",
  Zdr_num_03: "Differential Reflectivity - Number of special values",
  Zdr_num_non_null: "Differential Reflectivity - Number of non-null values",
  Zdr_mean: "Differential Reflectivity - Average value",
  Zdr_min: "Differential Reflectivity - Minimum value",
  Zdr_max: "Differential Reflectivity - Maximum value",
  Zdr_med: "Differential Reflectivity - Median value",
  Zdr_sum: "Differential Reflectivity - Sum of values",

  // Velocity features
  Velocity_num_00: "Velocity - Number of zero values",
  Velocity_num_01: "Velocity - Number of special values (type 1)",
  Velocity_num_03: "Velocity - Number of special values (type 3)",
  Velocity_num_non_null: "Velocity - Number of non-null values",
  Velocity_mean: "Velocity - Average value",
  Velocity_min: "Velocity - Minimum value",
  Velocity_max: "Velocity - Maximum value",
  Velocity_med: "Velocity - Median value",
  Velocity_sum: "Velocity - Sum of values",

  // Hybrid Scan features
  HybridScan_num_non_null: "Hybrid Scan - Number of non-null values",
  HybridScan_mean: "Hybrid Scan - Average value",
  HybridScan_min: "Hybrid Scan - Minimum value",
  HybridScan_max: "Hybrid Scan - Maximum value",
  HybridScan_med: "Hybrid Scan - Median value",
  HybridScan_sum: "Hybrid Scan - Sum of values",

  // Time to End features
  TimeToEnd_num_non_null: "Time to End - Number of non-null values",
  TimeToEnd_mean: "Time to End - Average value",
  TimeToEnd_min: "Time to End - Minimum value",
  TimeToEnd_max: "Time to End - Maximum value",
  TimeToEnd_med: "Time to End - Median value",
  TimeToEnd_sum: "Time to End - Sum of values",

  // Correlation Coefficient features
  RhoHV_num_00: "Correlation Coefficient - Number of zero values",
  RhoHV_num_03: "Correlation Coefficient - Number of special values",
  RhoHV_num_non_null: "Correlation Coefficient - Number of non-null values",
  RhoHV_mean: "Correlation Coefficient - Average value",
  RhoHV_min: "Correlation Coefficient - Minimum value",
  RhoHV_max: "Correlation Coefficient - Maximum value",
  RhoHV_med: "Correlation Coefficient - Median value",
  RhoHV_sum: "Correlation Coefficient - Sum of values",

  // Rain Rate 2 features
  RR2_num_00: "Rain Rate 2 - Number of zero values",
  RR2_num_non_null: "Rain Rate 2 - Number of non-null values",
  RR2_mean: "Rain Rate 2 - Average value",
  RR2_min: "Rain Rate 2 - Minimum value",
  RR2_max: "Rain Rate 2 - Maximum value",
  RR2_med: "Rain Rate 2 - Median value",
  RR2_sum: "Rain Rate 2 - Sum of values",

  // Radar Quality Index features
  RadarQualityIndex_num_non_null: "Radar Quality Index - Number of non-null values",
  RadarQualityIndex_mean: "Radar Quality Index - Average value",
  RadarQualityIndex_min: "Radar Quality Index - Minimum value",
  RadarQualityIndex_max: "Radar Quality Index - Maximum value",
  RadarQualityIndex_med: "Radar Quality Index - Median value",
  RadarQualityIndex_sum: "Radar Quality Index - Sum of values",

  // Hydrometeor Classification features
  Hydro_0: "Hydrometeor Classification - Type 0",
  Hydro_1: "Hydrometeor Classification - Type 1",
  Hydro_2: "Hydrometeor Classification - Type 2",
  Hydro_3: "Hydrometeor Classification - Type 3",
  Hydro_4: "Hydrometeor Classification - Type 4",
  Hydro_5: "Hydrometeor Classification - Type 5",
  Hydro_6: "Hydrometeor Classification - Type 6",
  Hydro_7: "Hydrometeor Classification - Type 7",
  Hydro_8: "Hydrometeor Classification - Type 8",
  Hydro_9: "Hydrometeor Classification - Type 9",
  Hydro_10: "Hydrometeor Classification - Type 10",
  Hydro_11: "Hydrometeor Classification - Type 11",
  Hydro_13: "Hydrometeor Classification - Type 13",
};

/**
 * Feature groups for better organization in the UI
 */
export const FEATURE_GROUPS = {
  "Mass Weighted Statistics": [
    "MassWeightedMean_num_non_null",
    "MassWeightedMean_mean",
    "MassWeightedMean_min",
    "MassWeightedMean_max",
    "MassWeightedMean_med",
    "MassWeightedMean_sum",
    "MassWeightedSD_num_non_null",
    "MassWeightedSD_mean",
    "MassWeightedSD_min",
    "MassWeightedSD_max",
    "MassWeightedSD_med",
    "MassWeightedSD_sum",
  ],
  "Rain Rates": [
    "RR1_num_00",
    "RR1_num_non_null",
    "RR1_mean",
    "RR1_min",
    "RR1_max",
    "RR1_med",
    "RR1_sum",
    "RR2_num_00",
    "RR2_num_non_null",
    "RR2_mean",
    "RR2_min",
    "RR2_max",
    "RR2_med",
    "RR2_sum",
    "RR3_num_00",
    "RR3_num_non_null",
    "RR3_mean",
    "RR3_min",
    "RR3_max",
    "RR3_med",
    "RR3_sum",
  ],
  Reflectivity: [
    "ReflectivityQC_num_00",
    "ReflectivityQC_num_03",
    "ReflectivityQC_num_non_null",
    "ReflectivityQC_mean",
    "ReflectivityQC_min",
    "ReflectivityQC_max",
    "ReflectivityQC_med",
    "ReflectivityQC_sum",
    "Reflectivity_num_non_null",
    "Reflectivity_mean",
    "Reflectivity_min",
    "Reflectivity_max",
    "Reflectivity_med",
    "Reflectivity_sum",
  ],
  "Volume and Composite": [
    "LogWaterVolume_num_non_null",
    "LogWaterVolume_mean",
    "LogWaterVolume_min",
    "LogWaterVolume_max",
    "LogWaterVolume_med",
    "LogWaterVolume_sum",
    "Composite_num_00",
    "Composite_num_non_null",
    "Composite_mean",
    "Composite_min",
    "Composite_max",
    "Composite_med",
    "Composite_sum",
  ],
  "Polarimetric Data": [
    "Zdr_num_00",
    "Zdr_num_03",
    "Zdr_num_non_null",
    "Zdr_mean",
    "Zdr_min",
    "Zdr_max",
    "Zdr_med",
    "Zdr_sum",
    "RhoHV_num_00",
    "RhoHV_num_03",
    "RhoHV_num_non_null",
    "RhoHV_mean",
    "RhoHV_min",
    "RhoHV_max",
    "RhoHV_med",
    "RhoHV_sum",
  ],
  Velocity: [
    "Velocity_num_00",
    "Velocity_num_01",
    "Velocity_num_03",
    "Velocity_num_non_null",
    "Velocity_mean",
    "Velocity_min",
    "Velocity_max",
    "Velocity_med",
    "Velocity_sum",
  ],
  "Scan Data": [
    "HybridScan_num_non_null",
    "HybridScan_mean",
    "HybridScan_min",
    "HybridScan_max",
    "HybridScan_med",
    "HybridScan_sum",
    "TimeToEnd_num_non_null",
    "TimeToEnd_mean",
    "TimeToEnd_min",
    "TimeToEnd_max",
    "TimeToEnd_med",
    "TimeToEnd_sum",
  ],
  "Quality Metrics": [
    "RadarQualityIndex_num_non_null",
    "RadarQualityIndex_mean",
    "RadarQualityIndex_min",
    "RadarQualityIndex_max",
    "RadarQualityIndex_med",
    "RadarQualityIndex_sum",
  ],
  "Hydrometeor Classification": [
    "Hydro_0",
    "Hydro_1",
    "Hydro_2",
    "Hydro_3",
    "Hydro_4",
    "Hydro_5",
    "Hydro_6",
    "Hydro_7",
    "Hydro_8",
    "Hydro_9",
    "Hydro_10",
    "Hydro_11",
    "Hydro_13",
  ],
} as const;

/**
 * Validates radar data input
 */
export function validateRadarData(data: Record<string, number>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check if all required features are present
  for (const feature of RADAR_FEATURES) {
    if (!(feature in data)) {
      errors.push(`Missing required feature: ${feature}`);
    }
  }

  // Check for extra features
  for (const key of Object.keys(data)) {
    if (!RADAR_FEATURES.includes(key as RadarFeature)) {
      errors.push(`Unknown feature: ${key}`);
    }
  }

  // Check for valid numeric values
  for (const [key, value] of Object.entries(data)) {
    if (typeof value !== "number" || isNaN(value)) {
      errors.push(`Invalid value for ${key}: ${value}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Converts radar data to the format expected by ZoKrates circuit
 */
export function formatRadarDataForZoKrates(data: Record<string, number>): number[] {
  return RADAR_FEATURES.map(feature => data[feature] || 0);
}

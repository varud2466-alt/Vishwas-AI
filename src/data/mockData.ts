import type { RegionData, OperationalAlert, ModelMetrics, VerificationDataPoint, HistoricalAnalog } from '../types';

export const HISTORICAL_ANALOGS_LIST: HistoricalAnalog[] = [
  {
    id: 'analog-2019-monsoon',
    title: '2019 Active Monsoon Depression',
    dateRange: '24 Jul - 30 Jul 2019',
    similarity: 86,
    bustRate: 68,
    observedErrorPattern: 'Underpredicted heavy precipitation along West Coast & Central India by 45mm/day on Day 5-7.',
    synopticDescription: 'Monsoon trough south of normal position with strong 850 hPa low-level jet shear and mid-tropospheric cyclonic vortex over North Bay of Bengal.',
    leadTimeImpact: 'Elevated bust risk around Day 5-7 due to track deviation of the monsoon low.'
  },
  {
    id: 'analog-2021-wd',
    title: '2021 Intense Western Disturbance',
    dateRange: '03 Feb - 08 Feb 2021',
    similarity: 82,
    bustRate: 74,
    observedErrorPattern: 'Overpredicted snowfall magnitude over Western Himalayas & delayed frontal passage timing over Punjab/Haryana.',
    synopticDescription: 'Deep trough in sub-tropical westerly jet at 300 hPa interacting with moist easterly feed from Arabian Sea.',
    leadTimeImpact: 'High phase-speed error leading to 18-hour arrival discrepancy on Day 6.'
  },
  {
    id: 'analog-2023-cyclone',
    title: '2023 Severe Cyclonic Storm Biparjoy Recurvature',
    dateRange: '08 Jun - 14 Jun 2023',
    similarity: 89,
    bustRate: 79,
    observedErrorPattern: 'Deterministic NCUM-G showed sudden 180-km east track shift between consecutive 00 UTC runs at Day 6 lead.',
    synopticDescription: 'Weak steering flow between ridge over Arabian Peninsula and mid-latitude trough resulting in slow movement and recurvature ambiguity.',
    leadTimeImpact: 'Ensemble variance spikes beyond Day 4, indicating acute deterministic forecast bust probability.'
  },
  {
    id: 'analog-2022-premonsoon',
    title: '2022 Pre-Monsoon Heatwave & Convective Break',
    dateRange: '18 Apr - 25 Apr 2022',
    similarity: 78,
    bustRate: 58,
    observedErrorPattern: 'Underestimated max temperature by 3.8°C over NW & Central India on Day 8-10.',
    synopticDescription: 'Persistent anti-cyclonic flow over Rajasthan with dry advection and anomalously high CAPE capping layer over Gangetic plains.',
    leadTimeImpact: 'Model boundary layer parameterization drift beyond Day 6.'
  }
];

export const REGIONS_DATA: RegionData[] = [
  {
    id: 'reg-n-karnataka',
    name: 'North Karnataka Plateau',
    state: 'Karnataka',
    zone: 'South',
    lat: 16.12,
    lng: 75.78,
    bounds: [[14.8, 74.5], [17.5, 77.2]],
    leadTimeData: generateLeadData(0.72, 0.28, 'Flow Regime Shift & Ensemble Disagreement', HISTORICAL_ANALOGS_LIST[0])
  },
  {
    id: 'reg-w-rajasthan',
    name: 'Western Thar Desert',
    state: 'Rajasthan',
    zone: 'West',
    lat: 26.91,
    lng: 70.90,
    bounds: [[25.0, 69.5], [28.8, 73.0]],
    leadTimeData: generateLeadData(0.78, 0.22, 'Flow Regime Shift', HISTORICAL_ANALOGS_LIST[3])
  },
  {
    id: 'reg-c-mp',
    name: 'Central Narmada Basin',
    state: 'Madhya Pradesh',
    zone: 'Central',
    lat: 23.25,
    lng: 77.41,
    bounds: [[21.5, 75.5], [24.5, 79.5]],
    leadTimeData: generateLeadData(0.69, 0.31, 'Ensemble Spread & Moisture Flux', HISTORICAL_ANALOGS_LIST[0])
  },
  {
    id: 'reg-odisha-coast',
    name: 'Odisha Coastal Belt',
    state: 'Odisha',
    zone: 'East',
    lat: 20.27,
    lng: 85.84,
    bounds: [[19.2, 84.5], [21.8, 87.2]],
    leadTimeData: generateLeadData(0.54, 0.46, 'Run-to-Run Jumpiness', HISTORICAL_ANALOGS_LIST[2])
  },
  {
    id: 'reg-konkan',
    name: 'Konkan & Western Ghats',
    state: 'Maharashtra',
    zone: 'West',
    lat: 18.52,
    lng: 73.85,
    bounds: [[15.8, 72.8], [19.8, 74.2]],
    leadTimeData: generateLeadData(0.64, 0.36, 'Orograpic Microphysics & Moisture Convergence', HISTORICAL_ANALOGS_LIST[0])
  },
  {
    id: 'reg-rayalaseema',
    name: 'Rayalaseema Interior',
    state: 'Andhra Pradesh',
    zone: 'South',
    lat: 14.47,
    lng: 78.82,
    bounds: [[13.3, 77.5], [15.8, 79.8]],
    leadTimeData: generateLeadData(0.61, 0.39, 'Low Observation Density', HISTORICAL_ANALOGS_LIST[0])
  },
  {
    id: 'reg-vidarbha',
    name: 'Vidarbha Basin',
    state: 'Maharashtra',
    zone: 'Central',
    lat: 21.14,
    lng: 79.08,
    bounds: [[19.8, 77.5], [22.2, 80.8]],
    leadTimeData: generateLeadData(0.58, 0.42, 'CAPE / Shear Mismatch', HISTORICAL_ANALOGS_LIST[0])
  },
  {
    id: 'reg-assam-valley',
    name: 'Brahmaputra Valley',
    state: 'Assam',
    zone: 'North-East',
    lat: 26.14,
    lng: 91.73,
    bounds: [[25.2, 89.8], [27.8, 95.0]],
    leadTimeData: generateLeadData(0.67, 0.33, 'Complex Terrain & Run-to-Run Jump', HISTORICAL_ANALOGS_LIST[1])
  },
  {
    id: 'reg-ladakh',
    name: 'Ladakh High Himalaya',
    state: 'Ladakh',
    zone: 'Himalaya',
    lat: 34.15,
    lng: 77.57,
    bounds: [[32.5, 75.5], [35.8, 79.5]],
    leadTimeData: generateLeadData(0.81, 0.19, 'Sparse Observations & Sub-grid Topography', HISTORICAL_ANALOGS_LIST[1])
  },
  {
    id: 'reg-bay-of-bengal',
    name: 'North Bay of Bengal Deep Water',
    state: 'Bay of Bengal',
    zone: 'Oceanic',
    lat: 19.50,
    lng: 89.20,
    bounds: [[17.5, 87.0], [21.5, 92.0]],
    leadTimeData: generateLeadData(0.75, 0.25, 'Sparse Satellite Radiance Assimilation', HISTORICAL_ANALOGS_LIST[2])
  },
  {
    id: 'reg-gangetic-wb',
    name: 'Gangetic West Bengal',
    state: 'West Bengal',
    zone: 'East',
    lat: 22.57,
    lng: 88.36,
    bounds: [[21.5, 87.0], [24.0, 89.5]],
    leadTimeData: generateLeadData(0.48, 0.52, 'Norwester Convective Disagreement', HISTORICAL_ANALOGS_LIST[2])
  },
  {
    id: 'reg-coastal-ap',
    name: 'North Coastal Andhra',
    state: 'Andhra Pradesh',
    zone: 'South',
    lat: 17.68,
    lng: 83.21,
    bounds: [[16.5, 82.0], [19.0, 84.8]],
    leadTimeData: generateLeadData(0.52, 0.48, 'Moisture Surge Ambiguity', HISTORICAL_ANALOGS_LIST[2])
  },
  {
    id: 'reg-south-karnataka',
    name: 'South Interior Karnataka',
    state: 'Karnataka',
    zone: 'South',
    lat: 12.97,
    lng: 77.59,
    bounds: [[11.8, 75.8], [14.0, 78.5]],
    leadTimeData: generateLeadData(0.42, 0.58, 'Convective Parameterization Drift', HISTORICAL_ANALOGS_LIST[0])
  },
  {
    id: 'reg-punjab-haryana',
    name: 'Punjab Plains & Sutlej Basin',
    state: 'Punjab',
    zone: 'North',
    lat: 30.90,
    lng: 75.85,
    bounds: [[29.5, 74.0], [32.2, 77.0]],
    leadTimeData: generateLeadData(0.45, 0.55, 'Frontal Timing Error', HISTORICAL_ANALOGS_LIST[1])
  },
  {
    id: 'reg-saurashtra',
    name: 'Saurashtra Peninsula',
    state: 'Gujarat',
    zone: 'West',
    lat: 22.30,
    lng: 70.80,
    bounds: [[20.8, 69.0], [23.5, 72.5]],
    leadTimeData: generateLeadData(0.66, 0.34, 'Arabian Sea Vapour Transport Error', HISTORICAL_ANALOGS_LIST[2])
  },
  {
    id: 'reg-marathwada',
    name: 'Marathwada Dry Region',
    state: 'Maharashtra',
    zone: 'Central',
    lat: 19.87,
    lng: 75.34,
    bounds: [[18.2, 74.5], [20.8, 77.2]],
    leadTimeData: generateLeadData(0.59, 0.41, 'Thermal Low Inversion Shift', HISTORICAL_ANALOGS_LIST[3])
  },
  {
    id: 'reg-uttarakhand',
    name: 'Garhwal & Kumaon Himalayas',
    state: 'Uttarakhand',
    zone: 'Himalaya',
    lat: 30.31,
    lng: 78.03,
    bounds: [[29.0, 77.8], [31.5, 81.0]],
    leadTimeData: generateLeadData(0.77, 0.23, 'Orographic Cloud Burst Mislocation', HISTORICAL_ANALOGS_LIST[1])
  },
  {
    id: 'reg-east-up',
    name: 'Eastern UP Plains',
    state: 'Uttar Pradesh',
    zone: 'North',
    lat: 26.84,
    lng: 80.94,
    bounds: [[25.2, 80.0], [28.2, 84.5]],
    leadTimeData: generateLeadData(0.49, 0.51, 'Trough Axial Oscillation', HISTORICAL_ANALOGS_LIST[0])
  },
  {
    id: 'reg-chhattisgarh',
    name: 'Mahanadi Basin',
    state: 'Chhattisgarh',
    zone: 'Central',
    lat: 21.25,
    lng: 81.62,
    bounds: [[19.5, 80.2], [23.5, 84.0]],
    leadTimeData: generateLeadData(0.51, 0.49, 'Mid-level Dry Slot Intrusion', HISTORICAL_ANALOGS_LIST[0])
  },
  {
    id: 'reg-tamil-nadu',
    name: 'Cauvery Delta & TN Coast',
    state: 'Tamil Nadu',
    zone: 'South',
    lat: 10.79,
    lng: 78.70,
    bounds: [[8.2, 76.5], [13.5, 80.2]],
    leadTimeData: generateLeadData(0.38, 0.62, 'Easterly Wave Speed Variance', HISTORICAL_ANALOGS_LIST[2])
  },
  {
    id: 'reg-kerala',
    name: 'Malabar Coast',
    state: 'Kerala',
    zone: 'South',
    lat: 10.85,
    lng: 76.27,
    bounds: [[8.3, 75.0], [12.8, 77.5]],
    leadTimeData: generateLeadData(0.46, 0.54, 'Off-shore Trough Fluctuations', HISTORICAL_ANALOGS_LIST[0])
  },
  {
    id: 'reg-meghalaya',
    name: 'Shillong Plateau',
    state: 'Meghalaya',
    zone: 'North-East',
    lat: 25.57,
    lng: 91.89,
    bounds: [[25.0, 89.8], [26.2, 92.8]],
    leadTimeData: generateLeadData(0.71, 0.29, 'Extreme Precipitation Resolution Limit', HISTORICAL_ANALOGS_LIST[0])
  },
  {
    id: 'reg-arabian-sea',
    name: 'East Central Arabian Sea',
    state: 'Arabian Sea',
    zone: 'Oceanic',
    lat: 15.00,
    lng: 68.50,
    bounds: [[12.0, 65.0], [18.0, 72.0]],
    leadTimeData: generateLeadData(0.79, 0.21, 'Sparse Marine Observations', HISTORICAL_ANALOGS_LIST[2])
  }
];

function generateLeadData(baseBust6: number, _baseConf6: number, driverName: string, analog: HistoricalAnalog) {
  const result: any = {};
  
  for (let day = 1; day <= 10; day++) {
    // Lead time scaling curves
    const scaleFactor = (day / 6);
    let bustProb = Math.min(0.95, Math.max(0.04, baseBust6 * Math.pow(scaleFactor, 0.7) * (0.35 + (day * 0.08))));
    let confidence = Math.max(5, Math.round(100 * (1 - bustProb)));
    bustProb = parseFloat(bustProb.toFixed(2));
    
    // Determine risk level based on bust probability
    let riskLevel: any = 'Very Low';
    if (bustProb >= 0.80) riskLevel = 'Very High';
    else if (bustProb >= 0.60) riskLevel = 'High';
    else if (bustProb >= 0.40) riskLevel = 'Moderate';
    else if (bustProb >= 0.20) riskLevel = 'Low';
    
    // Observation density
    let obsDensity: any = 'High';
    if (driverName.includes('Sparse') || driverName.includes('Oceanic')) {
      obsDensity = 'Sparse (Masked)';
    } else if (driverName.includes('Low Observation') || day > 7) {
      obsDensity = 'Low';
    } else if (day > 4) {
      obsDensity = 'Medium';
    }
    
    const shapSpread = Math.min(0.38, 0.12 + (day * 0.025));
    const shapRegime = Math.min(0.32, 0.10 + (day * 0.022));
    const shapJump = Math.min(0.24, 0.08 + (day * 0.015));
    const shapMoisture = Math.min(0.19, 0.05 + (day * 0.012));
    const shapObs = obsDensity.includes('Sparse') ? 0.35 : 0.06;

    result[day] = {
      bustProbability: bustProb,
      confidence: confidence,
      forecastErrorRMSE: parseFloat((4.2 + (day * 2.1)).toFixed(1)),
      observationDensity: obsDensity,
      ensembleSpread: Math.min(98, Math.round(22 + (day * 7.5))),
      riskLevel: riskLevel,
      primaryDriver: driverName,
      drivers: [
        {
          name: 'Ensemble Member Disagreement',
          code: 'NEPS_SPREAD',
          impact: shapSpread > 0.25 ? 'High' : 'Medium',
          shapValue: parseFloat(shapSpread.toFixed(2)),
          description: `NEPS-G ensemble variance standard deviation is ${Math.round(22 + day * 7.5)}% above 30-day mean.`
        },
        {
          name: 'Flow-Regime Mismatch (500 hPa)',
          code: 'REGIME_MISMATCH',
          impact: shapRegime > 0.20 ? 'High' : 'Medium',
          shapValue: parseFloat(shapRegime.toFixed(2)),
          description: 'Current 500 hPa geopotential height pattern deviates significantly from operational deterministic trajectory.'
        },
        {
          name: 'Run-to-Run Jumpiness (NCUM-G)',
          code: 'NCUM_JUMP',
          impact: shapJump > 0.15 ? 'High' : 'Low',
          shapValue: parseFloat(shapJump.toFixed(2)),
          description: `Difference between 00 UTC run and previous 12 UTC run exceeds 2.8 standard deviations.`
        },
        {
          name: 'Moisture Flux & CAPE Anomaly',
          code: 'MOISTURE_FLUX',
          impact: shapMoisture > 0.12 ? 'Medium' : 'Low',
          shapValue: parseFloat(shapMoisture.toFixed(2)),
          description: 'Integrated vapor transport (IVT) from Arabian Sea shows strong non-linear convective instability.'
        },
        {
          name: 'Observation Density & Analysis Increments',
          code: 'OBS_DENSITY',
          impact: shapObs > 0.20 ? 'High' : 'Low',
          shapValue: parseFloat(shapObs.toFixed(2)),
          description: obsDensity.includes('Sparse') 
            ? 'Observation density < 0.05 per 100km²; masked to prevent false confidence.' 
            : 'In-situ radiosonde and AWS coverage is adequate for 0.25° grid assimilation.'
        }
      ],
      regime: day <= 5 ? 'ACTIVE MONSOON TROUGH' : 'MONSOON LOW RECURVATURE',
      regimeSimilarity: Math.max(62, Math.round(88 - (day * 2.2))),
      historicalAnalog: analog,
      aiInterpretation: `VISHWAS Post-Processing Engine detects that current atmospheric flow for Day ${day} matches historical synoptic setups where operational NCUM-G deterministic predictions experienced elevated forecast error (RMSE ~${(4.2 + day * 2.1).toFixed(1)} mm/day). The elevated bust probability (${Math.round(bustProb * 100)}%) is primarily driven by ${driverName.toLowerCase()}.`
    };
  }
  
  return result;
}

export const OPERATIONAL_ALERTS: OperationalAlert[] = [
  {
    id: 'alt-001',
    region: 'North Karnataka Plateau',
    state: 'Karnataka',
    leadDay: 6,
    bustProbability: 0.72,
    confidence: 28,
    riskLevel: 'High',
    primaryReason: 'Large ensemble disagreement + regime mismatch',
    recommendedAction: 'Review forecast before issuing high-confidence agricultural advisory or disaster warnings.',
    timestamp: '00:15 UTC 29 Sep 2026',
    severity: 'Warning'
  },
  {
    id: 'alt-002',
    region: 'Western Thar Desert',
    state: 'Rajasthan',
    leadDay: 6,
    bustProbability: 0.78,
    confidence: 22,
    riskLevel: 'High',
    primaryReason: 'Flow regime shift in 300 hPa westerly jet',
    recommendedAction: 'Tag medium-range heavy rainfall outlook with low confidence flag in MoES bulletin.',
    timestamp: '00:12 UTC 29 Sep 2026',
    severity: 'Critical'
  },
  {
    id: 'alt-003',
    region: 'Ladakh High Himalaya',
    state: 'Ladakh',
    leadDay: 7,
    bustProbability: 0.81,
    confidence: 19,
    riskLevel: 'Very High',
    primaryReason: 'Sparse observation density + high terrain divergence',
    recommendedAction: 'Apply uncertainty mask on spatial grid maps for Day 7 to Day 10.',
    timestamp: '00:08 UTC 29 Sep 2026',
    severity: 'Critical'
  },
  {
    id: 'alt-004',
    region: 'Central Narmada Basin',
    state: 'Madhya Pradesh',
    leadDay: 5,
    bustProbability: 0.69,
    confidence: 31,
    riskLevel: 'High',
    primaryReason: 'Ensemble spread variance spike',
    recommendedAction: 'Cross-check NEPS-G 23-member cluster distribution before publishing dam inflow forecasts.',
    timestamp: '00:05 UTC 29 Sep 2026',
    severity: 'Advisory'
  }
];

export const MODEL_COMPARISON_METRICS: ModelMetrics[] = [
  {
    name: 'NCUM-G',
    type: 'Deterministic NWP',
    resolution: '12 km Global',
    leadTimeRange: 'Day 1 – 10',
    avgBrierScore: 0.28,
    aucRoc: 0.64,
    role: 'Primary NWP physics solver. Provides deterministic atmospheric state trajectory.'
  },
  {
    name: 'NEPS-G',
    type: 'Ensemble NWP (23 members)',
    resolution: '12 km Global',
    leadTimeRange: 'Day 1 – 10',
    avgBrierScore: 0.21,
    aucRoc: 0.72,
    role: 'Estimates flow-dependent uncertainty via perturbation physics.'
  },
  {
    name: 'VISHWAS',
    type: 'AI Post-Processing Bust Engine',
    resolution: '0.25° Grid / Sub-region',
    leadTimeRange: 'Day 1 – 10',
    avgBrierScore: 0.12,
    aucRoc: 0.89,
    role: 'Predicts the probability that NCUM-G/NEPS-G will fail. Does NOT replace NWP; scores its reliability.'
  }
];

export const VERIFICATION_BENCHMARKS: VerificationDataPoint[] = [
  { leadDay: 1, rawForecastRMSE: 4.8, vishwasFilteredRMSE: 3.2, rawACC: 0.94, calibratedACC: 0.97, brierScore: 0.04, climatologyBrier: 0.22, observedBustCount: 2, predictedBustCount: 2 },
  { leadDay: 2, rawForecastRMSE: 6.2, vishwasFilteredRMSE: 4.1, rawACC: 0.91, calibratedACC: 0.95, brierScore: 0.07, climatologyBrier: 0.22, observedBustCount: 4, predictedBustCount: 5 },
  { leadDay: 3, rawForecastRMSE: 8.5, vishwasFilteredRMSE: 5.4, rawACC: 0.86, calibratedACC: 0.91, brierScore: 0.10, climatologyBrier: 0.23, observedBustCount: 7, predictedBustCount: 8 },
  { leadDay: 4, rawForecastRMSE: 11.2, vishwasFilteredRMSE: 7.1, rawACC: 0.80, calibratedACC: 0.86, brierScore: 0.13, climatologyBrier: 0.24, observedBustCount: 11, predictedBustCount: 12 },
  { leadDay: 5, rawForecastRMSE: 14.8, vishwasFilteredRMSE: 9.3, rawACC: 0.73, calibratedACC: 0.81, brierScore: 0.16, climatologyBrier: 0.25, observedBustCount: 16, predictedBustCount: 15 },
  { leadDay: 6, rawForecastRMSE: 19.4, vishwasFilteredRMSE: 12.1, rawACC: 0.63, calibratedACC: 0.74, brierScore: 0.19, climatologyBrier: 0.25, observedBustCount: 22, predictedBustCount: 21 },
  { leadDay: 7, rawForecastRMSE: 24.1, vishwasFilteredRMSE: 15.6, rawACC: 0.54, calibratedACC: 0.67, brierScore: 0.21, climatologyBrier: 0.26, observedBustCount: 28, predictedBustCount: 29 },
  { leadDay: 8, rawForecastRMSE: 29.8, vishwasFilteredRMSE: 19.8, rawACC: 0.46, calibratedACC: 0.59, brierScore: 0.23, climatologyBrier: 0.26, observedBustCount: 34, predictedBustCount: 33 },
  { leadDay: 9, rawForecastRMSE: 35.6, vishwasFilteredRMSE: 24.2, rawACC: 0.40, calibratedACC: 0.52, brierScore: 0.24, climatologyBrier: 0.27, observedBustCount: 40, predictedBustCount: 38 },
  { leadDay: 10, rawForecastRMSE: 42.0, vishwasFilteredRMSE: 29.5, rawACC: 0.35, calibratedACC: 0.46, brierScore: 0.25, climatologyBrier: 0.27, observedBustCount: 45, predictedBustCount: 44 }
];

export const DEMO_STEPS_FLOW = [
  { id: 1, label: 'Connecting to NCMRWF 00 UTC Cycle', detail: 'Fetching NCUM-G deterministic (12km) & NEPS-G ensemble (23 members) NetCDF datasets...', durationMs: 900 },
  { id: 2, label: 'Extracting Dynamic Meteorological Features', detail: 'Computing ensemble spread, CAPE non-linearity, IVT shear, and run-to-run jumpiness vectors...', durationMs: 1100 },
  { id: 3, label: 'Querying Historical Regime Analog Archive', detail: 'Searching IMDAA 40-year reanalysis using k-means + k-NN metric space (86% match with 2019 monsoon depression)...', durationMs: 1200 },
  { id: 4, label: 'Executing XGBoost Bust Classifier', detail: 'Evaluating regional failure trees per 0.25° grid node across Day 1 – Day 10 lead times...', durationMs: 1300 },
  { id: 5, label: 'U-Net Spatial Refinement & Isotonic Calibration', detail: 'Applying U-Net CNN for spatial continuity & calibrating raw probabilities with Brier optimization...', durationMs: 1000 },
  { id: 6, label: 'Generating SHAP Attribution & Reason Codes', detail: 'Translating feature importances into plain-language meteorological reason codes...', durationMs: 900 },
  { id: 7, label: 'Updating Dashboard & REST API Feeds', detail: 'Analysis complete! Operational confidence maps and bust risk flags are live.', durationMs: 800 }
];

export type MapLayerType = 'bust' | 'confidence' | 'error' | 'obs_density' | 'spread';

export type RiskLevel = 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';

export interface DriverImpact {
  name: string;
  code: string;
  impact: 'High' | 'Medium' | 'Low';
  shapValue: number;
  description: string;
}

export interface HistoricalAnalog {
  id: string;
  title: string;
  dateRange: string;
  similarity: number; // e.g. 86
  bustRate: number; // e.g. 68%
  observedErrorPattern: string;
  synopticDescription: string;
  leadTimeImpact: string;
}

export interface RegionData {
  id: string;
  name: string;
  state: string;
  zone: 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East' | 'Himalaya' | 'Oceanic';
  lat: number;
  lng: number;
  bounds?: [[number, number], [number, number]]; // Bounding box for Leaflet rendering
  leadTimeData: {
    [day: number]: {
      bustProbability: number; // 0.0 - 1.0
      confidence: number; // 0 - 100%
      forecastErrorRMSE: number; // mm or hPa
      observationDensity: 'High' | 'Medium' | 'Low' | 'Sparse (Masked)';
      ensembleSpread: number; // 0 - 100 index
      riskLevel: RiskLevel;
      primaryDriver: string;
      drivers: DriverImpact[];
      regime: string;
      regimeSimilarity: number;
      historicalAnalog: HistoricalAnalog;
      aiInterpretation: string;
    };
  };
}

export interface OperationalAlert {
  id: string;
  region: string;
  state: string;
  leadDay: number;
  bustProbability: number;
  confidence: number;
  riskLevel: RiskLevel;
  primaryReason: string;
  recommendedAction: string;
  timestamp: string;
  severity: 'Critical' | 'Warning' | 'Advisory';
}

export interface ModelMetrics {
  name: string;
  type: string;
  resolution: string;
  leadTimeRange: string;
  avgBrierScore: number;
  aucRoc: number;
  role: string;
}

export interface VerificationDataPoint {
  leadDay: number;
  rawForecastRMSE: number;
  vishwasFilteredRMSE: number;
  rawACC: number; // Anomaly Correlation Coefficient
  calibratedACC: number;
  brierScore: number;
  climatologyBrier: number;
  observedBustCount: number;
  predictedBustCount: number;
}

export interface DemoStep {
  id: number;
  label: string;
  detail: string;
  durationMs: number;
}

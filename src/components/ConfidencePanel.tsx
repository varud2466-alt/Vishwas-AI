import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { TrendingDown, Info, CheckSquare, Square } from 'lucide-react';
import type { RegionData } from '../types';

interface ConfidencePanelProps {
  selectedRegion: RegionData | null;
  selectedDay: number;
}

export const ConfidencePanel: React.FC<ConfidencePanelProps> = ({ selectedRegion, selectedDay }) => {
  const [showConfidence, setShowConfidence] = useState(true);
  const [showBustProb, setShowBustProb] = useState(true);
  const [showHistoricalReliability, setShowHistoricalReliability] = useState(true);

  // Generate day 1 to day 10 dataset for selected region (or overall average)
  const chartData = Array.from({ length: 10 }, (_, i) => {
    const day = i + 1;
    if (selectedRegion && selectedRegion.leadTimeData[day]) {
      const data = selectedRegion.leadTimeData[day];
      return {
        leadDay: `Day ${day}`,
        confidence: data.confidence,
        bustProb: Math.round(data.bustProbability * 100),
        historicalReliability: Math.max(30, Math.round(96 - (day * 5.8))),
      };
    }
    // Fallback baseline curve
    const defaultConf = [94, 91, 87, 81, 74, 63, 58, 51, 46, 41][i];
    return {
      leadDay: `Day ${day}`,
      confidence: defaultConf,
      bustProb: 100 - defaultConf,
      historicalReliability: Math.max(30, Math.round(96 - (day * 5.5))),
    };
  });

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100">
              Forecast Confidence vs. Lead Time Curve (Day 1 – Day 10)
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            {selectedRegion 
              ? `Displaying lead-time decay curve for ${selectedRegion.name} (${selectedRegion.state})`
              : 'Displaying operational mean confidence degradation across India'}
          </p>
        </div>

        {/* Interactive Line Toggles */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button
            onClick={() => setShowConfidence(!showConfidence)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              showConfidence 
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            {showConfidence ? <CheckSquare className="w-4 h-4 text-cyan-400" /> : <Square className="w-4 h-4" />}
            <span>Forecast Confidence (%)</span>
          </button>

          <button
            onClick={() => setShowBustProb(!showBustProb)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              showBustProb 
                ? 'bg-rose-950/80 border-rose-500 text-rose-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            {showBustProb ? <CheckSquare className="w-4 h-4 text-rose-400" /> : <Square className="w-4 h-4" />}
            <span>Bust Probability (%)</span>
          </button>

          <button
            onClick={() => setShowHistoricalReliability(!showHistoricalReliability)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              showHistoricalReliability 
                ? 'bg-purple-950/80 border-purple-500 text-purple-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            {showHistoricalReliability ? <CheckSquare className="w-4 h-4 text-purple-400" /> : <Square className="w-4 h-4" />}
            <span>Historical Baseline</span>
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="leadDay" stroke="#94A3B8" fontSize={12} />
            <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={12} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '12px'
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />

            {showConfidence && (
              <Line
                type="monotone"
                dataKey="confidence"
                name="Forecast Confidence (%)"
                stroke="#38BDF8"
                strokeWidth={3}
                dot={{ r: 5, fill: '#38BDF8' }}
                activeDot={{ r: 8 }}
              />
            )}

            {showBustProb && (
              <Line
                type="monotone"
                dataKey="bustProb"
                name="Bust Probability (%)"
                stroke="#F43F5E"
                strokeWidth={3}
                strokeDasharray="4 4"
                dot={{ r: 5, fill: '#F43F5E' }}
              />
            )}

            {showHistoricalReliability && (
              <Line
                type="monotone"
                dataKey="historicalReliability"
                name="Historical Reliability Baseline (%)"
                stroke="#A855F7"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insight Footer */}
      <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>
            Notice: Confidence drops sharply beyond <strong>Day 5</strong> as non-linear ensemble perturbations grow.
          </span>
        </div>
        <div className="font-mono text-cyan-300 text-[11px]">
          Day {selectedDay} Confidence: {chartData[selectedDay - 1]?.confidence}%
        </div>
      </div>
    </div>
  );
};

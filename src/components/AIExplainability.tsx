import React from 'react';
import { BrainCircuit, Sparkles } from 'lucide-react';
import type { RegionData } from '../types';

interface AIExplainabilityProps {
  selectedRegion: RegionData;
  selectedDay: number;
}

export const AIExplainability: React.FC<AIExplainabilityProps> = ({ selectedRegion, selectedDay }) => {
  const dayData = selectedRegion.leadTimeData[selectedDay];

  if (!dayData) return null;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                WHY IS THIS FORECAST LOW CONFIDENCE?
              </h2>
              <p className="text-xs text-cyan-300 font-medium">
                XGBoost + SHAP Explainability Engine for {selectedRegion.name} ({selectedRegion.state}) • Day {selectedDay}
              </p>
            </div>
          </div>
        </div>

        {/* Big Score Badges */}
        <div className="flex items-center space-x-4">
          <div className="px-4 py-2 rounded-xl bg-rose-950/80 border border-rose-500/40 text-center">
            <div className="text-[10px] uppercase font-bold text-rose-300 tracking-wider">
              Bust Probability
            </div>
            <div className="text-2xl font-black text-rose-400 font-mono">
              {Math.round(dayData.bustProbability * 100)}%
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Confidence Score
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {dayData.confidence}%
            </div>
          </div>
        </div>
      </div>

      {/* Top Drivers List with SHAP Impact Bars */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Top Meteorological Drivers & Reason Codes (SHAP Attribution)</span>
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {dayData.drivers.map((driver, idx) => {
            const isHigh = driver.impact === 'High';
            const isMedium = driver.impact === 'Medium';

            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-sm font-bold text-slate-100">
                        {driver.name}
                      </span>
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono text-[10px] border border-slate-800">
                        {driver.code}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide border ${
                    isHigh
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : isMedium
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}>
                    Impact: {driver.impact}
                  </span>
                </div>

                {/* Progress Bar & SHAP Value */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{driver.description}</span>
                    <span className="font-mono text-cyan-300">SHAP: +{driver.shapValue}</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isHigh ? 'bg-gradient-to-r from-rose-500 to-amber-500' : isMedium ? 'bg-amber-500' : 'bg-cyan-500'
                      }`}
                      style={{ width: `${Math.min(100, driver.shapValue * 220)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Meteorological Interpretation Box */}
      <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
        <div className="flex items-center space-x-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
          <BrainCircuit className="w-4 h-4 text-cyan-400" />
          <span>Meteorological AI Interpretation (Plain Language Reason Code)</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-sans italic pl-6 border-l-2 border-cyan-400">
          "{dayData.aiInterpretation}"
        </p>
      </div>
    </div>
  );
};

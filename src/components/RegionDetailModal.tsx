import React from 'react';
import { X, BrainCircuit, History, MapPin } from 'lucide-react';
import type { RegionData } from '../types';

interface RegionDetailModalProps {
  region: RegionData | null;
  selectedDay: number;
  onClose: () => void;
}

export const RegionDetailModal: React.FC<RegionDetailModalProps> = ({ region, selectedDay, onClose }) => {
  if (!region) return null;

  const dayData = region.leadTimeData[selectedDay];
  if (!dayData) return null;

  const isHighRisk = dayData.bustProbability >= 0.60;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/75 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#0B1120] border-l border-slate-800 h-full p-6 shadow-2xl overflow-y-auto flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-cyan-400 font-mono mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{region.zone} Zone • Lat {region.lat}°, Lng {region.lng}°</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">
                {region.name}
              </h2>
              <div className="text-xs text-slate-400 font-medium">
                State: <span className="text-slate-200">{region.state}</span> • Lead Horizon: <span className="text-cyan-300 font-mono font-bold">Day {selectedDay}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Risk & Confidence Gauges */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-4 rounded-xl border ${
              isHighRisk ? 'bg-rose-950/60 border-rose-500/40' : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                Bust Probability
              </div>
              <div className={`text-3xl font-black font-mono ${isHighRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
                {Math.round(dayData.bustProbability * 100)}%
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Risk Level: <strong className={isHighRisk ? 'text-rose-300' : 'text-emerald-300'}>{dayData.riskLevel}</strong>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                Forecast Confidence
              </div>
              <div className="text-3xl font-black font-mono text-cyan-300">
                {dayData.confidence}%
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Obs RMSE: <strong className="text-slate-200 font-mono">{dayData.forecastErrorRMSE} mm</strong>
              </div>
            </div>
          </div>

          {/* Top Reasons & SHAP attribution */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              <span>Top Failure Reason Codes (SHAP Attribution)</span>
            </h3>

            <div className="space-y-2">
              {dayData.drivers.map((driver, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{idx + 1}. {driver.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      driver.impact === 'High' ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}>
                      {driver.impact}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{driver.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Regime Analog Match */}
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2 text-xs">
            <div className="flex items-center justify-between text-indigo-300 font-bold uppercase tracking-wider text-[10px]">
              <span className="flex items-center space-x-1.5">
                <History className="w-3.5 h-3.5 text-indigo-400" />
                <span>Matched Regime Analog</span>
              </span>
              <span className="font-mono text-cyan-400">{dayData.regimeSimilarity}% Match</span>
            </div>
            <div className="font-bold text-white text-sm">
              {dayData.historicalAnalog.title}
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {dayData.historicalAnalog.observedErrorPattern}
            </p>
          </div>

          {/* Evidence Density Warning if Masked */}
          {dayData.observationDensity.includes('Sparse') && (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200">
              ⚠️ <strong>Low Observation Evidence:</strong> Observation density &lt; 0.05 per 100km². Masked on main map view to prevent false confidence.
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            Close Region Details
          </button>
        </div>
      </div>
    </div>
  );
};

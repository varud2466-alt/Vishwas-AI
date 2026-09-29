import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  BarChart, 
  Bar 
} from 'recharts';
import { History, Calendar, Info } from 'lucide-react';
import { VERIFICATION_BENCHMARKS } from '../data/mockData';

export const HistoricalVerification: React.FC = () => {
  const [timeRange, setTimeRange] = useState('monsoon-2025');

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              FORECAST VERIFICATION & SKILL SCORECARDS
            </h2>
            <p className="text-xs text-cyan-300 font-medium">
              Historical Performance Validation against IMD Gridded Observations & IMDAA Reanalysis
            </p>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400">Verification Period:</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent text-slate-200 font-bold focus:outline-none"
          >
            <option value="monsoon-2025">Monsoon 2025 (Jun - Sep)</option>
            <option value="winter-2025">Winter 2025 (Dec - Feb)</option>
            <option value="last-30-days">Last 30 Days (Aug 2026)</option>
          </select>
        </div>
      </div>

      {/* Prototype Simulated Data Disclaimer */}
      <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>
            Prototype visualization using simulated verification data.
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold text-[10px] uppercase">
          Simulated Validation
        </span>
      </div>

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: RMSE vs Lead Time */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">
              1. RMSE Error vs. Lead Time (mm/day)
            </h3>
            <span className="text-[10px] text-cyan-400 font-mono">Lower is Better</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={VERIFICATION_BENCHMARKS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="leadDay" tickFormatter={(d) => `Day ${d}`} stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="rawForecastRMSE" name="Raw NCUM-G Forecast RMSE" stroke="#F43F5E" strokeWidth={2.5} />
                <Line type="monotone" dataKey="vishwasFilteredRMSE" name="VISHWAS High-Confidence Subset RMSE" stroke="#10B981" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: ACC Anomaly Correlation Coefficient */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">
              2. Anomaly Correlation Coefficient (ACC)
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono">Higher is Better</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={VERIFICATION_BENCHMARKS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="leadDay" tickFormatter={(d) => `Day ${d}`} stroke="#94A3B8" fontSize={11} />
                <YAxis domain={[0, 1.0]} stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="rawACC" name="Raw NCUM-G ACC" stroke="#F59E0B" strokeWidth={2} strokeDasharray="3 3" />
                <Line type="monotone" dataKey="calibratedACC" name="VISHWAS Calibrated Skill ACC" stroke="#38BDF8" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Reliability Diagram (Brier Score) */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">
              3. Brier Score Comparison vs. Climatology
            </h3>
            <span className="text-[10px] text-cyan-400 font-mono">Calibrated Probability</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={VERIFICATION_BENCHMARKS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="leadDay" tickFormatter={(d) => `Day ${d}`} stroke="#94A3B8" fontSize={11} />
                <YAxis domain={[0, 0.35]} stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="climatologyBrier" name="Climatology Baseline Brier" stroke="#64748B" strokeWidth={2} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="brierScore" name="VISHWAS Calibrated Brier Score" stroke="#A855F7" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Predicted vs Observed Bust Count */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">
              4. Predicted Busts vs. Actual Verified Busts
            </h3>
            <span className="text-[10px] text-cyan-400 font-mono">Bust Detection Rate</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VERIFICATION_BENCHMARKS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="leadDay" tickFormatter={(d) => `Day ${d}`} stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="predictedBustCount" name="VISHWAS Predicted Bust Count" fill="#38BDF8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="observedBustCount" name="Actual Observed Bust Count" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

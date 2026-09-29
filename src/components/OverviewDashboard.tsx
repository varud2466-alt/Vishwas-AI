import React from 'react';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  Database
} from 'lucide-react';
import type { RegionData } from '../types';

interface OverviewDashboardProps {
  selectedDay: number;
  regions: RegionData[];
  onSelectRegion?: (region: RegionData) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  selectedDay,
  regions,
}) => {
  // Calculate dynamic stats based on selected lead time
  const dayStats = regions.map(r => r.leadTimeData[selectedDay]);
  
  const highRiskCount = dayStats.filter(s => s.bustProbability >= 0.60).length;
  const avgConfidence = Math.round(
    dayStats.reduce((sum, s) => sum + s.confidence, 0) / (dayStats.length || 1)
  );
  const meanBustProb = (
    dayStats.reduce((sum, s) => sum + s.bustProbability, 0) / (dayStats.length || 1)
  ).toFixed(2);

  const kpiCards = [
    {
      title: 'Forecast Cycle',
      value: '00 UTC',
      subtext: '29 Sep 2026',
      icon: Clock,
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      title: 'Regions Monitored',
      value: '36 Regions',
      subtext: 'India 0.25° Grid',
      icon: MapPin,
      color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
    },
    {
      title: 'Forecast Horizon',
      value: `Day ${selectedDay}`,
      subtext: 'Day 1 – Day 10',
      icon: Calendar,
      color: 'from-sky-500/20 to-cyan-500/10 border-sky-500/30 text-sky-400',
    },
    {
      title: 'High-Risk Regions',
      value: `${highRiskCount}`,
      subtext: `Bust Prob ≥ 0.60 (Day ${selectedDay})`,
      icon: AlertTriangle,
      color: highRiskCount > 5 
        ? 'from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-400' 
        : 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
    },
    {
      title: 'Average Confidence',
      value: `${avgConfidence}%`,
      subtext: `Across All Indian Sub-regions`,
      icon: ShieldCheck,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      title: 'Mean Bust Probability',
      value: `${meanBustProb}`,
      subtext: `0.00 (Low) – 1.00 (Extreme)`,
      icon: Activity,
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Demo Data Disclaimer Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs">
        <div className="flex items-center space-x-2.5 mb-2 sm:mb-0">
          <span className="px-2 py-0.5 rounded font-black bg-cyan-500 text-slate-950 uppercase tracking-widest text-[10px]">
            DEMO DATA
          </span>
          <span className="text-slate-300">
            Prototype decision-support interface visualizing simulated NCUM-G & NEPS-G post-processing runs.
          </span>
        </div>
        <div className="text-[11px] text-cyan-400 font-mono font-medium flex items-center space-x-1">
          <Database className="w-3.5 h-3.5" />
          <span>Post-Processing Model v2.4 (XGBoost + U-Net)</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`glass-panel p-4 rounded-xl border bg-gradient-to-br ${card.color} flex flex-col justify-between transition-all duration-200 hover:scale-[1.02] shadow-lg`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  {card.title}
                </span>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-2xl font-black text-white tracking-tight leading-none mb-1">
                  {card.value}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {card.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

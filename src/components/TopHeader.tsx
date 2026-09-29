import React from 'react';
import { 
  Play, 
  Bell, 
  User, 
  Clock, 
  Layers
} from 'lucide-react';

interface TopHeaderProps {
  collapsed: boolean;
  selectedLeadDay: number;
  setSelectedLeadDay?: (day: number) => void;
  onRunDemo: () => void;
  onOpenAlerts: () => void;
  alertCount: number;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  collapsed,
  selectedLeadDay,
  onRunDemo,
  onOpenAlerts,
  alertCount
}) => {
  return (
    <header className={`fixed top-0 right-0 z-30 h-16 bg-[#0B1120]/90 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300 flex items-center justify-between px-6 ${collapsed ? 'left-16' : 'left-64'}`}>
      
      {/* Left Title & Status */}
      <div className="flex items-center space-x-6">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-slate-100 text-base md:text-lg tracking-tight">
              VISHWAS
            </h1>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:inline-block text-xs text-cyan-400 font-medium">
              AI Forecast Confidence Platform
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center space-x-2">
            <span className="text-slate-400">NCMRWF Operational Layer</span>
            <span>•</span>
            <span className="text-cyan-400 font-mono">SIH26079</span>
          </div>
        </div>

        {/* Cycle & Status Badges */}
        <div className="hidden lg:flex items-center space-x-3 text-xs border-l border-slate-800 pl-6">
          <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/60">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Current Cycle:</span>
            <span className="font-mono text-cyan-300 font-bold">00 UTC (29 Sep 2026)</span>
          </div>

          <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/60">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Horizon:</span>
            <span className="font-mono text-indigo-300 font-bold">Day {selectedLeadDay}</span>
          </div>

          <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-slate-900 border border-emerald-900/60 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-medium">Data: Simulated / Demo</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* RUN DEMO Button */}
        <button
          onClick={onRunDemo}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-semibold text-xs md:text-sm hover:opacity-95 shadow-lg shadow-cyan-500/25 transition-all transform active:scale-95 group"
        >
          <Play className="w-4 h-4 fill-white transition-transform group-hover:scale-110" />
          <span className="tracking-wide uppercase text-[11px] md:text-xs">Run Demo AI Inference</span>
        </button>

        {/* Operational Alerts Trigger */}
        <button
          onClick={onOpenAlerts}
          className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
          title="Operational Forecaster Alerts"
        >
          <Bell className="w-4 h-4" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-[#0B1120]">
              {alertCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-medium text-slate-200">Duty Forecaster</div>
            <div className="text-[10px] text-slate-400 font-mono">NCMRWF / MoES</div>
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { ShieldAlert, X, Info } from 'lucide-react';
import type { OperationalAlert } from '../types';

interface AlertsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: OperationalAlert[];
}

export const AlertsDrawer: React.FC<AlertsDrawerProps> = ({ isOpen, onClose, alerts }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0B1120] border-l border-slate-800 h-full p-6 shadow-2xl overflow-y-auto flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-rose-950 border border-rose-500/40 text-rose-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">
                  Forecaster Operational Advisories
                </h3>
                <p className="text-xs text-rose-300 font-medium">
                  {alerts.length} High-Bust-Risk Regions Flagged
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Operational Role Clarification Alert Banner */}
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold uppercase text-[10px] text-amber-300 tracking-wider">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>FORECASTER DECISION-SUPPORT PROTOCOL</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              These advisories are for duty forecasters at IMD/NCMRWF. Do NOT automatically issue public warnings based on this signal. Review ensemble spread and physical diagnostics first.
            </p>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-all shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-100">
                    {alert.region} ({alert.state})
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800 uppercase">
                    Day {alert.leadDay} Horizon
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Bust Probability</div>
                    <div className="text-lg font-black text-rose-400 font-mono">
                      {Math.round(alert.bustProbability * 100)}%
                    </div>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Confidence</div>
                    <div className="text-lg font-black text-white font-mono">
                      {alert.confidence}%
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-slate-400">Primary Reason:</div>
                  <div className="text-slate-200 font-semibold">{alert.primaryReason}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
                  <strong className="block text-[10px] uppercase font-bold text-cyan-400 mb-0.5">
                    Recommended Operational Action:
                  </strong>
                  {alert.recommendedAction}
                </div>

                <div className="text-[10px] text-slate-500 font-mono text-right">
                  {alert.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            Close Operational Advisories
          </button>
        </div>
      </div>
    </div>
  );
};

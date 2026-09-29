import React from 'react';
import { Play, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

interface HeroBannerProps {
  onExplore: () => void;
  onRunDemo: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore, onRunDemo }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-[#0E1B38] to-slate-900 border border-slate-800 p-6 md:p-8 mb-6 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Mission & Core Messaging */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>SIH 2026 Problem Statement ID: SIH26079</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-mono">Ministry of Earth Sciences / NCMRWF</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            VISHWAS – <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-200">AI-Based Forecast Bust Detection</span>
          </h1>

          <p className="text-lg font-medium text-cyan-200/90 italic">
            “Predicting when the forecast may fail, before the verification arrives.”
          </p>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            Operational medium-range NWP guidance (NCUM-G & NEPS-G) occasionally experiences high forecast error ("busts"). 
            <strong className="text-white font-semibold"> VISHWAS</strong> acts as an intelligent post-processing layer to calculate regional forecast bust probability, calibrate confidence metrics, and provide explainable reason codes for duty forecasters.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExplore}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onRunDemo}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold text-sm hover:bg-slate-700/80 hover:border-cyan-400 transition-all shadow-md"
            >
              <Play className="w-4 h-4 fill-cyan-300" />
              <span>Run AI Demo Pipeline</span>
            </button>
          </div>
        </div>

        {/* Right Column: Architectural Clarity Card */}
        <div className="lg:col-span-5 bg-slate-950/80 rounded-xl p-5 border border-cyan-500/20 space-y-3">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-2.5">
            <Info className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              IMPORTANT ARCHITECTURAL CONCEPT
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-semibold">Error Model, Not Weather Model:</strong> Does NOT generate weather predictions. Layers on top of NCUM-G & NEPS-G.
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-semibold">Zero NWP Model Mutation:</strong> Operational forecast models are left 100% untouched.
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-semibold">Explainable Output:</strong> Replaces black-box AI with meteorological reason codes & regime analogs.
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
            <span>Decision Support for IMD/NCMRWF</span>
            <span className="text-cyan-400 font-mono">Day 1 – Day 10 Lead</span>
          </div>
        </div>
      </div>
    </div>
  );
};

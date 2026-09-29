import React from 'react';
import { GitBranch, Database, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export const MLPipeline: React.FC = () => {
  const dataSources = [
    { name: 'NCUM-G Archive', desc: '12 km Global Deterministic Forecasts', format: 'GRIB2 / NetCDF4' },
    { name: 'NEPS-G Archive', desc: '23-member Global Ensemble Perturbations', format: 'Zarr / NetCDF4' },
    { name: 'IMDAA Reanalysis', desc: '12 km Hourly Reanalysis (1979–2020)', format: 'NCMRWF RDS' },
    { name: 'IMD Gridded Obs', desc: '0.25° Daily Rainfall & Temperature Grids', format: 'IMD Pune NetCDF' },
  ];

  const featuresList = [
    { name: 'Ensemble Spread (NEPS-G)', type: 'Variance / StDev', desc: 'Flow-dependent spread across 23 perturbed members.' },
    { name: 'Analog Distance Index', type: 'Euclidean / Cosine', desc: 'Similarity to historical IMDAA reanalysis error regimes.' },
    { name: 'CAPE & Convective Shear', type: 'Thermodynamic', desc: 'Non-linear convective instability and jet shear.' },
    { name: 'Moisture Flux & IVT', type: 'Advection', desc: 'Integrated Vapor Transport from Arabian Sea & Bay of Bengal.' },
    { name: 'Run-to-Run Jumpiness', type: 'Temporal Shift', desc: 'Vector shift between consecutive 00 UTC and 12 UTC cycles.' },
    { name: 'Analysis Increment Mag', type: 'Assimilation', desc: 'Data assimilation innovation jump magnitude.' },
    { name: 'Observation Density', type: 'Spatial Mask', desc: 'AWS & Radiosonde count per 100km² cell.' },
  ];

  const mlModelsList = [
    { name: 'Regime Analogs', algo: 'k-means + k-NN', purpose: 'Finds top 5 historical flow regimes with high forecast error.' },
    { name: 'Bust Classifier', algo: 'XGBoost', purpose: 'Calculates raw regional failure probability per Day 1–10.' },
    { name: 'Spatial Refiner', algo: 'U-Net CNN', purpose: 'Refines regional scores into smooth 0.25° continuous spatial grid.' },
    { name: 'Probability Calibration', algo: 'Isotonic Regression', purpose: 'Calibrates raw probabilities to minimize Brier score.' },
    { name: 'AI Explainability', algo: 'SHAP Attribution', purpose: 'Ranks feature importances and generates meteorological reason codes.' },
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
        <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
          <GitBranch className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            DATA & MACHINE LEARNING PIPELINE ARCHITECTURE
          </h2>
          <p className="text-xs text-cyan-300 font-medium">
            End-to-End Post-Processing Pipeline from Raw NWP Output to Calibrated Bust Risk & Reason Codes
          </p>
        </div>
      </div>

      {/* Grid of Data Sources */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>1. Operational Ingestion Data Sources</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {dataSources.map((ds, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-100">{ds.name}</div>
              <div className="text-[11px] text-slate-400">{ds.desc}</div>
              <div className="inline-block px-2 py-0.5 rounded bg-slate-900 text-cyan-400 font-mono text-[10px] border border-slate-800">
                {ds.format}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engineered Features */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>2. Engineered Predictor Features</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {featuresList.map((f, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">{f.name}</span>
                <span className="text-[10px] text-cyan-400 font-mono">{f.type}</span>
              </div>
              <p className="text-[11px] text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ML Algorithms & Training */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>3. ML Model Architecture & Calibration Stack</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {mlModelsList.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-gradient-to-b from-slate-950 to-[#0A1224] border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase">Stage {idx + 1}</span>
              <h4 className="font-bold text-xs text-white">{m.name}</h4>
              <div className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[10px] border border-cyan-800 inline-block">
                {m.algo}
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">{m.purpose}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Outputs Banner */}
      <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-white">Pipeline Output Artifacts:</span>
          <span className="text-slate-300">Bust Probability Map (0.25°) • Confidence Curves • Reason Codes • GeoJSON REST API</span>
        </div>
        <div className="text-cyan-400 font-mono text-[11px]">
          Runs automatically every 00 UTC cycle
        </div>
      </div>
    </div>
  );
};

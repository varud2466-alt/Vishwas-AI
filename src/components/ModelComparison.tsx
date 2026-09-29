import React from 'react';
import { Layers, ShieldCheck, Database, GitBranch } from 'lucide-react';
import { MODEL_COMPARISON_METRICS } from '../data/mockData';

export const ModelComparison: React.FC = () => {
  const pipelineSteps = [
    { title: 'NCUM-G + NEPS-G', desc: '12km Deterministic & 23-member Ensemble NWP Runs', color: 'border-blue-500 text-blue-400 bg-blue-950/40' },
    { title: 'Feature Extraction', desc: 'Ensemble spread, CAPE, wind shear, IVT, run-to-run jump', color: 'border-sky-500 text-sky-400 bg-sky-950/40' },
    { title: 'Historical Error Archive', desc: 'IMDAA Reanalysis + IMD gridded verification observations', color: 'border-cyan-500 text-cyan-400 bg-cyan-950/40' },
    { title: 'Regime Analogs', desc: 'k-means + k-NN atmospheric pattern matching', color: 'border-teal-500 text-teal-400 bg-teal-950/40' },
    { title: 'XGBoost Bust Classifier', desc: 'Flow-dependent gradient boosted decision trees', color: 'border-indigo-500 text-indigo-400 bg-indigo-950/40' },
    { title: 'U-Net Spatial Refinement', desc: '2D CNN spatial continuity & 0.25° grid refinement', color: 'border-purple-500 text-purple-400 bg-purple-950/40' },
    { title: 'Isotonic Calibration', desc: 'Brier score optimization & probability calibration', color: 'border-pink-500 text-pink-400 bg-pink-950/40' },
    { title: 'SHAP Explainability', desc: 'Attribution & meteorological reason codes', color: 'border-rose-500 text-rose-400 bg-rose-950/40' },
    { title: 'Confidence + Bust Map', desc: 'Calibrated regional failure probability API & Dashboard', color: 'border-emerald-500 text-emerald-400 bg-emerald-950/40' },
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              MODEL COMPARISON & AI POST-PROCESSING PIPELINE
            </h2>
            <p className="text-xs text-cyan-300 font-medium">
              Operational NWP Models (NCUM-G / NEPS-G) vs. VISHWAS Forecast Skill Estimator
            </p>
          </div>
        </div>
      </div>

      {/* Prominent Architectural Statement Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/80 via-blue-950/60 to-slate-950 border border-cyan-500/40 text-slate-100 flex items-center space-x-4">
        <ShieldCheck className="w-8 h-8 text-cyan-400 shrink-0" />
        <div className="space-y-0.5">
          <div className="font-extrabold text-cyan-300 uppercase tracking-wider text-xs">
            CORE SYSTEM RELATIONSHIP
          </div>
          <p className="text-sm font-semibold text-white">
            “VISHWAS does not replace NCUM-G or NEPS-G. It estimates the probability that their forecast may be unreliable.”
          </p>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>Operational NWP vs. Post-Processing Engine Specifications</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MODEL_COMPARISON_METRICS.map((model, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border space-y-4 ${
                model.name === 'VISHWAS'
                  ? 'bg-gradient-to-b from-cyan-950/60 to-slate-950 border-cyan-500/50 shadow-xl shadow-cyan-950/40'
                  : 'bg-slate-950/80 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-black text-lg text-white">{model.name}</h4>
                  <div className="text-xs text-cyan-400 font-mono">{model.type}</div>
                </div>
                {model.name === 'VISHWAS' && (
                  <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-extrabold text-[10px] uppercase">
                    AI Layer
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Horizontal Resolution:</span>
                  <strong className="text-slate-100 font-mono">{model.resolution}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lead Horizon:</span>
                  <strong className="text-slate-100 font-mono">{model.leadTimeRange}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Brier Skill Score:</span>
                  <strong className="text-emerald-400 font-mono">{model.avgBrierScore}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bust ROC-AUC:</span>
                  <strong className="text-cyan-300 font-mono">{model.aucRoc}</strong>
                </div>
              </div>

              <p className="text-xs text-slate-400 border-t border-slate-900 pt-3 leading-relaxed">
                {model.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Pipeline Flowchart */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
          <GitBranch className="w-4 h-4 text-cyan-400" />
          <span>VISHWAS AI Post-Processing Pipeline Architecture</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
          {pipelineSteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${step.color} relative group hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-md bg-slate-950 font-mono text-xs font-bold flex items-center justify-center border border-slate-800">
                  {idx + 1}
                </span>
                <span className="text-[10px] uppercase tracking-widest font-mono text-slate-400">
                  Step {idx + 1}
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-100 mb-1">{step.title}</h4>
              <p className="text-xs text-slate-300 leading-normal">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

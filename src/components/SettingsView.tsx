import React, { useState } from 'react';
import { Settings, Sliders, Database, Shield, Save, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [cycle, setCycle] = useState('00UTC');
  const [highRiskThreshold, setHighRiskThreshold] = useState(0.60);
  const [maskSparseObs, setMaskSparseObs] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
        <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            OPERATIONAL ENGINE SETTINGS
          </h2>
          <p className="text-xs text-cyan-300 font-medium">
            Configure Post-Processing Thresholds, Ingestion Cycles & Forecaster Alerts
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Cycle Config */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-sm font-bold text-slate-200">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>NWP Model Operational Cycle</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Operational Cycle Selection</label>
              <select
                value={cycle}
                onChange={(e) => setCycle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="00UTC">00 UTC Cycle (05:30 IST Main Forecast Run)</option>
                <option value="12UTC">12 UTC Cycle (17:30 IST Update Run)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Spatial Refinement Resolution</label>
              <input
                type="text"
                disabled
                value="0.25° Grid (~28 km) Continuous Field"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-2 text-slate-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* High Risk Threshold Slider */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-200">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>High Bust Risk Alert Threshold</span>
            </div>
            <span className="font-mono text-amber-400 font-bold text-sm">{Math.round(highRiskThreshold * 100)}%</span>
          </div>

          <p className="text-xs text-slate-400">
            Regions exceeding this bust probability will trigger duty forecaster operational advisories.
          </p>

          <input
            type="range"
            min="0.30"
            max="0.85"
            step="0.05"
            value={highRiskThreshold}
            onChange={(e) => setHighRiskThreshold(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>

        {/* Evidence Masking Toggle */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-200">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Low Observation Evidence Masking</span>
            </div>
            <p className="text-xs text-slate-400">
              Mask regions with observation density &lt; 0.05 per 100km² to prevent false confidence.
            </p>
          </div>

          <button
            onClick={() => setMaskSparseObs(!maskSparseObs)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              maskSparseObs ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {maskSparseObs ? 'Enabled (Masking Active)' : 'Disabled'}
          </button>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
          >
            {saved ? <Check className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Settings Saved Successfully!' : 'Save Operational Preferences'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

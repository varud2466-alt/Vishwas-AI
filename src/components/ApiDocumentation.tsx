import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, Globe, Database } from 'lucide-react';

export const ApiDocumentation: React.FC = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/api/v1/bust-risk');
  const [activeLang, setActiveLang] = useState<'curl' | 'python' | 'javascript'>('python');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const sampleJsonResponse: Record<string, any> = {
    '/api/v1/bust-risk': {
      status: 'success',
      cycle: '00 UTC',
      timestamp: '2026-09-29T00:00:00Z',
      region: 'Central India',
      state: 'Madhya Pradesh',
      lead_time: 6,
      bust_probability: 0.72,
      confidence: 0.28,
      risk_level: 'HIGH',
      drivers: [
        'ensemble_spread',
        'flow_regime_mismatch',
        'run_to_run_jumpiness'
      ],
      ai_interpretation: 'Current 500 hPa flow matches 2019 monsoon depression analogs associated with Day 6 track divergence.'
    },
    '/api/v1/confidence-map': {
      cycle: '00 UTC',
      grid_resolution: '0.25deg',
      lead_time: 6,
      total_grid_nodes: 3840,
      bbox: [68.0, 8.0, 97.0, 37.0],
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [77.41, 23.25] },
          properties: { region_id: 'reg-c-mp', bust_prob: 0.72, confidence: 28, risk: 'HIGH' }
        },
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [75.78, 16.12] },
          properties: { region_id: 'reg-n-karnataka', bust_prob: 0.78, confidence: 22, risk: 'HIGH' }
        }
      ]
    },
    '/api/v1/verification': {
      cycle_period: 'Monsoon 2025',
      metrics: {
        avg_brier_score: 0.12,
        brier_skill_score_vs_climatology: 0.54,
        auc_roc: 0.89,
        rmse_reduction_percentage: '31.4%'
      }
    },
    '/api/v1/regions': {
      count: 36,
      regions: [
        { id: 'reg-n-karnataka', name: 'North Karnataka Plateau', state: 'Karnataka', zone: 'South' },
        { id: 'reg-w-rajasthan', name: 'Western Thar Desert', state: 'Rajasthan', zone: 'West' },
        { id: 'reg-c-mp', name: 'Central Narmada Basin', state: 'Madhya Pradesh', zone: 'Central' }
      ]
    }
  };

  const getCodeSnippet = () => {
    if (activeLang === 'curl') {
      return `curl -X GET "https://api.ncmrwf.gov.in/vishwas${selectedEndpoint}?region=Central%20India&lead_time=6&cycle=00UTC" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json"`;
    }
    if (activeLang === 'python') {
      return `import requests

url = "https://api.ncmrwf.gov.in/vishwas${selectedEndpoint}"
params = {
    "region": "Central India",
    "lead_time": 6,
    "cycle": "00UTC"
}
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}

response = requests.get(url, headers=headers, params=params)
data = response.json()
print("Bust Risk:", data.get("bust_probability"))`;
    }
    return `const response = await fetch('https://api.ncmrwf.gov.in/vishwas${selectedEndpoint}?region=Central%20India&lead_time=6&cycle=00UTC', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Accept': 'application/json'
  }
});
const data = await response.json();
console.log('Bust Risk Level:', data.risk_level);`;
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              VISHWAS REST API & GEOJSON DATA FEEDS
            </h2>
            <p className="text-xs text-cyan-300 font-medium">
              Programmatic OpenAPI 3.0 Endpoints for Agromet, Disaster Management & Energy Systems
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-cyan-400">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>Base URL: https://api.ncmrwf.gov.in/vishwas</span>
        </div>
      </div>

      {/* Endpoints Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          { path: '/api/v1/bust-risk', desc: 'Regional Bust Risk & Reasons' },
          { path: '/api/v1/confidence-map', desc: '0.25° GeoJSON Spatial Grid' },
          { path: '/api/v1/verification', desc: 'Historical Skill Scorecards' },
          { path: '/api/v1/regions', desc: 'Monitored Region Directory' },
        ].map((ep) => (
          <button
            key={ep.path}
            onClick={() => setSelectedEndpoint(ep.path)}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedEndpoint === ep.path
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-950/50'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="font-mono text-xs font-bold text-white mb-0.5">GET {ep.path}</div>
            <div className="text-[10px] text-slate-400 truncate">{ep.desc}</div>
          </button>
        ))}
      </div>

      {/* Code Request & Interactive Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code Snippet Box */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Example Code Request</span>
            </span>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              {(['curl', 'python', 'javascript'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-2.5 py-0.5 rounded font-mono text-[11px] uppercase transition-all ${
                    activeLang === lang ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
            <button
              onClick={() => copyToClipboard(getCodeSnippet(), 'code')}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
              title="Copy code"
            >
              {copiedEndpoint === 'code' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="text-cyan-300 leading-relaxed">{getCodeSnippet()}</pre>
          </div>
        </div>

        {/* Live JSON Response Viewer */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Sample JSON Response (HTTP 200 OK)</span>
            </span>

            <button
              onClick={() => copyToClipboard(JSON.stringify(sampleJsonResponse[selectedEndpoint], null, 2), 'json')}
              className="flex items-center space-x-1 text-xs text-slate-400 hover:text-cyan-400"
            >
              {copiedEndpoint === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Response JSON</span>
            </button>
          </div>

          <div className="rounded-xl bg-[#060A12] border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-72">
            <pre className="text-emerald-400 leading-relaxed">
              {JSON.stringify(sampleJsonResponse[selectedEndpoint], null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

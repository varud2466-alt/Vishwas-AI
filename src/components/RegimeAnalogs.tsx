import React, { useState } from 'react';
import { Cpu, History, X } from 'lucide-react';
import type { RegionData } from '../types';
import { HISTORICAL_ANALOGS_LIST } from '../data/mockData';

interface RegimeAnalogsProps {
  selectedRegion: RegionData;
  selectedDay: number;
}

export const RegimeAnalogs: React.FC<RegimeAnalogsProps> = ({ selectedRegion, selectedDay }) => {
  const [showModal, setShowModal] = useState(false);
  const dayData = selectedRegion.leadTimeData[selectedDay];
  const analog = dayData?.historicalAnalog || HISTORICAL_ANALOGS_LIST[0];

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              HISTORICAL REGIME ANALOG MATCHING
            </h2>
            <p className="text-xs text-indigo-300 font-medium">
              k-means Clustering & k-NN Atmospheric Flow Search in IMDAA Reanalysis Archive
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow-lg shadow-indigo-600/20"
        >
          <History className="w-4 h-4" />
          <span>View Similar Past Failure Cases</span>
        </button>
      </div>

      {/* Primary Regime Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Today's Synoptic Pattern */}
        <div className="md:col-span-4 p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
            Today's Atmospheric Flow State
          </div>
          <div className="text-lg font-black text-cyan-300 uppercase tracking-tight">
            {dayData?.regime || 'ACTIVE MONSOON TROUGH'}
          </div>
          <div className="space-y-1.5 text-xs text-slate-300 border-t border-slate-900 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Flow Similarity Score:</span>
              <strong className="text-emerald-400 font-mono text-sm">{dayData?.regimeSimilarity || 86}%</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Reanalysis Reference:</span>
              <span className="text-slate-200 font-mono">IMDAA 12km (1979-2020)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Primary Level:</span>
              <span className="text-slate-200 font-mono">500 hPa Height & 850 hPa Wind</span>
            </div>
          </div>
        </div>

        {/* Historical Analog Details */}
        <div className="md:col-span-8 p-5 rounded-xl bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950 border border-indigo-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center space-x-2">
              <History className="w-4 h-4 text-indigo-400" />
              <span>Top Historical Analog Event</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60 font-mono text-xs font-bold">
              {analog.similarity}% Pattern Match
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-extrabold text-white">
              {analog.title}
            </h3>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono text-xs border border-slate-800">
              {analog.dateRange}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {analog.synopticDescription}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-indigo-950">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Historical Forecast Bust Rate</div>
              <div className="text-xl font-black text-rose-400 font-mono">{analog.bustRate}%</div>
              <div className="text-[10px] text-slate-500">In similar synoptic setups</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Observed Error Pattern</div>
              <div className="text-xs font-medium text-slate-200 line-clamp-2">{analog.observedErrorPattern}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for "View Similar Cases" */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-modal max-w-4xl w-full rounded-2xl p-6 border border-indigo-500/30 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <History className="w-6 h-6 text-indigo-400" />
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Historical Synoptic Analog Archive
                  </h3>
                  <p className="text-xs text-slate-400">
                    IMDAA Reanalysis historical cases matching current atmospheric flow for {selectedRegion.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HISTORICAL_ANALOGS_LIST.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                        {item.similarity}% Similarity
                      </span>
                      <span className="text-[10px] text-slate-400">{item.dateRange}</span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-100">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-normal">{item.synopticDescription}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-900 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Historical Bust Rate:</span>
                      <strong className="text-rose-400 font-mono">{item.bustRate}%</strong>
                    </div>
                    <div className="text-[11px] text-slate-300 italic">{item.observedErrorPattern}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700"
              >
                Close Analog Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

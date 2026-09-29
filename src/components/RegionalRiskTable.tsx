import React, { useState } from 'react';
import { Search, ArrowUpDown, Filter, AlertTriangle, ChevronRight } from 'lucide-react';
import type { RegionData, RiskLevel } from '../types';

interface RegionalRiskTableProps {
  selectedDay: number;
  regions: RegionData[];
  onSelectRegion: (region: RegionData) => void;
  selectedRegionId?: string;
}

export const RegionalRiskTable: React.FC<RegionalRiskTableProps> = ({
  selectedDay,
  regions,
  onSelectRegion,
  selectedRegionId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [sortField, setSortField] = useState<'bustProbability' | 'confidence' | 'name'>('bustProbability');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filter & Sort logic
  const filteredRegions = regions.filter((r) => {
    const dayData = r.leadTimeData[selectedDay];
    if (!dayData) return false;

    const matchesSearch = 
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dayData.primaryDriver.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterRisk !== 'all') {
      return dayData.riskLevel.toLowerCase() === filterRisk.toLowerCase();
    }

    return true;
  });

  filteredRegions.sort((a, b) => {
    const dataA = a.leadTimeData[selectedDay];
    const dataB = b.leadTimeData[selectedDay];

    let valA: any = dataA ? dataA[sortField] : 0;
    let valB: any = dataB ? dataB[sortField] : 0;

    if (sortField === 'name') {
      valA = a.name;
      valB = b.name;
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSort = (field: 'bustProbability' | 'confidence' | 'name') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'Very High':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-950 text-purple-300 border border-purple-800">Very High</span>;
      case 'High':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-950 text-rose-300 border border-rose-800">High</span>;
      case 'Moderate':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-950 text-amber-300 border border-amber-800">Moderate</span>;
      case 'Low':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">Low</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300">Very Low</span>;
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
      {/* Table Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Highest Forecast Bust Risk Rankings</span>
          </h2>
          <p className="text-xs text-slate-400">
            Regional confidence indices & bust probabilities for Day {selectedDay} forecast horizon
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search region, state or driver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-60"
            />
          </div>

          {/* Risk Level Filter */}
          <div className="flex items-center space-x-1 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="bg-transparent text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">All Risk Levels</option>
              <option value="very high">Very High Risk</option>
              <option value="high">High Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950/60">
              <th className="py-3 px-4">Region</th>
              <th className="py-3 px-4">State / Zone</th>
              <th className="py-3 px-4">Lead Horizon</th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-cyan-400"
                onClick={() => toggleSort('bustProbability')}
              >
                <div className="flex items-center space-x-1">
                  <span>Bust Probability</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-cyan-400"
                onClick={() => toggleSort('confidence')}
              >
                <div className="flex items-center space-x-1">
                  <span>Confidence</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4">Risk Level</th>
              <th className="py-3 px-4">Primary Driver</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {filteredRegions.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500 italic">
                  No regions match the selected search or filter criteria.
                </td>
              </tr>
            ) : (
              filteredRegions.map((region) => {
                const dayData = region.leadTimeData[selectedDay];
                if (!dayData) return null;

                const isSelected = selectedRegionId === region.id;

                return (
                  <tr
                    key={region.id}
                    onClick={() => onSelectRegion(region)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-cyan-950/60 border-l-4 border-l-cyan-400 text-slate-100'
                        : 'hover:bg-slate-900/80 text-slate-300'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-slate-200">
                      {region.name}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {region.state} ({region.zone})
                    </td>
                    <td className="py-3 px-4 font-mono text-cyan-300">
                      Day {selectedDay}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-mono font-extrabold text-sm ${
                          dayData.bustProbability >= 0.60 ? 'text-rose-400' : 'text-emerald-400'
                        }`}>
                          {Math.round(dayData.bustProbability * 100)}%
                        </span>
                        <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              dayData.bustProbability >= 0.60 ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${dayData.bustProbability * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-200 font-semibold">
                      {dayData.confidence}%
                    </td>
                    <td className="py-3 px-4">
                      {getRiskBadge(dayData.riskLevel)}
                    </td>
                    <td className="py-3 px-4 text-slate-300 max-w-xs truncate">
                      {dayData.primaryDriver}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-1 rounded bg-slate-800 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

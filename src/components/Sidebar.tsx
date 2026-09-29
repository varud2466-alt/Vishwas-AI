import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  TrendingUp, 
  Table, 
  BrainCircuit, 
  History, 
  Layers, 
  GitBranch, 
  Terminal, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Activity,
  Cpu
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  alertCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'map', label: 'Bust Risk Map', icon: Map, badge: 'Interactive' },
    { id: 'forecast', label: 'Forecast Analysis', icon: TrendingUp },
    { id: 'regional', label: 'Regional Analysis', icon: Table },
    { id: 'explainability', label: 'AI Explainability', icon: BrainCircuit, highlight: true },
    { id: 'analogs', label: 'Regime Analogs', icon: Cpu },
    { id: 'verification', label: 'Historical Verification', icon: History },
    { id: 'model-comp', label: 'Model Comparison', icon: Layers },
    { id: 'pipeline', label: 'Data & Pipeline', icon: GitBranch },
    { id: 'api', label: 'API Documentation', icon: Terminal },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`fixed top-0 left-0 bottom-0 z-40 bg-[#060A12]/95 backdrop-blur-md border-r border-slate-800/80 transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo Section */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/60">
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 text-white font-black text-xl shadow-lg shadow-cyan-500/20">
              V
              <div className="absolute inset-0 rounded-xl border border-cyan-400/40 animate-pulse"></div>
            </div>
            <div>
              <div className="font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-white text-lg leading-tight">
                VISHWAS
              </div>
              <div className="text-[10px] uppercase tracking-wider text-cyan-400/90 font-medium">
                Forecast Confidence Engine
              </div>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 text-white font-black text-xl shadow-lg shadow-cyan-500/20">
            V
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* MoES / NCMRWF Header Tag */}
      {!collapsed && (
        <div className="px-4 py-2.5 bg-slate-900/40 border-b border-slate-800/40 flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-medium text-slate-300">MoES / NCMRWF</span>
          <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono text-[10px]">
            SIH26079
          </span>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/40 text-cyan-300 border border-cyan-500/40 font-medium shadow-md shadow-cyan-950/50'
                  : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200 border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'}`} />
              
              {!collapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}

              {!collapsed && item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {item.badge}
                </span>
              )}

              {!collapsed && item.highlight && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Status Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/80">
        {!collapsed ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>System Status</span>
              </span>
              <span className="flex items-center space-x-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Operational</span>
              </span>
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Last Cycle:</span>
              <span className="text-slate-300 font-semibold">00 UTC (29 Sep 2026)</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="System Operational (00 UTC Cycle)">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        )}
      </div>
    </aside>
  );
};

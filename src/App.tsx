import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { HeroBanner } from './components/HeroBanner';
import { LeadTimeSelector } from './components/LeadTimeSelector';
import { OverviewDashboard } from './components/OverviewDashboard';
import { IndiaBustMap } from './components/IndiaBustMap';
import { RegionalRiskTable } from './components/RegionalRiskTable';
import { ConfidencePanel } from './components/ConfidencePanel';
import { AIExplainability } from './components/AIExplainability';
import { RegimeAnalogs } from './components/RegimeAnalogs';
import { ModelComparison } from './components/ModelComparison';
import { MLPipeline } from './components/MLPipeline';
import { HistoricalVerification } from './components/HistoricalVerification';
import { ApiDocumentation } from './components/ApiDocumentation';
import { SettingsView } from './components/SettingsView';
import { DemoModal } from './components/DemoModal';
import { AlertsDrawer } from './components/AlertsDrawer';
import { RegionDetailModal } from './components/RegionDetailModal';

import { REGIONS_DATA, OPERATIONAL_ALERTS } from './data/mockData';
import type { MapLayerType, RegionData } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [collapsedSidebar, setCollapsedSidebar] = useState<boolean>(false);
  const [selectedLeadDay, setSelectedLeadDay] = useState<number>(6);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(REGIONS_DATA[0]);
  const [activeLayer, setActiveLayer] = useState<MapLayerType>('bust');

  // Modals & Drawers
  const [isDemoOpen, setIsDemoOpen] = useState<boolean>(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState<boolean>(false);
  const [isRegionDetailOpen, setIsRegionDetailOpen] = useState<boolean>(false);

  const handleSelectRegion = (region: RegionData) => {
    setSelectedRegion(region);
    setIsRegionDetailOpen(true);
  };

  const handleDemoComplete = () => {
    setActiveTab('overview');
  };

  const currentRegion = selectedRegion || REGIONS_DATA[0];

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsedSidebar}
        setCollapsed={setCollapsedSidebar}
        alertCount={OPERATIONAL_ALERTS.length}
      />

      {/* Top Header */}
      <TopHeader
        collapsed={collapsedSidebar}
        selectedLeadDay={selectedLeadDay}
        setSelectedLeadDay={setSelectedLeadDay}
        onRunDemo={() => setIsDemoOpen(true)}
        onOpenAlerts={() => setIsAlertsOpen(true)}
        alertCount={OPERATIONAL_ALERTS.length}
      />

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 pt-20 pb-12 px-4 md:px-8 ${
        collapsedSidebar ? 'ml-16' : 'ml-64'
      }`}>
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Hero Banner */}
          {activeTab === 'overview' && (
            <HeroBanner
              onExplore={() => {
                const mapElem = document.getElementById('main-map-section');
                mapElem?.scrollIntoView({ behavior: 'smooth' });
              }}
              onRunDemo={() => setIsDemoOpen(true)}
            />
          )}

          {/* Global Forecast Horizon Selector (Day 1 - Day 10) */}
          <LeadTimeSelector
            selectedDay={selectedLeadDay}
            onSelectDay={setSelectedLeadDay}
          />

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <OverviewDashboard
                selectedDay={selectedLeadDay}
                regions={REGIONS_DATA}
                onSelectRegion={handleSelectRegion}
              />

              {/* Main Interactive Map Section */}
              <div id="main-map-section">
                <IndiaBustMap
                  selectedDay={selectedLeadDay}
                  regions={REGIONS_DATA}
                  selectedRegion={selectedRegion}
                  onSelectRegion={handleSelectRegion}
                  activeLayer={activeLayer}
                  setActiveLayer={setActiveLayer}
                />
              </div>

              {/* Confidence Decay Panel & Table */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-12">
                  <ConfidencePanel
                    selectedRegion={selectedRegion}
                    selectedDay={selectedLeadDay}
                  />
                </div>
              </div>

              <RegionalRiskTable
                selectedDay={selectedLeadDay}
                regions={REGIONS_DATA}
                onSelectRegion={handleSelectRegion}
                selectedRegionId={selectedRegion?.id}
              />

              <AIExplainability
                selectedRegion={currentRegion}
                selectedDay={selectedLeadDay}
              />

              <RegimeAnalogs
                selectedRegion={currentRegion}
                selectedDay={selectedLeadDay}
              />
            </div>
          )}

          {/* TAB 2: BUST RISK MAP */}
          {activeTab === 'map' && (
            <div className="space-y-6">
              <IndiaBustMap
                selectedDay={selectedLeadDay}
                regions={REGIONS_DATA}
                selectedRegion={selectedRegion}
                onSelectRegion={handleSelectRegion}
                activeLayer={activeLayer}
                setActiveLayer={setActiveLayer}
              />

              <RegionalRiskTable
                selectedDay={selectedLeadDay}
                regions={REGIONS_DATA}
                onSelectRegion={handleSelectRegion}
                selectedRegionId={selectedRegion?.id}
              />
            </div>
          )}

          {/* TAB 3: FORECAST ANALYSIS */}
          {activeTab === 'forecast' && (
            <div className="space-y-6">
              <ConfidencePanel
                selectedRegion={selectedRegion}
                selectedDay={selectedLeadDay}
              />

              <AIExplainability
                selectedRegion={currentRegion}
                selectedDay={selectedLeadDay}
              />
            </div>
          )}

          {/* TAB 4: REGIONAL ANALYSIS */}
          {activeTab === 'regional' && (
            <div className="space-y-6">
              <RegionalRiskTable
                selectedDay={selectedLeadDay}
                regions={REGIONS_DATA}
                onSelectRegion={handleSelectRegion}
                selectedRegionId={selectedRegion?.id}
              />

              <AIExplainability
                selectedRegion={currentRegion}
                selectedDay={selectedLeadDay}
              />
            </div>
          )}

          {/* TAB 5: AI EXPLAINABILITY */}
          {activeTab === 'explainability' && (
            <div className="space-y-6">
              <AIExplainability
                selectedRegion={currentRegion}
                selectedDay={selectedLeadDay}
              />

              <RegimeAnalogs
                selectedRegion={currentRegion}
                selectedDay={selectedLeadDay}
              />
            </div>
          )}

          {/* TAB 6: REGIME ANALOGS */}
          {activeTab === 'analogs' && (
            <div className="space-y-6">
              <RegimeAnalogs
                selectedRegion={currentRegion}
                selectedDay={selectedLeadDay}
              />
            </div>
          )}

          {/* TAB 7: HISTORICAL VERIFICATION */}
          {activeTab === 'verification' && (
            <div className="space-y-6">
              <HistoricalVerification />
            </div>
          )}

          {/* TAB 8: MODEL COMPARISON */}
          {activeTab === 'model-comp' && (
            <div className="space-y-6">
              <ModelComparison />
            </div>
          )}

          {/* TAB 9: DATA & PIPELINE */}
          {activeTab === 'pipeline' && (
            <div className="space-y-6">
              <MLPipeline />
              <ModelComparison />
            </div>
          )}

          {/* TAB 10: API DOCUMENTATION */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <ApiDocumentation />
            </div>
          )}

          {/* TAB 11: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <SettingsView />
            </div>
          )}

        </div>
      </main>

      {/* Modals & Drawers */}
      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onComplete={handleDemoComplete}
      />

      <AlertsDrawer
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        alerts={OPERATIONAL_ALERTS}
      />

      {isRegionDetailOpen && (
        <RegionDetailModal
          region={selectedRegion}
          selectedDay={selectedLeadDay}
          onClose={() => setIsRegionDetailOpen(false)}
        />
      )}
    </div>
  );
}

export default App;

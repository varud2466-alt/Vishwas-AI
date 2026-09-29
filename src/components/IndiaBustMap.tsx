import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  RotateCcw, 
  Sliders, 
  Info
} from 'lucide-react';
import type { MapLayerType, RegionData } from '../types';

interface IndiaBustMapProps {
  selectedDay: number;
  regions: RegionData[];
  selectedRegion: RegionData | null;
  onSelectRegion: (region: RegionData) => void;
  activeLayer: MapLayerType;
  setActiveLayer: (layer: MapLayerType) => void;
}

export const IndiaBustMap: React.FC<IndiaBustMapProps> = ({
  selectedDay,
  regions,
  selectedRegion,
  onSelectRegion,
  activeLayer,
  setActiveLayer
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  const [opacity, setOpacity] = useState<number>(0.75);

  // Helper to color grid cells based on layer
  const getCellColor = (region: RegionData) => {
    const data = region.leadTimeData[selectedDay];
    if (!data) return '#334155';

    if (activeLayer === 'obs_density' && data.observationDensity.includes('Sparse')) {
      return '#475569'; // Masked gray
    }

    if (activeLayer === 'bust') {
      const prob = data.bustProbability;
      if (prob >= 0.80) return '#991B1B'; // Dark Crimson Very High
      if (prob >= 0.60) return '#EF4444'; // Red High
      if (prob >= 0.40) return '#F59E0B'; // Amber Moderate
      if (prob >= 0.20) return '#10B981'; // Green Low
      return '#059669'; // Emerald Very Low
    }

    if (activeLayer === 'confidence') {
      const conf = data.confidence;
      if (conf >= 80) return '#059669';
      if (conf >= 60) return '#10B981';
      if (conf >= 40) return '#F59E0B';
      if (conf >= 20) return '#EF4444';
      return '#991B1B';
    }

    if (activeLayer === 'error') {
      const rmse = data.forecastErrorRMSE;
      if (rmse > 20) return '#991B1B';
      if (rmse > 12) return '#EF4444';
      if (rmse > 7) return '#F59E0B';
      return '#059669';
    }

    if (activeLayer === 'obs_density') {
      if (data.observationDensity === 'High') return '#059669';
      if (data.observationDensity === 'Medium') return '#3B82F6';
      if (data.observationDensity === 'Low') return '#F59E0B';
      return '#64748B';
    }

    if (activeLayer === 'spread') {
      const spread = data.ensembleSpread;
      if (spread > 75) return '#991B1B';
      if (spread > 50) return '#EF4444';
      if (spread > 30) return '#F59E0B';
      return '#059669';
    }

    return '#3B82F6';
  };

  // Initialize Map Instance
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Dark Map Tile Layer (CartoDB Dark Matter)
    const map = L.map(mapContainerRef.current, {
      center: [22.5937, 78.9629],
      zoom: 5,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    L.control.zoom({ position: 'topleft' }).addTo(map);

    layerGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Grid Polygons when selectedDay, activeLayer, regions or opacity change
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    regions.forEach((region) => {
      const dayData = region.leadTimeData[selectedDay];
      if (!dayData) return;

      const isSelected = selectedRegion?.id === region.id;
      const fillColor = getCellColor(region);

      // Construct bounding box around region lat/lng if not explicitly provided
      const delta = 1.3;
      const bounds: L.LatLngBoundsExpression = region.bounds || [
        [region.lat - delta, region.lng - delta],
        [region.lat + delta, region.lng + delta]
      ];

      const isMasked = activeLayer === 'obs_density' && dayData.observationDensity.includes('Sparse');

      const rectangle = L.rectangle(bounds, {
        color: isSelected ? '#38BDF8' : isMasked ? '#64748B' : fillColor,
        weight: isSelected ? 3 : 1.2,
        fillColor: fillColor,
        fillOpacity: isMasked ? 0.35 : opacity,
        dashArray: isMasked ? '4, 4' : undefined,
        className: 'grid-cell-glow'
      });

      // Bind Tooltip
      const popupContent = `
        <div style="font-family: inherit; font-size: 12px; padding: 4px;">
          <div style="font-weight: 800; font-size: 14px; color: #38BDF8; margin-bottom: 2px;">
            ${region.name} (${region.state})
          </div>
          <div style="color: #94A3B8; margin-bottom: 6px;">Lead Horizon: Day ${selectedDay}</div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px; border-bottom: 1px solid #334155; padding-bottom: 4px;">
            <span>Bust Probability:</span>
            <strong style="color: ${dayData.bustProbability >= 0.6 ? '#EF4444' : '#10B981'}; font-size: 13px;">
              ${Math.round(dayData.bustProbability * 100)}%
            </strong>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Forecast Confidence:</span>
            <strong style="color: #F8FAFC;">${dayData.confidence}%</strong>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Risk Level:</span>
            <span style="font-weight: 700; color: ${dayData.riskLevel === 'High' || dayData.riskLevel === 'Very High' ? '#EF4444' : '#F59E0B'}">
              ${dayData.riskLevel}
            </span>
          </div>

          <div style="font-size: 10px; color: #94A3B8; margin-top: 6px;">
            Primary Driver: <span style="color: #CBD5E1;">${dayData.primaryDriver}</span>
          </div>

          ${isMasked ? `
            <div style="margin-top: 6px; padding: 4px; background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 4px; color: #FCA5A5; font-size: 10px;">
              ⚠️ Insufficient Observation Evidence (Masked)
            </div>
          ` : ''}
        </div>
      `;

      rectangle.bindTooltip(popupContent, { sticky: true });

      rectangle.on('click', () => {
        onSelectRegion(region);
      });

      rectangle.addTo(layerGroup);
    });
  }, [selectedDay, activeLayer, opacity, regions, selectedRegion]);

  const resetMapView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([22.5937, 78.9629], 5);
    }
  };

  return (
    <div className="relative glass-panel rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Map Header Toolbar */}
      <div className="p-4 bg-slate-950/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
            India Forecast Bust Risk Heatmap (0.25° Grid)
          </h2>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/60 font-mono text-[10px]">
            Day {selectedDay} Horizon
          </span>
        </div>

        {/* Layer Selector Buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
          {[
            { id: 'bust', label: 'Bust Probability' },
            { id: 'confidence', label: 'Forecast Confidence' },
            { id: 'error', label: 'Forecast Error' },
            { id: 'obs_density', label: 'Observation Density' },
            { id: 'spread', label: 'Ensemble Spread' },
          ].map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id as MapLayerType)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeLayer === layer.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Leaflet Map Viewport */}
      <div className="relative h-[520px] w-full">
        <div ref={mapContainerRef} className="h-full w-full z-10" />

        {/* Top Right Controls Overlay */}
        <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
          <button
            onClick={resetMapView}
            className="p-2.5 rounded-xl bg-slate-900/90 backdrop-blur border border-slate-700 text-cyan-400 hover:bg-slate-800 transition-colors shadow-lg"
            title="Reset Map Bounds"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Floating Legend Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-950/90 backdrop-blur border border-slate-800 rounded-xl p-3 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          {/* Opacity Slider */}
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Grid Opacity:</span>
            <input
              type="range"
              min="0.2"
              max="1.0"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-24 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="font-mono text-cyan-300 w-8">{Math.round(opacity * 100)}%</span>
          </div>

          {/* Color Legend scale */}
          <div className="flex items-center space-x-3 text-xs">
            <span className="font-bold text-slate-300">
              {activeLayer === 'bust' && 'Bust Risk Legend:'}
              {activeLayer === 'confidence' && 'Confidence Legend:'}
              {activeLayer === 'error' && 'RMSE Error Legend:'}
              {activeLayer === 'obs_density' && 'Obs Density:'}
              {activeLayer === 'spread' && 'Ensemble Spread:'}
            </span>

            {activeLayer === 'bust' && (
              <div className="flex items-center space-x-1.5 font-mono text-[10px]">
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#059669]"></span><span>0.00-0.20 Very Low</span></span>
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#10B981]"></span><span>0.20-0.40 Low</span></span>
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#F59E0B]"></span><span>0.40-0.60 Mod</span></span>
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#EF4444]"></span><span>0.60-0.80 High</span></span>
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#991B1B]"></span><span>0.80-1.00 Extreme</span></span>
              </div>
            )}

            {activeLayer === 'confidence' && (
              <div className="flex items-center space-x-1.5 font-mono text-[10px]">
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#059669]"></span><span>≥ 80% High</span></span>
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#F59E0B]"></span><span>40-79% Mod</span></span>
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#991B1B]"></span><span>&lt; 40% Low</span></span>
              </div>
            )}

            {activeLayer === 'obs_density' && (
              <div className="flex items-center space-x-1.5 font-mono text-[10px]">
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#059669]"></span><span>High</span></span>
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#3B82F6]"></span><span>Medium</span></span>
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#F59E0B]"></span><span>Low</span></span>
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#64748B] border border-dashed border-red-400"></span><span className="text-red-300 font-bold">Masked (Sparse Evidence)</span></span>
              </div>
            )}

            {(activeLayer === 'error' || activeLayer === 'spread') && (
              <div className="flex items-center space-x-1.5 font-mono text-[10px]">
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#059669]"></span><span>Low</span></span>
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#F59E0B]"></span><span>Moderate</span></span>
                <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-[#991B1B]"></span><span>High Variance</span></span>
              </div>
            )}
          </div>

          <div className="text-[11px] text-cyan-400/90 italic flex items-center space-x-1">
            <Info className="w-3.5 h-3.5" />
            <span>Click any grid polygon to inspect detailed AI drivers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

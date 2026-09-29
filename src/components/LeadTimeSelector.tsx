import React from 'react';
import { Calendar } from 'lucide-react';

interface LeadTimeSelectorProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export const LeadTimeSelector: React.FC<LeadTimeSelectorProps> = ({ selectedDay, onSelectDay }) => {
  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl p-3 mb-6 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Forecast Horizon Selector (Lead Time)
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-xs text-slate-400">
            Select Lead Horizon to update Risk Maps, Confidence Scores & Driver Attribution
          </span>
        </div>
        <div className="text-[11px] text-cyan-400 font-mono font-medium">
          Active: <span className="underline decoration-cyan-400">Day {selectedDay} Forecast</span>
        </div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pt-1">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => onSelectDay(day)}
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-lg border text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-md shadow-cyan-500/30 scale-105'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="text-[10px] uppercase font-mono tracking-tight opacity-80">
                Lead
              </span>
              <span className="text-sm md:text-base font-extrabold leading-none mt-0.5">
                DAY {day}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

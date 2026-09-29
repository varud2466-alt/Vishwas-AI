import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Sparkles, X, BrainCircuit } from 'lucide-react';
import { DEMO_STEPS_FLOW } from '../data/mockData';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
      setIsRunning(true);
      setIsFinished(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isRunning || isFinished) return;

    if (currentStepIndex < DEMO_STEPS_FLOW.length) {
      const step = DEMO_STEPS_FLOW[currentStepIndex];
      const timer = setTimeout(() => {
        if (currentStepIndex + 1 < DEMO_STEPS_FLOW.length) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsFinished(true);
          setIsRunning(false);
        }
      }, step.durationMs);

      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, isRunning, isFinished]);

  if (!isOpen) return null;

  const handleFinish = () => {
    onComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="glass-modal max-w-2xl w-full rounded-2xl p-6 border border-cyan-500/40 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <BrainCircuit className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight flex items-center space-x-2">
                <span>VISHWAS AI INFERENCE DEMO RUNNER</span>
              </h3>
              <p className="text-xs text-cyan-300 font-medium">
                Simulating Post-Processing Pipeline Execution for 00 UTC NCMRWF Operational Cycle
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pipeline Execution Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Execution Progress:</span>
            <span className="text-cyan-400 font-bold">
              {isFinished ? '100% COMPLETE' : `Stage ${currentStepIndex + 1} of ${DEMO_STEPS_FLOW.length}`}
            </span>
          </div>

          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 transition-all duration-300"
              style={{
                width: isFinished 
                  ? '100%' 
                  : `${Math.round(((currentStepIndex + 1) / DEMO_STEPS_FLOW.length) * 100)}%`
              }}
            ></div>
          </div>

          {/* Steps List */}
          <div className="space-y-2 pt-2 max-h-64 overflow-y-auto">
            {DEMO_STEPS_FLOW.map((step, idx) => {
              const isDone = isFinished || idx < currentStepIndex;
              const isCurrent = !isFinished && idx === currentStepIndex;

              return (
                <div
                  key={step.id}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    isCurrent
                      ? 'bg-cyan-950/80 border-cyan-500/60 text-cyan-200 shadow-md shadow-cyan-950/40'
                      : isDone
                      ? 'bg-slate-950/90 border-slate-800 text-slate-300'
                      : 'bg-slate-950/40 border-slate-900 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-0.5">
                    <div className="flex items-center space-x-2.5">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-500 text-[10px] font-mono flex items-center justify-center">
                          {idx + 1}
                        </span>
                      )}
                      <span>{step.label}</span>
                    </div>
                    {isCurrent && (
                      <span className="text-[10px] font-mono text-cyan-400 animate-pulse">Processing...</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 pl-6 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Finished State Banner & Button */}
        {isFinished && (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-sm uppercase tracking-wider">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>ANALYSIS COMPLETE – DASHBOARD UPDATED</span>
            </div>
            <p className="text-xs text-slate-200">
              Calibrated regional forecast bust probabilities, confidence scores, and SHAP reason codes have been re-calculated across all 36 Indian sub-regions for Day 1 – Day 10.
            </p>
            <button
              onClick={handleFinish}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20"
            >
              Apply Demo Outputs to Operational Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

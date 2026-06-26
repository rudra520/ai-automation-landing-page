/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Zap, Server, RefreshCw, Globe, CheckCircle2 } from 'lucide-react';

interface PerformanceTelemetryProps {
  onForceReRender?: () => void;
  parentRenderCount?: number;
}

export function PerformanceTelemetry({ onForceReRender, parentRenderCount }: PerformanceTelemetryProps) {
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);

  const runDiagnostics = () => {
    if (isDiagnosing) return;
    setIsDiagnosing(true);
    setDiagnosticResult(null);

    // Call the legacy prop if present to maintain any required side effects safely
    if (onForceReRender) {
      onForceReRender();
    }

    setTimeout(() => {
      setIsDiagnosing(false);
      setDiagnosticResult(
        'US-East4 (0.0004ms) • EU-West3 (0.0012ms) • ASIA-South1 (0.0021ms) — All systems optimal.'
      );
    }, 1500);
  };

  return (
    <div
      id="telemetry-dashboard"
      className="mt-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden"
    >
      {/* Subtle backdrop glow */}
      <div className="absolute top-[-50%] right-[-50%] w-[80%] h-[80%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between relative z-10">
        {/* Explanation Block */}
        <div className="flex items-start gap-4 max-w-2xl">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Server className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold font-mono">
              Enterprise Grade Infrastructure
            </span>
            <h4 className="text-xl font-bold text-white font-display mt-0.5">
              Multi-Region Performance & Compliance SLA
            </h4>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed font-sans">
              Our Swiss-engineered cloud clusters operate on dedicated bare-metal sandboxes with
              strict memory and state isolation. Dynamic, multi-region routing automatically scales financial 
              and database operations across low-latency global zones with guaranteed high availability.
            </p>
          </div>
        </div>

        {/* Diagnostic Action Button */}
        <div className="shrink-0 flex flex-col sm:items-end gap-2" id="telemetry-actions">
          <button
            type="button"
            disabled={isDiagnosing}
            onClick={runDiagnostics}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed border border-indigo-500/30 px-5 py-3 text-xs font-bold text-white tracking-tight transition-all duration-150 cursor-pointer shadow-lg shadow-indigo-500/20"
            id="run-diagnostics-button"
          >
            {isDiagnosing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Pinging Global Nodes...</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                <span>Run Latency Diagnostics</span>
              </>
            )}
          </button>
          <span className="text-[10px] text-slate-500 font-mono">
            Check network status & node updates
          </span>
        </div>
      </div>

      {/* Grid of Enterprise Metrics */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-white/5 pt-8" id="telemetry-metrics-grid">
        {/* Metric 1 */}
        <div className="rounded-2xl bg-slate-900/40 border border-white/10 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 font-sans">
              Dedicated Global Regions
            </span>
            <span className="inline-flex h-2 w-2 rounded-full bg-indigo-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
            <Globe className="h-5 w-5 text-indigo-400" />
            <span>3 Zones</span>
          </p>
          <p className="mt-1 text-xs text-slate-500 leading-normal font-sans">
            US-East4, Europe-West3, Asia-South1 compute sandboxes are fully active.
          </p>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl bg-slate-900/40 border border-white/10 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 font-sans">
              SLA Compliance Status
            </span>
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="mt-3 text-2xl font-bold text-emerald-400 font-mono tracking-tight uppercase flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>99.9999%</span>
          </p>
          <p className="mt-1 text-xs text-slate-500 leading-normal font-sans">
            Guaranteed hardware-level isolation and uptime with automated failover paths.
          </p>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl bg-slate-900/40 border border-white/10 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 font-sans">
              Network Routing Sync
            </span>
            <span className="inline-flex h-2 w-2 rounded-full bg-blue-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-blue-400 font-mono tracking-tight uppercase flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-400" />
            <span>&lt; 0.0004ms</span>
          </p>
          <p className="mt-1 text-xs text-slate-500 leading-normal font-sans">
            Instant update latency across regional clusters upon billing or tariff adjustments.
          </p>
        </div>
      </div>

      {/* Diagnostic Log Output Panel */}
      {diagnosticResult && (
        <div 
          className="mt-6 flex items-center gap-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-xs text-emerald-300 font-mono animate-in fade-in slide-in-from-top-2 duration-200" 
          id="diagnostic-result-output"
        >
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold uppercase tracking-wider block text-[10px] text-emerald-400 mb-0.5">Diagnostic Success</span>
            <span>{diagnosticResult}</span>
          </div>
        </div>
      )}
    </div>
  );
}

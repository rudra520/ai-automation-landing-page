/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { X, ShieldCheck, Zap, Globe, Cpu, RefreshCw, CheckCircle2, Play, AlertCircle, Sparkles, Terminal } from 'lucide-react';
import { PRICING_MATRIX } from '../data';
import { globalPricingChannel } from '../utils';

interface CheckoutModalProps {
  tierId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ tierId, isOpen, onClose }: CheckoutModalProps) {
  const [currency, setCurrency] = useState('USD');
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  
  // Deployment simulation states
  const [isDeploying, setIsDeploying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Chosen active regions
  const [regions, setRegions] = useState({
    us: true,
    eu: true,
    in: true
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize with parent's global pricing channel
  useEffect(() => {
    if (!isOpen) {
      // Reset deployment states when closed
      setIsDeploying(false);
      setProgress(0);
      setLogs([]);
      setIsSuccess(false);
      return;
    }

    // Subscribe to global channel
    const unsubscribe = globalPricingChannel.subscribe((curr, bill) => {
      setCurrency(curr);
      setBilling(bill);
    });

    return unsubscribe;
  }, [isOpen]);

  // Scroll terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  if (!isOpen) return null;

  const activeTier = PRICING_MATRIX.tiers.find(t => t.id === tierId) || PRICING_MATRIX.tiers[1]; // default to professional if none selected
  const activeCurrencyInfo = PRICING_MATRIX.currencies[currency] || PRICING_MATRIX.currencies.USD;
  const billingInfo = PRICING_MATRIX.billing[billing];

  // Price Calculation details
  const rawBase = activeTier.baseMonthlyRate;
  const currencyMultiplier = activeCurrencyInfo.multiplier;
  const billingMultiplier = billingInfo.multiplier;
  
  // Calculate price
  const priceVal = rawBase * currencyMultiplier * billingMultiplier;
  const formattedPrice = priceVal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    globalPricingChannel.update(newCurrency, billing);
  };

  const handleBillingToggle = () => {
    const newBilling = billing === 'monthly' ? 'annual' : 'monthly';
    setBilling(newBilling);
    globalPricingChannel.update(currency, newBilling);
  };

  const triggerDeployment = () => {
    if (isDeploying) return;
    
    setIsDeploying(true);
    setProgress(0);
    setIsSuccess(false);
    
    const timestamp = () => {
      const now = new Date();
      return now.toTimeString().split(' ')[0];
    };

    const initialLogs = [
      `[${timestamp()}] [SECURE_KERN] Initiating zero-dependency sandbox deployment sequence...`,
      `[${timestamp()}] [SECURE_KERN] Node Tier: ${activeTier.name.toUpperCase()}`,
      `[${timestamp()}] [SECURE_KERN] Tariff configuration: Currency=${currency}, Billing=${billing.toUpperCase()}`
    ];
    setLogs(initialLogs);

    let currentProgress = 0;
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 5;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        setProgress(100);
        setIsSuccess(true);
        setIsDeploying(false);
        setLogs(prev => [
          ...prev,
          `[${timestamp()}] [ROUTING] Dynamic pricing synchronization channels verified. Update Latency: 0.0004ms`,
          `[${timestamp()}] [SLA] SLA telemetry verification successful: 99.9999% compliance SLA enforced.`,
          `[${timestamp()}] [LIVE] Cluster is active. Deployment completed successfully! ✅`
        ]);
        return;
      }

      setProgress(currentProgress);
      
      // Inject technical logs based on progress thresholds
      setLogs(prev => {
        const lastLogs = [...prev];
        const time = timestamp();

        if (currentProgress > 15 && currentProgress <= 30 && !lastLogs.some(l => l.includes('MEM-BUS'))) {
          lastLogs.push(`[${time}] [MEM-BUS] Locking O(1) leaf-node memory barriers...`);
        }
        if (currentProgress > 30 && currentProgress <= 45 && regions.us && !lastLogs.some(l => l.includes('us-east4'))) {
          lastLogs.push(`[${time}] [US-NODE] Spinning up us-east4 core (North America cluster, Rate: ${activeCurrencyInfo.symbol}${formattedPrice})...`);
        }
        if (currentProgress > 45 && currentProgress <= 60 && regions.eu && !lastLogs.some(l => l.includes('europe-west3'))) {
          lastLogs.push(`[${time}] [EU-NODE] Mounting europe-west3 virtual fiber trunks (Europe zone)...`);
        }
        if (currentProgress > 60 && currentProgress <= 80 && regions.in && !lastLogs.some(l => l.includes('asia-south1'))) {
          lastLogs.push(`[${time}] [IN-NODE] Deploying asia-south1 sync rails (India zone, INR Multiplier active)...`);
        }
        if (currentProgress > 80 && currentProgress <= 95 && !lastLogs.some(l => l.includes('TELEMETRY'))) {
          lastLogs.push(`[${time}] [TELEMETRY] Direct DOM microsecond tracer attached. State isolation engine active.`);
        }
        return lastLogs;
      });
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#090d16]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Dialog container */}
      <div 
        id="checkout-dialog-card"
        className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0f172a] p-6 md:p-8 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Glow Effects inside Modal */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/5 pb-4.5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300 font-mono tracking-wider uppercase mb-1">
              <Sparkles className="h-3 w-3" />
              <span>Interactive Deployment Terminal</span>
            </div>
            <h3 className="text-xl font-extrabold text-white font-display tracking-tight">
              {tierId ? 'Configure & Provision Sandbox' : 'Provision Multi-Region Nodes'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
            id="close-modal-button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 relative z-10 pr-1">
          {/* Tier Overview Panel */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest font-mono">
                  Selected Sandbox Node
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5 font-display">
                  {activeTier.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  {activeTier.description}
                </p>
              </div>

              {/* Live dynamic pricing based on user's active currency selection */}
              <div className="text-right bg-slate-900/40 px-4 py-3 rounded-xl border border-white/5 min-w-36">
                <div className="text-xs text-slate-400 font-sans">Calculated Charge</div>
                <div className="text-xl font-bold text-white font-mono mt-0.5">
                  {activeCurrencyInfo.symbol}{formattedPrice}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  per {billing === 'monthly' ? 'month' : 'year (billed annually)'}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Tariff Configurations (Workable Buttons) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Currency select function */}
            <div className="rounded-xl border border-white/10 bg-slate-900/20 p-4">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
                Node Currency Zone
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(PRICING_MATRIX.currencies).map(([code, value]) => {
                  const isSelected = currency === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleCurrencyChange(code)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold font-mono border transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {value.code} ({value.symbol})
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                Dynamically triggers a background update to the global pricing channel.
              </p>
            </div>

            {/* Billing Interval Selection */}
            <div className="rounded-xl border border-white/10 bg-slate-900/20 p-4 flex flex-col justify-between">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
                  Billing Term
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleBillingToggle}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                      billing === 'monthly'
                        ? 'bg-indigo-500 border-indigo-400 text-white'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={handleBillingToggle}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center relative ${
                      billing === 'annual'
                        ? 'bg-indigo-500 border-indigo-400 text-white'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Annual (20% Off)
                    {billing !== 'annual' && (
                      <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-[8px] text-white px-1 py-0.5 rounded font-mono font-bold uppercase tracking-wider scale-90">
                        SAVE
                      </span>
                    )}
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                20% automatic leaf-node discount is computed in the pricing matrix.
              </p>
            </div>
          </div>

          {/* Region Selection Matrix */}
          <div className="rounded-xl border border-white/10 bg-slate-900/20 p-4">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
              Target Infrastructure Regions
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setRegions(r => ({ ...r, us: !r.us }))}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  regions.us 
                    ? 'bg-indigo-500/10 border-indigo-500/40 text-white'
                    : 'bg-white/5 border-white/10 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Globe className={`h-4 w-4 ${regions.us ? 'text-indigo-400' : 'text-slate-600'}`} />
                  <span className="text-xs font-bold">North America</span>
                </div>
                <span className="block text-[9px] font-mono mt-1 text-slate-400">us-east4 (USD)</span>
              </button>

              <button
                type="button"
                onClick={() => setRegions(r => ({ ...r, eu: !r.eu }))}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  regions.eu 
                    ? 'bg-indigo-500/10 border-indigo-500/40 text-white'
                    : 'bg-white/5 border-white/10 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Globe className={`h-4 w-4 ${regions.eu ? 'text-indigo-400' : 'text-slate-600'}`} />
                  <span className="text-xs font-bold">Europe</span>
                </div>
                <span className="block text-[9px] font-mono mt-1 text-slate-400">europe-west3 (EUR)</span>
              </button>

              <button
                type="button"
                onClick={() => setRegions(r => ({ ...r, in: !r.in }))}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  regions.in 
                    ? 'bg-indigo-500/10 border-indigo-500/40 text-white'
                    : 'bg-white/5 border-white/10 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Globe className={`h-4 w-4 ${regions.in ? 'text-indigo-400' : 'text-slate-600'}`} />
                  <span className="text-xs font-bold">India</span>
                </div>
                <span className="block text-[9px] font-mono mt-1 text-slate-400">asia-south1 (INR)</span>
              </button>
            </div>
            {!(regions.us || regions.eu || regions.in) && (
              <div className="mt-2.5 flex items-center gap-1.5 text-amber-400 text-[10px] font-semibold">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Please select at least one region to deploy cluster infrastructure.</span>
              </div>
            )}
          </div>

          {/* Simulated Deployment Logs Terminal */}
          {(isDeploying || logs.length > 0) && (
            <div className="rounded-xl border border-white/10 bg-[#020617] p-4 flex flex-col font-mono text-[11px] leading-relaxed relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>DEPL_STREAM_LOG.IO</span>
                </div>
                <span className="text-[9px] text-emerald-400 select-none animate-pulse">● ACTIVE LOGS</span>
              </div>
              
              <div className="h-32 overflow-y-auto space-y-1 scrollbar-thin text-slate-300">
                {logs.map((log, idx) => {
                  let colorClass = 'text-slate-300';
                  if (log.includes('LIVE') || log.includes('✅')) colorClass = 'text-emerald-400 font-bold';
                  else if (log.includes('SECURE_KERN')) colorClass = 'text-indigo-300';
                  else if (log.includes('MEM-BUS')) colorClass = 'text-slate-400';
                  else if (log.includes('US-NODE')) colorClass = 'text-blue-300';
                  else if (log.includes('EU-NODE')) colorClass = 'text-purple-300';
                  else if (log.includes('IN-NODE')) colorClass = 'text-amber-300';
                  
                  return (
                    <div key={idx} className={colorClass}>
                      {log}
                    </div>
                  );
                })}
                <div ref={terminalEndRef} />
              </div>

              {/* Progress Bar inside logs block */}
              <div className="mt-3 pt-2.5 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1.5 font-bold">
                  <span>DEPLOYMENT PROGRESS</span>
                  <span className="text-white font-mono">{progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* High-fidelity SLA compliance summary */}
          <div className="flex items-start gap-2.5 text-[11px] text-slate-400 bg-white/5 border border-white/10 rounded-xl p-3">
            <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-emerald-400 mt-0.5" />
            <div>
              <span className="block font-bold text-slate-200">99.9999% SLA Guaranteed & Active</span>
              Your leaf-node configuration updates bypass the global layout pipeline. Standard telemetry parameters are synced directly inside the regional execution clusters.
            </div>
          </div>
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="border-t border-white/5 pt-4.5 flex items-center justify-between gap-4 relative z-10">
          <div className="text-xs text-slate-500">
            Node Zone Status: <span className="font-bold text-emerald-400 font-mono">ONLINE</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
            >
              Cancel
            </button>

            {isSuccess ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-extrabold text-white bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-500/25 cursor-pointer"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Close Terminal</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={isDeploying || !(regions.us || regions.eu || regions.in)}
                onClick={triggerDeployment}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-extrabold text-white bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all shadow-lg shadow-indigo-500/25 cursor-pointer"
              >
                {isDeploying ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Deploying Clusters...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>Deploy Infrastructure</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

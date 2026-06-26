/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { globalPricingChannel } from '../utils';
import { PRICING_MATRIX } from '../data';

export function BillingToggle() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  useEffect(() => {
    // Sync initial state from channel
    setBilling(globalPricingChannel.getBilling());
  }, []);

  const handleToggle = (option: 'monthly' | 'annual') => {
    setBilling(option);
    globalPricingChannel.update(globalPricingChannel.getCurrency(), option);
  };

  const discountVal = PRICING_MATRIX.billing.annual.discountPercentage;

  return (
    <div className="flex flex-col gap-1.5" id="billing-toggle-wrapper">
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono" id="billing-label">
        Billing Interval
      </label>
      <div className="inline-flex h-11 items-center rounded-xl border border-white/10 bg-slate-950/80 p-1 shadow-inner select-none">
        <button
          type="button"
          onClick={() => handleToggle('monthly')}
          className={`relative rounded-lg px-4 py-1.5 text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
            billing === 'monthly'
              ? 'bg-white/15 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
          id="billing-monthly-btn"
        >
          {PRICING_MATRIX.billing.monthly.label}
        </button>

        <button
          type="button"
          onClick={() => handleToggle('annual')}
          className={`relative flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
            billing === 'annual'
              ? 'bg-white/15 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
          id="billing-annual-btn"
        >
          <span>{PRICING_MATRIX.billing.annual.label}</span>
          <span className="inline-flex items-center rounded-sm bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/20 font-mono">
            -{discountVal}%
          </span>
        </button>
      </div>
    </div>
  );
}

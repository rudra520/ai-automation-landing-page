/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { Check } from 'lucide-react';
import { Tier } from '../types';
import { IsolatedPrice } from './IsolatedPrice';

interface PricingCardProps {
  tier: Tier;
  onSelect: (tierId: string) => void;
  key?: string;
}

export function PricingCard({ tier, onSelect }: PricingCardProps) {
  // Track render counts for this specific card layout block
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const isPopular = tier.popular;

  return (
    <div
      id={`pricing-card-${tier.id}`}
      className={`group relative flex flex-col justify-between rounded-3xl border p-8 transition-all duration-300 ${
        isPopular
          ? 'bg-white/10 backdrop-blur-2xl border-indigo-500/35 ring-1 ring-indigo-500/20 shadow-xl md:-translate-y-2'
          : 'bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 shadow-xs'
      }`}
    >
      {/* Decorative Popular Banner */}
      {isPopular && (
        <span
          id="popular-badge"
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white font-mono shadow-md shadow-indigo-500/25 animate-pulse"
        >
          Most Popular
        </span>
      )}

      <div>
        {/* Tier Header */}
        <div className="flex items-center justify-between">
          <h3
            id={`tier-title-${tier.id}`}
            className={`text-lg font-bold font-display tracking-tight ${
              isPopular ? 'text-indigo-200' : 'text-indigo-300'
            }`}
          >
            {tier.name}
          </h3>
        </div>

        <p
          id={`tier-desc-${tier.id}`}
          className="mt-3 text-sm text-slate-400 leading-relaxed font-sans"
        >
          {tier.description}
        </p>

        {/* Dynamic Price Display */}
        <div className="mt-5 border-t border-b border-white/5 py-1">
          <IsolatedPrice tierId={tier.id} />
        </div>

        {/* Features List */}
        <ul id={`tier-features-${tier.id}`} className="mt-6 space-y-3.5">
          {tier.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 mt-0.5">
                <Check className="h-3 w-3 stroke-[2.5]" />
              </span>
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Action Button */}
      <div className="mt-8 pt-4">
        <button
          type="button"
          id={`btn-select-${tier.id}`}
          className={`w-full rounded-xl py-3 text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer ${
            isPopular
              ? 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg shadow-indigo-500/25 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900'
              : 'bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10 focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900'
          }`}
          onClick={() => {
            onSelect(tier.id);
          }}
        >
          {tier.id === 'enterprise' ? 'Initiate Contract' : 'Get Started Now'}
        </button>
      </div>
    </div>
  );
}

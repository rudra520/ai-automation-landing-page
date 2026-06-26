/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { globalPricingChannel } from '../utils';
import { PRICING_MATRIX } from '../data';

interface IsolatedPriceProps {
  tierId: string;
}

export function IsolatedPrice({ tierId }: IsolatedPriceProps) {
  const priceRef = useRef<HTMLSpanElement>(null);
  const periodRef = useRef<HTMLSpanElement>(null);
  const annualSavingsRef = useRef<HTMLDivElement>(null);
  const annualSavingsTextRef = useRef<HTMLSpanElement>(null);

  // Keep track of the local component rendering
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  useEffect(() => {
    const unsubscribe = globalPricingChannel.subscribe((currency, billing) => {
      const tier = PRICING_MATRIX.tiers.find((t) => t.id === tierId);
      const tariff = PRICING_MATRIX.currencies[currency];
      const billingConfig = PRICING_MATRIX.billing[billing];

      if (!tier || !tariff || !billingConfig) return;

      // Base Monthly Rate
      const monthlyRate = tier.baseMonthlyRate;
      
      // Calculate final rate using multipliers
      const finalRate = monthlyRate * tariff.multiplier * billingConfig.multiplier;
      
      // Format number elegantly
      const formattedPrice = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(finalRate);

      // Direct DOM update of the price text node
      if (priceRef.current) {
        priceRef.current.textContent = `${tariff.symbol}${formattedPrice}`;
      }

      // Direct DOM update of the period text node
      if (periodRef.current) {
        periodRef.current.textContent = billing === 'annual' ? '/month' : '/month';
      }

      // Direct DOM update of the annual savings indicator
      if (annualSavingsRef.current && annualSavingsTextRef.current) {
        if (billing === 'annual') {
          const regularYearlyPrice = monthlyRate * 12 * tariff.multiplier;
          const discountedYearlyPrice = finalRate * 12;
          const savedAmount = regularYearlyPrice - discountedYearlyPrice;
          
          const formattedSaved = new Intl.NumberFormat(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(savedAmount);

          annualSavingsTextRef.current.textContent = `Billed annually — Save ${tariff.symbol}${formattedSaved}/yr`;
          annualSavingsRef.current.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
          annualSavingsRef.current.classList.add('opacity-100', 'scale-100');
        } else {
          annualSavingsRef.current.classList.remove('opacity-100', 'scale-100');
          annualSavingsRef.current.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
        }
      }
    });

    return unsubscribe;
  }, [tierId]);

  return (
    <div className="flex flex-col gap-2 py-4" id={`price-block-${tierId}`}>
      <div className="flex items-baseline gap-1">
        <span
          ref={priceRef}
          id={`price-value-${tierId}`}
          className="text-5xl font-bold tracking-tight text-white font-display select-none transition-all duration-150"
        >
          --
        </span>
        <span
          ref={periodRef}
          id={`price-period-${tierId}`}
          className="text-base font-medium text-slate-400 font-sans"
        >
          /month
        </span>
      </div>

      {/* Annual Savings Block: Managed natively via Direct Ref state class mutation */}
      <div
        ref={annualSavingsRef}
        id={`savings-indicator-${tierId}`}
        className="inline-flex items-center gap-1.5 transition-all duration-300 ease-out transform origin-top-left opacity-0 pointer-events-none scale-95"
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span
          ref={annualSavingsTextRef}
          id={`savings-text-${tierId}`}
          className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wide"
        >
          Save --
        </span>
      </div>
    </div>
  );
}

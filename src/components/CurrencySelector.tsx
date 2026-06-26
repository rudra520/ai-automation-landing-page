/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { PRICING_MATRIX } from '../data';
import { globalPricingChannel } from '../utils';

export function CurrencySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('USD');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Local render counter to verify isolated behavior
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  useEffect(() => {
    // Synchronize initial value from global channel
    setSelected(globalPricingChannel.getCurrency());

    // Click outside listener
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (code: string) => {
    setSelected(code);
    globalPricingChannel.update(code, globalPricingChannel.getBilling());
    setIsOpen(false);
  };

  const currentTariff = PRICING_MATRIX.currencies[selected];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef} id="currency-selector-wrapper">
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono" htmlFor="currency-select-button">
          Currency
        </label>
        <button
          id="currency-select-button"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between w-48 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-3.5 py-2 text-sm font-medium text-white shadow-xs hover:bg-white/10 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-slate-400" />
            <span className="font-semibold text-white">{currentTariff.code}</span>
            <span className="text-xs text-slate-400 font-mono">({currentTariff.symbol})</span>
          </div>
          <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div
          id="currency-dropdown-menu"
          className="absolute left-0 z-[99] mt-1.5 w-full origin-top rounded-xl border border-white/10 bg-[#1e293b] p-1.5 shadow-2xl ring-1 ring-black/20 focus:outline-hidden animate-in fade-in slide-in-from-top-1 duration-100"
        >
          <div className="py-0.5" role="menu" aria-orientation="vertical">
            {Object.entries(PRICING_MATRIX.currencies).map(([code, tariff]) => {
              const isSelected = selected === code;
              return (
                <button
                  key={code}
                  onClick={() => handleSelect(code)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white/10 text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                  role="menuitem"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold">{tariff.code}</span>
                      <span className="text-xs text-slate-400 font-mono">({tariff.symbol})</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">{tariff.name}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-white stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
          
          <div className="border-t border-white/10 mt-1.5 pt-1.5 px-3 pb-1" id="currency-telemetry">
            <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono">
              Selector Renders:{' '}
              <span className="text-emerald-400 font-bold">{renderCountRef.current}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

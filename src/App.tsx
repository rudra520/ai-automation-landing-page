/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { Layers, ShieldCheck, Sparkles, Quote, Star, ArrowUpRight } from 'lucide-react';
import { PRICING_MATRIX } from './data';
import { PricingCard } from './components/PricingCard';
import { CurrencySelector } from './components/CurrencySelector';
import { BillingToggle } from './components/BillingToggle';
import { PerformanceTelemetry } from './components/PerformanceTelemetry';
import { BentoAccordion } from './components/BentoAccordion';
import { CheckoutModal } from './components/CheckoutModal';

export default function App() {
  const [parentRenderCount, setParentRenderCount] = useState(1);
  const totalRendersRef = useRef(1);
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Function to force a standard React re-render of App and all descendants
  const handleForceReRender = useCallback(() => {
    totalRendersRef.current += 1;
    setParentRenderCount(totalRendersRef.current);
  }, []);

  return (
    <div
      id="main-app-container"
      className="min-h-screen bg-[#0f172a] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Upper Grid Backdrop Pattern & Glowing Orbs for Frosted Look */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/8 rounded-full blur-[120px]" />
      </div>

      {/* Hero Header Area - Semantic and Optimized for TTI (< 500ms orchestration) */}
      <header
        id="pricing-header"
        className="relative z-10 max-w-7xl mx-auto w-full text-center max-w-3xl mb-12"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 border border-white/10 font-mono mb-4 select-none">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
          <span>SWISS-ENGINEERED COMPUTE NETWORK</span>
        </div>

        <h1
          id="app-main-title"
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-display sm:leading-tight"
        >
          Extreme-Performance Cloud Compute Engine
        </h1>
        
        <p
          id="app-main-desc"
          className="mt-4 text-base text-slate-400 font-sans leading-relaxed"
        >
          Deploy dedicated container sandboxes on our enterprise cloud. Select a routing tier and view live, 
          dynamically calculated pricing across global regions with instant synchronization and zero configuration delay.
        </p>
      </header>

      {/* Semantic Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto w-full flex-1 space-y-16">
        
        {/* Modular Selectors Section */}
        <section
          id="controls-section"
          aria-label="Tariff Controls"
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto mb-10 relative z-30"
        >
          {/* Uncontrolled dropdown publishes to pricing channel */}
          <CurrencySelector />

          {/* Vertical divider on desktop */}
          <div className="hidden sm:block h-10 w-px bg-white/10" />

          {/* Uncontrolled sliding switch publishes to pricing channel */}
          <BillingToggle />
        </section>

        {/* Pricing Cards Grid Section */}
        <section
          id="pricing-matrix-section"
          aria-labelledby="pricing-title"
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <h2 id="pricing-title" className="text-2xl font-bold text-white font-display">
              Flexible Node-Sized Tariffs
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Deploy secure, resource-bounded containers dynamically synchronized with live financial exchange zones.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
            {PRICING_MATRIX.tiers.map((tier) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                onSelect={(id) => {
                  setSelectedTierId(id);
                  setIsCheckoutOpen(true);
                }}
              />
            ))}
          </div>
        </section>

        {/* Responsive Bento Grid to Accordion Topology Section */}
        <section
          id="bento-accordion-section"
          aria-labelledby="features-title"
        >
          <BentoAccordion />
        </section>

        {/* High-Fidelity Social Proof Testimonials Section */}
        <section
          id="social-proof-section"
          aria-labelledby="social-proof-title"
          className="space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">
              Global Deployment Consensus
            </span>
            <h2 id="social-proof-title" className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-display tracking-tight">
              Trusted by Core Infrastructure Teams
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              See how systems architects run high-availability computations on our isolated sandbox fabric.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <article
              id="testimonial-1"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-xs text-slate-300 italic leading-relaxed font-sans">
                  "The state isolation engine here is unmatched. Toggling currencies takes sub-microsecond cycles and leaves the parent virtual DOM completely unperturbed. Highly recommended for trading backends."
                </blockquote>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <cite className="not-italic text-xs font-bold text-white block">Dr. Anton Müller</cite>
                  <span className="text-[10px] text-slate-500 font-mono block">Principal Architect, Zürich Quantum Group</span>
                </div>
                <Quote className="h-5 w-5 text-indigo-500/30 shrink-0" />
              </div>
            </article>

            {/* Review 2 */}
            <article
              id="testimonial-2"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-xs text-slate-300 italic leading-relaxed font-sans">
                  "We migrated our real-time inventory synchronizers onto the Professional Tier nodes. The SLA guarantee holds up perfectly under stress tests, showing zero packet drop over several months of operations."
                </blockquote>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <cite className="not-italic text-xs font-bold text-white block">Sarah Jenkins</cite>
                  <span className="text-[10px] text-slate-500 font-mono block">VP of Platform, TechVortex Corp</span>
                </div>
                <Quote className="h-5 w-5 text-indigo-500/30 shrink-0" />
              </div>
            </article>

            {/* Review 3 */}
            <article
              id="testimonial-3"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-xs text-slate-300 italic leading-relaxed font-sans">
                  "Being able to deploy localized currency regions with zero context layout overhead completely revolutionized our checkout billing flow. A marvel of modern low-level React rendering design."
                </blockquote>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <cite className="not-italic text-xs font-bold text-white block">Rohan Sharma</cite>
                  <span className="text-[10px] text-slate-500 font-mono block">Core Tech Lead, Mumbai FinTech Labs</span>
                </div>
                <Quote className="h-5 w-5 text-indigo-500/30 shrink-0" />
              </div>
            </article>
          </div>

          {/* Crawlable Company Logo Wall */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-slate-500 select-none">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider hover:text-slate-400 transition-colors">
              <span>ZÜRICH_QUANTUM</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider hover:text-slate-400 transition-colors">
              <span>TECH_VORTEX</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider hover:text-slate-400 transition-colors">
              <span>MUMBAI_FINTECH</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider hover:text-slate-400 transition-colors">
              <span>SWISS_COMPUTE_LAB</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>
        </section>

        {/* Educational Telemetry & Proof-of-Performance Panel Section */}
        <section
          id="telemetry-section"
          aria-labelledby="telemetry-title"
        >
          <PerformanceTelemetry
            onForceReRender={handleForceReRender}
            parentRenderCount={parentRenderCount}
          />
        </section>

      </main>

      {/* Interactive System-Status Footer & Deploy Infrastructure Button */}
      <footer
        id="app-footer"
        className="relative z-10 max-w-7xl mx-auto w-full mt-12 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex flex-wrap items-center gap-6 sm:gap-10">
          <div className="flex flex-col" id="footer-render-state">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Global Node Status</span>
            <span className="text-sm text-emerald-400 font-mono font-bold mt-0.5 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE / SECURE</span>
            </span>
          </div>
          <div className="hidden sm:block h-8 w-px bg-white/10" />
          
          <div className="flex flex-col border-l border-white/10 sm:border-0 pl-6 sm:pl-0" id="footer-latency">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Network SLA</span>
            <span className="text-sm text-white font-mono font-semibold mt-0.5">99.9999% VERIFIED</span>
          </div>
          <div className="hidden sm:block h-8 w-px bg-white/10" />

          <div className="flex flex-col" id="footer-guardrail">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Compute Isolation</span>
            <span className="text-sm text-indigo-300 font-mono font-semibold mt-0.5">SANDBOX LEVEL</span>
          </div>
        </div>
        
        <button
          type="button"
          onClick={() => {
            setSelectedTierId(null); // triggers general deployment mode
            setIsCheckoutOpen(true);
          }}
          className="px-8 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          id="deploy-infrastructure-button"
        >
          <Layers className="h-4 w-4" />
          <span>Deploy Infrastructure</span>
        </button>
      </footer>

      {/* Checkout & Infrastructure Deployment Dialog */}
      <CheckoutModal
        tierId={selectedTierId}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Database, Network, ShieldCheck, BarChart3, ChevronRight, Zap } from 'lucide-react';

interface BentoNode {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
  glowColor: string;
}

const BENTO_NODES: BentoNode[] = [
  {
    id: 0,
    title: 'High-Performance Execution Core',
    subtitle: 'COMPUTE CLUSTER',
    description: 'Ultra-fast dedicated compute cores running on bare-metal hardware with near-zero latency overhead.',
    metric: '4.2 GHz Turbo / 256 Cores',
    icon: Cpu,
    details: [
      'Sub-millisecond cold starts',
      'Instant container provisioning',
      'Optimized processor cache alignment'
    ],
    glowColor: 'rgba(99, 102, 241, 0.15)' // Indigo
  },
  {
    id: 1,
    title: 'Isolated Network Architecture',
    subtitle: 'SECURITY BLOCK',
    description: 'Hardware-level sandbox isolation preventing shared-host vulnerabilities and memory leaks.',
    metric: 'Zero Shared Memory',
    icon: Database,
    details: [
      'Cryptographically secure fences',
      'No cross-tenant data leaks',
      'Automatic security patch rotation'
    ],
    glowColor: 'rgba(16, 185, 129, 0.12)' // Emerald
  },
  {
    id: 2,
    title: 'Global High-Availability Routing',
    subtitle: 'GLOBAL DISTRIBUTION',
    description: 'Intelligent multi-region distribution with zero packet drops and live global financial routing pathways.',
    metric: '99.999% SLA Guaranteed',
    icon: Network,
    details: [
      'Dynamic latency-based routing',
      'Automated global load balancers',
      'Dedicated multi-carrier backbone'
    ],
    glowColor: 'rgba(59, 130, 246, 0.15)' // Blue
  },
  {
    id: 3,
    title: 'Enterprise Failover Guardrails',
    subtitle: 'FAULT TOLERANCE',
    description: 'Continuous proactive infrastructure health checks guaranteeing high availability and persistent workloads.',
    metric: '99.9999% Platform Uptime',
    icon: ShieldCheck,
    details: [
      'Automatic instant node failovers',
      'Redundant power and fiber trunks',
      'Real-time network starvation checks'
    ],
    glowColor: 'rgba(245, 158, 11, 0.12)' // Amber
  },
  {
    id: 4,
    title: 'Real-Time Enterprise Analytics',
    subtitle: 'MONITORING SUITE',
    description: 'Streamlined visual performance dashboard monitoring system workloads, API hits, and transfer rates.',
    metric: 'Sub-Microsecond Tracking',
    icon: BarChart3,
    details: [
      'Zero-overhead log distribution',
      'Instant programmatic webhooks',
      'Fully customizable metric reports'
    ],
    glowColor: 'rgba(168, 85, 247, 0.15)' // Purple
  }
];

export function BentoAccordion() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lastInteractionType, setLastInteractionType] = useState<'hover' | 'click' | 'resize'>('hover');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  // Track rendering for performance verification
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  // Window resize listener to transfer/check state index
  useEffect(() => {
    const checkMobile = () => {
      const mobileStatus = window.innerWidth < 768;
      if (mobileStatus !== isMobile) {
        setIsMobile(mobileStatus);
        setLastInteractionType('resize');
        // Flash telemetry block to indicate programmatic index transfer
        if (telemetryRef.current) {
          telemetryRef.current.classList.remove('border-white/10');
          telemetryRef.current.classList.add('border-indigo-500/40', 'bg-indigo-500/5');
          setTimeout(() => {
            telemetryRef.current?.classList.remove('border-indigo-500/40', 'bg-indigo-500/5');
            telemetryRef.current?.classList.add('border-white/10');
          }, 600);
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const handleNodeSelect = (index: number, type: 'hover' | 'click') => {
    setActiveIndex(index);
    setLastInteractionType(type);
  };

  return (
    <div
      ref={containerRef}
      id="bento-accordion-container"
      className="mt-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-radial-at-t from-indigo-500/5 via-transparent to-transparent rounded-3xl pointer-events-none" />

      {/* Header section of Bento component */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 relative z-10 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 mb-2 uppercase tracking-widest">
            <Zap className="h-3.5 w-3.5" />
            <span>Interactive Node Topology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Advanced System Infrastructure
          </h2>
          <p className="mt-1.5 text-sm text-slate-400 max-w-2xl font-sans">
            Explore our multi-layered infrastructure blocks built to deliver unparalleled cloud performance, 
            military-grade security, and dynamic global availability.
          </p>
        </div>

        {/* System Status block */}
        <div
          ref={telemetryRef}
          id="bento-telemetry-status"
          className="rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2.5 font-mono text-xs text-slate-400 flex flex-col justify-center min-w-48 transition-all duration-300"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span>Selected Block:</span>
            <span className="text-white font-bold font-mono">NODE-0{activeIndex}</span>
          </div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span>Routing Mode:</span>
            <span className="text-indigo-400 font-bold uppercase text-[10px] bg-indigo-500/10 px-1.5 py-0.5 rounded">
              DYNAMIC
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>Network Status:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>HEALTHY</span>
            </span>
          </div>
        </div>
      </div>

      {/* 🖥️ DESKTOP BENTO GRID (Visible on md and larger) */}
      <div
        id="desktop-bento-grid"
        className="hidden md:grid grid-cols-6 gap-5 h-[420px] relative z-10"
      >
        {/* Node 0: Large primary compute block (takes 3 columns, 2 rows) */}
        <div
          onMouseEnter={() => handleNodeSelect(0, 'hover')}
          id="bento-card-0"
          style={{ '--glow-color': BENTO_NODES[0].glowColor } as React.CSSProperties}
          className={`col-span-3 row-span-2 rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between relative overflow-hidden cursor-crosshair group ${
            activeIndex === 0
              ? 'bg-white/10 border-indigo-500/35 shadow-lg shadow-indigo-500/10'
              : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/15 shadow-xs'
          }`}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ backgroundImage: `radial-gradient(circle at 50% 50%, var(--glow-color) 0%, transparent 70%)` }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">
                {BENTO_NODES[0].subtitle}
              </span>
              <div className="h-9 w-9 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                <Cpu className="h-5 w-5" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white font-display tracking-tight leading-snug">
              {BENTO_NODES[0].title}
            </h3>
            <p className="mt-2.5 text-xs text-slate-400 leading-relaxed max-w-sm">
              {BENTO_NODES[0].description}
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/5 flex flex-col gap-2.5">
            <div className="text-xs font-mono font-bold text-emerald-400">
              {BENTO_NODES[0].metric}
            </div>
            <div className="flex flex-wrap gap-2">
              {BENTO_NODES[0].details.map((detail, idx) => (
                <span key={idx} className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Node 1: Memory bus (takes 3 columns, 1 row) */}
        <div
          onMouseEnter={() => handleNodeSelect(1, 'hover')}
          id="bento-card-1"
          style={{ '--glow-color': BENTO_NODES[1].glowColor } as React.CSSProperties}
          className={`col-span-3 row-span-1 rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between relative overflow-hidden cursor-crosshair group ${
            activeIndex === 1
              ? 'bg-white/10 border-indigo-500/35 shadow-lg shadow-indigo-500/10'
              : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/15 shadow-xs'
          }`}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ backgroundImage: `radial-gradient(circle at 50% 50%, var(--glow-color) 0%, transparent 70%)` }}
          />

          <div className="relative z-10 flex gap-4">
            <div className="h-9 w-9 shrink-0 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
                {BENTO_NODES[1].subtitle}
              </span>
              <h3 className="text-base font-bold text-white font-display tracking-tight leading-tight mt-0.5">
                {BENTO_NODES[1].title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-400 leading-normal max-w-md">
                {BENTO_NODES[1].description}
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400">{BENTO_NODES[1].metric}</span>
            <span className="text-[10px] text-slate-500 font-mono">Double-Buffered State</span>
          </div>
        </div>

        {/* Node 2: Network Routing (takes 2 columns, 1 row) */}
        <div
          onMouseEnter={() => handleNodeSelect(2, 'hover')}
          id="bento-card-2"
          style={{ '--glow-color': BENTO_NODES[2].glowColor } as React.CSSProperties}
          className={`col-span-2 row-span-1 rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between relative overflow-hidden cursor-crosshair group ${
            activeIndex === 2
              ? 'bg-white/10 border-indigo-500/35 shadow-lg shadow-indigo-500/10'
              : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/15 shadow-xs'
          }`}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ backgroundImage: `radial-gradient(circle at 50% 50%, var(--glow-color) 0%, transparent 70%)` }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest font-mono">
                {BENTO_NODES[2].subtitle}
              </span>
              <Network className="h-4 w-4 text-blue-300" />
            </div>
            <h3 className="text-sm font-bold text-white font-display tracking-tight">
              {BENTO_NODES[2].title}
            </h3>
          </div>

          <div className="relative z-10 pt-3 border-t border-white/5">
            <span className="text-xs font-mono font-bold text-blue-400">{BENTO_NODES[2].metric}</span>
          </div>
        </div>

        {/* Node 3: SLA Guardrail (takes 2 columns, 1 row) */}
        <div
          onMouseEnter={() => handleNodeSelect(3, 'hover')}
          id="bento-card-3"
          style={{ '--glow-color': BENTO_NODES[3].glowColor } as React.CSSProperties}
          className={`col-span-2 row-span-1 rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between relative overflow-hidden cursor-crosshair group ${
            activeIndex === 3
              ? 'bg-white/10 border-indigo-500/35 shadow-lg shadow-indigo-500/10'
              : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/15 shadow-xs'
          }`}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ backgroundImage: `radial-gradient(circle at 50% 50%, var(--glow-color) 0%, transparent 70%)` }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest font-mono">
                {BENTO_NODES[3].subtitle}
              </span>
              <ShieldCheck className="h-4 w-4 text-amber-300" />
            </div>
            <h3 className="text-sm font-bold text-white font-display tracking-tight">
              {BENTO_NODES[3].title}
            </h3>
          </div>

          <div className="relative z-10 pt-3 border-t border-white/5">
            <span className="text-xs font-mono font-bold text-amber-400">{BENTO_NODES[3].metric}</span>
          </div>
        </div>

        {/* Node 4: Telemetry Monitor (takes 2 columns, 1 row) */}
        <div
          onMouseEnter={() => handleNodeSelect(4, 'hover')}
          id="bento-card-4"
          style={{ '--glow-color': BENTO_NODES[4].glowColor } as React.CSSProperties}
          className={`col-span-2 row-span-1 rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between relative overflow-hidden cursor-crosshair group ${
            activeIndex === 4
              ? 'bg-white/10 border-indigo-500/35 shadow-lg shadow-indigo-500/10'
              : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/15 shadow-xs'
          }`}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ backgroundImage: `radial-gradient(circle at 50% 50%, var(--glow-color) 0%, transparent 70%)` }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest font-mono">
                {BENTO_NODES[4].subtitle}
              </span>
              <BarChart3 className="h-4 w-4 text-purple-300" />
            </div>
            <h3 className="text-sm font-bold text-white font-display tracking-tight">
              {BENTO_NODES[4].title}
            </h3>
          </div>

          <div className="relative z-10 pt-3 border-t border-white/5">
            <span className="text-xs font-mono font-bold text-purple-400">{BENTO_NODES[4].metric}</span>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE ACCORDION (Visible on screen < 768px) */}
      <div
        id="mobile-accordion-list"
        className="md:hidden flex flex-col gap-3 relative z-10"
      >
        {BENTO_NODES.map((node) => {
          const isOpen = activeIndex === node.id;
          const NodeIcon = node.icon;
          
          return (
            <div
              key={node.id}
              id={`accordion-item-${node.id}`}
              className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white/10 border-indigo-500/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => handleNodeSelect(node.id, 'click')}
                className="w-full flex items-center justify-between p-4.5 text-left focus:outline-hidden cursor-pointer select-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center border transition-colors duration-200 ${
                    isOpen
                      ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                    <NodeIcon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      {node.subtitle}
                    </span>
                    <span className="block text-sm font-bold text-white font-display tracking-tight">
                      {node.title}
                    </span>
                  </div>
                </div>
                
                <ChevronRight className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-300 ease-in-out ${
                  isOpen ? 'rotate-90 text-indigo-400' : ''
                }`} />
              </button>

              {/* Accordion Content wrapper utilizing highly optimized CSS grid transitions */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-4.5 pt-0 border-t border-white/5 mt-1 text-xs text-slate-300 space-y-3">
                    <p className="leading-relaxed text-slate-400">
                      {node.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold py-1 bg-white/5 rounded-lg px-2.5 w-fit border border-white/5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{node.metric}</span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {node.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="h-1 w-1 bg-indigo-400 rounded-full" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

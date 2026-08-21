import React, { useState } from 'react';
import { AOSP_SYSTEM_SPECS } from '../../data/portfolioData';
import { TiltedCard } from '../reactbits/TiltedCard';
import { DecryptedText } from '../reactbits/DecryptedText';
import { Code2, FileCode, Check } from 'lucide-react';

export const SystemsArchitecture: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeSpec = AOSP_SYSTEM_SPECS[selectedIdx];

  return (
    <section id="architecture" className="py-24 border-b border-black/10 dark:border-white/10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
              [003] • SYSTEMS ARCHITECTURE
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-black dark:text-white tracking-tight">
              AOSP Device Tree & HAL Implementation
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-ink-muted dark:text-textMuted mt-3 md:mt-0 max-w-md">
            Direct inspection of device configuration makefiles, hardware abstraction layers, and SELinux access vectors for Motorola Edge 40 Neo (*manaus*).
          </p>
        </div>

        {/* Workbench Layout */}
        <div className="reveal-on-scroll grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* File Selector Column */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono text-ink-subtle uppercase tracking-wider block mb-2 font-semibold">
              <DecryptedText
                text="DEVICE TREE MODULES:"
                animateOn="hover"
                speed={30}
                className="font-mono text-xs font-bold"
              />
            </span>

            {AOSP_SYSTEM_SPECS.map((spec, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full p-4 rounded-2xl text-left font-mono transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-surface border-black/30 dark:border-white/30 text-black dark:text-white shadow-md'
                      : 'bg-white/50 dark:bg-surface/50 border-black/5 dark:border-white/5 text-ink-muted dark:text-textMuted hover:border-black/15 dark:hover:border-white/15 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase text-ink-subtle">{spec.category}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />}
                  </div>
                  <div className="text-xs font-bold truncate flex items-center gap-2">
                    <FileCode className="h-3.5 w-3.5 text-slate-500" />
                    <span>{spec.filename}</span>
                  </div>
                </button>
              );
            })}

            <div className="p-4 rounded-2xl bg-white/70 dark:bg-surface/40 border border-black/10 dark:border-white/5 mt-6 font-mono text-xs text-ink-muted dark:text-textMuted space-y-2">
              <div className="text-black dark:text-white font-bold flex items-center gap-2">
                <Code2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Verification State</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All source modules compiled with Clang 18 toolchains for Android 14/15 QPR. SELinux verified in strict ENFORCING mode on Linux 5.10 LTS.
              </p>
            </div>
          </div>

          {/* Code Viewer Panel with 3D TiltedCard Physics */}
          <div className="lg:col-span-8">
            <TiltedCard maxTilt={4} scale={1.01} className="w-full">
              <div className="rounded-3xl bg-[#101318] text-slate-200 border border-black/15 dark:border-white/10 overflow-hidden shadow-xl">
                {/* Viewer Top Bar */}
                <div className="flex items-center justify-between px-6 py-4 bg-[#161a22] border-b border-white/10 font-mono text-xs">
                  <div className="flex items-center gap-2 text-white">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold">{activeSpec.filename}</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">{activeSpec.category}</span>
                </div>

                {/* Description note */}
                <div className="px-6 py-3 bg-[#13171e] border-b border-white/5 text-xs text-emerald-300 font-mono">
                  › {activeSpec.description}
                </div>

                {/* Code Body */}
                <div className="p-6 overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed max-h-[460px] overflow-y-auto selection:bg-emerald-500/30">
                  <pre className="whitespace-pre">{activeSpec.snippet}</pre>
                </div>
              </div>
            </TiltedCard>
          </div>
        </div>
      </div>
    </section>
  );
};

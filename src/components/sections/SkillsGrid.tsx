import React from 'react';
import { SKILL_GROUPS } from '../../data/portfolioData';
import { SpotlightCard } from '../reactbits/SpotlightCard';

export const SkillsGrid: React.FC = () => {
  return (
    <section id="skills" className="py-24 border-b border-black/10 dark:border-white/10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
              [005] • COMPETENCY MATRIX
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-black dark:text-white tracking-tight">
              Technical Stack & Core Disciplines
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-ink-muted dark:text-textMuted mt-3 md:mt-0 max-w-md">
            Specialized engineering capabilities across low-level kernels, on-device machine learning, backend services, and scalable web architectures.
          </p>
        </div>

        {/* 4 Column Competency Grid with Spotlight Glow */}
        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_GROUPS.map((group, idx) => (
            <SpotlightCard
              key={idx}
              className="p-6 sm:p-8 bg-white dark:bg-surface border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 hover-lift shadow-xs flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 font-mono text-xs">
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">0{idx + 1}</span>
                  <span className="text-ink-subtle uppercase text-[10px] tracking-wider">DOMAIN</span>
                </div>

                <h3 className="text-xl font-display font-bold text-black dark:text-white mt-4">
                  {group.group}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-mono px-3 py-1.5 rounded-xl bg-surfaceMuted-light dark:bg-[#0c0e12] border border-black/5 dark:border-white/5 text-black/90 dark:text-slate-300 font-medium hover:border-black/20 dark:hover:border-white/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

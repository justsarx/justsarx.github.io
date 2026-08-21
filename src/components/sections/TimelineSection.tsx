import React from 'react';
import { EXPERIENCES, EDUCATION } from '../../data/portfolioData';
import { SpotlightCard } from '../reactbits/SpotlightCard';

export const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="py-24 border-b border-black/10 dark:border-white/10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
              [004] • TRACK RECORD
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-black dark:text-white tracking-tight">
              Experience & Academic Timeline
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-ink-muted dark:text-textMuted mt-3 md:mt-0 max-w-md">
            Chronological engineering milestones across open-source leadership, backend internships, and computer science degrees.
          </p>
        </div>

        {/* Two-Column Grid: Left Experience, Right Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Professional Experience Column */}
          <div className="reveal-on-scroll space-y-8">
            <span className="text-xs font-mono text-ink-muted dark:text-textMuted uppercase tracking-wider block pb-3 border-b border-black/10 dark:border-white/10 font-bold">
              Professional & Open-Source Roles
            </span>

            <div className="space-y-8">
              {EXPERIENCES.map((exp, idx) => (
                <SpotlightCard
                  key={idx}
                  className="p-8 bg-white dark:bg-[#12151b] border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 hover-lift shadow-sm space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">{exp.period}</span>
                    <span className="text-ink-subtle">{exp.location}</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-black dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-xs font-mono text-ink-muted dark:text-slate-400 mt-1">
                      {exp.organization} • <span className="text-black/80 dark:text-slate-300 font-semibold">{exp.type}</span>
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-ink-muted dark:text-slate-300 list-disc list-inside font-sans">
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5 dark:border-white/5">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-black/5 dark:bg-[#171b23] text-black/80 dark:text-slate-400 border border-black/5 dark:border-white/5 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>

          {/* Academic Background Column */}
          <div className="reveal-on-scroll space-y-8">
            <span className="text-xs font-mono text-ink-muted dark:text-textMuted uppercase tracking-wider block pb-3 border-b border-black/10 dark:border-white/10 font-bold">
              Academic Background & Credentials
            </span>

            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <SpotlightCard
                  key={idx}
                  className="p-6 bg-white dark:bg-[#12151b] border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 hover-lift shadow-xs space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-black dark:text-white font-bold">{edu.period}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                      {edu.grade}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-display font-bold text-black dark:text-white">
                    {edu.degree}
                  </h3>

                  <p className="text-xs font-mono text-ink-muted dark:text-slate-400">
                    {edu.institution} • <span className="text-ink-subtle">{edu.location}</span>
                  </p>

                  {edu.details && (
                    <p className="text-xs text-ink-muted dark:text-slate-300 font-sans pt-2 border-t border-black/5 dark:border-white/5">
                      {edu.details}
                    </p>
                  )}
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

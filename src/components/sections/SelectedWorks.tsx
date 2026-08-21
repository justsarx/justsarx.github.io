import React from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { DecryptedText } from '../reactbits/DecryptedText';
import { GithubIcon } from '../icons/SocialIcons';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

export const SelectedWorks: React.FC = () => {
  return (
    <section id="works" className="py-24 border-b border-black/10 dark:border-white/10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
              [002] • SELECTED WORKS
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-black dark:text-white tracking-tight">
              Production Systems & Open Source
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-ink-muted dark:text-textMuted mt-3 md:mt-0 max-w-md">
            Custom Android device trees, client-side WebGPU acceleration, and automated resume evaluation engines.
          </p>
        </div>

        {/* Project Cards List with Dynamic Spotlight Glow & Hover Lift */}
        <div className="space-y-16">
          {PROJECTS.map((project) => (
            <SpotlightCard
              key={project.id}
              className="reveal-on-scroll p-8 sm:p-12 bg-white dark:bg-surface border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 hover-lift shadow-lg shadow-black/[0.03] dark:shadow-black/40"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column: Narrative & Technical Implementation */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pb-4 border-b border-black/10 dark:border-white/10">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                      <DecryptedText
                        text={`${project.index} / 03`}
                        animateOn="hover"
                        speed={35}
                        className="font-mono font-bold"
                        encryptedClassName="text-emerald-500"
                      />
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-slate-300 font-medium">
                      {project.category}
                    </span>
                    <span className="text-ink-subtle">{project.period}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-display font-black text-black dark:text-white tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-ink-muted dark:text-slate-300 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-mono text-black dark:text-textMuted uppercase tracking-wider block font-bold">
                      Engineering Implementation:
                    </span>
                    {project.technicalDetails.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-black/80 dark:text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-surfaceMuted-light dark:bg-surfaceMuted border border-black/10 dark:border-white/10 text-black/90 dark:text-slate-300 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-mono font-semibold text-xs hover:opacity-90 transition-all shadow-sm cursor-pointer"
                      >
                        <GithubIcon className="h-4 w-4" />
                        <span>View Source on GitHub</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-black/15 dark:border-white/20 bg-surfaceMuted-light dark:bg-surface hover:bg-black/5 dark:hover:bg-surfaceMuted text-black dark:text-white font-mono text-xs transition-colors cursor-pointer"
                      >
                        <ExternalLink className="h-4 w-4 text-slate-500" />
                        <span>Project Documentation</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Verification Benchmarks & Deliverables */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-6 rounded-2xl bg-[#eeece4]/60 dark:bg-[#0c0e12] border border-black/10 dark:border-white/10 space-y-4">
                    <span className="text-xs font-mono text-ink-muted dark:text-textMuted uppercase tracking-wider block pb-2 border-b border-black/10 dark:border-white/10 font-bold">
                      Technical Verification
                    </span>

                    <div className="grid grid-cols-2 gap-4">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white dark:bg-surface border border-black/5 dark:border-white/5 shadow-xs">
                          <span className="text-[10px] font-mono text-ink-subtle block uppercase">
                            {metric.label}
                          </span>
                          <span className="text-base font-bold text-black dark:text-white font-mono mt-1 block">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white dark:bg-surfaceMuted border border-black/10 dark:border-white/10 space-y-2">
                    <span className="text-xs font-mono text-black dark:text-textMuted uppercase tracking-wider block font-bold">
                      Architectural Deliverables
                    </span>
                    <ul className="space-y-1.5 text-xs font-mono text-ink-muted dark:text-slate-300 list-disc list-inside">
                      {project.deliverables.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

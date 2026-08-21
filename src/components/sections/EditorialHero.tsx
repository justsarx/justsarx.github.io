import React from 'react';
import { PERSONAL_DATA, HIGHLIGHT_METRICS } from '../../data/portfolioData';
import { DecryptedText } from '../reactbits/DecryptedText';
import { BlurText } from '../reactbits/BlurText';
import { MagneticButton } from '../reactbits/MagneticButton';
import { CountUp } from '../reactbits/CountUp';
import { ArrowDown, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

interface EditorialHeroProps {
  onOpenResume: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ onOpenResume }) => {
  const marqueeKeywords = [
    'AOSP ARCHITECTURE',
    'LINUX KERNEL 5.10 LTS',
    'MOTO EDGE 40 NEO (MANAUS)',
    'WEBGPU TRANSFORMERS',
    'C++ SYSTEMS',
    'PYTHON & DJANGO',
    'DOUBLE-TAP-TO-WAKE',
    'IN-DISPLAY FOD HAL',
    '5G NR AGGREGATION',
    'SELINUX ENFORCING',
  ];

  return (
    <section className="relative min-h-[96vh] pt-32 sm:pt-40 pb-16 flex flex-col justify-between border-b border-black/10 dark:border-white/10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between relative z-10">
        {/* Top Metadata Row */}
        <div className="reveal-on-scroll flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-ink-muted dark:text-textMuted pb-8 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-black dark:text-white font-bold">[001]</span>
            <span className="text-ink-subtle">•</span>
            <DecryptedText
              text="SYSTEMS ENGINEERING & OPERATING SYSTEMS"
              animateOn="view"
              speed={40}
              className="text-xs font-mono"
              encryptedClassName="text-emerald-500 font-bold"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-ink-subtle hidden md:inline">{PERSONAL_DATA.coordinates}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-black dark:text-white font-semibold flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{PERSONAL_DATA.status}</span>
            </span>
          </div>
        </div>

        {/* Massive Headline Section with BlurText Stagger Reveal */}
        <div className="my-12 sm:my-16 space-y-6">
          <div className="reveal-on-scroll">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-2 font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <DecryptedText
                text="AOSP DEVELOPER & SYSTEMS ARCHITECT"
                animateOn="hover"
                speed={30}
                className="font-mono text-xs"
                encryptedClassName="text-emerald-400 font-bold"
              />
            </div>

            <h1 className="text-6xl sm:text-8xl lg:text-[10.5rem] font-display font-black text-black dark:text-white tracking-tighter leading-[0.88] select-none">
              {PERSONAL_DATA.name.toUpperCase()}
            </h1>
          </div>

          <div className="reveal-on-scroll grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4">
            <div className="lg:col-span-8">
              <BlurText
                text={PERSONAL_DATA.statement}
                delay={25}
                className="text-xl sm:text-3xl lg:text-4xl text-black/90 dark:text-textPrimary font-display font-semibold leading-tight tracking-tight"
              />
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 font-mono text-xs">
              <a
                href="#works"
                className="w-full"
              >
                <MagneticButton
                  strength={15}
                  className="w-full px-6 py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-semibold hover:opacity-90 transition-all shadow-md flex items-center justify-between"
                >
                  <span>Inspect Selected Works</span>
                  <ArrowDown className="h-4 w-4 ml-2" />
                </MagneticButton>
              </a>

              <MagneticButton
                onClick={onOpenResume}
                strength={15}
                className="w-full px-6 py-4 rounded-2xl border border-black/15 dark:border-white/20 bg-white/80 dark:bg-surface hover:bg-black/5 dark:hover:bg-surfaceMuted text-black dark:text-white transition-all shadow-sm flex items-center justify-between"
              >
                <span>Curriculum Vitae</span>
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Continuous Butter-Smooth Kinetic Marquee */}
        <div className="w-full py-3.5 my-4 overflow-hidden border-t border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
          <div className="kinetic-marquee-track space-x-8 font-mono text-xs text-ink-muted dark:text-textMuted tracking-wider uppercase select-none">
            {[...marqueeKeywords, ...marqueeKeywords, ...marqueeKeywords, ...marqueeKeywords].map((word, idx) => (
              <span key={idx} className="flex items-center gap-6 whitespace-nowrap">
                <span className="text-black dark:text-white font-bold text-xs tracking-wider">{word}</span>
                <span className="text-emerald-500 font-bold text-sm">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* 4-Column Highlight Verification Table with CountUp Animation */}
        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-8 gap-8 lg:gap-0">
          {HIGHLIGHT_METRICS.map((item, idx) => (
            <div
              key={idx}
              className={`space-y-2.5 ${
                idx > 0 ? 'lg:border-l lg:border-black/10 lg:dark:border-white/10 lg:pl-8' : ''
              } ${idx < HIGHLIGHT_METRICS.length - 1 ? 'lg:pr-8' : ''}`}
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{item.num}</span>
                <span className="text-ink-subtle uppercase text-[10px] tracking-wider">{item.label}</span>
              </div>
              <h2 className="text-base font-bold text-black dark:text-white font-display">
                {idx === 1 ? (
                  <span>
                    <CountUp to={8.55} decimals={2} duration={2} prefix="" suffix=" CGPA in MCA" />
                  </span>
                ) : (
                  item.title
                )}
              </h2>
              <p className="text-xs text-ink-muted dark:text-textMuted leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { PERSONAL_DATA } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { ArrowUp, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black/10 dark:border-white/10 py-16 text-ink-muted dark:text-textMuted font-mono text-xs bg-black/[0.02] dark:bg-black/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-black dark:text-white font-bold tracking-tight text-sm font-display block">
              {PERSONAL_DATA.name.toUpperCase()}
            </span>
            <span className="text-ink-subtle text-[11px] mt-0.5 block">
              AOSP Developer & Systems Engineer • {PERSONAL_DATA.location}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={PERSONAL_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5 font-semibold"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5 font-semibold"
            >
              <LinkedinIcon className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PERSONAL_DATA.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5 font-semibold"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>justsarx.me</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-ink-subtle">© {new Date().getFullYear()}</span>
            <button
              onClick={scrollToTop}
              className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

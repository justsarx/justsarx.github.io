import React, { useState, useEffect } from 'react';
import { PERSONAL_DATA } from '../../data/portfolioData';
import { ArrowUpRight, FileText, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  scrollProgress: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  scrollProgress,
  theme,
  onToggleTheme,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar (Top-most anchor) */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 origin-left bg-emerald-600 dark:bg-emerald-400 transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#f7f6f2]/90 dark:bg-[#0c0e12]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 py-3.5 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Wordmark */}
            <a href="#" className="flex items-center gap-3 group">
              <span className="font-display font-black text-lg sm:text-xl text-black dark:text-white tracking-tight group-hover:opacity-80 transition-opacity">
                {PERSONAL_DATA.name.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono text-ink-muted dark:text-textSubtle uppercase tracking-widest hidden sm:inline px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                SYSTEMS
              </span>
            </a>

            {/* Location & Time Stamp */}
            <div className="hidden md:flex items-center gap-4 text-xs font-mono text-ink-muted dark:text-textMuted border-l border-r border-black/10 dark:border-white/10 px-6">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-black dark:text-white">PATNA, IN</span>
              </div>
              <span className="text-black/80 dark:text-white font-medium">{timeStr} IST</span>
            </div>

            {/* Nav Links, Theme Switcher & Actions */}
            <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono">
              <nav className="hidden lg:flex items-center gap-6 text-ink-muted dark:text-textMuted font-medium">
                <a href="#works" className="hover:text-black dark:hover:text-white transition-colors">
                  Selected Works
                </a>
                <a href="#architecture" className="hover:text-black dark:hover:text-white transition-colors">
                  Systems Lab
                </a>
                <a href="#timeline" className="hover:text-black dark:hover:text-white transition-colors">
                  Timeline
                </a>
                <a href="#skills" className="hover:text-black dark:hover:text-white transition-colors">
                  Skills
                </a>
                <a href="#telemetry" className="hover:text-black dark:hover:text-white transition-colors">
                  Telemetry
                </a>
                <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors">
                  Contact
                </a>
              </nav>

              {/* Theme Switcher Button */}
              <button
                onClick={onToggleTheme}
                aria-label="Toggle light/dark theme"
                className="p-2 rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-surface text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4 text-slate-700" />
                ) : (
                  <Sun className="h-4 w-4 text-amber-300" />
                )}
              </button>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-black/15 dark:border-white/20 bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-semibold hover:opacity-90 transition-all cursor-pointer shadow-sm"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Resume / CV</span>
                <ArrowUpRight className="h-3 w-3 opacity-70" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

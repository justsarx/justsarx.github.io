import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { EditorialHero } from './components/sections/EditorialHero';
import { SelectedWorks } from './components/sections/SelectedWorks';
import { SystemsArchitecture } from './components/sections/SystemsArchitecture';
import { TimelineSection } from './components/sections/TimelineSection';
import { SkillsGrid } from './components/sections/SkillsGrid';
import { DeveloperTelemetry } from './components/sections/DeveloperTelemetry';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { ResumeModal } from './components/modals/ResumeModal';
import { CustomCursor } from './components/ui/CustomCursor';
import { DynamicScrollBackground } from './components/ui/DynamicScrollBackground';
import { ClickSpark } from './components/reactbits/ClickSpark';
import { MiniAudioPlayer } from './components/audio/MiniAudioPlayer';
import { useScrollAnimations } from './hooks/useScrollAnimations';

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (stored === 'light' || stored === 'dark') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const { scrollProgress } = useScrollAnimations();

  // Sync class on document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Listen to live system/browser theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const hasManualOverride = localStorage.getItem('theme');
      if (!hasManualOverride) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  return (
    <div className={`relative min-h-screen bg-[#f7f6f2] dark:bg-[#0c0e12] text-[#12151b] dark:text-[#d8dde6] selection:bg-black/10 dark:selection:bg-white/15 transition-colors duration-300 ${
      isAudioPlaying ? 'page-audio-breathing' : ''
    }`}>
      {/* Click Spark Particle Burst Effect */}
      <ClickSpark sparkColor="#10b981" sparkSize={10} sparkCount={9} />

      {/* Custom Dynamic Systems Pointer Reticle */}
      <CustomCursor />

      {/* Dynamic Scroll-Reactive Architectural Background Canvas with audio beats breathing */}
      <DynamicScrollBackground isPlaying={isAudioPlaying} />

      {/* Floating Zenless Zone Zero (ZZZ) Soundtrack Media Player */}
      <MiniAudioPlayer onPlayingChange={setIsAudioPlaying} />

      {/* Top Editorial Navbar with Scroll Indicator & Theme Switcher */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        scrollProgress={scrollProgress}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Clean Editorial Content Sections */}
      <main className="relative z-10">
        <EditorialHero onOpenResume={() => setIsResumeOpen(true)} />
        <SelectedWorks />
        <SystemsArchitecture />
        <TimelineSection />
        <SkillsGrid />
        <DeveloperTelemetry />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Verified Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default App;

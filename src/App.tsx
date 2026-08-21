import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { EditorialHero } from './components/sections/EditorialHero';
import { SelectedWorks } from './components/sections/SelectedWorks';
import { SystemsArchitecture } from './components/sections/SystemsArchitecture';
import { TimelineSection } from './components/sections/TimelineSection';
import { SkillsGrid } from './components/sections/SkillsGrid';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { ResumeModal } from './components/modals/ResumeModal';
import { CustomCursor } from './components/ui/CustomCursor';
import { DynamicScrollBackground } from './components/ui/DynamicScrollBackground';
import { ClickSpark } from './components/reactbits/ClickSpark';
import { useScrollAnimations } from './hooks/useScrollAnimations';

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { scrollProgress } = useScrollAnimations();

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

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="relative min-h-screen bg-[#f7f6f2] dark:bg-[#0c0e12] text-[#12151b] dark:text-[#d8dde6] selection:bg-black/10 dark:selection:bg-white/15 transition-colors duration-300">
      {/* Click Spark Particle Burst Effect */}
      <ClickSpark sparkColor="#10b981" sparkSize={10} sparkCount={9} />

      {/* Custom Dynamic Systems Pointer Reticle */}
      <CustomCursor />

      {/* Dynamic Scroll-Reactive Architectural Background Canvas */}
      <DynamicScrollBackground />

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

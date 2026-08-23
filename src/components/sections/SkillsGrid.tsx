import React, { useState, useRef } from 'react';
import { 
  CppLogo, 
  LinuxLogo, 
  AndroidLogo, 
  GitLogo, 
  PythonLogo, 
  DjangoLogo, 
  TypeScriptLogo, 
  ReactLogo, 
  WebGPULogo, 
  DockerLogo, 
  MySqlLogo 
} from '../ui/SkillLogos';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { 
  GitBranch, 
  Boxes, 
  Sparkles, 
  Search,
  Activity,
  Binary,
  Database,
  Terminal,
  Cpu,
  Layers,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';

interface InteractiveSkill {
  id: string;
  name: string;
  category: 'systems' | 'ai' | 'backend' | 'devops';
  role: string;
  badge: string;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  description: string;
  stats: { label: string; value: string };
  officialUrl: string;
  quirkType: 'cpp' | 'git' | 'kernel' | 'django' | 'webgpu' | 'docker' | 'mysql' | 'react' | 'python' | 'ts';
}

const FEATURED_SKILLS: InteractiveSkill[] = [
  {
    id: 'cpp',
    name: 'C / C++ (C++20)',
    category: 'systems',
    role: 'Low-Level Systems & HALs',
    badge: 'Core Competency',
    icon: <CppLogo className="h-8 w-8" />,
    accentColor: '#00599C',
    glowColor: 'rgba(0, 89, 156, 0.25)',
    description: 'Hardware abstraction layers (HAL), pointer arithmetic, RAII, memory management, and high-performance native routines.',
    stats: { label: 'Specialization', value: 'Android HAL & Driver APIs' },
    officialUrl: 'https://en.cppreference.com/w/',
    quirkType: 'cpp'
  },
  {
    id: 'linux-kernel',
    name: 'Linux Kernel 5.10 LTS',
    category: 'systems',
    role: 'Kernel Driver Porting & Tuning',
    badge: '5.10.y Active',
    icon: <LinuxLogo className="h-8 w-8" />,
    accentColor: '#F0C000',
    glowColor: 'rgba(240, 192, 0, 0.25)',
    description: 'Device tree (DTS) authoring, MediaTek Dimensity 7030 kernel bringup, defconfig tuning, and kernel module debugging.',
    stats: { label: 'Kernel Branch', value: '5.10 LTS (manaus)' },
    officialUrl: 'https://www.kernel.org/',
    quirkType: 'kernel'
  },
  {
    id: 'aosp',
    name: 'Android Open Source Project (AOSP)',
    category: 'systems',
    role: 'ROM Architecture & BoardConfig',
    badge: 'Android 14 / 15 QPR',
    icon: <AndroidLogo className="h-8 w-8" />,
    accentColor: '#3DDC84',
    glowColor: 'rgba(61, 220, 132, 0.25)',
    description: 'Complete device tree creation, SELinux policy engineering, vendor proprietary blob isolation, and CTS-compatible builds.',
    stats: { label: 'Production Device', value: 'Moto Edge 40 Neo' },
    officialUrl: 'https://source.android.com/',
    quirkType: 'kernel'
  },
  {
    id: 'git',
    name: 'Git & GitHub Manifests',
    category: 'devops',
    role: 'Distributed VCS & Multi-Repo Sync',
    badge: 'Advanced Workflow',
    icon: <GitLogo className="h-8 w-8" />,
    accentColor: '#F05032',
    glowColor: 'rgba(240, 80, 50, 0.25)',
    description: 'Complex rebase workflows, conflict resolution, cherry-picking upstream security patches, and repo manifest orchestration.',
    stats: { label: 'Branching Strategy', value: 'Clean Upstream Rebase' },
    officialUrl: 'https://git-scm.com/',
    quirkType: 'git'
  },
  {
    id: 'webgpu',
    name: 'WebGPU & Transformers.js',
    category: 'ai',
    role: 'Client-Side On-Device Machine Learning',
    badge: 'Zero Cloud Latency',
    icon: <WebGPULogo className="h-8 w-8" />,
    accentColor: '#00E599',
    glowColor: 'rgba(0, 229, 153, 0.25)',
    description: 'Hardware-accelerated compute shaders, ONNX quantization, local LLM execution, and client-side privacy-first inference.',
    stats: { label: 'Inference Speed', value: '< 120ms In-Browser' },
    officialUrl: 'https://www.w3.org/TR/webgpu/',
    quirkType: 'webgpu'
  },
  {
    id: 'python',
    name: 'Python & AI Pipelines',
    category: 'backend',
    role: 'Asynchronous Automation & ML',
    badge: 'Python 3.12+',
    icon: <PythonLogo className="h-8 w-8" />,
    accentColor: '#3776AB',
    glowColor: 'rgba(55, 118, 171, 0.25)',
    description: 'Automated token extraction pipelines, PDF parsing, RESTful backend microservices, and AI scoring algorithms.',
    stats: { label: 'Ecosystem', value: 'PyTorch • Transformers • NumPy' },
    officialUrl: 'https://www.python.org/',
    quirkType: 'python'
  },
  {
    id: 'django',
    name: 'Django & REST Framework',
    category: 'backend',
    role: 'Enterprise Backend & LLM APIs',
    badge: 'Decoupled REST',
    icon: <DjangoLogo className="h-8 w-8" />,
    accentColor: '#092E20',
    glowColor: 'rgba(9, 46, 32, 0.25)',
    description: 'High-throughput Django REST frameworks, ORM optimization, Google Gemini API integration, and JWT authentication.',
    stats: { label: 'API Latency', value: '< 15ms Response' },
    officialUrl: 'https://www.django-rest-framework.org/',
    quirkType: 'django'
  },
  {
    id: 'typescript',
    name: 'TypeScript & Architecture',
    category: 'backend',
    role: 'Strict Type-Safe Engineering',
    badge: 'Strict Typings',
    icon: <TypeScriptLogo className="h-8 w-8" />,
    accentColor: '#3178C6',
    glowColor: 'rgba(49, 120, 198, 0.25)',
    description: 'Strictly typed component architectures, Web Audio API integration, custom canvas visualizers, and state synchronization.',
    stats: { label: 'Target', value: 'ESNext • WebGL/WebGPU' },
    officialUrl: 'https://www.typescriptlang.org/',
    quirkType: 'ts'
  },
  {
    id: 'react',
    name: 'React.js & Modern Frontend',
    category: 'backend',
    role: 'Kinetic & Reactive Interfaces',
    badge: 'React 18 / 19',
    icon: <ReactLogo className="h-8 w-8" />,
    accentColor: '#61DAFB',
    glowColor: 'rgba(97, 218, 251, 0.25)',
    description: 'Component architecture, micro-interactions, responsive design systems, and hardware-accelerated animations.',
    stats: { label: 'Toolchain', value: 'Vite • Tailwind CSS' },
    officialUrl: 'https://react.dev/',
    quirkType: 'react'
  },
  {
    id: 'docker',
    name: 'Docker & Containerization',
    category: 'devops',
    role: 'Isolated Build Environments',
    badge: 'Containerized AOSP',
    icon: <DockerLogo className="h-8 w-8" />,
    accentColor: '#2496ED',
    glowColor: 'rgba(36, 150, 237, 0.25)',
    description: 'Reproducible Ubuntu AOSP compilation environments, multi-stage containers, and automated toolchain deployment.',
    stats: { label: 'Build Image', value: 'Ubuntu 22.04 AOSP Env' },
    officialUrl: 'https://www.docker.com/',
    quirkType: 'docker'
  },
  {
    id: 'mysql',
    name: 'MySQL & Relational Databases',
    category: 'devops',
    role: 'Schema Architecture & Indexing',
    badge: 'ACID Compliant',
    icon: <MySqlLogo className="h-8 w-8" />,
    accentColor: '#00758F',
    glowColor: 'rgba(0, 117, 143, 0.25)',
    description: 'Relational data modeling, foreign key integrity, index optimization, query execution plan tuning, and transactions.',
    stats: { label: 'Query Performance', value: 'Optimized B-Tree Indexes' },
    officialUrl: 'https://www.mysql.com/',
    quirkType: 'mysql'
  }
];

export const SkillsGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'systems' | 'ai' | 'backend' | 'devops'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileViewMode, setMobileViewMode] = useState<'carousel' | 'compact'>('carousel');
  const [activeCarouselIdx, setActiveCarouselIdx] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Interactive Quirk States
  const [cppCompiled, setCppCompiled] = useState<boolean>(false);
  const [gitStep, setGitStep] = useState<number>(0);
  const [djangoResponse, setDjangoResponse] = useState<boolean>(false);
  const [activeMatrixCell, setActiveMatrixCell] = useState<number | null>(null);
  const [sqlExplained, setSqlExplained] = useState<boolean>(false);
  const [pyExecuted, setPyExecuted] = useState<boolean>(false);

  const filteredSkills = FEATURED_SKILLS.filter(skill => {
    const matchesTab = activeTab === 'all' || skill.category === activeTab;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleTabChange = (tab: typeof activeTab, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.blur();

    const savedScrollY = window.scrollY;
    setActiveTab(tab);
    setActiveCarouselIdx(0);

    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'instant' as ScrollBehavior });
    }

    // Keep page scroll perfectly frozen in place
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedScrollY, behavior: 'instant' as ScrollBehavior });
    });
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 300;
    const newScrollLeft = direction === 'left' 
      ? carouselRef.current.scrollLeft - scrollAmount 
      : carouselRef.current.scrollLeft + scrollAmount;
    
    carouselRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const itemWidth = 300;
    const newIdx = Math.round(scrollLeft / itemWidth);
    setActiveCarouselIdx(Math.max(0, Math.min(filteredSkills.length - 1, newIdx)));
  };

  return (
    <section id="skills" className="py-20 sm:py-24 border-b border-black/10 dark:border-white/10 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/[0.025] dark:bg-emerald-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-bold">
                [005] • VERIFIED TECHNICAL MATRIX
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-black dark:text-white tracking-tight">
              Technologies & Disciplines
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-ink-muted dark:text-slate-400 mt-3 md:mt-0 max-w-md">
            Specialized engineering proficiencies spanning low-level Linux 5.10 kernels, AOSP device trees, on-device WebGPU machine learning, and scalable systems architectures.
          </p>
        </div>

        {/* Filter Controls, Search & Mobile View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-black/5 dark:border-white/5">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar font-mono text-xs">
            {[
              { id: 'all', label: 'All' },
              { id: 'systems', label: 'Systems & Kernel 5.10' },
              { id: 'ai', label: 'Edge AI & WebGPU' },
              { id: 'backend', label: 'Backend & APIs' },
              { id: 'devops', label: 'DevOps & Databases' },
            ].map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={(e) => handleTabChange(tab.id as typeof activeTab, e)}
                className={`px-3.5 py-2 rounded-xl border transition-all cursor-pointer font-medium whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-black text-white dark:bg-emerald-500 dark:text-black border-transparent shadow-xs font-bold'
                    : 'bg-white/70 dark:bg-[#12151b]/80 border-black/10 dark:border-white/10 text-black/80 dark:text-slate-300 hover:border-black/30 dark:hover:border-white/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Mobile View Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs font-mono rounded-xl bg-white/70 dark:bg-[#12151b]/80 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Mobile View Toggle Button (Carousel vs Compact List) */}
            <div className="flex sm:hidden items-center border border-black/10 dark:border-white/10 rounded-xl p-0.5 bg-white/70 dark:bg-[#12151b]/80">
              <button
                type="button"
                onClick={() => setMobileViewMode('carousel')}
                aria-label="Swipeable Carousel View"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  mobileViewMode === 'carousel'
                    ? 'bg-black text-white dark:bg-emerald-500 dark:text-black font-bold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileViewMode('compact')}
                aria-label="Compact Grid View"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  mobileViewMode === 'compact'
                    ? 'bg-black text-white dark:bg-emerald-500 dark:text-black font-bold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 1. MOBILE VIEW: Horizontal Swipe Reel (Prevents Long Vertical Scroll) */}
        <div className={`sm:hidden ${mobileViewMode === 'carousel' ? 'block' : 'hidden'}`}>
          {/* Horizontal Snap Scroll Carousel */}
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 no-scrollbar -mx-4 px-4"
          >
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="w-[85vw] max-w-[310px] shrink-0 snap-center"
              >
                <SpotlightCard
                  style={{
                    borderTop: `4px solid ${skill.accentColor}`,
                  }}
                  className="p-5 bg-white dark:bg-[#0e1117] border-x border-b border-black/10 dark:border-white/10 hover-lift shadow-sm flex flex-col justify-between space-y-4 rounded-3xl h-full"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
                      <a
                        href={skill.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-2xl bg-black/[0.03] dark:bg-[#161b22] border border-black/10 dark:border-white/15 shadow-xs flex-shrink-0 hover:scale-105 transition-transform"
                        style={{ boxShadow: `0 0 12px ${skill.glowColor}` }}
                        title={`Open official ${skill.name} website`}
                      >
                        {skill.icon}
                      </a>
                      <a
                        href={skill.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold uppercase hover:bg-emerald-500/20 transition-colors"
                      >
                        <span>{skill.badge}</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>

                    <div className="mt-3">
                      <span className="text-[9px] font-mono text-ink-subtle dark:text-slate-400 uppercase tracking-wider block font-semibold">
                        {skill.role}
                      </span>
                      <a
                        href={skill.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-base font-display font-bold text-black dark:text-white mt-0.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
                      >
                        <span>{skill.name}</span>
                        <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <p className="text-[11px] font-mono text-ink-muted dark:text-slate-300 mt-2 leading-relaxed line-clamp-3">
                        {skill.description}
                      </p>
                    </div>
                  </div>

                  {/* Micro-Quirk */}
                  <div className="pt-2.5 border-t border-black/10 dark:border-white/10 font-mono text-[10px]">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="text-black dark:text-white font-bold">{skill.stats.label}:</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">{skill.stats.value}</span>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>

          {/* Carousel Minimal Navigation Dots & Arrows */}
          <div className="flex items-center justify-between mt-2 px-1 font-mono text-xs">
            {/* Minimal Dot Indicators */}
            <div className="flex items-center gap-1.5">
              {filteredSkills.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => {
                    if (carouselRef.current) {
                      carouselRef.current.scrollTo({ left: dotIdx * 300, behavior: 'smooth' });
                    }
                  }}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeCarouselIdx === dotIdx
                      ? 'w-5 bg-emerald-500'
                      : 'w-1.5 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                aria-label="Previous skill"
                className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                aria-label="Next skill"
                className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. MOBILE COMPACT 2-COLUMN GRID (Alternative view with direct landing page links) */}
        <div className={`sm:hidden ${mobileViewMode === 'compact' ? 'grid' : 'hidden'} grid-cols-2 gap-3`}>
          {filteredSkills.map((skill) => (
            <a
              key={skill.id}
              href={skill.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ borderTop: `3px solid ${skill.accentColor}` }}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#0e1117] border-x border-b border-black/10 dark:border-white/10 flex flex-col justify-between space-y-2 shadow-xs group hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-xl bg-black/[0.03] dark:bg-[#161b22]">
                  {skill.icon}
                </div>
                <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-black dark:text-white truncate mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {skill.name}
                </h4>
                <p className="text-[9px] font-mono text-ink-subtle dark:text-slate-400 truncate">
                  {skill.role}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* 3. TABLET & DESKTOP MULTI-COLUMN GRID (sm:grid) */}
        <div className="hidden sm:block min-h-[850px] transition-all duration-300">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills.map((skill, idx) => (
              <div
                key={skill.id}
                style={{ animationDelay: `${idx * 45}ms` }}
                className="animate-in fade-in zoom-in-95 duration-300 fill-mode-both"
              >
                <SpotlightCard
                  style={{
                    borderTop: `4px solid ${skill.accentColor}`,
                  }}
                  className="p-6 sm:p-7 bg-white dark:bg-[#0e1117] border-x border-b border-black/10 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover-lift shadow-xs flex flex-col justify-between space-y-6 group transition-all duration-300 relative overflow-hidden rounded-3xl h-full"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                      <a
                        href={skill.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-2xl bg-black/[0.03] dark:bg-[#161b22] border border-black/10 dark:border-white/15 shadow-sm group-hover:scale-105 transition-transform flex-shrink-0 cursor-pointer block"
                        style={{
                          boxShadow: `0 0 16px ${skill.glowColor}`,
                        }}
                        title={`Open official ${skill.name} documentation`}
                      >
                        {skill.icon}
                      </a>
                      <a
                        href={skill.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider hover:bg-emerald-500/20 transition-colors"
                        title={`Visit ${skill.name} official portal`}
                      >
                        <span>{skill.badge}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    <div className="mt-4">
                      <span className="text-[10px] font-mono text-ink-subtle dark:text-slate-400 uppercase tracking-wider block font-semibold">
                        {skill.role}
                      </span>
                      <a
                        href={skill.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-lg font-display font-bold text-black dark:text-white mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                      >
                        <span>{skill.name}</span>
                        <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                      <p className="text-xs font-mono text-ink-muted dark:text-slate-300 mt-2.5 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>

                  {/* Unique Interactive Micro-Quirk Display */}
                  <div className="pt-3 border-t border-black/10 dark:border-white/10 space-y-3 font-mono">
                    {/* 1. C++ Quirk: Live Clang/LLVM Memory Pointer Compiler */}
                    {skill.quirkType === 'cpp' && (
                      <div className="p-2.5 rounded-xl bg-black/[0.04] dark:bg-[#161b22] border border-black/10 dark:border-white/10 text-[10px]">
                        <div className="flex items-center justify-between mb-1.5 text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1 font-bold text-black dark:text-white">
                            <Binary className="h-3 w-3 text-emerald-500" />
                            <span>FOD_HAL.cpp</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCppCompiled(!cppCompiled);
                            }}
                            className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors font-bold cursor-pointer"
                          >
                            {cppCompiled ? 'Reset' : 'Run Clang'}
                          </button>
                        </div>
                        {cppCompiled ? (
                          <p className="text-emerald-700 dark:text-emerald-400 text-[9px] animate-in fade-in">
                            ✓ 0x7ffeef120: FOD sensor allocated (0.04ms)
                          </p>
                        ) : (
                          <p className="text-slate-600 dark:text-slate-400 truncate">
                            std::make_unique&lt;ManausFodDriver&gt;();
                          </p>
                        )}
                      </div>
                    )}

                    {/* 2. Linux Kernel & AOSP Quirk: Dmesg Boot Stream */}
                    {skill.quirkType === 'kernel' && (
                      <div className="p-2.5 rounded-xl bg-black/[0.04] dark:bg-[#161b22] border border-black/10 dark:border-white/10 text-[10px] space-y-1">
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-bold">
                          <span className="flex items-center gap-1 text-black dark:text-white">
                            <Activity className="h-3 w-3 text-yellow-500" />
                            <span>dmesg | grep 5.10</span>
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">5.10 LTS</span>
                        </div>
                        <p className="text-[9px] text-slate-600 dark:text-slate-300 truncate">
                          [0.00] Linux 5.10.y (manaus@aosp-qpr)
                        </p>
                      </div>
                    )}

                    {/* 3. Git Quirk: Interactive Live Branch Graph */}
                    {skill.quirkType === 'git' && (
                      <div className="p-2.5 rounded-xl bg-black/[0.04] dark:bg-[#161b22] border border-black/10 dark:border-white/10 text-[10px]">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="flex items-center gap-1 font-bold text-black dark:text-white">
                            <GitBranch className="h-3 w-3 text-orange-500" />
                            <span>git graph</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setGitStep((prev) => (prev + 1) % 3);
                            }}
                            className="text-[9px] px-1.5 py-0.5 rounded-md bg-orange-500/20 text-orange-700 dark:text-orange-400 hover:bg-orange-500 hover:text-white transition-colors font-bold cursor-pointer"
                          >
                            Step: 0{gitStep + 1}
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] text-slate-600 dark:text-slate-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-ping" />
                          {gitStep === 0 && <span>main ➔ commit 5.10-LTS</span>}
                          {gitStep === 1 && <span>feat/fod-hal ➔ rebased</span>}
                          {gitStep === 2 && <span>merge PR #1 ➔ synced</span>}
                        </div>
                      </div>
                    )}

                    {/* 4. WebGPU Quirk: Interactive Tensor Matrix Cells */}
                    {skill.quirkType === 'webgpu' && (
                      <div className="p-2.5 rounded-xl bg-black/[0.04] dark:bg-[#161b22] border border-black/10 dark:border-white/10 text-[10px]">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="flex items-center gap-1 font-bold text-black dark:text-white">
                            <Sparkles className="h-3 w-3 text-emerald-400" />
                            <span>WGSL Attention Grid</span>
                          </span>
                          <span className="text-[9px] text-emerald-500 font-bold">GPU ACCEL</span>
                        </div>
                        <div className="grid grid-cols-6 gap-1">
                          {[...Array(6)].map((_, i) => (
                            <span
                              key={i}
                              onMouseEnter={() => setActiveMatrixCell(i)}
                              className={`h-2.5 rounded-xs transition-colors cursor-pointer ${
                                activeMatrixCell === i
                                  ? 'bg-emerald-400 shadow-xs'
                                  : 'bg-black/10 dark:bg-white/15 hover:bg-emerald-500/60'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 5. Python Quirk: Tokenizer Parser */}
                    {skill.quirkType === 'python' && (
                      <div className="p-2.5 rounded-xl bg-black/[0.04] dark:bg-[#161b22] border border-black/10 dark:border-white/10 text-[10px]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="flex items-center gap-1 font-bold text-black dark:text-white">
                            <Terminal className="h-3 w-3 text-yellow-400" />
                            <span>parse_tokens.py</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPyExecuted(!pyExecuted);
                            }}
                            className="text-[9px] px-1.5 py-0.5 rounded-md bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500 hover:text-black transition-colors font-bold cursor-pointer"
                          >
                            {pyExecuted ? 'Parsed' : 'Execute'}
                          </button>
                        </div>
                        <p className="text-[9px] text-slate-600 dark:text-slate-300 truncate">
                          {pyExecuted ? 'Tokens: 1,420 • Extracted in 4.2ms' : 'def extract_embeddings(text):'}
                        </p>
                      </div>
                    )}

                    {/* 6. Django REST Quirk: Live Endpoint Dispatcher */}
                    {skill.quirkType === 'django' && (
                      <div className="p-2.5 rounded-xl bg-black/[0.04] dark:bg-[#161b22] border border-black/10 dark:border-white/10 text-[10px]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-black dark:text-white">POST /api/v1/eval</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDjangoResponse(!djangoResponse);
                            }}
                            className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors font-bold cursor-pointer"
                          >
                            {djangoResponse ? '200 OK' : 'Send'}
                          </button>
                        </div>
                        <p className="text-[9px] text-slate-600 dark:text-slate-300 truncate">
                          {djangoResponse ? '{"score": 94.5, "time": "14ms"}' : 'Gemini payload ready'}
                        </p>
                      </div>
                    )}

                    {/* 7. TypeScript Quirk */}
                    {skill.quirkType === 'ts' && (
                      <div className="p-2.5 rounded-xl bg-black/[0.04] dark:bg-[#161b22] border border-black/10 dark:border-white/10 text-[10px]">
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                          <span className="flex items-center gap-1 font-bold text-black dark:text-white">
                            <Cpu className="h-3 w-3 text-blue-400" />
                            <span>AudioContext.d.ts</span>
                          </span>
                          <span className="text-[9px] text-blue-500 font-bold">STRICT</span>
                        </div>
                        <p className="text-[9px] text-slate-600 dark:text-slate-300 truncate">
                          type FFTBuffer = Uint8Array&lt;64&gt;
                        </p>
                      </div>
                    )}

                    {/* 8. React Quirk: Component State Stream */}
                    {skill.quirkType === 'react' && (
                      <div className="p-2.5 rounded-xl bg-black/[0.04] dark:bg-[#161b22] border border-black/10 dark:border-white/10 text-[10px]">
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                          <span className="flex items-center gap-1 font-bold text-black dark:text-white">
                            <Layers className="h-3 w-3 text-sky-400" />
                            <span>useState(AudioState)</span>
                          </span>
                          <span className="text-[9px] text-sky-500 font-bold">REACTIVE</span>
                        </div>
                        <p className="text-[9px] text-slate-600 dark:text-slate-300 truncate">
                          Dynamic Visualizer + FFT Stream
                        </p>
                      </div>
                    )}

                    {/* 9. Docker Quirk: Live Container Pulse */}
                    {skill.quirkType === 'docker' && (
                      <div className="p-2.5 rounded-xl bg-black/[0.04] dark:bg-[#161b22] border border-black/10 dark:border-white/10 text-[10px]">
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                          <span className="flex items-center gap-1 font-bold text-black dark:text-white">
                            <Boxes className="h-3 w-3 text-blue-400" />
                            <span>manaus-builder</span>
                          </span>
                          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">RUNNING</span>
                        </div>
                        <p className="text-[9px] text-slate-600 dark:text-slate-300">
                          Port: 8000:8000 • MySQL 8.0 attached
                        </p>
                      </div>
                    )}

                    {/* 10. MySQL Quirk: SQL Query Plan Optimizer */}
                    {skill.quirkType === 'mysql' && (
                      <div className="p-2.5 rounded-xl bg-black/[0.04] dark:bg-[#161b22] border border-black/10 dark:border-white/10 text-[10px]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="flex items-center gap-1 font-bold text-black dark:text-white">
                            <Database className="h-3 w-3 text-amber-500" />
                            <span>EXPLAIN query</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSqlExplained(!sqlExplained);
                            }}
                            className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-400 hover:bg-amber-500 hover:text-black transition-colors font-bold cursor-pointer"
                          >
                            {sqlExplained ? 'Optimized' : 'Analyze'}
                          </button>
                        </div>
                        <p className="text-[9px] text-slate-600 dark:text-slate-300 truncate">
                          {sqlExplained ? 'Index Scan: 0.02ms (Rows: 1,420)' : 'SELECT * FROM device_tree;'}
                        </p>
                      </div>
                    )}

                    {/* Metric Footer */}
                    <div className="flex items-center justify-between text-[11px] pt-2 text-ink-subtle dark:text-slate-400 font-medium">
                      <span>{skill.stats.label}:</span>
                      <span className="text-black dark:text-white font-bold">{skill.stats.value}</span>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

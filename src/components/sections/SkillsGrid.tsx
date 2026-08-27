import React, { useState } from 'react';
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
  Search,
  ExternalLink
} from 'lucide-react';

interface CleanSkill {
  id: string;
  name: string;
  category: 'systems' | 'ai' | 'backend' | 'devops';
  role: string;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  chips: string[];
  officialUrl: string;
}

const CLEAN_SKILLS: CleanSkill[] = [
  {
    id: 'cpp',
    name: 'C / C++',
    category: 'systems',
    role: 'Low-Level Systems & HAL',
    icon: <CppLogo className="h-7 w-7" />,
    accentColor: '#00599C',
    glowColor: 'rgba(0, 89, 156, 0.2)',
    chips: ['HAL Drivers', 'Memory Mgmt', 'Pointer Arithmetic', 'RAII'],
    officialUrl: 'https://en.cppreference.com/w/',
  },
  {
    id: 'linux-kernel',
    name: 'Linux Kernel 5.10 LTS',
    category: 'systems',
    role: 'Kernel Porting & Driver Tuning',
    icon: <LinuxLogo className="h-7 w-7" />,
    accentColor: '#F0C000',
    glowColor: 'rgba(240, 192, 0, 0.2)',
    chips: ['Device Trees (DTS)', 'Dimensity 7030', 'Defconfig', 'Modules'],
    officialUrl: 'https://www.kernel.org/',
  },
  {
    id: 'aosp',
    name: 'AOSP Architecture',
    category: 'systems',
    role: 'ROM Engineering & BoardConfig',
    icon: <AndroidLogo className="h-7 w-7" />,
    accentColor: '#3DDC84',
    glowColor: 'rgba(61, 220, 132, 0.2)',
    chips: ['Android 14/15 QPR', 'SELinux Policies', 'Vendor Blobs', 'CTS'],
    officialUrl: 'https://source.android.com/',
  },
  {
    id: 'git',
    name: 'Git & Multi-Repo',
    category: 'devops',
    role: 'Version Control & Sync',
    icon: <GitLogo className="h-7 w-7" />,
    accentColor: '#F05032',
    glowColor: 'rgba(240, 80, 50, 0.2)',
    chips: ['Upstream Rebase', 'Repo Manifests', 'Branching', 'CI/CD'],
    officialUrl: 'https://git-scm.com/',
  },
  {
    id: 'webgpu',
    name: 'WebGPU & Edge AI',
    category: 'ai',
    role: 'Client-Side In-Browser ML',
    icon: <WebGPULogo className="h-7 w-7" />,
    accentColor: '#00E599',
    glowColor: 'rgba(0, 229, 153, 0.2)',
    chips: ['WGSL Shaders', 'Transformers.js', 'ONNX Runtime', 'Zero Latency'],
    officialUrl: 'https://www.w3.org/TR/webgpu/',
  },
  {
    id: 'python',
    name: 'Python 3.12+',
    category: 'backend',
    role: 'Backend & Data Pipelines',
    icon: <PythonLogo className="h-7 w-7" />,
    accentColor: '#3776AB',
    glowColor: 'rgba(55, 118, 171, 0.2)',
    chips: ['Async Automation', 'Token Extraction', 'PyTorch', 'REST APIs'],
    officialUrl: 'https://www.python.org/',
  },
  {
    id: 'django',
    name: 'Django REST',
    category: 'backend',
    role: 'Enterprise Backend & APIs',
    icon: <DjangoLogo className="h-7 w-7" />,
    accentColor: '#092E20',
    glowColor: 'rgba(9, 46, 32, 0.2)',
    chips: ['RESTful APIs', 'ORM Optimization', 'Gemini LLM', 'JWT Auth'],
    officialUrl: 'https://www.django-rest-framework.org/',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'backend',
    role: 'Type-Safe Architecture',
    icon: <TypeScriptLogo className="h-7 w-7" />,
    accentColor: '#3178C6',
    glowColor: 'rgba(49, 120, 198, 0.2)',
    chips: ['Strict Types', 'Web Audio API', 'Canvas Physics', 'ESNext'],
    officialUrl: 'https://www.typescriptlang.org/',
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'backend',
    role: 'Modern Frontend Systems',
    icon: <ReactLogo className="h-7 w-7" />,
    accentColor: '#61DAFB',
    glowColor: 'rgba(97, 218, 251, 0.2)',
    chips: ['React 19', 'Tailwind CSS', 'Component Arch', 'Vite'],
    officialUrl: 'https://react.dev/',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    role: 'Containerized Environments',
    icon: <DockerLogo className="h-7 w-7" />,
    accentColor: '#2496ED',
    glowColor: 'rgba(36, 150, 237, 0.2)',
    chips: ['AOSP Containers', 'Ubuntu Toolchain', 'Multi-Stage', 'Reproducibility'],
    officialUrl: 'https://www.docker.com/',
  },
  {
    id: 'mysql',
    name: 'MySQL & Databases',
    category: 'devops',
    role: 'Relational Data Architecture',
    icon: <MySqlLogo className="h-7 w-7" />,
    accentColor: '#00758F',
    glowColor: 'rgba(0, 117, 143, 0.2)',
    chips: ['Schema Design', 'B-Tree Indexing', 'Query Plans', 'ACID'],
    officialUrl: 'https://www.mysql.com/',
  }
];

export const SkillsGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'systems' | 'ai' | 'backend' | 'devops'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSkills = CLEAN_SKILLS.filter(skill => {
    const matchesTab = activeTab === 'all' || skill.category === activeTab;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          skill.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.chips.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const handleTabChange = (tab: typeof activeTab, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.blur();

    const savedScrollY = window.scrollY;
    setActiveTab(tab);

    requestAnimationFrame(() => {
      window.scrollTo({ top: savedScrollY, behavior: 'instant' as ScrollBehavior });
    });
  };

  return (
    <section id="skills" className="py-20 sm:py-24 border-b border-black/10 dark:border-white/10 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/[0.02] dark:bg-emerald-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-bold">
                [005] • CORE COMPETENCIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-black dark:text-white tracking-tight">
              Skills & Technologies
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-ink-muted dark:text-slate-400 mt-3 md:mt-0 max-w-md">
            Specialized engineering capabilities across low-level kernels, on-device machine learning, backend services, and scalable web architectures.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-black/5 dark:border-white/5">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar font-mono text-xs">
            {[
              { id: 'all', label: 'All Disciplines' },
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

          {/* Search input */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search technologies or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-mono rounded-xl bg-white/70 dark:bg-[#12151b]/80 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Minimalist Bento Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => (
            <a
              key={skill.id}
              href={skill.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group h-full outline-hidden"
              title={`Open official ${skill.name} documentation`}
            >
              <SpotlightCard
                style={{
                  borderTop: `3px solid ${skill.accentColor}`,
                }}
                className="p-5 sm:p-6 bg-white dark:bg-[#0e1117] border-x border-b border-black/10 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover-lift shadow-xs flex flex-col justify-between space-y-4 rounded-3xl h-full transition-all duration-300 relative overflow-hidden"
              >
                {/* Header: Logo, Discipline & Direct Link Icon */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
                    <div 
                      className="p-2 rounded-2xl bg-black/[0.03] dark:bg-[#161b22] border border-black/10 dark:border-white/15 shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform"
                      style={{ boxShadow: `0 0 14px ${skill.glowColor}` }}
                    >
                      {skill.icon}
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">Docs</span>
                      <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <div className="mt-3.5">
                    <span className="text-[10px] font-mono text-ink-subtle dark:text-slate-400 uppercase tracking-wider block font-semibold">
                      {skill.role}
                    </span>
                    <h3 className="text-base sm:text-lg font-display font-bold text-black dark:text-white mt-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                </div>

                {/* Focus Keyword Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/5 font-mono text-[10px]">
                  {skill.chips.map((chip, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2 py-0.5 rounded-lg bg-black/[0.04] dark:bg-[#161b22] text-slate-700 dark:text-slate-300 font-medium group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

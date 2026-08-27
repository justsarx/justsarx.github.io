import React, { useState, useEffect, useRef } from 'react';
import { 
  GitHubLogo, 
  LeetCodeLogo, 
  CodeChefLogo, 
  AtCoderLogo, 
  LinkedInLogo 
} from '../ui/SkillLogos';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { 
  ExternalLink, 
  GitCommit, 
  Star, 
  GitFork, 
  Code2, 
  Trophy, 
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface GitHubRepoData {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  updatedAt: string;
}

interface CodingProfile {
  id: string;
  platform: string;
  handle: string;
  url: string;
  role: string;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  badge: string;
  highlights: { label: string; value: string }[];
  tags: string[];
}

const CODING_PROFILES: CodingProfile[] = [
  {
    id: 'leetcode',
    platform: 'LeetCode',
    handle: 'justsarx',
    url: 'https://leetcode.com/u/justsarx/',
    role: 'Algorithms & Data Structures',
    icon: <LeetCodeLogo className="h-8 w-8" />,
    accentColor: '#FFA116',
    glowColor: 'rgba(255, 161, 22, 0.25)',
    badge: 'Active Solver',
    highlights: [
      { label: 'Focus', value: 'Algorithms & C++' },
      { label: 'Topics', value: 'DP, Trees, Graphs' },
    ],
    tags: ['C++', 'Data Structures', 'Algorithms', 'Optimization'],
  },
  {
    id: 'codechef',
    platform: 'CodeChef',
    handle: 'justsarx',
    url: 'https://www.codechef.com/users/justsarx',
    role: 'Competitive Programming',
    icon: <CodeChefLogo className="h-8 w-8" />,
    accentColor: '#8C5B3F',
    glowColor: 'rgba(140, 91, 63, 0.25)',
    badge: 'Contest Competitor',
    highlights: [
      { label: 'Language', value: 'C++20' },
      { label: 'Contests', value: 'Starters & Rated' },
    ],
    tags: ['C++20', 'Competitive Programming', 'Math', 'Greedy'],
  },
  {
    id: 'atcoder',
    platform: 'AtCoder',
    handle: 'justsarx',
    url: 'https://atcoder.jp/users/justsarx',
    role: 'Fast Algorithmic Contests',
    icon: <AtCoderLogo className="h-8 w-8" />,
    accentColor: '#00AEF0',
    glowColor: 'rgba(0, 174, 240, 0.25)',
    badge: 'AtCoder Regular',
    highlights: [
      { label: 'Contest Type', value: 'ABC / ARC' },
      { label: 'Execution', value: 'Low Latency C++' },
    ],
    tags: ['AtCoder Beginner', 'Fast IO', 'Binary Search', 'Graphs'],
  },
  {
    id: 'github',
    platform: 'GitHub',
    handle: 'justsarx',
    url: 'https://github.com/justsarx',
    role: 'AOSP & Open Source Repositories',
    icon: <GitHubLogo className="h-8 w-8 text-black dark:text-white" />,
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    badge: 'Open Source Maintainer',
    highlights: [
      { label: 'Flagship Repo', value: 'device_axion_manaus' },
      { label: 'Contributions', value: 'Kernel 5.10 LTS / AOSP' },
    ],
    tags: ['AOSP', 'Linux 5.10', 'WebGPU', 'Django REST'],
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    handle: 'justsarx',
    url: 'https://www.linkedin.com/in/justsarx/',
    role: 'Professional Systems Network',
    icon: <LinkedInLogo className="h-8 w-8" />,
    accentColor: '#0A66C2',
    glowColor: 'rgba(10, 102, 194, 0.25)',
    badge: 'Verified Profile',
    highlights: [
      { label: 'Domain', value: 'AOSP & Core Systems' },
      { label: 'Education', value: 'MCA (8.55 CGPA)' },
    ],
    tags: ['Systems Engineer', 'Android Architecture', 'Open Source'],
  }
];

const FEATURED_REPOS: GitHubRepoData[] = [
  {
    name: 'device_axion_manaus',
    description: 'AOSP Device Tree & Linux 5.10 LTS Kernel driver sources for Motorola Edge 40 Neo (MediaTek Dimensity 7030).',
    language: 'C++ / Makefile',
    stars: 12,
    forks: 4,
    url: 'https://github.com/justsarx/device_axion_manaus',
    updatedAt: 'Active',
  },
  {
    name: 'Variance',
    description: 'Client-side hardware-accelerated text rewriting engine running ONNX Transformers.js models via WebGPU compute shaders.',
    language: 'TypeScript / WGSL',
    stars: 8,
    forks: 2,
    url: 'https://github.com/justsarx/Variance',
    updatedAt: 'Active',
  },
  {
    name: 'Resumify',
    description: 'Full-stack ATS resume evaluation platform built with Django REST framework and Google Gemini API analysis pipelines.',
    language: 'Python / React',
    stars: 6,
    forks: 1,
    url: 'https://github.com/justsarx/Resumify',
    updatedAt: 'Active',
  },
];

export const DeveloperTelemetry: React.FC = () => {
  const [githubStats, setGithubStats] = useState<{
    publicRepos: number;
    followers: number;
    avatarUrl: string;
  }>({
    publicRepos: 18,
    followers: 14,
    avatarUrl: 'https://github.com/justsarx.png',
  });

  const [activeProfileIdx, setActiveProfileIdx] = useState<number>(0);
  const [activeRepoIdx, setActiveRepoIdx] = useState<number>(0);
  const profileCarouselRef = useRef<HTMLDivElement>(null);
  const repoCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/justsarx')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setGithubStats({
            publicRepos: data.public_repos || 18,
            followers: data.followers || 14,
            avatarUrl: data.avatar_url || 'https://github.com/justsarx.png',
          });
        }
      })
      .catch(() => {
        // Graceful fallback
      });
  }, []);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const amount = 280;
    const nextLeft = direction === 'left' ? ref.current.scrollLeft - amount : ref.current.scrollLeft + amount;
    ref.current.scrollTo({ left: nextLeft, behavior: 'smooth' });
  };

  return (
    <section id="telemetry" className="py-20 sm:py-24 border-b border-black/10 dark:border-white/10 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/[0.02] dark:bg-emerald-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-bold">
                [006] • DEVELOPER TELEMETRY & CODING HUBS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-black dark:text-white tracking-tight">
              Competitive & Open Source Hub
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-ink-muted dark:text-slate-400 mt-3 md:mt-0 max-w-md">
            Verified algorithmic profiles and open-source GitHub repositories across LeetCode, CodeChef, AtCoder, and LinkedIn.
          </p>
        </div>

        {/* 1. Competitive Programming & Profile Hub Cards */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5 text-amber-500" />
              <span>Algorithmic & Professional Profiles (@justsarx)</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold">
              VERIFIED HANDLES
            </span>
          </div>

          {/* Mobile Horizontal Snap Swipe Reel */}
          <div className="sm:hidden">
            <div
              ref={profileCarouselRef}
              onScroll={() => {
                if (!profileCarouselRef.current) return;
                const idx = Math.round(profileCarouselRef.current.scrollLeft / 280);
                setActiveProfileIdx(Math.max(0, Math.min(CODING_PROFILES.length - 1, idx)));
              }}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 no-scrollbar -mx-4 px-4"
            >
              {CODING_PROFILES.map((profile) => (
                <div key={profile.id} className="w-[82vw] max-w-[290px] shrink-0 snap-center">
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group h-full outline-hidden"
                    title={`Visit @justsarx on ${profile.platform}`}
                  >
                    <SpotlightCard
                      style={{ borderTop: `3px solid ${profile.accentColor}` }}
                      className="p-5 bg-white dark:bg-[#0e1117] border-x border-b border-black/10 dark:border-white/10 hover-lift shadow-xs flex flex-col justify-between space-y-4 rounded-3xl h-full"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
                          <div 
                            className="p-2 rounded-2xl bg-black/[0.03] dark:bg-[#161b22] border border-black/10 dark:border-white/15 shadow-xs flex-shrink-0"
                            style={{ boxShadow: `0 0 12px ${profile.glowColor}` }}
                          >
                            {profile.icon}
                          </div>
                          <div className="flex items-center gap-1 text-slate-400">
                            <span className="text-[9px] font-mono font-bold uppercase">Visit</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base font-display font-bold text-black dark:text-white">
                              {profile.platform}
                            </h3>
                            <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                          </div>
                          <p className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
                            @{profile.handle}
                          </p>
                          <p className="text-[10px] font-mono text-ink-subtle dark:text-slate-400 mt-1">
                            {profile.role}
                          </p>
                        </div>

                        <div className="space-y-1 mt-3 pt-2.5 border-t border-black/5 dark:border-white/5 font-mono text-[10px]">
                          {profile.highlights.map((h, i) => (
                            <div key={i} className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                              <span className="text-ink-subtle dark:text-slate-400">{h.label}:</span>
                              <span className="font-semibold text-black dark:text-white truncate max-w-[120px]">{h.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-2 border-t border-black/5 dark:border-white/5 font-mono text-[9px]">
                        {profile.tags.slice(0, 2).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-1.5 py-0.5 rounded-md bg-black/[0.03] dark:bg-[#161b22] text-slate-600 dark:text-slate-400 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </SpotlightCard>
                  </a>
                </div>
              ))}
            </div>

            {/* Profile Reel Dots & Arrows */}
            <div className="flex items-center justify-between mt-2 px-1 font-mono text-xs">
              <div className="flex items-center gap-1.5">
                {CODING_PROFILES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => {
                      if (profileCarouselRef.current) {
                        profileCarouselRef.current.scrollTo({ left: dotIdx * 280, behavior: 'smooth' });
                      }
                    }}
                    aria-label={`Go to profile slide ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeProfileIdx === dotIdx
                        ? 'w-5 bg-emerald-500'
                        : 'w-1.5 bg-black/20 dark:bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollCarousel(profileCarouselRef, 'left')}
                  aria-label="Previous profile"
                  className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel(profileCarouselRef, 'right')}
                  aria-label="Next profile"
                  className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Multi-Column Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {CODING_PROFILES.map((profile) => (
              <a
                key={profile.id}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full outline-hidden"
                title={`Visit @justsarx on ${profile.platform}`}
              >
                <SpotlightCard
                  style={{ borderTop: `3px solid ${profile.accentColor}` }}
                  className="p-5 bg-white dark:bg-[#0e1117] border-x border-b border-black/10 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover-lift shadow-xs flex flex-col justify-between space-y-4 rounded-3xl h-full transition-all duration-300 relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
                      <div 
                        className="p-2 rounded-2xl bg-black/[0.03] dark:bg-[#161b22] border border-black/10 dark:border-white/15 shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform"
                        style={{ boxShadow: `0 0 14px ${profile.glowColor}` }}
                      >
                        {profile.icon}
                      </div>

                      <div className="flex items-center gap-1 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        <span className="text-[9px] font-mono font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">Visit</span>
                        <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-display font-bold text-black dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {profile.platform}
                        </h3>
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                      </div>
                      <p className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
                        @{profile.handle}
                      </p>
                      <p className="text-[10px] font-mono text-ink-subtle dark:text-slate-400 mt-1">
                        {profile.role}
                      </p>
                    </div>

                    <div className="space-y-1 mt-3 pt-2.5 border-t border-black/5 dark:border-white/5 font-mono text-[10px]">
                      {profile.highlights.map((h, i) => (
                        <div key={i} className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                          <span className="text-ink-subtle dark:text-slate-400">{h.label}:</span>
                          <span className="font-semibold text-black dark:text-white truncate max-w-[110px]">{h.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2 border-t border-black/5 dark:border-white/5 font-mono text-[9px]">
                    {profile.tags.slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 py-0.5 rounded-md bg-black/[0.03] dark:bg-[#161b22] text-slate-600 dark:text-slate-400 font-medium truncate"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </a>
            ))}
          </div>
        </div>

        {/* 2. Featured GitHub Repositories Telemetry */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>Core Repositories & Upstream Codebase</span>
            </span>
            <a
              href="https://github.com/justsarx?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>View All ({githubStats.publicRepos})</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Mobile Horizontal Snap Swipe Reel for Repositories */}
          <div className="sm:hidden">
            <div
              ref={repoCarouselRef}
              onScroll={() => {
                if (!repoCarouselRef.current) return;
                const idx = Math.round(repoCarouselRef.current.scrollLeft / 280);
                setActiveRepoIdx(Math.max(0, Math.min(FEATURED_REPOS.length - 1, idx)));
              }}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 no-scrollbar -mx-4 px-4"
            >
              {FEATURED_REPOS.map((repo, idx) => (
                <div key={idx} className="w-[82vw] max-w-[290px] shrink-0 snap-center">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group h-full outline-hidden"
                    title={`Inspect repository ${repo.name}`}
                  >
                    <SpotlightCard
                      className="p-5 bg-white dark:bg-[#0e1117] border border-black/10 dark:border-white/10 hover-lift shadow-xs flex flex-col justify-between space-y-4 rounded-3xl h-full"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
                          <div className="flex items-center gap-2">
                            <GitCommit className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                            <span className="text-xs font-mono font-bold text-black dark:text-white truncate">
                              {repo.name}
                            </span>
                          </div>
                          <ExternalLink className="h-3 w-3 text-slate-400" />
                        </div>

                        <p className="text-[11px] font-mono text-ink-muted dark:text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                          {repo.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2.5 border-t border-black/5 dark:border-white/5 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span className="text-black dark:text-white font-medium truncate max-w-[90px]">{repo.language}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-0.5">
                            <Star className="h-3 w-3 text-amber-400" />
                            <span>{repo.stars}</span>
                          </span>
                          <span className="flex items-center gap-0.5">
                            <GitFork className="h-3 w-3 text-slate-400" />
                            <span>{repo.forks}</span>
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </a>
                </div>
              ))}
            </div>

            {/* Repos Reel Dots & Arrows */}
            <div className="flex items-center justify-between mt-2 px-1 font-mono text-xs">
              <div className="flex items-center gap-1.5">
                {FEATURED_REPOS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => {
                      if (repoCarouselRef.current) {
                        repoCarouselRef.current.scrollTo({ left: dotIdx * 280, behavior: 'smooth' });
                      }
                    }}
                    aria-label={`Go to repo slide ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeRepoIdx === dotIdx
                        ? 'w-5 bg-emerald-500'
                        : 'w-1.5 bg-black/20 dark:bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollCarousel(repoCarouselRef, 'left')}
                  aria-label="Previous repo"
                  className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel(repoCarouselRef, 'right')}
                  aria-label="Next repo"
                  className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop 3-Column Grid */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-5">
            {FEATURED_REPOS.map((repo, idx) => (
              <a
                key={idx}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full outline-hidden"
                title={`Inspect repository ${repo.name}`}
              >
                <SpotlightCard
                  className="p-6 bg-white dark:bg-[#0e1117] border border-black/10 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover-lift shadow-xs flex flex-col justify-between space-y-4 rounded-3xl h-full transition-all duration-300 relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <GitCommit className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-xs font-mono font-bold text-black dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                          justsarx / {repo.name}
                        </span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
                    </div>

                    <p className="text-xs font-mono text-ink-muted dark:text-slate-300 mt-3 leading-relaxed line-clamp-3">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-black dark:text-white font-medium">{repo.language}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                        <Star className="h-3 w-3 text-amber-400" />
                        <span>{repo.stars}</span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                        <GitFork className="h-3 w-3 text-slate-400" />
                        <span>{repo.forks}</span>
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

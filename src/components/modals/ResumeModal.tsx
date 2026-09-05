import React, { useState } from 'react';
import { X, Download, Copy, Check, ExternalLink, FileText } from 'lucide-react';
import { PERSONAL_DATA, EXPERIENCES, EDUCATION, PROJECTS } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/SarthakCV.pdf';
    link.download = 'SarthakCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(`Sarthak - AOSP Developer & Systems Engineer\nEmail: ${PERSONAL_DATA.email}\nGitHub: ${PERSONAL_DATA.github}\nLinkedIn: ${PERSONAL_DATA.linkedin}\nWebsite: ${PERSONAL_DATA.website}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="flex flex-col w-full max-w-4xl max-h-[90vh] rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0c0e12] shadow-2xl overflow-hidden text-black dark:text-slate-200">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-surfaceMuted-light dark:bg-surface border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white font-display">
                Sarthak — Curriculum Vitae
              </h3>
              <p className="text-xs text-ink-muted dark:text-textMuted font-mono">
                AOSP & Systems Engineer • Linux Kernel 5.10 LTS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={handleCopyText}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-surfaceMuted hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-slate-300 border border-black/10 dark:border-white/10 transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <a
              href="/SarthakCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-surfaceMuted hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-slate-300 border border-black/10 dark:border-white/10 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Open PDF</span>
            </a>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black font-semibold hover:opacity-90 transition-all cursor-pointer shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-ink-muted dark:text-textMuted hover:text-black dark:hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 text-black/80 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans selection:bg-black/10 dark:selection:bg-white/20">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-black/10 dark:border-white/10 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-black dark:text-white tracking-tight">
                {PERSONAL_DATA.name.toUpperCase()}
              </h1>
              <p className="text-emerald-700 dark:text-emerald-400 font-mono text-xs mt-1 font-semibold">
                {PERSONAL_DATA.role} • {PERSONAL_DATA.location}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ink-muted dark:text-textMuted">
              <a href={`mailto:${PERSONAL_DATA.email}`} className="hover:underline">{PERSONAL_DATA.email}</a>
              <span>•</span>
              <a href={PERSONAL_DATA.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
              <span>•</span>
              <a href={PERSONAL_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-ink-subtle uppercase tracking-wider font-bold">
              Professional Summary
            </h2>
            <p className="text-black/80 dark:text-slate-300 leading-relaxed">
              {PERSONAL_DATA.about}
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono text-ink-subtle uppercase tracking-wider font-bold">
              Engineering Experience
            </h2>
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="space-y-2 pb-6 border-b border-black/5 dark:border-white/5 last:border-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <span className="font-bold text-black dark:text-white font-display text-base">
                    {exp.role} — <span className="text-emerald-700 dark:text-emerald-400 font-medium">{exp.organization}</span>
                  </span>
                  <span className="text-xs font-mono text-ink-subtle">{exp.period}</span>
                </div>
                <div className="text-xs font-mono text-ink-muted dark:text-textMuted">
                  {exp.location} • {exp.type}
                </div>
                <ul className="list-disc list-inside space-y-1 pt-1 text-black/80 dark:text-slate-300">
                  {exp.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Selected Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono text-ink-subtle uppercase tracking-wider font-bold">
              Selected Works
            </h2>
            {PROJECTS.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surfaceMuted-light dark:bg-surface border border-black/5 dark:border-white/5 space-y-2">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono">
                  <span className="font-bold text-black dark:text-white text-sm">{proj.title}</span>
                  <span className="text-ink-subtle">{proj.period}</span>
                </div>
                <p className="text-xs text-black/80 dark:text-slate-300 font-sans">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-surfaceMuted text-black/80 dark:text-slate-400 border border-black/10 dark:border-white/5 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono text-ink-subtle uppercase tracking-wider font-bold">
              Academic Qualifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-surfaceMuted-light dark:bg-surface border border-black/5 dark:border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-black dark:text-white">{edu.degree}</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">{edu.grade}</span>
                  </div>
                  <div className="text-xs text-ink-muted dark:text-textMuted font-mono">{edu.institution}</div>
                  <div className="text-[11px] text-ink-subtle font-mono">{edu.period} • {edu.location}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

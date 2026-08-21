import React, { useState } from 'react';
import { PERSONAL_DATA } from '../../data/portfolioData';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { MagneticButton } from '../reactbits/MagneticButton';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { Copy, Check, ArrowUpRight, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);

    const mailto = `mailto:${PERSONAL_DATA.email}?subject=Engineering%20Inquiry%20from%20${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message + '\n\nFrom: ' + formState.email)}`;
    window.open(mailto, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsSent(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
              [006] • INQUIRIES & COLLABORATION
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-black dark:text-white tracking-tight">
              Get in Touch
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-ink-muted dark:text-textMuted mt-3 md:mt-0 max-w-md">
            Open to discussing low-level AOSP development, Linux kernel porting, WebGPU pipelines, and systems engineering roles.
          </p>
        </div>

        <div className="reveal-on-scroll grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-5 space-y-6">
            <SpotlightCard className="p-8 sm:p-10 bg-white dark:bg-surface border border-black/10 dark:border-white/10 hover-lift shadow-sm space-y-6">
              <div>
                <span className="text-xs font-mono text-ink-subtle uppercase tracking-wider block mb-1 font-semibold">
                  Direct Channel
                </span>
                <a
                  href={`mailto:${PERSONAL_DATA.email}`}
                  className="text-xl sm:text-2xl font-display font-bold text-black dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors block break-all"
                >
                  {PERSONAL_DATA.email}
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`mailto:${PERSONAL_DATA.email}`}
                  className="flex-1"
                >
                  <MagneticButton
                    strength={12}
                    className="w-full py-3.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-mono font-semibold text-xs text-center hover:opacity-90 transition-all shadow-sm"
                  >
                    Compose Email
                  </MagneticButton>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-surfaceMuted-light dark:bg-surfaceMuted hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-3 font-mono text-xs text-ink-muted dark:text-textMuted">
                <div className="flex items-center justify-between">
                  <span>Location:</span>
                  <span className="text-black dark:text-white font-semibold">{PERSONAL_DATA.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Timezone:</span>
                  <span className="text-black dark:text-white font-semibold">UTC+5:30 (IST)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Available for Roles</span>
                </div>
              </div>
            </SpotlightCard>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={PERSONAL_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white dark:bg-surface border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 hover-lift shadow-xs transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="h-5 w-5 text-black dark:text-white" />
                  <div>
                    <span className="text-xs font-bold text-black dark:text-white block">GitHub</span>
                    <span className="text-[11px] font-mono text-ink-subtle">@justsarx</span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-subtle group-hover:text-black dark:group-hover:text-white transition-colors" />
              </a>

              <a
                href={PERSONAL_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white dark:bg-surface border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 hover-lift shadow-xs transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="h-5 w-5 text-black dark:text-white" />
                  <div>
                    <span className="text-xs font-bold text-black dark:text-white block">LinkedIn</span>
                    <span className="text-[11px] font-mono text-ink-subtle">justsarx</span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-subtle group-hover:text-black dark:group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Dispatch Form */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-8 sm:p-10 bg-white dark:bg-surface border border-black/10 dark:border-white/10 hover-lift shadow-sm">
              <span className="text-xs font-mono text-ink-subtle uppercase tracking-wider block mb-6 font-semibold">
                Send a Direct Message
              </span>

              {isSent ? (
                <div className="py-16 text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Check className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-black dark:text-white font-display">Email Client Triggered</h4>
                  <p className="text-xs text-ink-muted dark:text-textMuted max-w-sm mx-auto font-mono">
                    Opening your default mail client to dispatch your message directly to Sarthak.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-ink-muted dark:text-textMuted mb-2 font-semibold">YOUR NAME</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-xl bg-surfaceMuted-light dark:bg-[#0c0e12] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-ink-subtle focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-ink-muted dark:text-textMuted mb-2 font-semibold">YOUR EMAIL</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-surfaceMuted-light dark:bg-[#0c0e12] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-ink-subtle focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-ink-muted dark:text-textMuted mb-2 font-semibold">PROJECT BRIEF / MESSAGE</label>
                    <textarea
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Sarthak, I'd like to discuss an AOSP / systems engineering role with you..."
                      className="w-full px-4 py-3.5 rounded-xl bg-surfaceMuted-light dark:bg-[#0c0e12] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-ink-subtle focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none font-sans text-sm"
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    strength={10}
                    className="w-full py-4 rounded-xl bg-black text-white dark:bg-white dark:text-black font-mono font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message to Sarthak</span>
                  </MagneticButton>
                </form>
              )}
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};

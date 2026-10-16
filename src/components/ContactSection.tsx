import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Phone, 
  Copy, 
  Check, 
  ExternalLink, 
  Code2, 
  Sparkles 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';


export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.links.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#c084fc', '#34d399']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.links.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry from ' + formData.name)}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <section id="contact" className="py-20 relative bg-slate-950/70 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>COMMUNICATION TELEMETRY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Initiate <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Direct Uplink</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base">
            Open for research collaborations, embedded systems development, AI initiatives, or competitive engineering discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quick Connect Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary Email Card */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-sm">
              <span className="text-xs font-mono text-gray-400 block mb-1">Direct Secure Email</span>
              <div className="flex items-center justify-between gap-2 mt-2">
                <span className="text-base font-bold text-white font-mono">{PERSONAL_INFO.links.email}</span>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-mono flex items-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PERSONAL_INFO.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-blue-400 mb-2">
                  <LinkedinIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">LinkedIn</span>
                  <span className="text-[11px] text-gray-400 font-mono">/in/priyanraj</span>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-sky-400 mb-2">
                  <GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">GitHub</span>
                  <span className="text-[11px] text-gray-400 font-mono">priyanrajj-hub</span>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/40 transition group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-pink-400 mb-2">
                  <InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-pink-400" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">Instagram</span>
                  <span className="text-[11px] text-gray-400 font-mono">@priyanraj.j</span>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-emerald-400 mb-2">
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">WhatsApp</span>
                  <span className="text-[11px] text-gray-400 font-mono">+91 78100 12708</span>
                </div>
              </a>
            </div>

            {/* LeetCode & Coding Matrix */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">LeetCode Algorithm Hub</span>
                  <span className="text-[11px] text-gray-400 font-mono">Profile: PRIYANRAJ</span>
                </div>
              </div>
              <a
                href={PERSONAL_INFO.links.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 hover:underline font-mono inline-flex items-center gap-1"
              >
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Interactive Uplink Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-2">Send Instant Transmission</h3>
              <p className="text-xs text-gray-400 mb-6">Dispatch a direct query or invitation directly to Priyanraj J's personal inbox.</p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Transmission Initiated!</h4>
                  <p className="text-xs text-emerald-300">Your mail client has been opened with your inquiry pre-loaded.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-gray-300 block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Vance"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500 transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-gray-300 block mb-1">Email Coordinates *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-300 block mb-1">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Research Collaboration / Project Discussion"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-300 block mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your request or collaborative proposition..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500 transition"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition group"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

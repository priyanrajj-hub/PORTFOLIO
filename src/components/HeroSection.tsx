import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Mail,
  Code2,
  Cpu,
  GraduationCap,
  Bot,
  Zap,
  Layers,
  Terminal,
  Binary
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Hero3DCanvas } from './Hero3DCanvas';
import { JarvisHeroWidget } from './JarvisHeroWidget';

export const HeroSection: React.FC = () => {
  const [hudView, setHudView] = useState<'unified' | 'jarvis' | '3d'>('unified');

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden">
      
      {/* Dynamic Ambient Background Glows in Warm Arc Reactor Gold & Copper */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[480px] h-[480px] bg-orange-600/8 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Clear Pitch, Identity, Degrees & Actions (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10121a]/90 border border-amber-400/30 text-amber-300 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold">ENGINEERING RESEARCHER</span>
              <span className="text-[#6b6b7a]">|</span>
              <span className="text-[#9a9aa8]">AMRITA • IIT MADRAS • IIT GUWAHATI</span>
            </div>

            {/* Profile Avatar & Name Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl shadow-amber-500/15 bg-[#141722] relative">
                  <img
                    src="./profile.jpg"
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = './profile.webp';
                    }}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#07080d] flex items-center justify-center shadow" title="Active Status">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>

              <div>
                <h1 className="text-4xl sm:text-6xl font-black text-[#f4f1ea] tracking-tight">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm font-mono text-amber-400 mt-1 flex items-center gap-2">
                  <span>UID: {PERSONAL_INFO.rollNumber}</span>
                  <span className="text-[#6b6b7a]">•</span>
                  <span className="text-[#9a9aa8]">{PERSONAL_INFO.location}</span>
                </p>
              </div>
            </div>

            {/* Headline Specialization */}
            <div className="p-5 rounded-2xl bg-[#10121a]/90 border border-white/10 backdrop-blur-md shadow-xl">
              <p className="text-base sm:text-lg text-[#f4f1ea] font-medium leading-relaxed">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 font-bold">
                  Systems Software Engineer & AI Researcher
                </span>{' '}
                engineering low-level C algorithms, context-aware OS schedulers, and satellite telemetry platforms.
              </p>
              
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-[#141722] text-amber-300 border border-amber-500/30">
                  Amrita CCE (2025–2029)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#141722] text-orange-300 border border-orange-500/30">
                  IIT Madras (BS DS)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#141722] text-amber-200 border border-amber-300/30">
                  IIT Guwahati (BS DSAI)
                </span>
              </div>
            </div>

            {/* Motivational Quote */}
            <blockquote className="border-l-2 border-amber-400 pl-4 py-1 text-xs sm:text-sm text-[#9a9aa8] italic">
              {PERSONAL_INFO.quote}
            </blockquote>

            {/* Action Buttons: Above the Fold Pitch */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore 9+ Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-5 py-3 rounded-xl bg-[#141722] hover:bg-[#1c2030] text-[#f4f1ea] border border-white/10 hover:border-amber-400/40 font-mono text-sm flex items-center gap-2 transition"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Get In Touch</span>
              </a>

              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#141722] hover:bg-[#1c2030] text-[#9a9aa8] hover:text-[#f4f1ea] border border-white/10 transition"
                title="GitHub Repositories"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={PERSONAL_INFO.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#141722] hover:bg-[#1c2030] text-[#9a9aa8] hover:text-amber-400 border border-white/10 transition"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>

              <a
                href={PERSONAL_INFO.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#141722] hover:bg-[#1c2030] text-[#9a9aa8] hover:text-orange-400 border border-white/10 transition"
                title="Instagram Profile"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#10121a]/80 border border-white/8 shadow-sm">
                  <div className="text-xl font-black text-white font-mono">{stat.value}</div>
                  <div className="text-[11px] text-[#9a9aa8]">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Unified 3D Model + Iron Man J.A.R.V.I.S AI Assistant (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* HUD View Mode Switcher */}
            <div className="flex items-center justify-between p-1.5 rounded-2xl bg-[#10121a]/90 border border-amber-400/30 backdrop-blur-md shadow-lg">
              <span className="text-[11px] font-mono text-amber-400 pl-2 flex items-center gap-1.5 font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                STARK HUD DISPLAY:
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setHudView('unified')}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition ${
                    hudView === 'unified'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/25'
                      : 'text-[#9a9aa8] hover:text-[#f4f1ea]'
                  }`}
                >
                  3D + J.A.R.V.I.S.
                </button>
                <button
                  onClick={() => setHudView('jarvis')}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition ${
                    hudView === 'jarvis'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/25'
                      : 'text-[#9a9aa8] hover:text-[#f4f1ea]'
                  }`}
                >
                  J.A.R.V.I.S. Only
                </button>
                <button
                  onClick={() => setHudView('3d')}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition ${
                    hudView === '3d'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/25'
                      : 'text-[#9a9aa8] hover:text-[#f4f1ea]'
                  }`}
                >
                  3D Core Only
                </button>
              </div>
            </div>

            {/* 3D Quantum Canvas Frame (Visible in unified & 3d modes) */}
            {(hudView === 'unified' || hudView === '3d') && (
              <div className="relative rounded-3xl overflow-hidden border border-amber-400/25 bg-[#07080d]/80 shadow-2xl backdrop-blur-xl">
                <div className="absolute top-3 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-[#10121a]/90 border border-amber-400/30 text-[11px] font-mono text-amber-400">
                  <Binary className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>ARC REACTOR QUANTUM CORE</span>
                </div>

                <Hero3DCanvas className={hudView === 'unified' ? 'min-h-[220px] max-h-[240px]' : 'min-h-[480px]'} />

                <div className="absolute bottom-2.5 left-4 right-4 z-20 px-3 py-1 rounded-lg bg-[#10121a]/90 border border-white/5 text-[10px] font-mono flex items-center justify-between text-[#9a9aa8]">
                  <span>Interactive: Drag to rotate view</span>
                  <span className="text-emerald-400 font-semibold">60 FPS • Capped DPR 1.5</span>
                </div>
              </div>
            )}

            {/* Iron Man J.A.R.V.I.S AI Assistant (Visible in unified & jarvis modes) */}
            {(hudView === 'unified' || hudView === 'jarvis') && (
              <JarvisHeroWidget />
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

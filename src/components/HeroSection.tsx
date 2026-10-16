import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Terminal, 
  Binary,
  Code2,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Hero3DCanvas } from './Hero3DCanvas';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Identity & Bio */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-sky-500/30 text-sky-300 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>ENGINEERING RESEARCHER</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">AMRITA CHENNAI • IIT MADRAS • IIT GUWAHATI</span>
            </div>

            {/* Profile Avatar & Name Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-sky-400/60 shadow-xl shadow-sky-500/20 bg-slate-900 relative">
                  <img
                    src="./profile.jpg"
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = './profile.webp';
                    }}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center" title="Online Status">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>

              <div>
                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm font-mono text-sky-400 mt-1 flex items-center gap-2">
                  <span>UID: {PERSONAL_INFO.rollNumber}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-gray-400">{PERSONAL_INFO.location}</span>
                </p>
              </div>
            </div>

            {/* Headline Specialization */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
              <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300 font-bold">
                  AI & Data Science Enthusiast | Systems Software Engineer
                </span>{' '}
                engineering low-level C algorithms, AI-driven process schedulers, and satellite telemetry platforms.
              </p>
              
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-sky-950/70 text-sky-300 border border-sky-800/60">
                  Amrita CCE (2025–2029)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-purple-950/70 text-purple-300 border border-purple-800/60">
                  IIT Madras (BS DS)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-950/70 text-emerald-300 border border-emerald-800/60">
                  IIT Guwahati (BS DSAI)
                </span>
              </div>
            </div>

            {/* Motivational Quote */}
            <blockquote className="border-l-2 border-sky-500 pl-4 py-1 text-xs sm:text-sm text-gray-400 italic">
              {PERSONAL_INFO.quote}
            </blockquote>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore 9+ Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#competitive"
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-slate-700 font-mono text-sm flex items-center gap-2 transition"
              >
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>Competitive Coding</span>
              </a>

              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-gray-300 border border-slate-700 transition hover:text-white"
                title="GitHub Repositories"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={PERSONAL_INFO.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-gray-300 border border-slate-700 transition hover:text-sky-400"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>

              <a
                href={PERSONAL_INFO.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-gray-300 border border-slate-700 transition hover:text-pink-400"
                title="Instagram Profile"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80">
                  <div className="text-xl font-black text-white font-mono">{stat.value}</div>
                  <div className="text-[11px] text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: 3D Interactive Quantum Simulation Core */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-950/60 shadow-2xl backdrop-blur-xl">
              
              {/* Header Label on 3D Container */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-sky-400">
                <Binary className="w-3.5 h-3.5 animate-spin" />
                <span>WEBGL INTERACTIVE 3D CORE</span>
              </div>

              {/* 3D Canvas Rendering */}
              <Hero3DCanvas />

              {/* Lower HUD Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md flex items-center justify-between text-xs font-mono">
                <span className="text-gray-400">Interaction: Drag & orbit mesh</span>
                <span className="text-emerald-400">60 FPS • Real-time</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

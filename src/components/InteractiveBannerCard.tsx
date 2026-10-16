import React from 'react';
import { 
  Building2, 
  Sparkles, 
  GraduationCap, 
  Laptop, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const InteractiveBannerCard: React.FC = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Container with sleek futuristic glass gradient border */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 shadow-2xl p-6 sm:p-10">
        
        {/* Glow Accents */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Portrait with clean circular cyan border */}
          <div className="lg:col-span-4 flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="relative group">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-sky-400/80 shadow-[0_0_35px_rgba(56,189,248,0.4)] bg-slate-950 p-1">
                <img
                  src="./profile.jpg"
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute bottom-2 right-4 px-3 py-1 rounded-full bg-slate-950/90 border border-sky-500/50 text-[11px] font-mono text-emerald-400 font-bold shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Active 2026</span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl sm:text-3xl font-black text-white">PRIYANRAJ J</h3>
              <p className="text-xs font-mono text-sky-400 uppercase tracking-widest mt-1">
                AI & Data Science Enthusiast
              </p>
            </div>
          </div>

          {/* Right Column: Multi-degree Track Badges & Tech Stack */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Quote Badge */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <p className="text-xs sm:text-sm text-gray-300 italic font-mono">
                "Learning <span className="text-emerald-400 font-bold">relentlessly</span>. Building <span className="text-sky-400 font-bold">consistently</span>. Growing <span className="text-purple-400 font-bold">every day</span>."
              </p>
              <span className="text-xs font-mono text-sky-400 hidden sm:block">⚡ PRIYANRAJ-CORE</span>
            </div>

            {/* Triple Institution Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-red-500/30 hover:border-red-400/60 transition group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider font-mono">AMRITA</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-red-300 transition">B.Tech CCE</h4>
                <p className="text-[11px] text-gray-400 mt-1">Amrita Vishwa Vidyapeetham, Chennai</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/30 hover:border-amber-400/60 transition group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">IIT MADRAS</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition">BS Data Science</h4>
                <p className="text-[11px] text-gray-400 mt-1">Indian Institute of Technology Madras</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-blue-500/30 hover:border-blue-400/60 transition group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">IIT GUWAHATI</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition">BS Data Science & AI</h4>
                <p className="text-[11px] text-gray-400 mt-1">Indian Institute of Technology Guwahati</p>
              </div>
            </div>

            {/* Core Tech Stack Row */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">CORE TECH STACK:</span>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-sky-400 font-mono text-xs font-bold border border-slate-700">Python</span>
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-blue-400 font-mono text-xs font-bold border border-slate-700">C</span>
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-indigo-400 font-mono text-xs font-bold border border-slate-700">C++</span>
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 font-mono text-xs font-bold border border-slate-700">BLE 5.0</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span>Open Source • Research • IEEE Active</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

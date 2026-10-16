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
      {/* Container with sleek Stark Obsidian & Gold border */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#10121a]/95 shadow-2xl p-6 sm:p-10">
        
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-600/8 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Portrait with clean Arc Reactor Gold border */}
          <div className="lg:col-span-4 flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="relative group">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-amber-400/80 shadow-[0_0_35px_rgba(255,183,3,0.3)] bg-[#07080d] p-1">
                <img
                  src="./profile.webp"
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  width="208"
                  height="208"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-2 right-4 px-3 py-1 rounded-full bg-[#07080d]/90 border border-amber-400/50 text-[11px] font-mono text-emerald-400 font-bold shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Active 2026</span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl sm:text-3xl font-black text-[#f4f1ea]">PRIYANRAJ J</h3>
              <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mt-1">
                Systems Engineer & AI Researcher
              </p>
            </div>
          </div>

          {/* Right Column: Multi-degree Track Badges & Tech Stack */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Quote Badge */}
            <div className="p-4 rounded-2xl bg-[#07080d]/80 border border-white/8 flex items-center justify-between">
              <p className="text-xs sm:text-sm text-[#f4f1ea]/90 italic font-mono">
                "Learning <span className="text-amber-400 font-bold">relentlessly</span>. Building <span className="text-orange-400 font-bold">consistently</span>. Growing <span className="text-amber-300 font-bold">every day</span>."
              </p>
              <span className="text-xs font-mono text-amber-400 hidden sm:block">⚡ PRIYANRAJ-CORE</span>
            </div>

            {/* Triple Institution Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-[#141722] border border-amber-500/25 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-[11px] font-mono font-bold">B.TECH CCE</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Amrita Vishwa Vidyapeetham</h4>
                  <p className="text-[11px] text-[#9a9aa8] mt-1">Chennai Campus • 2025–2029</p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-amber-300">
                  <span>IEEE Webmaster</span>
                  <span>II nd Year</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#141722] border border-orange-500/25 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-orange-400 mb-2">
                  <Building2 className="w-4 h-4" />
                  <span className="text-[11px] font-mono font-bold">BS DATA SCIENCE</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">IIT Madras</h4>
                  <p className="text-[11px] text-[#9a9aa8] mt-1">Concurrent Online Degree</p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-orange-300">
                  <span>Math & ML Core</span>
                  <span>Active</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#141722] border border-amber-400/25 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-amber-300 mb-2">
                  <Layers className="w-4 h-4" />
                  <span className="text-[11px] font-mono font-bold">BS DSAI</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">IIT Guwahati</h4>
                  <p className="text-[11px] text-[#9a9aa8] mt-1">Data Science & AI Track</p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-amber-200">
                  <span>Neural Systems</span>
                  <span>Active</span>
                </div>
              </div>
            </div>

            {/* Core Domain Skills Pills */}
            <div className="pt-2">
              <span className="text-xs font-mono text-[#9a9aa8] block mb-2">TECHNICAL FOUNDATION:</span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {[
                  'C (Strict ANSI)',
                  'C++',
                  'Python 3',
                  'LinUCB Bandit Algorithms',
                  'BLE 5.0 Core',
                  'Satellite Multispectral NDVI',
                  'Vercel Edge Cloud',
                  'Arduino / ESP32',
                  'Oracle SQL',
                  'React 19 / TypeScript'
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-xl bg-[#141722] text-[#f4f1ea] border border-white/8 hover:border-amber-400/40 hover:text-amber-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

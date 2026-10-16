import React from 'react';
import { 
  Milestone, 
  Cpu, 
  Laptop, 
  Layers, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { ROADMAP_DATA, PERSONAL_INFO } from '../data/portfolioData';

export const RoadmapAndSpecs: React.FC = () => {
  return (
    <section id="roadmap" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-mono mb-3">
            <Milestone className="w-3.5 h-3.5" />
            <span>TRAJECTORY & SYSTEMS SPECIFICATION</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#f4f1ea] tracking-tight">
            2026–2027 <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">Execution Roadmap</span>
          </h2>
          <p className="mt-3 text-[#9a9aa8] text-sm md:text-base leading-relaxed">
            Methodical progression across algorithmic mastery, TinyML neuromorphic models, and open-source embedded cryptographic systems.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {ROADMAP_DATA.map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-[#10121a]/85 border border-white/10 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all flex flex-col justify-between backdrop-blur-sm group hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300">
                    {item.quarter}
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    {item.progress}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-[#181b28] rounded-full mb-4 overflow-hidden border border-white/[0.04]">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-full transition-all duration-1000"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>

                <h3 className="text-base font-bold text-[#f4f1ea] group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs text-[#9a9aa8] leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.08] flex flex-wrap gap-1">
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono text-[#9a9aa8] bg-[#161924] border border-white/[0.05] px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Workspace Mainframe Hardware Specifications */}
        <div id="specs" className="rounded-3xl p-8 bg-[#10121a]/95 border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 mb-2">
                <Laptop className="w-4 h-4" />
                <span>PHYSICAL WORKSPACE ARCHITECTURE</span>
              </div>
              <h3 className="text-2xl font-bold text-[#f4f1ea]">
                Mainframe Rig & Hardware Environment
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>All Systems Nominal • Online</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERSONAL_INFO.specs.map((spec, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#07080d]/80 border border-white/10 hover:border-amber-400/40 transition">
                <span className="text-xs text-[#9a9aa8] font-mono block mb-1">{spec.label}</span>
                <span className="text-sm font-semibold text-[#f4f1ea] tracking-wide">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9a9aa8]">
            <p className="font-mono text-center sm:text-left">
              🚀 <span className="text-amber-300">Learning Relentlessly</span> • Building Consistently • Growing Every Day
            </p>
            <span className="font-mono text-[#9a9aa8]/60">
              Station ID: PRIYANRAJ-TUF-HX // RTX 5060 Edition
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

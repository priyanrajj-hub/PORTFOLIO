import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2,
  Globe,
  Radio
} from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative bg-slate-950/70 border-t border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>LEADERSHIP & ENGINEERING POSITIONS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Professional <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="mt-3 text-gray-400 max-w-2xl text-sm md:text-base">
              Verified active leadership roles, technical development tenures, and community engineering directorship.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 text-xs font-mono font-bold inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              #OpenToWork • Global & Hybrid
            </span>
          </div>
        </div>

        {/* Experience Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERIENCE_DATA.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl backdrop-blur-sm group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-800/50 text-cyan-400 font-bold">
                      {exp.type}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mt-2">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300">
                      {exp.organization}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-cyan-400 shrink-0">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 font-mono my-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {exp.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {exp.location}
                  </span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mt-3">
                  {exp.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/70">
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300 border border-slate-700/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

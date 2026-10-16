import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2,
  Radio
} from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative bg-[#07080d]/80 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono mb-3 shadow-sm">
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>LEADERSHIP & ENGINEERING POSITIONS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#f4f1ea]">
              Professional <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="mt-3 text-[#9a9aa8] max-w-2xl text-sm md:text-base leading-relaxed">
              Verified active leadership roles, technical infrastructure deployments, and software engineering internships.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 text-xs font-mono font-bold inline-flex items-center gap-1.5 shadow-sm">
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
              className="p-6 rounded-2xl bg-[#10121a]/90 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl backdrop-blur-sm group hover:shadow-2xl hover:shadow-amber-500/10"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 font-bold">
                      {exp.type}
                    </span>
                    <h3 className="text-xl font-bold text-[#f4f1ea] group-hover:text-amber-300 transition-colors mt-2">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-[#f4f1ea]/90">
                      {exp.organization}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#141722] border border-white/8 flex items-center justify-center text-amber-400 shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#9a9aa8] mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {exp.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {exp.location}
                  </span>
                </div>

                <p className="text-xs text-[#9a9aa8] leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {/* Skills Footer */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141722] text-[#f4f1ea]/90 border border-white/5"
                    >
                      {skill}
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

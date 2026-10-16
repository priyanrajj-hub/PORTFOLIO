import React from 'react';
import { GraduationCap, MapPin, Award, CheckCircle2, Users } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 relative bg-[#07080d]/80 border-t border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/25 text-[#ffb703] text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION & STUDENT SOCIETIES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-[#f4f1ea]">
            Triple-Track <span className="bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#ffb703] bg-clip-text text-transparent">Education</span>
          </h2>
          <p className="mt-3 text-[#9a9aa8] text-sm md:text-base leading-relaxed">
            Concurrent multi-institutional immersion across Amrita Vishwa Vidyapeetham, IIT Madras, and IIT Guwahati, complemented by society leadership in IEEE, CAMHI, and DREAM.
          </p>
        </div>

        {/* Clean 3-Column Timeline Cards (Section 7) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION_DATA.map((edu, idx) => (
            <div
              key={idx}
              className="glass-card p-6 flex flex-col justify-between hover:border-[#ffb703]/40 transition-all duration-300"
            >
              <div>
                {/* Institution & Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-[#ffb703] font-semibold uppercase tracking-wider">
                    {edu.institution.split(',')[0]}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#171a25] text-[#9a9aa8] border border-white/[0.06]">
                    {edu.duration}
                  </span>
                </div>

                {/* Degree Title */}
                <h3 className="text-lg font-heading font-bold text-[#f4f1ea] leading-snug">
                  {edu.degree}
                </h3>

                {/* One-Line Focus */}
                <p className="mt-3 text-xs font-medium text-[#f4f1ea]/85 leading-relaxed">
                  <strong className="text-[#ffb703]">Core Focus:</strong> {edu.specialization}
                </p>

                {/* Highlights */}
                <div className="mt-4 space-y-1.5 pt-3 border-t border-white/[0.06]">
                  {edu.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#9a9aa8]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ffb703] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities & Society Leadership */}
              {edu.activities && edu.activities.length > 0 && (
                <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-mono text-[#9a9aa8] flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#ffb703]" />
                    Societies:
                  </span>
                  {edu.activities.map((act) => (
                    <span
                      key={act}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#171a25] border border-white/[0.06] text-[#f4f1ea]"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

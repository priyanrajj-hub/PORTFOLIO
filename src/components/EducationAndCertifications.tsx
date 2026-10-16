import React from 'react';
import { 
  GraduationCap, 
  Award, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Sparkles,
  BookmarkCheck,
  CheckCircle2
} from 'lucide-react';
import { EDUCATION_DATA, CERTIFICATIONS_DATA } from '../data/portfolioData';

export const EducationAndCertifications: React.FC = () => {
  return (
    <section id="education" className="py-20 relative bg-slate-950/60 border-t border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Column 1: Multi-Institutional Education */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>ACADEMIC FOUNDATION</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Triple-Track <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Education</span>
            </h2>
            <p className="mt-2 text-gray-400 text-sm mb-8">
              Rigorous simultaneous academic immersion spanning systems engineering, applied data analytics, and artificial intelligence.
            </p>

            <div className="space-y-6">
              {EDUCATION_DATA.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/30 transition shadow-lg relative group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider block mb-1">
                        {edu.institution}
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                        {edu.degree}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-gray-300">
                    <strong className="text-gray-400">Curriculum Scope:</strong> {edu.specialization}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80">
                    <span className="font-mono text-emerald-400">{edu.status}</span>
                  </div>

                  <div className="mt-3 space-y-1">
                    {edu.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Validated Certifications & Honors */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>AUTHENTICATED CREDENTIALS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Certifications & <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Honors</span>
            </h2>
            <p className="mt-2 text-gray-400 text-sm mb-8">
              Verified certifications from premier national institutes, industrial platforms, and international engineering bodies.
            </p>

            <div className="space-y-4">
              {CERTIFICATIONS_DATA.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-emerald-500/40 transition flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 font-bold">
                        {cert.issuer}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {cert.type}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition">
                      {cert.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cert.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-mono text-gray-400 bg-slate-800/60 px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <BookmarkCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                </div>
              ))}
            </div>

            {/* IEEE Network Callout */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-sky-950/30 to-slate-900/50 border border-blue-500/20 text-xs text-gray-300">
              <span className="font-semibold text-sky-400 block mb-1">Global IEEE Engineering Node</span>
              Active IEEE Student Member engaging with technical standards, signal communications, and embedded processing societies.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

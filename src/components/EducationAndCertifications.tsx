import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  CheckCircle2,
  BookmarkCheck,
  ShieldCheck,
  Users
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
              <span>ACADEMIC FOUNDATION & STUDENT SOCIETIES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Triple-Track <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Education</span>
            </h2>
            <p className="mt-2 text-gray-400 text-sm mb-8">
              Concurrent academic immersion across Amrita, IIT Madras, and IIT Guwahati, complemented by society leadership in IEEE, CAMHI, and DREAM.
            </p>

            <div className="space-y-6">
              {EDUCATION_DATA.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/30 transition shadow-lg relative group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                          {edu.institution}
                        </span>
                        {edu.campus && (
                          <span className="text-[10px] font-mono text-slate-500">
                            • {edu.campus}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                        {edu.degree}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-semibold shrink-0">
                      {edu.badge}
                    </span>
                  </div>

                  {edu.grade && (
                    <div className="mt-2 text-xs font-mono text-amber-300 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded-lg">
                      {edu.grade}
                    </div>
                  )}

                  <p className="mt-2.5 text-xs text-gray-300">
                    <strong className="text-gray-400">Curriculum Scope:</strong> {edu.specialization}
                  </p>

                  {/* Activities & Societies */}
                  {edu.activities && edu.activities.length > 0 && (
                    <div className="mt-3 flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-800/80">
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-sky-400" />
                        Societies:
                      </span>
                      {edu.activities.map((act) => (
                        <span
                          key={act}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sky-950/60 border border-sky-800/50 text-sky-300 font-bold"
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  )}

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

          {/* Column 2: Validated Certifications & Licenses */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>VERIFIED LICENSES & CERTIFICATIONS (11 ISSUED)</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Licenses & <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Credentials</span>
            </h2>
            <p className="mt-2 text-gray-400 text-sm mb-8">
              Verified certifications from Oracle, Udemy, NPTEL, Infosys, and IIT Guwahati.
            </p>

            <div className="space-y-4">
              {CERTIFICATIONS_DATA.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-emerald-500/40 transition flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        cert.issuer === 'ORACLE' 
                          ? 'bg-rose-950/70 border border-rose-800/50 text-rose-300'
                          : cert.issuer === 'Udemy'
                          ? 'bg-purple-950/70 border border-purple-800/50 text-purple-300'
                          : 'bg-emerald-950/60 border border-emerald-800/50 text-emerald-400'
                      }`}>
                        {cert.issuer}
                      </span>
                      {cert.issueDate && (
                        <span className="text-[10px] font-mono text-slate-400">
                          {cert.issueDate}
                        </span>
                      )}
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

            {/* Oracle & IEEE Callout */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-sky-950/30 to-slate-900/50 border border-blue-500/20 text-xs text-gray-300">
              <span className="font-semibold text-sky-400 block mb-1">Oracle Database & IEEE Webmaster Accreditation</span>
              Holding Oracle Developer Foundations accreditation and appointed Webmaster directing web infrastructures for IEEE Amrita Chennai Student Branch.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

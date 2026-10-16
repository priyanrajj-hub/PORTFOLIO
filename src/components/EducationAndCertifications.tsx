import React from 'react';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2,
  BookmarkCheck,
  Users,
  Trophy,
  Flame,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { EDUCATION_DATA, CERTIFICATIONS_DATA, HACKATHONS_DATA } from '../data/portfolioData';

export const EducationAndCertifications: React.FC = () => {
  return (
    <section id="education" className="py-20 relative bg-slate-950/60 border-t border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hackathon Exhibition Strip */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono mb-2">
                <Flame className="w-3.5 h-3.5" />
                <span>COMPETITIVE HACKATHONS & ARENAS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Hackathon <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">Participation Credentials</span>
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 mt-2 sm:mt-0">
              Verified on LinkedIn Licenses & Event Certifications
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HACKATHONS_DATA.map((h, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/40 transition flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/70 border border-rose-800/40 text-rose-300 font-bold">
                      {h.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition">
                    {h.name}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">
                    {h.organizer}
                  </p>
                  <p className="text-xs text-gray-300 mt-2.5 line-clamp-3">
                    {h.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dual Column: Academic Foundation & Verified 11 Licenses */}
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

          {/* Column 2: All 11 Verified Licenses & Credentials */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>OFFICIAL LICENSES & CERTIFICATIONS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Verified <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Credentials</span>
            </h2>
            <p className="mt-2 text-gray-400 text-sm mb-8">
              Full index of authenticated credentials across Google Cloud, Oracle, Infosys, Udemy, NPTEL, and IEEE.
            </p>

            <div className="space-y-3.5 max-h-[640px] overflow-y-auto pr-1">
              {CERTIFICATIONS_DATA.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-emerald-500/40 transition flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        cert.issuer.includes('Google')
                          ? 'bg-blue-950/80 border border-blue-700/60 text-blue-300'
                          : cert.issuer === 'ORACLE' 
                          ? 'bg-rose-950/70 border border-rose-800/50 text-rose-300'
                          : cert.issuer.includes('Infosys')
                          ? 'bg-indigo-950/70 border border-indigo-800/50 text-indigo-300'
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
                      {cert.credentialId && (
                        <span className="text-[10px] font-mono text-sky-400">
                          ID: {cert.credentialId.slice(0, 10)}...
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

            {/* IEEE Circuits & Systems Society Callout */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-sky-950/30 to-slate-900/50 border border-blue-500/20 text-xs text-gray-300">
              <span className="font-semibold text-sky-400 block mb-1">IEEE Member • IEEE CAS (Circuits and Systems Society)</span>
              Active IEEE Student Branch Webmaster with verified membership in the IEEE Circuits and Systems Society (CAS).
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

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
    <section id="education" className="py-20 relative bg-[#07080d]/80 border-t border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hackathon Exhibition Strip */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-mono mb-2">
                <Flame className="w-3.5 h-3.5" />
                <span>COMPETITIVE HACKATHONS & ARENAS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#f4f1ea] tracking-tight">
                Hackathon <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">Participation Credentials</span>
              </h2>
            </div>
            <span className="text-xs font-mono text-[#9a9aa8] mt-2 sm:mt-0">
              Verified on LinkedIn Licenses & Event Certifications
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HACKATHONS_DATA.map((h, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#10121a]/85 border border-white/10 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-500/5 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-400/30 text-amber-300 font-bold">
                      {h.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#f4f1ea] group-hover:text-amber-300 transition">
                    {h.name}
                  </h3>
                  <p className="text-[11px] font-mono text-amber-400/80 mt-1">
                    {h.organizer}
                  </p>
                  <p className="text-xs text-[#9a9aa8] mt-2.5 line-clamp-3 leading-relaxed">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-mono mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>ACADEMIC FOUNDATION & STUDENT SOCIETIES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#f4f1ea] tracking-tight">
              Triple-Track <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 bg-clip-text text-transparent">Education</span>
            </h2>
            <p className="mt-2 text-[#9a9aa8] text-sm mb-8 leading-relaxed">
              Concurrent academic immersion across Amrita, IIT Madras, and IIT Guwahati, complemented by society leadership in IEEE, CAMHI, and DREAM.
            </p>

            <div className="space-y-6">
              {EDUCATION_DATA.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#10121a]/90 border border-white/10 hover:border-amber-400/40 transition shadow-lg relative group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                          {edu.institution}
                        </span>
                        {edu.campus && (
                          <span className="text-[10px] font-mono text-[#9a9aa8]/70">
                            • {edu.campus}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-[#f4f1ea] group-hover:text-amber-300 transition">
                        {edu.degree}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c2030] text-amber-300 border border-amber-500/30 font-semibold shrink-0">
                      {edu.badge}
                    </span>
                  </div>

                  {edu.grade && (
                    <div className="mt-2 text-xs font-mono text-amber-300 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded-lg">
                      {edu.grade}
                    </div>
                  )}

                  <p className="mt-2.5 text-xs text-[#9a9aa8] leading-relaxed">
                    <strong className="text-[#f4f1ea]/80">Curriculum Scope:</strong> {edu.specialization}
                  </p>

                  {/* Activities & Societies */}
                  {edu.activities && edu.activities.length > 0 && (
                    <div className="mt-3 flex items-center gap-1.5 flex-wrap pt-2 border-t border-white/[0.08]">
                      <span className="text-[11px] font-mono text-[#9a9aa8] flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        Societies:
                      </span>
                      {edu.activities.map((act) => (
                        <span
                          key={act}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#161a28] border border-amber-500/25 text-amber-200/90 font-medium"
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 space-y-1">
                    {edu.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#9a9aa8]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-mono mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>OFFICIAL LICENSES & CERTIFICATIONS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#f4f1ea] tracking-tight">
              Verified <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 bg-clip-text text-transparent">Credentials</span>
            </h2>
            <p className="mt-2 text-[#9a9aa8] text-sm mb-8 leading-relaxed">
              Full index of authenticated credentials across Google Cloud, Oracle, Infosys, Udemy, NPTEL, and IEEE.
            </p>

            <div className="space-y-3.5 max-h-[640px] overflow-y-auto pr-1">
              {CERTIFICATIONS_DATA.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl bg-[#10121a]/90 border border-white/10 hover:border-amber-400/40 transition flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-[#181b29] border border-amber-500/30 text-amber-300">
                        {cert.issuer}
                      </span>
                      {cert.issueDate && (
                        <span className="text-[10px] font-mono text-[#9a9aa8]">
                          {cert.issueDate}
                        </span>
                      )}
                      {cert.credentialId && (
                        <span className="text-[10px] font-mono text-amber-400/90">
                          ID: {cert.credentialId.slice(0, 10)}...
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-[#f4f1ea] group-hover:text-amber-300 transition">
                      {cert.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cert.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-mono text-[#9a9aa8] bg-[#161924] border border-white/[0.05] px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <BookmarkCheck className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                </div>
              ))}
            </div>

            {/* IEEE Circuits & Systems Society Callout */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#141724] via-[#181b2a] to-[#10121a] border border-amber-500/30 text-xs text-[#9a9aa8]">
              <span className="font-semibold text-amber-400 block mb-1">IEEE Member • IEEE CAS (Circuits and Systems Society)</span>
              Active IEEE Student Branch Webmaster with verified membership in the IEEE Circuits and Systems Society (CAS).
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

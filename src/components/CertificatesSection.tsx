import React from 'react';
import { Award, ExternalLink, BookmarkCheck, Flame, Trophy } from 'lucide-react';
import { CERTIFICATES_DATA } from '../data/certificates';
import { HACKATHONS_DATA } from '../data/portfolioData';

export const CertificatesSection: React.FC = () => {
  return (
    <section id="certificates" className="py-24 relative bg-[#07080d]/80 border-t border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/25 text-[#ffb703] text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>AUTHENTICATED CREDENTIALS & LICENSES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-[#f4f1ea]">
            Certificates & <span className="bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#ffb703] bg-clip-text text-transparent">Licenses</span>
          </h2>
          <p className="mt-3 text-[#9a9aa8] text-sm md:text-base leading-relaxed">
            Authenticated professional certifications across Google Cloud, Oracle, Infosys, NPTEL, and IEEE CAS, alongside national hackathon participation records.
          </p>
        </div>

        {/* Certificates Grid (Section 7) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CERTIFICATES_DATA.map((cert) => (
            <div
              key={cert.id}
              className="glass-card p-6 flex flex-col justify-between hover:border-[#ffb703]/40 transition-all duration-300"
            >
              <div>
                {/* Issuer, Year & Status Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-[#ffb703] font-semibold">
                    {cert.issuer}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-[#9a9aa8]">
                      {cert.year}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      cert.status === 'Verified'
                        ? 'bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30'
                        : 'bg-white/[0.06] text-[#9a9aa8] border border-white/[0.06]'
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                </div>

                {/* Certificate Title */}
                <h3 className="text-base font-heading font-bold text-[#f4f1ea] leading-snug">
                  {cert.title}
                </h3>

                {cert.credentialId && (
                  <p className="text-[11px] font-mono text-[#ffb703]/80 mt-1.5">
                    ID: {cert.credentialId.slice(0, 16)}...
                  </p>
                )}

                {/* Skills row */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#171a25] border border-white/[0.04] text-[#9a9aa8]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verify Link where available (Section 7) */}
              <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#9a9aa8] flex items-center gap-1">
                  <BookmarkCheck className="w-3.5 h-3.5 text-[#ffb703]" />
                  <span>{cert.category}</span>
                </span>

                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#ffb703] hover:underline"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-[#6b6b7a]">Archived Record</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon Arena Participation Strip */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#10121a]/90 border border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#ffb703]/10 border border-[#ffb703]/25 flex items-center justify-center text-[#ffb703]">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-[#f4f1ea]">
                  Competitive Hackathons & Technical Arenas
                </h3>
                <span className="text-xs font-mono text-[#9a9aa8]">
                  Verified participation records across national engineering arenas
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HACKATHONS_DATA.map((h, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#07080d]/80 border border-white/[0.06] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Trophy className="w-3.5 h-3.5 text-[#ffb703]" />
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#ffb703]/10 text-[#ffb703] border border-[#ffb703]/20 font-bold">
                      {h.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#f4f1ea]">
                    {h.name}
                  </h4>
                  <p className="text-[11px] font-mono text-[#ffb703]/80 mt-0.5">
                    {h.organizer}
                  </p>
                  <p className="text-[11px] text-[#9a9aa8] mt-2 line-clamp-2 leading-relaxed">
                    {h.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

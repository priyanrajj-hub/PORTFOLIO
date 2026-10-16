import React, { useState, useEffect, useRef } from 'react';
import { 
  Milestone, 
  Laptop, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { ROADMAP_DATA, PERSONAL_INFO } from '../data/portfolioData';

export const RoadmapAndSpecs: React.FC = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect(); // Animate once only
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="roadmap" ref={sectionRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/25 text-[#ffb703] text-xs font-mono mb-3">
            <Milestone className="w-3.5 h-3.5" />
            <span>TRAJECTORY & SYSTEMS SPECIFICATION</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-[#f4f1ea] tracking-tight">
            2026–2027 <span className="bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#ffb703] bg-clip-text text-transparent">Execution Roadmap</span>
          </h2>
          <p className="mt-3 text-[#9a9aa8] text-sm md:text-base leading-relaxed">
            Methodical technical progression across algorithmic mastery, TinyML neuromorphic models, open-source embedded systems, and GATE CSE foundations.
          </p>
        </div>

        {/* Roadmap Timeline (Section 7) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {ROADMAP_DATA.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-6 flex flex-col justify-between hover:border-[#ffb703]/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                {/* Quarter & Progress Percentage with Label */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/25 text-[#ffb703]">
                    {item.quarter}
                  </span>
                  <span className="text-xs font-mono text-[#ffb703] font-bold" aria-label={`Progress: ${item.progress}%`}>
                    {item.progress}% Completed
                  </span>
                </div>

                {/* Accessible Progress Bar (Section 7) */}
                <div
                  role="progressbar"
                  aria-label={`${item.title} Progress`}
                  aria-valuenow={item.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="w-full h-2 bg-[#171a25] rounded-full mb-4 overflow-hidden border border-white/[0.04]"
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#ffb703] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animated ? `${item.progress}%` : '0%' }}
                  />
                </div>

                <h3 className="text-base font-heading font-bold text-[#f4f1ea] group-hover:text-[#ffb703] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-xs text-[#9a9aa8] leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono text-[#9a9aa8] bg-[#171a25] border border-white/[0.04] px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Workspace Hardware Environment (Section 13 Content Honesty) */}
        <div id="specs" className="rounded-2xl p-6 sm:p-8 bg-[#10121a]/95 border border-white/[0.08] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffb703]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ffb703] mb-2">
                <Laptop className="w-4 h-4" />
                <span>PHYSICAL WORKSPACE ARCHITECTURE</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#f4f1ea]">
                Workstation Environment & Rig Specifications
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#34d399] bg-[#34d399]/10 border border-[#34d399]/30 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping" />
              <span>All Systems Nominal • Online</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERSONAL_INFO.specs.map((spec, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#07080d]/80 border border-white/[0.08] hover:border-[#ffb703]/30 transition">
                <span className="text-xs text-[#9a9aa8] font-mono block mb-1">{spec.label}</span>
                <span className="text-sm font-semibold text-[#f4f1ea] tracking-wide">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9a9aa8]">
            <p className="font-mono text-center sm:text-left">
              🚀 <span className="text-[#ffb703]">Learning Relentlessly</span> • Building Consistently • Growing Every Day
            </p>
            <span className="font-mono text-[#9a9aa8]/60">
              Station ID: PRIYANRAJ-TUF-WS // Linux & Windows Subsystem
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

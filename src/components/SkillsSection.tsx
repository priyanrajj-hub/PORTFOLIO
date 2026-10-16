import React from 'react';
import { Cpu, Terminal, Code2, Globe, Wrench, Sparkles } from 'lucide-react';
import { SKILLS_DATA } from '../data/skills';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Languages': <Code2 className="w-4 h-4 text-[#ffb703]" />,
  'AI / Machine Learning': <Cpu className="w-4 h-4 text-[#ff6b35]" />,
  'Embedded & Systems': <Terminal className="w-4 h-4 text-[#ffb703]" />,
  'Web Technologies': <Globe className="w-4 h-4 text-[#ff6b35]" />,
  'Tools & DevOps': <Wrench className="w-4 h-4 text-[#ffb703]" />,
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/25 text-[#ffb703] text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY & STACK MATRIX</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-[#f4f1ea]">
            Skills & <span className="bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#ffb703] bg-clip-text text-transparent">Competencies</span>
          </h2>
          <p className="mt-3 text-[#9a9aa8] text-sm md:text-base leading-relaxed">
            Categorized technical capabilities across low-level procedural systems, reinforcement learning schedulers, firmware development, and modern responsive web tooling.
          </p>
        </div>

        {/* 5 Grouped Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS_DATA.map((cat, idx) => (
            <div
              key={idx}
              className="glass-card p-6 flex flex-col justify-between hover:border-[#ffb703]/40 transition-all duration-300"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#171a25] border border-white/[0.08] flex items-center justify-center">
                    {CATEGORY_ICONS[cat.title] || <Sparkles className="w-4 h-4 text-[#ffb703]" />}
                  </div>
                  <h3 className="text-base font-heading font-bold text-[#f4f1ea]">
                    {cat.title}
                  </h3>
                </div>

                <p className="text-xs text-[#9a9aa8] mb-5 leading-relaxed">
                  {cat.description}
                </p>

                {/* Chips with Subtle Level Indicators (No fake percentage bars) */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => {
                    const isAdvanced = skill.level === 'Advanced';
                    return (
                      <div
                        key={sIdx}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${
                          skill.highlight
                            ? 'bg-[#171a25] border-[#ffb703]/30 text-[#f4f1ea] shadow-sm'
                            : 'bg-[#10121a] border-white/[0.06] text-[#9a9aa8]'
                        }`}
                      >
                        <span className={skill.highlight ? 'text-[#ffb703] font-semibold' : ''}>
                          {skill.name}
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                            isAdvanced
                              ? 'bg-[#ffb703]/15 text-[#ffb703]'
                              : skill.level === 'Proficient'
                                ? 'bg-white/[0.08] text-[#9a9aa8]'
                                : 'bg-white/[0.04] text-[#6b6b7a]'
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#9a9aa8]">
                <span>{cat.skills.length} Capabilities</span>
                <span className="text-[#ffb703]">Verified in Projects</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

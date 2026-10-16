import React from 'react';
import { 
  Trophy, 
  ExternalLink, 
  Code2, 
  Award, 
  Zap,
  Target
} from 'lucide-react';
import { CODING_PROFILES } from '../data/portfolioData';

export const CompetitiveProfiles: React.FC = () => {
  return (
    <section id="competitive" className="py-20 relative bg-[#07080d]/80 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono mb-3 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>ALGORITHMIC EXECUTION & COMPETITIVE CODING</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#f4f1ea] tracking-tight">
            Competitive <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">Programming Hub</span>
          </h2>
          <p className="mt-3 text-[#9a9aa8] text-sm md:text-base leading-relaxed">
            Relentless daily algorithmic training across dynamic programming, graph theory, tree data structures, and contest heuristics.
          </p>
        </div>

        {/* 4 Competitive Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CODING_PROFILES.map((cp) => (
            <a
              key={cp.platform}
              href={cp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#10121a]/90 border border-white/10 hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-amber-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-slate-950 text-sm shadow-md"
                    style={{ backgroundColor: cp.color }}
                  >
                    <Code2 className="w-5 h-5 text-slate-950" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#6b6b7a] group-hover:text-amber-400 transition" />
                </div>

                <h3 className="text-lg font-bold text-[#f4f1ea] group-hover:text-amber-300 transition">
                  {cp.platform}
                </h3>
                <p className="text-xs font-mono text-[#9a9aa8] mt-0.5">
                  @{cp.handle}
                </p>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#141722] text-amber-300 border border-amber-500/20">
                    {cp.badge}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs text-[#9a9aa8] font-mono">
                <span>View Official Profile</span>
                <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Live GitHub & Algorithmic Activity Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#10121a]/80 border border-white/8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/25 flex items-center justify-center text-amber-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-white font-mono">150+ Problems</span>
              <p className="text-xs text-[#9a9aa8]">Solved across LeetCode & competitive platforms</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#10121a]/80 border border-white/8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-400/25 flex items-center justify-center text-orange-400 shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-white font-mono">LinUCB Bandits</span>
              <p className="text-xs text-[#9a9aa8]">RL-driven OS Process Scheduling algorithms</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#10121a]/80 border border-white/8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-300/25 flex items-center justify-center text-amber-300 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-white font-mono">Graph Traversal</span>
              <p className="text-xs text-[#9a9aa8]">B.Tech Research Expo 23 Friend Recommendation</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

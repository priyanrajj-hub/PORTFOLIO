import React from 'react';
import { 
  Trophy, 
  ExternalLink, 
  Code2, 
  TrendingUp, 
  Award, 
  Zap,
  Target
} from 'lucide-react';
import { CODING_PROFILES } from '../data/portfolioData';

export const CompetitiveProfiles: React.FC = () => {
  return (
    <section id="competitive" className="py-20 relative bg-slate-950/80 border-t border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>ALGORITHMIC EXECUTION & COMPETITIVE CODING</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Competitive <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Programming Hub</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base">
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
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-slate-950 text-sm"
                    style={{ backgroundColor: cp.color }}
                  >
                    <Code2 className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                  {cp.platform}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  @{cp.handle}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/70">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-amber-300 border border-slate-700">
                    {cp.badge}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs text-gray-400 font-mono">
                <span>View Official Profile</span>
                <span className="text-amber-400">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Live GitHub & Algorithmic Activity Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-white font-mono">150+ Problems</span>
              <p className="text-xs text-gray-400">Solved across LeetCode & competitive platforms</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-white font-mono">LinUCB Bandits</span>
              <p className="text-xs text-gray-400">RL-driven OS Process Scheduling algorithms</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-white font-mono">Graph Traversal</span>
              <p className="text-xs text-gray-400">B.Tech Research Expo 23 Friend Recommendation</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

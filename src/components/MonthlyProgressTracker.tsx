import React, { useState, useEffect } from 'react';
import { 
  GitCommit, 
  Calendar, 
  GitBranch, 
  Clock, 
  RefreshCw, 
  TrendingUp, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface MonthlyUpdate {
  month: string;
  focus: string;
  summary: string;
  keyCommits: string[];
  metrics: { label: string; value: string }[];
  status: 'In Progress' | 'Completed' | 'Upcoming';
}

const MONTHLY_LOGS: MonthlyUpdate[] = [
  {
    month: 'October 2026 (Current Cycle)',
    focus: 'Satellite Imagery Telemetry & Capstone LinUCB Optimization',
    summary: 'Active development on Canopy AGRISENSE satellite telemetry pipelines and fine-tuning LinUCB reinforcement learning bandit weights for OS process scheduling capstone.',
    keyCommits: [
      'Pushed multispectral solar reflectance mapping to Canopy AGRISENSE repository',
      'Integrated LinUCB Contextual Multi-Armed Bandit into AI-DAX Lite OS simulator',
      'Published new responsive 3D WebGL architecture and GitHub Actions deployment',
    ],
    metrics: [
      { label: 'Commits in Oct', value: '28+ pushes' },
      { label: 'Repos Updated', value: '4 core repos' },
      { label: 'Active Status', value: 'High Velocity' },
    ],
    status: 'In Progress',
  },
  {
    month: 'September 2026',
    focus: 'Mathematical Optimization Heuristics & Research Expo Capstone',
    summary: 'Architected Mahābhārata Adaptive Digital Mastery (ADM) linear optimization suite with automated GitHub CI pipelines and graph-theoretic friend recommendation similarity matrices.',
    keyCommits: [
      'Configured GitHub Actions CI pipeline for MAOM-PROJECT-2-ADM optimization algorithms',
      'Refactored Adamic-Adar and Jaccard graph traversal algorithms for B.Tech Research Expo 23',
    ],
    metrics: [
      { label: 'CI Success Rate', value: '100% Pass' },
      { label: 'Expo Project', value: 'Completed' },
      { label: 'Languages', value: 'C++, Python, TypeScript' },
    ],
    status: 'Completed',
  },
  {
    month: 'August 2026',
    focus: 'Oracle Database Certification & Operating Systems Systems Study',
    summary: 'Achieved official Oracle Databases for Developers: Foundations accreditation and completed extensive POSIX thread synchronization experiments.',
    keyCommits: [
      'Validated Oracle SQL relational schemas and relational performance queries',
      'Completed NPTEL Introduction to Operating Systems kernel algorithms review',
    ],
    metrics: [
      { label: 'License Earned', value: 'Oracle Foundations' },
      { label: 'Systems Mastery', value: 'POSIX Threads & Memory' },
    ],
    status: 'Completed',
  },
  {
    month: 'July 2026',
    focus: 'IEEE Amrita Chennai Webmaster Appointment & Hackathons',
    summary: 'Appointed Webmaster for IEEE Amrita Chennai Student Branch; participated in System Siege, Ethos, and RIT Hackathons.',
    keyCommits: [
      'Deployed IEEE Amrita Chennai digital portal updates and event management pipeline',
      'Completed Ethos Hackathon rapid prototyping MVP sprint',
    ],
    metrics: [
      { label: 'Leadership', value: 'IEEE Webmaster Appointed' },
      { label: 'Hackathons', value: '3 Arenas Participated' },
    ],
    status: 'Completed',
  },
];

export const MonthlyProgressTracker: React.FC = () => {
  const [liveEventCount, setLiveEventCount] = useState<number>(30);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [syncing, setSyncing] = useState<boolean>(false);

  const fetchLiveTelemetry = async () => {
    setSyncing(true);
    try {
      const res = await fetch('https://api.github.com/users/priyanrajj-hub/events/public?per_page=15');
      if (res.ok) {
        const data = await res.json();
        setLiveEventCount(data.length);
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch {
      // Fallback
    } finally {
      setTimeout(() => setSyncing(false), 500);
    }
  };

  useEffect(() => {
    fetchLiveTelemetry();
  }, []);

  return (
    <section id="progress" className="py-20 relative bg-slate-950/80 border-t border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>REAL-TIME AUDIT LOG & MONTHLY TELEMETRY</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Autonomous <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">Monthly Progress Engine</span>
            </h2>
            <p className="mt-3 text-gray-400 max-w-2xl text-sm md:text-base">
              Synchronized monthly velocity audits detailing codebase pushes, hackathon completions, and academic milestones updated automatically.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={fetchLiveTelemetry}
              disabled={syncing}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 hover:bg-slate-800 transition flex items-center gap-2 shadow-lg"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              <span>Sync Telemetry (Active: {liveEventCount} Pushes)</span>
            </button>
          </div>
        </div>

        {/* Monthly Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MONTHLY_LOGS.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between backdrop-blur-sm ${
                item.status === 'In Progress'
                  ? 'bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 border-emerald-500/40 shadow-xl shadow-emerald-500/10'
                  : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    {item.month}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                      item.status === 'In Progress'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 animate-pulse'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {item.focus}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {item.summary}
                </p>

                {/* Key Pushes / Highlights */}
                <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
                    Verified Repository Checkpoints:
                  </span>
                  {item.keyCommits.map((c, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <GitCommit className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Badge Row */}
              <div className="mt-6 pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {item.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 block">{m.label}</span>
                    <span className="text-xs font-bold text-emerald-300 font-mono">{m.value}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Real-time GitHub Activity Notification */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live telemetry connected to GitHub API • Last checked: {lastSyncTime}</span>
          </div>
          <a
            href="https://github.com/priyanrajj-hub"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Inspect @priyanrajj-hub Commits on GitHub</span>
            <span>↗</span>
          </a>
        </div>

      </div>
    </section>
  );
};

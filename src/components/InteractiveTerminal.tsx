import React, { useState } from 'react';
import { 
  Terminal, 
  RotateCcw
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, CODING_PROFILES } from '../data/portfolioData';

interface TerminalOutput {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalOutput[]>([
    {
      command: 'whoami',
      output: (
        <div className="space-y-1 text-sky-300">
          <p>➜ User: <span className="text-white font-semibold">Priyanraj J (CH.EN.U4CCE25020)</span></p>
          <p>➜ Status: <span className="text-emerald-400">Online // AI & Embedded Systems Engineer</span></p>
          <p>➜ Nodes: Amrita Vishwa Vidyapeetham | IIT Madras | IIT Guwahati</p>
          <p className="text-xs text-gray-400 pt-1">Type <code className="text-amber-300 bg-gray-800 px-1 py-0.5 rounded">help</code> to reveal available mainframe execution commands.</p>
        </div>
      ),
    },
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let res: React.ReactNode;

    switch (cmd) {
      case 'help':
        res = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs py-1">
            <div><span className="text-cyan-400 font-mono">whoami</span> - Display detailed user credentials</div>
            <div><span className="text-cyan-400 font-mono">projects</span> - Query active engineering nodes & repos</div>
            <div><span className="text-cyan-400 font-mono">skills</span> - Output technical tool stack</div>
            <div><span className="text-cyan-400 font-mono">cp</span> - Competitive coding profiles</div>
            <div><span className="text-cyan-400 font-mono">education</span> - Institutional degree tracks</div>
            <div><span className="text-cyan-400 font-mono">specs</span> - Display workstation hardware stats</div>
            <div><span className="text-cyan-400 font-mono">contact</span> - Retrieve secure communication links</div>
            <div><span className="text-cyan-400 font-mono">clear</span> - Flush terminal buffer</div>
          </div>
        );
        break;

      case 'whoami':
        res = (
          <div className="space-y-1 text-sm text-gray-200">
            <p><strong>Name:</strong> {PERSONAL_INFO.name}</p>
            <p><strong>Role:</strong> {PERSONAL_INFO.title}</p>
            <p><strong>Affiliations:</strong> Amrita CCE + IIT Madras (Data Science) + IIT Guwahati (DSAI)</p>
            <p><strong>Directive:</strong> {PERSONAL_INFO.bio}</p>
          </div>
        );
        break;

      case 'projects':
        res = (
          <div className="space-y-2 py-1">
            {PROJECTS_DATA.map((p) => (
              <div key={p.id} className="text-xs border-l-2 border-sky-500 pl-2">
                <span className="text-amber-300 font-bold">[{p.tag}]</span> <span className="text-white font-semibold">{p.title}</span>
                <p className="text-gray-400">{p.technologies.join(' • ')}</p>
                {p.demoUrl && <p className="text-emerald-400">Demo: {p.demoUrl}</p>}
              </div>
            ))}
          </div>
        );
        break;

      case 'cp':
        res = (
          <div className="space-y-1.5 py-1 text-xs">
            {CODING_PROFILES.map((c) => (
              <div key={c.platform} className="flex items-center gap-2">
                <span className="text-amber-300 font-bold">{c.platform}:</span>
                <a href={c.url} target="_blank" rel="noreferrer" className="text-sky-400 underline font-mono">
                  @{c.handle}
                </a>
                <span className="text-gray-400">({c.badge})</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        res = (
          <div className="text-xs space-y-1.5 py-1 text-gray-300">
            <p><span className="text-purple-400 font-semibold">[Languages]:</span> C, C++, Python, TypeScript, SQL, Assembly Basics</p>
            <p><span className="text-sky-400 font-semibold">[AI / Data]:</span> LinUCB Bandits, NumPy, Pandas, OpenCV, Satellite Multispectral NDVI</p>
            <p><span className="text-emerald-400 font-semibold">[Embedded / Systems]:</span> BLE 5.0, Arduino, ESP32, Ultrasonic Arrays, MicroSD Logging</p>
            <p><span className="text-pink-400 font-semibold">[Tools]:</span> Git, GitHub Actions, Linux Bash, Vite, VS Code</p>
          </div>
        );
        break;

      case 'education':
        res = (
          <div className="text-xs space-y-2 py-1">
            <div>
              <p className="text-sky-300 font-bold">Amrita Vishwa Vidyapeetham (2025–2029)</p>
              <p className="text-gray-400">B.Tech in Computer & Communication Engineering (CCE) • Chennai</p>
            </div>
            <div>
              <p className="text-purple-300 font-bold">IIT Madras</p>
              <p className="text-gray-400">BS in Data Science & Applications Track</p>
            </div>
            <div>
              <p className="text-emerald-300 font-bold">IIT Guwahati</p>
              <p className="text-gray-400">BS in Data Science & Artificial Intelligence (DSAI)</p>
            </div>
          </div>
        );
        break;

      case 'specs':
        res = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-1">
            {PERSONAL_INFO.specs.map((s, i) => (
              <div key={i} className="bg-slate-800/60 p-2 rounded border border-slate-700">
                <span className="text-gray-400 block">{s.label}:</span>
                <span className="text-cyan-300 font-mono font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        res = (
          <div className="space-y-1 text-xs">
            <p>GitHub: <a href={PERSONAL_INFO.links.github} target="_blank" rel="noreferrer" className="text-sky-400 underline">{PERSONAL_INFO.links.github}</a></p>
            <p>LinkedIn: <a href={PERSONAL_INFO.links.linkedin} target="_blank" rel="noreferrer" className="text-sky-400 underline">{PERSONAL_INFO.links.linkedin}</a></p>
            <p>Email: <a href={`mailto:${PERSONAL_INFO.links.email}`} className="text-sky-400 underline">{PERSONAL_INFO.links.email}</a></p>
            <p>WhatsApp: <a href={PERSONAL_INFO.links.whatsapp} target="_blank" rel="noreferrer" className="text-emerald-400 underline">+91 78100 12708</a></p>
            <p>LeetCode: <a href={PERSONAL_INFO.links.leetcode} target="_blank" rel="noreferrer" className="text-amber-400 underline">{PERSONAL_INFO.links.leetcode}</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        res = (
          <p className="text-rose-400 text-xs">
            zsh: command not found: {cmd}. Enter <span className="text-white underline cursor-pointer" onClick={() => setInputVal('help')}>help</span> for list of known commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: inputVal, output: res }]);
    setInputVal('');
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/90 shadow-2xl backdrop-blur-xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            priyanraj@mainframe:~ (zsh)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory([])}
            title="Clear Terminal"
            className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1 bg-slate-800/60 px-2 py-1 rounded"
          >
            <RotateCcw className="w-3 h-3" /> Clear
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-xs md:text-sm max-h-[380px] overflow-y-auto space-y-3">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400 font-bold">root@priyanrajj-hub</span>
              <span className="text-sky-400">~</span>
              <span className="text-slate-500">$</span>
              <span className="text-white font-semibold">{item.command}</span>
            </div>
            <div className="pl-3">{item.output}</div>
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold">root@priyanrajj-hub</span>
          <span className="text-sky-400">~</span>
          <span className="text-slate-500">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or any command..."
            className="flex-1 bg-transparent border-none outline-none text-sky-300 font-mono text-xs md:text-sm placeholder-slate-600 focus:ring-0"
            autoFocus
          />
        </form>
      </div>

      {/* Quick Interactive Command Pills */}
      <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-slate-400">
        <span className="text-slate-500">Quick run:</span>
        {['whoami', 'projects', 'cp', 'skills', 'education', 'specs', 'contact', 'clear'].map((c) => (
          <button
            key={c}
            onClick={() => setInputVal(c)}
            className="px-2 py-0.5 bg-slate-800 hover:bg-sky-950 hover:text-sky-300 hover:border-sky-500 border border-slate-700 rounded transition whitespace-nowrap"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};

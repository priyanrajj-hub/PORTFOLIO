import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, CODING_PROFILES } from '../data/portfolioData';

interface TerminalOutput {
  command: string;
  output: React.ReactNode;
}

const AVAILABLE_COMMANDS = ['help', 'whoami', 'projects', 'cp', 'skills', 'education', 'specs', 'contact', 'clear'];

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalOutput[]>([
    {
      command: 'whoami',
      output: (
        <div className="space-y-1 text-amber-300 font-mono text-xs">
          <p>➜ User: <span className="text-white font-bold">Priyanraj J (Roll: CH.EN.U4CCE25020)</span></p>
          <p>➜ Status: <span className="text-emerald-400 font-semibold">Online // Systems Software Engineer & AI Researcher</span></p>
          <p>➜ Nodes: Amrita Vishwa Vidyapeetham | IIT Madras | IIT Guwahati</p>
          <p className="text-[#9a9aa8] pt-1">Type <code className="text-amber-400 bg-white/10 px-1 py-0.5 rounded">help</code> for command manifest. Press <kbd className="text-xs bg-white/10 px-1 rounded">Tab</kbd> to autocomplete, <kbd className="text-xs bg-white/10 px-1 rounded">↑</kbd>/<kbd className="text-xs bg-white/10 px-1 rounded">↓</kbd> for history.</p>
        </div>
      ),
    },
  ]);

  // Command History Navigation (Up/Down Arrow Keys)
  const [commandLog, setCommandLog] = useState<string[]>(['whoami']);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 1. Tab Auto-Completion
    if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      const matched = AVAILABLE_COMMANDS.find(c => c.startsWith(current));
      if (matched) {
        setInputVal(matched);
      }
      return;
    }

    // 2. Command History (Arrow Up)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandLog.length === 0) return;
      const nextPointer = historyPointer === -1 ? commandLog.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setInputVal(commandLog[nextPointer] || '');
      return;
    }

    // 3. Command History (Arrow Down)
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer >= commandLog.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextPointer);
        setInputVal(commandLog[nextPointer] || '');
      }
      return;
    }
  };

  const executeCommand = (cmdText: string) => {
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    // Record into command history
    setCommandLog(prev => [...prev, cmd]);
    setHistoryPointer(-1);

    let res: React.ReactNode;

    switch (cmd) {
      case 'help':
        res = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs py-1.5 font-mono">
            <div><span className="text-amber-400 font-bold">whoami</span> - Display researcher credentials & UID</div>
            <div><span className="text-amber-400 font-bold">projects</span> - Query active engineering nodes & repos</div>
            <div><span className="text-amber-400 font-bold">skills</span> - Output technical tool stack</div>
            <div><span className="text-amber-400 font-bold">cp</span> - Competitive coding records (LeetCode/Codeforces)</div>
            <div><span className="text-amber-400 font-bold">education</span> - Triple degree academic tracks</div>
            <div><span className="text-amber-400 font-bold">specs</span> - Display hardware mainframe specifications</div>
            <div><span className="text-amber-400 font-bold">contact</span> - Retrieve secure communication links</div>
            <div><span className="text-amber-400 font-bold">clear</span> - Flush terminal buffer</div>
          </div>
        );
        break;

      case 'whoami':
        res = (
          <div className="space-y-1 text-xs md:text-sm text-[#f4f1ea] font-mono">
            <p><strong className="text-amber-400">Name:</strong> {PERSONAL_INFO.name} (Roll: {PERSONAL_INFO.rollNumber})</p>
            <p><strong className="text-amber-400">Title:</strong> {PERSONAL_INFO.title}</p>
            <p><strong className="text-amber-400">Triple Track:</strong> Amrita CCE + IIT Madras (BS DS) + IIT Guwahati (BS DSAI)</p>
            <p><strong className="text-amber-400">Leadership:</strong> Webmaster @ IEEE Amrita Chennai Student Branch</p>
            <p className="text-[#9a9aa8] italic pt-1">{PERSONAL_INFO.quote}</p>
          </div>
        );
        break;

      case 'projects':
        res = (
          <div className="space-y-2 py-1 font-mono">
            {PROJECTS_DATA.map((p) => (
              <div key={p.id} className="text-xs border-l-2 border-amber-400 pl-2.5">
                <span className="text-amber-300 font-bold">[{p.tag}]</span> <span className="text-white font-semibold">{p.title}</span>
                <p className="text-[#9a9aa8]">{p.technologies.join(' • ')}</p>
                {p.demoUrl && <p className="text-emerald-400">Live Demo: {p.demoUrl}</p>}
                <p className="text-[#6b6b7a]">Repo: {p.githubUrl}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'cp':
        res = (
          <div className="space-y-1.5 py-1 text-xs font-mono">
            {CODING_PROFILES.map((c) => (
              <div key={c.platform} className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">{c.platform}:</span>
                <a href={c.url} target="_blank" rel="noreferrer" className="text-white hover:text-amber-300 underline">
                  @{c.handle}
                </a>
                <span className="text-[#9a9aa8]">({c.badge})</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        res = (
          <div className="text-xs space-y-1.5 py-1 text-[#f4f1ea] font-mono">
            <p><span className="text-amber-400 font-semibold">[Core Languages]:</span> C (Strict ANSI), C++, Python 3, TypeScript, SQL, Assembly</p>
            <p><span className="text-orange-400 font-semibold">[AI / Data Systems]:</span> LinUCB Bandits, NumPy, Pandas, OpenCV, Multispectral NDVI</p>
            <p><span className="text-emerald-400 font-semibold">[Hardware / Embedded]:</span> BLE 5.0 Core, Arduino, ESP32, Ultrasonic Sensor Arrays, MicroSD I/O</p>
            <p><span className="text-amber-200 font-semibold">[Tooling & Cloud]:</span> Git, GitHub Actions, Linux Bash, Vite, Vercel, Docker</p>
          </div>
        );
        break;

      case 'education':
        res = (
          <div className="text-xs space-y-2 py-1 font-mono">
            <div>
              <p className="text-amber-300 font-bold">1. Amrita Vishwa Vidyapeetham (2025–2029)</p>
              <p className="text-[#9a9aa8]">B.Tech Computer & Communication Engineering (CCE) • Chennai Campus • Roll: CH.EN.U4CCE25020</p>
            </div>
            <div>
              <p className="text-orange-300 font-bold">2. IIT Madras (2025–Present)</p>
              <p className="text-[#9a9aa8]">BS in Data Science & Applications Track</p>
            </div>
            <div>
              <p className="text-amber-200 font-bold">3. IIT Guwahati (2025–Present)</p>
              <p className="text-[#9a9aa8]">BS in Data Science & Artificial Intelligence (DSAI)</p>
            </div>
          </div>
        );
        break;

      case 'specs':
        res = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-1 font-mono">
            {PERSONAL_INFO.specs.map((s, i) => (
              <div key={i} className="bg-[#141722] p-2 rounded-lg border border-white/8">
                <span className="text-[#9a9aa8] block">{s.label}:</span>
                <span className="text-amber-300 font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        res = (
          <div className="space-y-1 text-xs font-mono">
            <p>Email: <a href={`mailto:${PERSONAL_INFO.links.email}`} className="text-amber-400 underline">{PERSONAL_INFO.links.email}</a></p>
            <p>WhatsApp: <a href={PERSONAL_INFO.links.whatsapp} target="_blank" rel="noreferrer" className="text-emerald-400 underline">+91 78100 12708</a></p>
            <p>GitHub: <a href={PERSONAL_INFO.links.github} target="_blank" rel="noreferrer" className="text-white underline">{PERSONAL_INFO.links.github}</a></p>
            <p>LinkedIn: <a href={PERSONAL_INFO.links.linkedin} target="_blank" rel="noreferrer" className="text-white underline">{PERSONAL_INFO.links.linkedin}</a></p>
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
          <p className="text-rose-400 text-xs font-mono">
            zsh: command not found: {cmd}. Type <span className="text-amber-300 underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> for available system calls.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdText, output: res }]);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#07080d]/95 shadow-2xl backdrop-blur-xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#10121a] border-b border-white/8">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="text-xs font-mono text-[#9a9aa8] ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            root@stark-mainframe:~ (zsh)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory([])}
            title="Clear Terminal"
            className="text-xs text-[#9a9aa8] hover:text-[#f4f1ea] transition flex items-center gap-1 bg-[#141722] px-2.5 py-1 rounded border border-white/5 font-mono"
          >
            <RotateCcw className="w-3 h-3" /> Clear
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div ref={terminalBodyRef} className="p-4 font-mono text-xs md:text-sm max-h-[380px] overflow-y-auto space-y-3">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-[#9a9aa8]">
              <span className="text-amber-400 font-bold">root@stark-node</span>
              <span className="text-orange-400">~</span>
              <span className="text-[#6b6b7a]">$</span>
              <span className="text-white font-semibold">{item.command}</span>
            </div>
            <div className="pl-3">{item.output}</div>
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
          <span className="text-amber-400 font-bold">root@stark-node</span>
          <span className="text-orange-400">~</span>
          <span className="text-[#6b6b7a]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' (press Tab to autocomplete, ↑/↓ for history)..."
            className="flex-1 bg-transparent border-none outline-none text-amber-300 font-mono text-xs md:text-sm placeholder-[#6b6b7a] focus:ring-0"
            autoFocus
          />
        </form>
      </div>

      {/* Quick Interactive Command Pills */}
      <div className="px-4 py-2 bg-[#10121a]/80 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-[#9a9aa8]">
        <span className="text-[#6b6b7a]">Quick run:</span>
        {AVAILABLE_COMMANDS.map((c) => (
          <button
            key={c}
            onClick={() => executeCommand(c)}
            className="px-2.5 py-0.5 bg-[#141722] hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-400/40 border border-white/5 rounded transition whitespace-nowrap"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};

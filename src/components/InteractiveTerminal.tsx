import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  RotateCcw,
  Palette
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, CODING_PROFILES } from '../data/portfolioData';

interface TerminalOutput {
  command: string;
  output: React.ReactNode;
}

const AVAILABLE_COMMANDS = ['help', 'whoami', 'projects', 'cp', 'skills', 'education', 'specs', 'contact', 'theme', 'resume', 'clear'];

const THEMES: Record<string, { name: string; accent: string; accent2: string }> = {
  gold: { name: 'Arc Reactor Gold', accent: '#ffb703', accent2: '#ff6b35' },
  violet: { name: 'Violet Quantum', accent: '#8b5cf6', accent2: '#22d3ee' },
  emerald: { name: 'Emerald Terminal', accent: '#10e08a', accent2: '#a3e635' },
};

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [currentTheme, setCurrentTheme] = useState<'gold' | 'violet' | 'emerald'>('gold');
  const [history, setHistory] = useState<TerminalOutput[]>([
    {
      command: 'whoami',
      output: (
        <div className="space-y-1 text-amber-300 font-mono text-xs">
          <p>➜ User: <span className="text-white font-bold">Priyanraj J</span></p>
          <p>➜ Status: <span className="text-emerald-400 font-semibold">Online // Systems Software Engineer & AI Researcher</span></p>
          <p>➜ Nodes: Amrita Vishwa Vidyapeetham | IIT Madras | IIT Guwahati</p>
          <p className="text-[#9a9aa8] pt-1">Type <code className="text-amber-400 bg-white/10 px-1 py-0.5 rounded">help</code> for command manifest. Press <kbd className="text-xs bg-white/10 px-1 rounded">Tab</kbd> to autocomplete, <kbd className="text-xs bg-white/10 px-1 rounded">↑</kbd>/<kbd className="text-xs bg-white/10 px-1 rounded">↓</kbd> for history, <kbd className="text-xs bg-white/10 px-1 rounded">Ctrl+L</kbd> to clear.</p>
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

  const applyTheme = (themeKey: 'gold' | 'violet' | 'emerald') => {
    const t = THEMES[themeKey];
    document.documentElement.style.setProperty('--color-accent', t.accent);
    document.documentElement.style.setProperty('--color-accent-2', t.accent2);
    setCurrentTheme(themeKey);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 0. Ctrl+L to Clear Terminal
    if ((e.ctrlKey || e.metaKey) && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      setHistory([]);
      return;
    }

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
    const fullCmd = cmdText.trim();
    if (!fullCmd) return;
    const parts = fullCmd.toLowerCase().split(/\s+/);
    const cmd = parts[0];
    const arg = parts[1];

    // Record into command history
    setCommandLog(prev => [...prev, fullCmd]);
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
            <div><span className="text-amber-400 font-bold">theme [gold|violet|emerald]</span> - Toggle UI accent palette</div>
            <div><span className="text-amber-400 font-bold">resume</span> - Open verified PDF resume</div>
            <div><span className="text-amber-400 font-bold">clear</span> - Flush terminal buffer (Ctrl+L)</div>
          </div>
        );
        break;

      case 'whoami':
        res = (
          <div className="space-y-1 text-xs md:text-sm text-[#f4f1ea] font-mono">
            <p><strong className="text-amber-400">Name:</strong> {PERSONAL_INFO.name}</p>
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
              <p className="text-[#9a9aa8]">B.Tech Computer & Communication Engineering (CCE) • Chennai Campus • Specialization: Systems & AI</p>
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
            <p>WhatsApp: <a href={PERSONAL_INFO.links.whatsapp} target="_blank" rel="noreferrer" className="text-emerald-400 underline">Message via WhatsApp Uplink</a></p>
            <p>GitHub: <a href={PERSONAL_INFO.links.github} target="_blank" rel="noreferrer" className="text-white underline">{PERSONAL_INFO.links.github}</a></p>
            <p>LinkedIn: <a href={PERSONAL_INFO.links.linkedin} target="_blank" rel="noreferrer" className="text-white underline">{PERSONAL_INFO.links.linkedin}</a></p>
            <p>LeetCode: <a href={PERSONAL_INFO.links.leetcode} target="_blank" rel="noreferrer" className="text-amber-400 underline">{PERSONAL_INFO.links.leetcode}</a></p>
          </div>
        );
        break;

      case 'theme': {
        const themeOrder: ('gold' | 'violet' | 'emerald')[] = ['gold', 'violet', 'emerald'];
        let selectedTheme: 'gold' | 'violet' | 'emerald';
        if (arg && (arg === 'gold' || arg === 'violet' || arg === 'emerald')) {
          selectedTheme = arg;
        } else {
          const nextIdx = (themeOrder.indexOf(currentTheme) + 1) % themeOrder.length;
          selectedTheme = themeOrder[nextIdx];
        }
        applyTheme(selectedTheme);
        const t = THEMES[selectedTheme];
        res = (
          <div className="text-xs font-mono py-1 space-y-1">
            <p className="text-emerald-400 font-semibold">
              ✔ Switched UI theme palette to: <span className="text-white font-bold">{t.name}</span>
            </p>
            <p className="text-[#9a9aa8]">
              Accent: <span style={{ color: t.accent }}>{t.accent}</span> | Accent 2: <span style={{ color: t.accent2 }}>{t.accent2}</span>
            </p>
          </div>
        );
        break;
      }

      case 'resume':
        window.open('./resume.pdf', '_blank');
        res = (
          <div className="text-xs font-mono py-1 text-emerald-400">
            ✔ Opening Priyanraj_Resume.pdf in a new browser tab...
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
            onClick={() => executeCommand('theme')}
            title="Cycle Palette Theme"
            className="text-xs text-[#9a9aa8] hover:text-[#f4f1ea] transition flex items-center gap-1 bg-[#141722] px-2.5 py-1 rounded border border-white/5 font-mono"
          >
            <Palette className="w-3 h-3 text-amber-400" />
            <span>Theme: {THEMES[currentTheme].name.split(' ')[0]}</span>
          </button>
          <button
            onClick={() => setHistory([])}
            title="Clear Terminal (Ctrl+L)"
            className="text-xs text-[#9a9aa8] hover:text-[#f4f1ea] transition flex items-center gap-1 bg-[#141722] px-2.5 py-1 rounded border border-white/5 font-mono"
          >
            <RotateCcw className="w-3 h-3" /> Clear
          </button>
        </div>
      </div>

      {/* Terminal Body with Tap-to-Focus */}
      <div 
        ref={terminalBodyRef} 
        onClick={() => inputRef.current?.focus()}
        className="p-4 font-mono text-xs md:text-sm max-h-[380px] overflow-y-auto space-y-3 cursor-text"
      >
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

        {/* Input Line (font-size 16px on mobile to prevent iOS auto-zoom) */}
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
            className="flex-1 bg-transparent border-none outline-none text-amber-300 font-mono text-base md:text-sm placeholder-[#6b6b7a] focus:ring-0"
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

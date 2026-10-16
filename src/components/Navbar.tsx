import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Sparkles,
  Bot
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Core Identity', href: '#hero' },
    { 
      name: 'J.A.R.V.I.S. AI', 
      href: '#hero', 
      onClick: () => {
        window.dispatchEvent(new CustomEvent('focus-jarvis'));
        window.dispatchEvent(new CustomEvent('open-ai-chat'));
      } 
    },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Progress Engine', href: '#progress' },
    { name: 'Competitive', href: '#competitive' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/40' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-mono font-black text-slate-950 text-base shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-white text-sm tracking-tight flex items-center gap-1">
                priyanrajj<span className="text-sky-400">_hub</span>
              </span>
              <span className="text-[10px] font-mono text-gray-500">
                SYSTEM_NODE//AI_CCE
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  if (link.onClick) link.onClick();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  link.name.includes('AI')
                    ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-800/60 font-semibold hover:bg-cyan-900/60'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* External Social Quick Icons */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-sky-500/40 hover:bg-slate-800 transition"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-sky-400 hover:border-sky-500/40 hover:bg-slate-800 transition"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-500/40 hover:bg-slate-800 transition"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.links.email}`}
              className="px-3 py-1.5 rounded-xl bg-sky-500 text-slate-950 text-xs font-bold font-mono hover:bg-sky-400 transition shadow-md shadow-sky-500/20"
            >
              CONNECT
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-800 transition"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">{PERSONAL_INFO.rollNumber}</span>
              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-sky-400 hover:underline"
              >
                GitHub Profile ↗
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

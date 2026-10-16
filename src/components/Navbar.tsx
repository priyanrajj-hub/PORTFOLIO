import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Zap,
  Bot
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll-spy: Determine active section
      const sections = ['hero', 'experience', 'projects', 'progress', 'competitive', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', name: 'About', href: '#hero' },
    { 
      id: 'jarvis', 
      name: 'J.A.R.V.I.S. AI', 
      href: '#hero', 
      isAi: true,
      onClick: () => {
        window.dispatchEvent(new CustomEvent('focus-jarvis'));
        window.dispatchEvent(new CustomEvent('open-ai-chat'));
      } 
    },
    { id: 'experience', name: 'Experience', href: '#experience' },
    { id: 'projects', name: 'Projects', href: '#projects' },
    { id: 'progress', name: 'Telemetry', href: '#progress' },
    { id: 'competitive', name: 'Competitive', href: '#competitive' },
    { id: 'education', name: 'Certifications', href: '#education' },
    { id: 'contact', name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#07080d]/90 backdrop-blur-xl border-b border-white/10 py-2.5 shadow-2xl shadow-black/60' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Arc Reactor Gold */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-300 flex items-center justify-center font-mono font-black text-slate-950 text-base shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-[#f4f1ea] text-sm tracking-tight flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                priyanrajj<span className="text-amber-400">_hub</span>
              </span>
              <span className="text-[10px] font-mono text-[#9a9aa8]">
                STARK_MAINFRAME//CCE
              </span>
            </div>
          </a>

          {/* Desktop Nav Links with Scroll-Spy Active Indicator */}
          <nav className="hidden md:flex items-center gap-1 bg-[#10121a]/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id && !link.isAi;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    if (link.onClick) link.onClick();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 relative ${
                    link.isAi
                      ? 'text-amber-300 bg-amber-500/15 border border-amber-400/40 font-semibold hover:bg-amber-500/25 shadow-sm shadow-amber-500/10'
                      : isActive
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-[#9a9aa8] hover:text-[#f4f1ea] hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.isAi && <Zap className="w-3 h-3 text-amber-400 animate-pulse" />}
                    {link.name}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* External Social Quick Icons & Action Button */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#141722] border border-white/10 flex items-center justify-center text-[#9a9aa8] hover:text-[#f4f1ea] hover:border-amber-400/40 hover:bg-[#1c2030] transition shadow-sm"
              title="GitHub"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#141722] border border-white/10 flex items-center justify-center text-[#9a9aa8] hover:text-amber-400 hover:border-amber-400/40 hover:bg-[#1c2030] transition shadow-sm"
              title="LinkedIn"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#141722] border border-white/10 flex items-center justify-center text-[#9a9aa8] hover:text-orange-400 hover:border-amber-400/40 hover:bg-[#1c2030] transition shadow-sm"
              title="Instagram"
              aria-label="Instagram Profile"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.links.email}`}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs font-bold font-mono hover:from-amber-300 hover:to-orange-400 transition-all shadow-md shadow-amber-500/20 transform hover:-translate-y-0.5"
            >
              CONNECT
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-[#141722] border border-white/10 flex items-center justify-center text-[#f4f1ea] hover:bg-[#1c2030] transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#10121a] border border-amber-400/25 space-y-2 shadow-2xl backdrop-blur-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.onClick) link.onClick();
                }}
                className={`block px-3.5 py-2.5 rounded-xl text-xs font-mono transition ${
                  link.isAi
                    ? 'text-amber-300 bg-amber-500/20 border border-amber-400/40 font-bold'
                    : activeSection === link.id
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-[#9a9aa8] hover:text-[#f4f1ea] hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-[#9a9aa8]">{PERSONAL_INFO.rollNumber}</span>
              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline"
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

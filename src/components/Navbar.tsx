import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, FileText, Bot } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll Progress and Sticky state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Compute scroll percentage
      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }

      // Scroll-spy: Determine active section
      const sections = ['hero', 'education', 'projects', 'skills', 'certificates', 'roadmap', 'contact'];
      const scrollPosition = scrollY + 160;

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

  // Lock body scroll and handle ESC key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'hero', name: 'About', href: '#hero' },
    { id: 'education', name: 'Education', href: '#education' },
    { id: 'projects', name: 'Projects', href: '#projects' },
    { id: 'skills', name: 'Skills', href: '#skills' },
    { id: 'certificates', name: 'Certificates', href: '#certificates' },
    { id: 'roadmap', name: 'Roadmap', href: '#roadmap' },
    { id: 'contact', name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#07080d]/90 backdrop-blur-xl border-b border-white/[0.08] py-2.5 shadow-2xl shadow-black/80' 
        : 'bg-transparent py-4'
    }`}>
      {/* Thin Arc Reactor Gold Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#ffb703] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Arc Reactor Gold */}
          <a href="#hero" className="flex items-center gap-2.5 group" aria-label="Priyanraj J Homepage">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ffb703] via-[#ff6b35] to-[#ffb703] flex items-center justify-center font-mono font-black text-[#07080d] text-base shadow-lg shadow-[#ffb703]/25 group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-[#f4f1ea] text-sm tracking-tight flex items-center gap-1 group-hover:text-[#ffb703] transition-colors">
                Priyanraj J
              </span>
              <span className="text-[10px] font-mono text-[#9a9aa8]">
                AI & Systems Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links with Scroll-Spy Active Indicator */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#10121a]/85 p-1.5 rounded-full border border-white/[0.08] backdrop-blur-xl shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? 'bg-[#ffb703] text-[#07080d] font-bold shadow-md shadow-[#ffb703]/20'
                      : 'text-[#9a9aa8] hover:text-[#f4f1ea] hover:bg-white/[0.06]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA: Resume & J.A.R.V.I.S. trigger */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat'))}
              className="px-3 py-1.5 rounded-full bg-[#171a25] hover:bg-[#202535] text-[#ffb703] border border-[#ffb703]/30 text-xs font-mono flex items-center gap-1.5 transition shadow-sm"
              aria-label="Open J.A.R.V.I.S. AI Chat"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>J.A.R.V.I.S.</span>
            </button>

            <a
              href="/resume.pdf?v=20261016"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-[#ffb703] hover:bg-[#ffc42e] text-[#07080d] font-bold text-xs font-mono flex items-center gap-1.5 transition shadow-md shadow-[#ffb703]/20"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#10121a] text-[#f4f1ea] border border-white/10 hover:border-[#ffb703]/40 transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#ffb703]" /> : <Menu className="w-5 h-5 text-[#f4f1ea]" />}
          </button>

        </div>
      </div>

      {/* Mobile Full-Screen Overlay Menu with Focus Trap and ESC support */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden fixed inset-0 top-[60px] bg-[#07080d]/95 backdrop-blur-2xl z-40 p-6 flex flex-col justify-between overflow-y-auto"
        >
          <div className="space-y-2 pt-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3.5 rounded-xl text-base font-mono transition ${
                    isActive
                      ? 'bg-[#ffb703] text-[#07080d] font-bold'
                      : 'text-[#f4f1ea] hover:bg-white/[0.06]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3 pb-8">
            <a
              href="/resume.pdf?v=20261016"
              target="_blank"
              rel="noopener noreferrer"
              download="Priyanraj_J_Resume.pdf"
              className="w-full py-3 rounded-xl bg-[#ffb703] text-[#07080d] font-bold text-center block font-mono text-sm shadow-lg shadow-[#ffb703]/20"
            >
              Download Resume (PDF)
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-ai-chat'));
              }}
              className="w-full py-3 rounded-xl bg-[#171a25] text-[#ffb703] border border-[#ffb703]/30 font-bold text-center block font-mono text-sm"
            >
              Launch J.A.R.V.I.S. AI
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

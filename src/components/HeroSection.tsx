import React, { useState, useEffect, Suspense, lazy } from 'react';
import { 
  ArrowRight, 
  FileText,
  Mail,
  Cpu,
  Shield,
  Layers,
  Terminal,
  Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

// Lazy-load Three.js canvas (Section 5)
const LazyHero3DCanvas = lazy(() => 
  import('./Hero3DCanvas').then(m => ({ default: m.Hero3DCanvas }))
);

// Lightweight CSS skeleton fallback while Three.js loads
const CanvasSkeleton: React.FC = () => (
  <div className="w-full h-[320px] rounded-2xl bg-[#10121a]/60 border border-white/[0.08] flex items-center justify-center animate-pulse">
    <div className="flex flex-col items-center gap-3">
      <div className="w-16 h-16 rounded-full border-2 border-[#ffb703]/30 border-t-[#ffb703] animate-spin" />
      <span className="text-xs font-mono text-[#9a9aa8]">Initializing 3D Core...</span>
    </div>
  </div>
);

const ROLES = [
  'Systems Software Engineer',
  'AI & TinyML Researcher',
  'IEEE CAS Webmaster',
  'Low-Level C Architect'
];

export const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Subtle animated typed text cycling through roles (stops on prefers-reduced-motion)
  useEffect(() => {
    if (reducedMotion) return;

    const currentRole = ROLES[roleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      typingSpeed = 500;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex === currentRole.length) {
        setIsDeleting(true);
      } else if (isDeleting) {
        setCharIndex((prev) => prev - 1);
      } else {
        setCharIndex((prev) => prev + 1);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, reducedMotion]);

  const displayedRole = reducedMotion 
    ? 'Systems Software Engineer & AI Researcher' 
    : ROLES[roleIndex].slice(0, charIndex);

  return (
    <section id="hero" className="relative min-h-[90vh] pt-32 pb-20 flex items-center overflow-hidden">
      
      {/* Background ambient gold/obsidian glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ffb703]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#ff6b35]/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authoritative Pitch (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow: Triple degree institutions */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10121a] border border-white/[0.08] text-[#9a9aa8] text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
              <span>B.Tech CCE @ Amrita | BS Data Science @ IIT Madras | BS DS&AI @ IIT Guwahati</span>
            </div>

            {/* Profile Avatar & Primary H1 Heading */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#ffb703]/50 shadow-xl shadow-[#ffb703]/10 bg-[#171a25]">
                  <img
                    src="./profile.webp"
                    alt="Priyanraj J"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    width="96"
                    height="96"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#34d399] border-2 border-[#07080d]" title="Online Status" />
              </div>

              <div>
                <h1 className="text-4xl sm:text-6xl font-heading font-black text-[#f4f1ea] tracking-tight">
                  Priyanraj J
                </h1>
                
                {/* Subtle animated typed role */}
                <div className="text-sm sm:text-base font-mono text-[#ffb703] mt-1 h-6 flex items-center">
                  <span>{displayedRole}</span>
                  {!reducedMotion && <span className="inline-block w-1.5 h-4 ml-1 bg-[#ffb703] animate-pulse" />}
                </div>
              </div>
            </div>

            {/* Clear one-line headline */}
            <p className="text-lg sm:text-xl text-[#f4f1ea] font-medium leading-relaxed max-w-2xl">
              AI and embedded-systems engineer building secure, intelligent systems.
            </p>

            <p className="text-sm text-[#9a9aa8] leading-relaxed max-w-xl">
              Engineering context-aware LinUCB multi-armed bandit OS schedulers, satellite multispectral vegetation monitors (Canopy), and hardware BLE proximity platforms with strict ANSI C and Python.
            </p>

            {/* Two Main CTAs (Section 4) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full bg-[#ffb703] hover:bg-[#ffc42e] text-[#07080d] font-bold text-sm font-mono flex items-center gap-2 shadow-lg shadow-[#ffb703]/25 transition-transform hover:-translate-y-0.5"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="./resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#10121a] hover:bg-[#171a25] text-[#f4f1ea] border border-white/[0.12] hover:border-[#ffb703]/40 font-mono text-sm flex items-center gap-2 transition-transform hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4 text-[#ffb703]" />
                <span>Download Resume</span>
              </a>

              <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                <a
                  href={PERSONAL_INFO.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-[#10121a] hover:bg-[#171a25] text-[#9a9aa8] hover:text-[#f4f1ea] border border-white/[0.08] transition"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href={PERSONAL_INFO.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-[#10121a] hover:bg-[#171a25] text-[#9a9aa8] hover:text-[#ffb703] border border-white/[0.08] transition"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="p-2.5 rounded-full bg-[#10121a] hover:bg-[#171a25] text-[#9a9aa8] hover:text-[#ffb703] border border-white/[0.08] transition"
                  aria-label="Contact Section"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick telemetry indicators */}
            <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg">
              <div className="p-3 rounded-xl bg-[#10121a]/80 border border-white/[0.06]">
                <span className="text-[10px] font-mono text-[#9a9aa8] block">Specialization</span>
                <span className="text-xs font-bold text-[#f4f1ea]">Embedded & AI</span>
              </div>
              <div className="p-3 rounded-xl bg-[#10121a]/80 border border-white/[0.06]">
                <span className="text-[10px] font-mono text-[#9a9aa8] block">Projects</span>
                <span className="text-xs font-bold text-[#ffb703]">9+ Production</span>
              </div>
              <div className="p-3 rounded-xl bg-[#10121a]/80 border border-white/[0.06]">
                <span className="text-[10px] font-mono text-[#9a9aa8] block">Leadership</span>
                <span className="text-xs font-bold text-[#34d399]">IEEE Webmaster</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Quantum Core (lg:col-span-5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-[#10121a]/60 border border-white/[0.08] backdrop-blur-xl p-4 shadow-2xl overflow-hidden min-h-[340px] flex items-center justify-center">
              
              <div className="w-full h-[320px]">
                <Suspense fallback={<CanvasSkeleton />}>
                  <LazyHero3DCanvas className="w-full h-full" />
                </Suspense>
              </div>

              {/* HUD Frame Markers */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-mono text-[#ffb703]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb703] animate-pulse" />
                <span>3D_QUANTUM_CORE//ONLINE</span>
              </div>

              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#9a9aa8]">
                FPS: 60 • DPR: 1.5
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

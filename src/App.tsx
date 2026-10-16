import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveBannerCard } from './components/InteractiveBannerCard';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { MonthlyProgressTracker } from './components/MonthlyProgressTracker';
import { CompetitiveProfiles } from './components/CompetitiveProfiles';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { RoadmapAndSpecs } from './components/RoadmapAndSpecs';
import { ContactSection } from './components/ContactSection';
import { AiVoiceAssistant } from './components/AiVoiceAssistant';
import { Terminal, Shield, ArrowUp, Mail, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './components/BrandIcons';
import { PERSONAL_INFO } from './data/portfolioData';

export function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07080d] text-[#f4f1ea] selection:bg-[#ffb703] selection:text-[#07080d] relative font-sans">
      
      {/* Stark Precision Grid Background Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 183, 3, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
        aria-hidden="true"
      />

      {/* Primary Sticky Navbar with Scroll-spy */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10">
        
        {/* Section 1: Hero, 3D Core & J.A.R.V.I.S. Mainframe */}
        <HeroSection />

        {/* Section 2: Interactive High-Res Brand Card */}
        <InteractiveBannerCard />

        {/* Section 3: Professional Experience (IEEE Webmaster, CodeAlpha) */}
        <ExperienceSection />

        {/* Section 4: Academic Foundation (3-Column Timeline Cards) */}
        <EducationSection />

        {/* Section 5: Categorized Projects Showcase (With Filter Tabs & Modal) */}
        <ProjectsSection />

        {/* Section 6: Categorized Technical Skills Matrix */}
        <SkillsSection />

        {/* Section 7: Authenticated Licenses & Hackathons Strip */}
        <CertificatesSection />

        {/* Section 8: Autonomous Monthly Progress Tracker (GitHub Live Telemetry) */}
        <MonthlyProgressTracker />

        {/* Section 9: Competitive Programming Hub (LeetCode, Codeforces, AtCoder, HackerRank) */}
        <CompetitiveProfiles />

        {/* Section 10: Cyber UNIX Mainframe Terminal */}
        <section id="terminal" className="py-20 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/25 text-[#ffb703] text-xs font-mono mb-2 shadow-sm">
                <Terminal className="w-3.5 h-3.5 text-[#ffb703]" />
                <span>INTERACTIVE CLI INTERFACE</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#f4f1ea] tracking-tight">
                Mainframe <span className="bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#ffb703] bg-clip-text text-transparent">Shell Emulator</span>
              </h2>
              <p className="mt-2 text-xs md:text-sm text-[#9a9aa8]">
                Execute live system calls with command history, tab completion, theme switcher, and diagnostics.
              </p>
            </div>

            <InteractiveTerminal />
          </div>
        </section>

        {/* Section 11: Execution Roadmap & Mainframe Specs */}
        <RoadmapAndSpecs />

        {/* Section 12: Contact & Direct Uplink */}
        <ContactSection />

      </main>

      {/* Floating Back-to-Top Button (Appears after 600px of scroll) */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-xl bg-[#10121a]/90 hover:bg-[#171a25] text-[#ffb703] border border-white/10 hover:border-[#ffb703]/50 transition-all shadow-xl backdrop-blur-md group"
          aria-label="Back to top"
          title="Return to top of page"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Interactive AI Voice & Knowledge Assistant */}
      <AiVoiceAssistant />

      {/* Upgraded Semantic Footer */}
      <footer className="py-12 bg-[#07080d] border-t border-white/[0.08] text-xs font-mono text-[#9a9aa8] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            
            {/* Brand & Tagline */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#ffb703] via-[#ff6b35] to-[#ffb703] flex items-center justify-center font-mono font-black text-[#07080d] text-xs">
                  P
                </div>
                <span className="font-heading font-bold text-[#f4f1ea] text-sm">
                  Priyanraj J
                </span>
                <span className="text-[#6b6b7a]">•</span>
                <span className="text-[#ffb703]">Stark Protocol</span>
              </div>
              <p className="text-xs text-[#9a9aa8] max-w-md">
                AI and embedded-systems engineer building secure, intelligent systems.
              </p>
            </div>

            {/* Social Links Matrix */}
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#10121a] hover:bg-[#171a25] text-[#9a9aa8] hover:text-[#f4f1ea] border border-white/[0.08] hover:border-[#ffb703]/40 transition"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#10121a] hover:bg-[#171a25] text-[#9a9aa8] hover:text-[#f4f1ea] border border-white/[0.08] hover:border-[#ffb703]/40 transition"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.links.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#10121a] hover:bg-[#171a25] text-[#9a9aa8] hover:text-[#ffb703] border border-white/[0.08] hover:border-[#ffb703]/40 transition"
                aria-label="LeetCode Profile"
              >
                <Code2 className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#10121a] hover:bg-[#171a25] text-[#9a9aa8] hover:text-[#ff6b35] border border-white/[0.08] hover:border-[#ff6b35]/40 transition"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.links.email}`}
                className="p-2.5 rounded-xl bg-[#10121a] hover:bg-[#171a25] text-[#9a9aa8] hover:text-[#ffb703] border border-white/[0.08] hover:border-[#ffb703]/40 transition"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Copyright Sub-bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6b6b7a]">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#ffb703]" />
              <span>&copy; 2026 Priyanraj J. All Rights Reserved.</span>
            </div>

            <div>
              Engineered with React 19, TypeScript, Three.js & Tailwind CSS
            </div>

            <button
              onClick={scrollToTop}
              className="text-[#9a9aa8] hover:text-[#ffb703] flex items-center gap-1 transition"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;

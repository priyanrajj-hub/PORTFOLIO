import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveBannerCard } from './components/InteractiveBannerCard';
import { ExperienceSection } from './components/ExperienceSection';
import { MonthlyProgressTracker } from './components/MonthlyProgressTracker';
import { CompetitiveProfiles } from './components/CompetitiveProfiles';
import { ProjectsSection } from './components/ProjectsSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { EducationAndCertifications } from './components/EducationAndCertifications';
import { RoadmapAndSpecs } from './components/RoadmapAndSpecs';
import { ContactSection } from './components/ContactSection';
import { AiVoiceAssistant } from './components/AiVoiceAssistant';
import { Terminal, Shield, ArrowUp } from 'lucide-react';

export function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07080d] text-[#f4f1ea] selection:bg-amber-400 selection:text-black relative">
      
      {/* Stark Precision Grid Background Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 183, 3, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Primary Sticky Navbar with Scroll-spy */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        
        {/* Section 1: Hero, 3D Core & J.A.R.V.I.S. Mainframe */}
        <HeroSection />

        {/* Section 2: Interactive High-Res Brand Card */}
        <InteractiveBannerCard />

        {/* Section 3: Professional Experience (IEEE Webmaster, CodeAlpha) */}
        <ExperienceSection />

        {/* Section 4: Autonomous Monthly Progress Tracker (GitHub Live Telemetry) */}
        <MonthlyProgressTracker />

        {/* Section 5: Competitive Programming Hub (LeetCode, Codeforces, AtCoder, HackerRank) */}
        <CompetitiveProfiles />

        {/* Section 6: Categorized Projects Showcase (With Filter Tabs) */}
        <ProjectsSection />

        {/* Section 7: Cyber UNIX Mainframe Terminal */}
        <section id="terminal" className="py-20 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono mb-2 shadow-sm">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>INTERACTIVE CLI INTERFACE</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Mainframe <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">Shell Emulator</span>
              </h2>
              <p className="mt-2 text-xs md:text-sm text-[#9a9aa8]">
                Execute live system calls with command history, tab completion, and diagnostics.
              </p>
            </div>

            <InteractiveTerminal />
          </div>
        </section>

        {/* Section 8: Academic Foundation, Hackathons & All 11 Licenses */}
        <EducationAndCertifications />

        {/* Section 9: Execution Roadmap & Mainframe Specs */}
        <RoadmapAndSpecs />

        {/* Section 10: Contact & Direct Uplink */}
        <ContactSection />

      </main>

      {/* Interactive AI Voice & Knowledge Assistant */}
      <AiVoiceAssistant />

      {/* Footer */}
      <footer className="py-10 bg-[#07080d] border-t border-white/5 text-xs font-mono text-[#9a9aa8] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>&copy; 2026 Priyanraj J • Stark Mainframe Protocol • All Systems Nominal</span>
          </div>

          <div className="text-center md:text-right text-[#6b6b7a]">
            Engineered with React 19, TypeScript, Three.js & Tailwind CSS
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#141722] hover:bg-[#1c2030] text-[#f4f1ea] border border-white/10 hover:border-amber-400/40 transition shadow-md"
            title="Return to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </footer>

    </div>
  );
}

export default App;

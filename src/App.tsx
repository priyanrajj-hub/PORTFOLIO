import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveBannerCard } from './components/InteractiveBannerCard';
import { CompetitiveProfiles } from './components/CompetitiveProfiles';
import { ProjectsSection } from './components/ProjectsSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { EducationAndCertifications } from './components/EducationAndCertifications';
import { RoadmapAndSpecs } from './components/RoadmapAndSpecs';
import { ContactSection } from './components/ContactSection';
import { Terminal, Shield, ArrowUp } from 'lucide-react';

export function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950 relative">
      
      {/* Dynamic Grid Background Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(56, 189, 248, 0.25) 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Primary Fixed Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        
        {/* Section 1: 3D WebGL Hero & Multi-degree Identity */}
        <HeroSection />

        {/* Section 2: Interactive High-Res Brand Card (Replaces blurry image poster) */}
        <InteractiveBannerCard />

        {/* Section 3: Competitive Programming Hub (LeetCode, Codeforces, AtCoder, HackerRank) */}
        <CompetitiveProfiles />

        {/* Section 4: Projects Showcase (All 9+ real projects including Canopy, BLE, OS LinUCB) */}
        <ProjectsSection />

        {/* Section 5: Cyber UNIX Mainframe Terminal */}
        <section id="terminal" className="py-20 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>INTERACTIVE CLI INTERFACE</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Mainframe <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Shell Emulator</span>
              </h2>
              <p className="mt-2 text-xs md:text-sm text-gray-400">
                Execute live system calls to inspect engineering credentials, repositories, and hardware telemetry.
              </p>
            </div>

            <InteractiveTerminal />
          </div>
        </section>

        {/* Section 6: Academic Foundation & Certifications */}
        <EducationAndCertifications />

        {/* Section 7: Execution Roadmap & Mainframe Specs */}
        <RoadmapAndSpecs />

        {/* Section 8: Contact & Direct Uplink */}
        <ContactSection />

      </main>

      {/* Footer */}
      <footer className="py-10 bg-slate-950 border-t border-slate-900 text-xs font-mono text-gray-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-400" />
            <span>&copy; 2026 Priyanraj J • All Systems Nominal</span>
          </div>

          <div className="text-center md:text-right text-slate-500">
            Engineered with React 19, TypeScript, Three.js & Tailwind CSS
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-gray-300 hover:text-white border border-slate-800 transition"
            title="Return to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </footer>

    </div>
  );
}

export default App;

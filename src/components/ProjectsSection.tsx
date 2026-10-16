import React, { useState, useEffect, useRef } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowUpRight,
  Code2,
  X,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { PROJECTS_DATA, type ProjectItem } from '../data/projects';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Web' | 'AI / ML' | 'Systems' | 'Embedded / Hardware'>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const triggerCardRef = useRef<HTMLButtonElement | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  const categories = [
    { label: 'All', value: 'All', count: PROJECTS_DATA.length },
    { label: 'AI / ML', value: 'AI / ML', count: PROJECTS_DATA.filter(p => p.category === 'AI / ML').length },
    { label: 'Systems', value: 'Systems', count: PROJECTS_DATA.filter(p => p.category === 'Systems').length },
    { label: 'Embedded / Hardware', value: 'Embedded / Hardware', count: PROJECTS_DATA.filter(p => p.category === 'Embedded / Hardware').length },
    { label: 'Web', value: 'Web', count: PROJECTS_DATA.filter(p => p.category === 'Web').length },
  ] as const;

  const filteredProjects = filter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter((p) => p.category === filter);

  // Accessible ESC key listener and focus return
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';

      // Focus close button on open
      setTimeout(() => {
        modalCloseBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeModal();
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
  }, [selectedProject]);

  const openModal = (project: ProjectItem, el: HTMLButtonElement) => {
    triggerCardRef.current = el;
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
    // Return focus to the card that triggered the modal
    setTimeout(() => {
      triggerCardRef.current?.focus();
    }, 50);
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/25 text-[#ffb703] text-xs font-mono mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>ENGINEERED PLATFORMS & SYSTEMS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-[#f4f1ea]">
              Production <span className="bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#ffb703] bg-clip-text text-transparent">Systems & Projects</span>
            </h2>
            <p className="mt-3 text-[#9a9aa8] max-w-2xl text-sm md:text-base leading-relaxed">
              Real-world systems spanning AI process scheduling with LinUCB bandits, BLE proximity micro-beacons, and global satellite vegetation telemetry on Vercel. Click any card for detailed architectural specifications.
            </p>
          </div>

          {/* Category Filter Chips with 999px radius (Section 2 & 6) */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 flex-wrap" role="tablist" aria-label="Project Categories">
            {categories.map((cat) => (
              <button
                key={cat.value}
                role="tab"
                aria-selected={filter === cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  filter === cat.value
                    ? 'bg-[#ffb703] text-[#07080d] font-bold shadow-md shadow-[#ffb703]/25 scale-105'
                    : 'bg-[#10121a] text-[#9a9aa8] hover:text-[#f4f1ea] hover:bg-[#171a25] border border-white/[0.08]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                  filter === cat.value ? 'bg-[#07080d]/20 text-[#07080d]' : 'bg-white/10 text-[#9a9aa8]'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid: 12px radius, 1px line border, hover gold glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card group p-6 flex flex-col justify-between hover:border-[#ffb703]/40 transition-all duration-300"
            >
              <div>
                {/* Tag & Status Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-[#ffb703] tracking-wider uppercase font-semibold">
                    {project.tag}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#171a25] text-[#ffb703] border border-white/[0.08]">
                    {project.category}
                  </span>
                </div>

                {/* Card Title Trigger */}
                <button
                  type="button"
                  onClick={(e) => openModal(project, e.currentTarget)}
                  className="text-left w-full group/title focus:outline-none"
                  aria-haspopup="dialog"
                >
                  <h3 className="text-base font-heading font-bold text-[#f4f1ea] group-hover/title:text-[#ffb703] transition-colors flex items-center justify-between gap-2">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#9a9aa8] group-hover/title:text-[#ffb703] group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-transform shrink-0" />
                  </h3>
                </button>

                {/* One-line Outcome / Impact (Section 6) */}
                <p className="mt-2 text-xs font-medium text-[#f4f1ea]/85 leading-relaxed">
                  {project.outcome}
                </p>

                {/* Concise Description preview */}
                <p className="mt-2 text-xs text-[#9a9aa8] line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* 3-5 Tech Tag Chips */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#171a25] border border-white/[0.06] text-[#9a9aa8]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-[#9a9aa8]">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons: Live and Code (Only show if URL exists) */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-[#ffb703] hover:bg-[#ffc42e] text-[#07080d] text-xs font-bold font-mono flex items-center gap-1.5 transition shadow-sm"
                      title="Open Live Demonstration"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Live</span>
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-[#171a25] hover:bg-[#202535] text-[#f4f1ea] border border-white/[0.08] hover:border-[#ffb703]/30 text-xs font-mono flex items-center gap-1.5 transition"
                      title="View Source Code on GitHub"
                    >
                      <Code2 className="w-3 h-3 text-[#ffb703]" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => openModal(project, e.currentTarget)}
                  className="text-[11px] font-mono text-[#9a9aa8] hover:text-[#ffb703] transition underline underline-offset-4"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Repositories Callout */}
        <div className="mt-14 text-center">
          <a
            href="https://github.com/priyanrajj-hub?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#10121a] border border-white/[0.08] text-[#f4f1ea] hover:border-[#ffb703]/40 hover:bg-[#171a25] transition shadow-lg group font-mono text-xs"
          >
            <GithubIcon className="w-4 h-4 text-[#ffb703] group-hover:scale-110 transition-transform" />
            <span>View All Repositories on GitHub (@priyanrajj-hub)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#9a9aa8] group-hover:text-[#ffb703] transition-colors" />
          </a>
        </div>

      </div>

      {/* Accessible Project Detail Modal (Section 6) */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07080d]/85 backdrop-blur-md overflow-y-auto"
        >
          {/* Backdrop Click */}
          <div 
            className="fixed inset-0" 
            onClick={closeModal} 
            aria-hidden="true" 
          />

          {/* Modal Card */}
          <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#10121a] border border-white/[0.12] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto my-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-[#ffb703] uppercase font-semibold">
                    {selectedProject.tag}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#171a25] text-[#9a9aa8] border border-white/[0.06]">
                    {selectedProject.category}
                  </span>
                </div>
                <h3 id="project-modal-title" className="text-xl sm:text-2xl font-heading font-bold text-[#f4f1ea]">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-mono text-[#ffb703] mt-1">
                  Role: {selectedProject.role}
                </p>
              </div>

              <button
                ref={modalCloseBtnRef}
                onClick={closeModal}
                className="p-2 rounded-full bg-[#171a25] text-[#9a9aa8] hover:text-[#f4f1ea] hover:bg-white/10 transition shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 space-y-6">
              
              {/* Outcome Highlight */}
              <div className="p-4 rounded-xl bg-[#171a25]/80 border border-white/[0.06]">
                <span className="text-[11px] font-mono text-[#ffb703] block mb-1">Engineering Outcome</span>
                <p className="text-sm font-medium text-[#f4f1ea] leading-relaxed">
                  {selectedProject.outcome}
                </p>
              </div>

              {/* Full Description */}
              <div>
                <h4 className="text-xs font-mono text-[#9a9aa8] uppercase tracking-wider mb-2">
                  System Architecture & Description
                </h4>
                <p className="text-sm text-[#f4f1ea]/90 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Verified Metrics */}
              {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-[#9a9aa8] uppercase tracking-wider mb-2.5">
                    Engineering Benchmarks
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.metrics.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#07080d]/60 border border-white/[0.04] text-xs text-[#f4f1ea]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399] shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack List */}
              <div>
                <h4 className="text-xs font-mono text-[#9a9aa8] uppercase tracking-wider mb-2.5">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-[#171a25] border border-white/[0.08] text-[#f4f1ea]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#ffb703] hover:bg-[#ffc42e] text-[#07080d] text-xs font-bold font-mono flex items-center gap-1.5 transition shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Launch Live Demo</span>
                  </a>
                )}

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#171a25] hover:bg-[#202535] text-[#f4f1ea] border border-white/[0.1] text-xs font-mono flex items-center gap-1.5 transition"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-[#ffb703]" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-[#9a9aa8] hover:text-[#f4f1ea] text-xs font-mono transition"
              >
                Close (ESC)
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

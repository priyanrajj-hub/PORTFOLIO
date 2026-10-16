import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Code2
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { PROJECTS_DATA } from '../data/portfolioData';
import type { Project } from '../types';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const categories = [
    { label: 'All Projects', value: 'All', count: PROJECTS_DATA.length },
    { label: 'AI & Machine Learning', value: 'AI / ML', count: PROJECTS_DATA.filter(p => p.category === 'AI / ML').length },
    { label: 'Software Systems', value: 'Software Systems', count: PROJECTS_DATA.filter(p => p.category === 'Software Systems').length },
    { label: 'Embedded & IoT', value: 'Embedded / IoT', count: PROJECTS_DATA.filter(p => p.category === 'Embedded / IoT').length },
    { label: 'Data Structures', value: 'Data Structures', count: PROJECTS_DATA.filter(p => p.category === 'Data Structures').length },
  ];

  const filteredProjects = filter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono mb-3 shadow-sm">
              <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
              <span>PRODUCTION PLATFORMS & RESEARCH PAPERS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#f4f1ea]">
              Engineered <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">Systems & Projects</span>
            </h2>
            <p className="mt-3 text-[#9a9aa8] max-w-2xl text-sm md:text-base leading-relaxed">
              Real-world systems spanning AI process scheduling with LinUCB bandits, BLE proximity micro-beacons, global satellite vegetation telemetry on Vercel, and graph-theoretic link prediction.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                  filter === cat.value
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/25 scale-105'
                    : 'bg-[#141722] text-[#9a9aa8] hover:text-[#f4f1ea] hover:bg-[#1c2030] border border-white/8'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-1.5 px-1.5 py-0.2 rounded text-[10px] ${
                  filter === cat.value ? 'bg-slate-950/20 text-slate-950' : 'bg-white/10 text-[#9a9aa8]'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All Repositories Callout */}
        <div className="mt-14 text-center">
          <a
            href="https://github.com/priyanrajj-hub?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#141722] border border-white/10 text-[#f4f1ea] hover:border-amber-400/50 hover:bg-[#1c2030] transition shadow-xl group font-medium text-sm"
          >
            <GithubIcon className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Explore all 18+ Repositories on GitHub (priyanrajj-hub)</span>
            <ArrowUpRight className="w-4 h-4 text-[#9a9aa8] group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group relative rounded-2xl p-6 bg-[#10121a]/90 border border-white/10 hover:border-amber-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between backdrop-blur-sm">
      
      {/* Top Banner Tag & Status */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-full">
            {project.tag}
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-semibold ${
            project.status === 'Production'
              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40'
              : project.status === 'Prototype'
              ? 'bg-amber-950/80 text-amber-400 border border-amber-800/40'
              : 'bg-orange-950/80 text-orange-400 border border-orange-800/40'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#f4f1ea] group-hover:text-amber-300 transition-colors line-clamp-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-xs text-[#9a9aa8] leading-relaxed line-clamp-4">
          {project.description}
        </p>

        {/* Key Metrics / Highlights */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#f4f1ea]/90 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Tags & Action Buttons */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141722] text-[#9a9aa8] border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-[#6b6b7a] font-mono">
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 hover:bg-emerald-500/25 font-mono transition"
              >
                <Globe className="w-3 h-3" />
                <span>Live</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/40 text-xs text-[#f4f1ea] hover:text-amber-400 font-mono transition"
              >
                <Code2 className="w-3 h-3 text-amber-400" />
                <span>Code</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

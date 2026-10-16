import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowUpRight,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { PROJECTS_DATA } from '../data/portfolioData';
import type { Project } from '../types';


export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'AI / ML', 'Embedded / IoT', 'Software Systems', 'Data Structures'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>LIVE REPOSITORIES & RESEARCH SYSTEMS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Featured <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Engineering Projects</span>
            </h2>
            <p className="mt-3 text-gray-400 max-w-2xl text-sm md:text-base">
              Real-world systems spanning AI process scheduling with LinUCB bandits, BLE proximity micro-beacons, global satellite vegetation telemetry, and graph-theoretic link prediction.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/25 scale-105'
                    : 'bg-slate-900/80 text-gray-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
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
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-gray-200 hover:text-white hover:border-sky-500/50 hover:bg-slate-800/80 transition shadow-xl group font-medium text-sm"
          >
            <GithubIcon className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
            <span>Explore all 18+ Repositories on GitHub (priyanrajj-hub)</span>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group relative rounded-2xl p-6 bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col justify-between backdrop-blur-sm">
      
      {/* Top Banner Tag & Status */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/50 px-2.5 py-0.5 rounded-full">
            {project.tag}
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-semibold ${
            project.status === 'Production'
              ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/40'
              : project.status === 'Prototype'
              ? 'bg-amber-950/70 text-amber-400 border border-amber-800/40'
              : 'bg-purple-950/70 text-purple-400 border border-purple-800/40'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-xs text-gray-400 leading-relaxed line-clamp-4">
          {project.description}
        </p>

        {/* Key Metrics / Highlights */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-1.5">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Tags & Action Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-800/60">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/70 text-slate-300 border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-gray-500 font-mono">
            {project.category}
          </span>
          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-medium transition"
              >
                <span>Code</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};


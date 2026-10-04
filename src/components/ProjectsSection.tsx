import React, { useState } from 'react';
import { FolderGit2, Code2, CheckCircle2, Copy, Check, BarChart2 } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import { GithubIcon } from './Icons';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCodeProject, setSelectedCodeProject] = useState<Project | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'cicd', label: 'CI/CD & GitOps' },
    { id: 'iac', label: 'Terraform IaC' },
    { id: 'monitoring', label: 'Observability' },
    { id: 'ansible', label: 'Ansible & Linux' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="projects" className="py-20 bg-devops-dark relative border-t border-devops-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-devops-cyan/10 border border-devops-cyan/30 text-devops-cyan font-mono text-xs">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Hands-on Engineering Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="text-devops-cyan">DevOps Projects</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            Real-world cloud infrastructure, continuous deployment pipelines, and observability stacks built from scratch.
          </p>
        </div>

        {/* Filter Category Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-devops-cyan text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-devops-card text-gray-300 hover:bg-gray-800 border border-devops-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-devops-card rounded-xl border border-devops-border hover:border-devops-cyan/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="p-6 space-y-4">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-devops-cyan px-2.5 py-1 rounded bg-devops-cyan/10 border border-devops-cyan/30">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-devops-cyan transition-colors mt-2">
                      {project.title}
                    </h3>
                  </div>

                  {project.metrics && (
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] flex items-center gap-1.5 shrink-0">
                      <BarChart2 className="w-3.5 h-3.5" />
                      <span>{project.metrics}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm font-mono text-devops-cyan">{project.tagline}</p>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">{project.description}</p>

                {/* Key Features Bullet List */}
                <div className="space-y-1.5 pt-2">
                  <span className="font-mono text-[11px] text-gray-400 font-bold">Key Highlights:</span>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {project.keyFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-devops-cyan shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Badges */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 bg-gray-900/80 border-t border-gray-800 flex items-center justify-between font-mono text-xs">
                <button
                  onClick={() => setSelectedCodeProject(project)}
                  className="flex items-center gap-1.5 text-devops-cyan hover:text-cyan-300 transition-colors font-bold cursor-pointer"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Inspect Code ({project.codeSnippet.filename})</span>
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Repo</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Code Snippet Modal */}
        {selectedCodeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="w-full max-w-3xl bg-slate-950 border border-devops-cyan/50 rounded-xl shadow-2xl overflow-hidden text-left">
              
              <div className="px-4 py-3 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-gray-200 font-bold">
                  <Code2 className="w-4 h-4 text-devops-cyan" />
                  <span>{selectedCodeProject.codeSnippet.filename}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(selectedCodeProject.codeSnippet.code, selectedCodeProject.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 font-mono text-xs"
                  >
                    {copiedId === selectedCodeProject.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setSelectedCodeProject(null)}
                    className="px-2.5 py-1 rounded bg-gray-800 text-gray-400 hover:text-white font-mono text-xs"
                  >
                    Close ✕
                  </button>
                </div>
              </div>

              <div className="p-4 max-h-[70vh] overflow-y-auto font-mono text-xs text-gray-200 bg-slate-950 leading-relaxed">
                <pre>
                  <code>{selectedCodeProject.codeSnippet.code}</code>
                </pre>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

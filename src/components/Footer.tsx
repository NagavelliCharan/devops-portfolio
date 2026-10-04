import React from 'react';
import { Terminal, Mail, ArrowUp, GitCommit } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 border-t border-devops-border py-12 text-left font-mono text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-900">
          
          {/* Logo & Tagline */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-8 h-8 rounded bg-devops-cyan/10 border border-devops-cyan/40 flex items-center justify-center text-devops-cyan">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base">
                alex<span className="text-devops-cyan">.devops</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs font-sans max-w-md">
              Fresher DevOps Engineer • Docker • Kubernetes • Terraform • AWS • GitOps CI/CD
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-blue-400 border border-gray-800 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-devops-cyan border border-gray-800 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-devops-cyan/10 hover:bg-devops-cyan/20 text-devops-cyan border border-devops-cyan/30 transition-colors cursor-pointer ml-2"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Footer Meta & Git Hash */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Cluster Uptime: 99.98%
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-gray-400">
              <GitCommit className="w-3 h-3 text-devops-cyan" />
              commit: a3f92b7 (main)
            </span>
          </div>

          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, Vite & Tailwind CSS.
          </div>
        </div>

      </div>
    </footer>
  );
};

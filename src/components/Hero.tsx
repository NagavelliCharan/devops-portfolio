import React from 'react';
import { Terminal, Play, ShieldCheck, Cpu, ArrowRight, GitBranch, Layers, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onRunPipeline: () => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRunPipeline, onOpenTerminal }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-devops-cyan/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-devops-card border border-devops-cyan/30 text-devops-cyan font-mono text-xs shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="w-2.5 h-2.5 rounded-full bg-devops-cyan animate-pulse"></span>
              <span>Available for Hire • Junior / Fresher DevOps Engineer</span>
            </div>

            {/* Main Title & Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
                Automating <span className="text-transparent bg-clip-text bg-gradient-to-r from-devops-cyan via-blue-400 to-indigo-400">Cloud Infra</span> & Deployments
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 font-mono font-medium">
                {PERSONAL_INFO.name} — <span className="text-devops-cyan">{PERSONAL_INFO.title}</span>
              </p>
            </div>

            {/* Value Proposition */}
            <p className="text-base text-gray-400 max-w-2xl leading-relaxed">
              Passionate CS graduate with hands-on labs in <strong className="text-gray-200">Docker</strong>, <strong className="text-gray-200">Kubernetes</strong>, <strong className="text-gray-200">Terraform</strong>, <strong className="text-gray-200">AWS</strong>, and <strong className="text-gray-200">GitOps CI/CD</strong>. 
              I design reproducible, resilient cloud infrastructure with zero-downtime automated deployment pipelines.
            </p>

            {/* Key Skill Badges Pills */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              {[
                'AWS Cloud', 'Kubernetes (EKS)', 'Terraform IaC', 'Docker & Helm', 
                'GitHub Actions', 'Prometheus & Grafana', 'ArgoCD GitOps', 'Linux Shell'
              ].map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-gray-900/80 border border-gray-800 text-gray-300 flex items-center gap-1 hover:border-devops-cyan/40 transition-colors">
                  <CheckCircle2 className="w-3 h-3 text-devops-cyan" />
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
              <button
                onClick={onRunPipeline}
                className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-devops-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Simulate CI/CD Pipeline</span>
              </button>

              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-2 px-5 py-3.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-devops-cyan border border-devops-cyan/40 hover:border-devops-cyan font-bold transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch Interactive CLI</span>
              </button>

              <a
                href="#projects"
                className="flex items-center gap-1.5 px-4 py-3.5 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-800/80">
              {PERSONAL_INFO.stats.map((stat, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-900/40 border border-gray-800">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-devops-cyan">{stat.value}</div>
                  <div className="text-[11px] text-gray-400 font-sans mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Hero Visual Card (Simulated Kubernetes Cluster & Terminal Window) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl bg-devops-dark border border-devops-border shadow-2xl shadow-cyan-950/20 overflow-hidden">
              
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-900/90 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-2 font-mono text-xs text-gray-400">kubectl get nodes -o wide</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  AWS EKS v1.28
                </div>
              </div>

              {/* Window Content */}
              <div className="p-4 font-mono text-xs space-y-3 bg-slate-950/80 text-left">
                
                {/* Cluster Command Output */}
                <div className="text-gray-400">
                  <span className="text-devops-cyan">fresher@eks-cluster:~$</span> kubectl get pods -n production
                </div>

                <div className="bg-gray-950 p-3 rounded border border-gray-800/80 text-[11px] space-y-1 overflow-x-auto text-gray-300">
                  <div className="text-gray-500 font-bold border-b border-gray-800 pb-1 flex justify-between">
                    <span>NAME</span>
                    <span>READY</span>
                    <span>STATUS</span>
                    <span>RESTARTS</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>web-api-7b89f6d4-x29</span>
                    <span>1/1</span>
                    <span>Running</span>
                    <span>0</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>argocd-server-9f4a1-m8l</span>
                    <span>1/1</span>
                    <span>Running</span>
                    <span>0</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>prometheus-k8s-0</span>
                    <span>2/2</span>
                    <span>Running</span>
                    <span>0</span>
                  </div>
                  <div className="flex justify-between text-devops-cyan">
                    <span>terraform-state-lock</span>
                    <span>1/1</span>
                    <span>Synced</span>
                    <span>0</span>
                  </div>
                </div>

                {/* Live Pipeline Teaser Card */}
                <div className="p-3 rounded bg-devops-cyan/5 border border-devops-cyan/20 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-devops-cyan font-bold flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5" />
                      Latest GitOps Release
                    </span>
                    <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      SUCCESS
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-sans">
                    Build #142 • Main Branch • Automated Helm Rollout on AWS EKS
                  </p>
                  
                  {/* Interactive Button */}
                  <button
                    onClick={onRunPipeline}
                    className="w-full py-1.5 rounded bg-devops-cyan/20 hover:bg-devops-cyan/30 border border-devops-cyan/40 text-devops-cyan text-center font-mono text-[11px] transition-all cursor-pointer"
                  >
                    ▶ Click to Run Simulated Deployment
                  </button>
                </div>

                {/* Floating Tech Badges */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-800/80 text-[11px] text-gray-400 font-mono">
                  <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-devops-cyan" /> CPU: 12%</span>
                  <span className="flex items-center gap-1"><Layers className="w-3 h-3 text-blue-400" /> RAM: 1.4GB</span>
                  <span className="flex items-center gap-1 text-emerald-400"><ShieldCheck className="w-3 h-3" /> Trivy: 0 Vulns</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

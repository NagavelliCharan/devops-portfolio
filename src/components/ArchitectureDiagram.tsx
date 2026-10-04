import React, { useState } from 'react';
import { Layers, Cloud, Database, Cpu, ShieldCheck, Activity, Code2, Copy, Check, Info } from 'lucide-react';
import { ARCHITECTURE_NODES } from '../data/portfolioData';
import type { ArchitectureNode } from '../types';

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(ARCHITECTURE_NODES[2]); // Default EKS Pods
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getNodeIcon = (id: string) => {
    switch (id) {
      case 'internet-gateway': return Cloud;
      case 'ingress-controller': return Cpu;
      case 'web-pods': return Layers;
      case 'rds-database': return Database;
      case 'prometheus-monitoring': return Activity;
      case 'argocd-gitops': return ShieldCheck;
      default: return Code2;
    }
  };

  return (
    <section id="architecture" className="py-20 bg-devops-dark relative border-t border-devops-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-devops-cyan/10 border border-devops-cyan/30 text-devops-cyan font-mono text-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Infrastructure Topology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AWS EKS <span className="text-devops-cyan">Cloud Architecture</span> Explorer
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            Click any node in the topology map below to inspect production HCL & YAML configuration files.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Visual Interactive Topology Node Map */}
          <div className="lg:col-span-6 bg-devops-card p-6 rounded-xl border border-devops-border shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="font-mono text-xs text-gray-300 font-bold flex items-center gap-2">
                <Info className="w-4 h-4 text-devops-cyan" />
                Select Node to Inspect Config
              </span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/30">
                AWS us-east-1 VPC
              </span>
            </div>

            {/* Architecture Node Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ARCHITECTURE_NODES.map((node) => {
                const Icon = getNodeIcon(node.id);
                const isSelected = selectedNode.id === node.id;

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-4 rounded-xl border transition-all text-left flex flex-col justify-between space-y-3 cursor-pointer group ${
                      isSelected
                        ? 'bg-devops-cyan/15 border-devops-cyan ring-1 ring-devops-cyan shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                        : 'bg-gray-900/80 border-gray-800 hover:border-devops-cyan/50 hover:bg-gray-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-devops-cyan text-slate-950 border-devops-cyan'
                          : 'bg-gray-800 text-devops-cyan border-gray-700 group-hover:border-devops-cyan'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] uppercase text-gray-400 px-2 py-0.5 rounded bg-gray-800 border border-gray-700">
                        {node.category}
                      </span>
                    </div>

                    <div>
                      <h4 className={`font-mono text-xs font-bold ${isSelected ? 'text-devops-cyan' : 'text-gray-200'}`}>
                        {node.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-sans mt-0.5 line-clamp-1">
                        {node.tech}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-800/60 flex items-center justify-between text-[10px] font-mono text-gray-400">
                      <span>Click to view IaC</span>
                      <span className={`${isSelected ? 'text-devops-cyan font-bold' : 'text-gray-500'}`}>
                        {isSelected ? 'ACTIVE' : 'INSPECT'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Architecture Connections Teaser */}
            <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800 text-xs font-mono text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-devops-cyan animate-pulse"></span>
              <span>All resources provisioned using modular Terraform HCL scripts.</span>
            </div>
          </div>

          {/* Right Node Configuration Inspector & Code Viewer */}
          <div className="lg:col-span-6 bg-slate-950 rounded-xl border border-devops-border shadow-2xl overflow-hidden flex flex-col text-left">
            
            {/* Inspector Header */}
            <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] uppercase text-devops-cyan font-bold">
                  {selectedNode.category} Node Inspector
                </span>
                <h3 className="font-mono text-sm font-bold text-white">{selectedNode.title}</h3>
              </div>
              <div className="font-mono text-xs text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-500/30">
                {selectedNode.tech}
              </div>
            </div>

            {/* Node Explanation */}
            <div className="p-4 space-y-3 border-b border-gray-800/80 bg-gray-950 text-xs">
              <p className="text-gray-300 leading-relaxed font-sans">{selectedNode.description}</p>
            </div>

            {/* Code Snippet Viewer Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900/90 border-b border-gray-800">
              <span className="font-mono text-xs text-gray-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-devops-cyan" />
                Config Snippet ({selectedNode.snippetLanguage.toUpperCase()})
              </span>
              <button
                onClick={() => handleCopyCode(selectedNode.codeSnippet)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 font-mono text-[11px] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-gray-400" />
                    <span>Copy Config</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Snippet Box */}
            <div className="flex-1 p-4 bg-slate-950 overflow-x-auto font-mono text-xs text-gray-200 leading-relaxed">
              <pre>
                <code>{selectedNode.codeSnippet}</code>
              </pre>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

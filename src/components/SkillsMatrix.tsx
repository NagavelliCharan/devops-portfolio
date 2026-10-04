import React, { useState } from 'react';
import { Cpu, Cloud, Boxes, GitBranch, ShieldCheck, Terminal, Lightbulb } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(SKILL_CATEGORIES[0].id);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud': return Cloud;
      case 'Boxes': return Boxes;
      case 'GitBranch': return GitBranch;
      case 'ShieldCheck': return ShieldCheck;
      case 'Terminal': return Terminal;
      default: return Cpu;
    }
  };

  const currentCategoryData = SKILL_CATEGORIES.find(c => c.id === selectedCategory) || SKILL_CATEGORIES[0];

  return (
    <section id="skills" className="py-20 bg-devops-dark relative border-t border-devops-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-devops-cyan/10 border border-devops-cyan/30 text-devops-cyan font-mono text-xs">
            <Cpu className="w-3.5 h-3.5" />
            <span>DevOps Competency Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Toolchain & <span className="text-devops-cyan">Hands-on Skills</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            Categorized technical stack with practical lab verification evidence for entry-level engineering roles.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-devops-cyan text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-devops-card text-gray-300 hover:bg-gray-800 border border-devops-border'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {currentCategoryData.skills.map((skill, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-devops-card border border-devops-border hover:border-devops-cyan/40 transition-all duration-300 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-base font-bold text-white">{skill.name}</h3>
                  {skill.isPrimary && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-devops-cyan/10 text-devops-cyan border border-devops-cyan/30">
                      PRIMARY
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs font-bold text-devops-cyan">{skill.level}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-800">
                <div
                  className="bg-gradient-to-r from-devops-cyan to-blue-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {/* Lab Evidence Note */}
              {skill.labEvidence && (
                <div className="pt-2 border-t border-gray-800/80">
                  <div className="flex items-start gap-2 text-xs text-gray-300 bg-gray-900/60 p-2.5 rounded border border-gray-800">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[11px] font-bold text-amber-400 block">Practical Lab Verification:</span>
                      <p className="font-sans text-[11px] text-gray-300">{skill.labEvidence}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

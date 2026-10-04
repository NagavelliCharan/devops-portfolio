import React from 'react';
import { GraduationCap, Briefcase, Trophy, CheckCircle2, Calendar } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'education': return GraduationCap;
      case 'internship': return Briefcase;
      case 'hackathon': return Trophy;
      default: return Briefcase;
    }
  };

  return (
    <section id="experience" className="py-20 bg-devops-dark relative border-t border-devops-border text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-devops-cyan/10 border border-devops-cyan/30 text-devops-cyan font-mono text-xs">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Background & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & <span className="text-devops-cyan">Experience Journey</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            Academic achievements, DevOps internship contributions, and hackathon wins.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-devops-cyan before:via-blue-500 before:to-gray-800">
          {EXPERIENCES.map((exp) => {
            const Icon = getIcon(exp.type);

            return (
              <div
                key={exp.id}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Timeline Icon Node */}
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-950 border-2 border-devops-cyan text-devops-cyan shrink-0 z-10 sm:mx-auto shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content Box */}
                <div className="w-[calc(100%-3rem)] sm:w-[calc(50%-2.5rem)] bg-devops-card p-6 rounded-xl border border-devops-border hover:border-devops-cyan/50 transition-all duration-300 shadow-xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-2">
                    <span className="font-mono text-xs font-bold text-devops-cyan uppercase">
                      {exp.type}
                    </span>
                    <span className="font-mono text-[11px] text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-devops-cyan" />
                      {exp.period}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-mono">{exp.title}</h3>
                    <p className="text-xs text-emerald-400 font-mono font-medium">{exp.organization}</p>
                  </div>

                  <ul className="space-y-1.5 text-xs text-gray-300 font-sans">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-devops-cyan shrink-0 mt-0.5" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[10px]">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

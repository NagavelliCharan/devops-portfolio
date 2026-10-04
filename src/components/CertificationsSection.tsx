import React from 'react';
import { ShieldCheck, Cloud, Cpu, Container, CheckCircle2, Award } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud': return Cloud;
      case 'Cpu': return Cpu;
      case 'Container': return Container;
      default: return ShieldCheck;
    }
  };

  return (
    <section id="certifications" className="py-20 bg-devops-dark relative border-t border-devops-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-devops-cyan/10 border border-devops-cyan/30 text-devops-cyan font-mono text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industry <span className="text-devops-cyan">Certifications</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            Formal cloud and infrastructure credentials validating core competencies.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {CERTIFICATIONS.map((cert) => {
            const Icon = getIcon(cert.icon);

            return (
              <div
                key={cert.id}
                className="p-6 rounded-xl bg-devops-card border border-devops-border hover:border-devops-cyan/50 transition-all duration-300 shadow-xl space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-devops-cyan/10 border border-devops-cyan/30 flex items-center justify-center text-devops-cyan group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                      VERIFIED
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-mono group-hover:text-devops-cyan transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-sans mt-0.5">{cert.issuer}</p>
                  </div>

                  {/* Skills Tested */}
                  <div className="space-y-1.5 pt-2">
                    <span className="font-mono text-[11px] text-gray-400 font-bold block">Verified Competencies:</span>
                    <ul className="space-y-1 text-xs text-gray-300">
                      {cert.skillsVerified.map((skill, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-devops-cyan shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800 flex items-center justify-between font-mono text-[11px] text-gray-400">
                  <span>Issued: {cert.issueDate}</span>
                  <span className="text-devops-cyan font-bold">{cert.credentialId}</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

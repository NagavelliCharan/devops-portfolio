import React, { useState } from 'react';
import { Mail, Send, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [webhookLog, setWebhookLog] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setWebhookLog(`[WEBHOOK] POST /api/v1/recruiter-contact HTTP/1.1\nHeaders: Content-Type: application/json\nBody: {\n  "name": "${formData.name}",\n  "email": "${formData.email}",\n  "company": "${formData.company || 'N/A'}"\n}`);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#06B6D4', '#10B981']
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-devops-dark relative border-t border-devops-border text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-devops-cyan/10 border border-devops-cyan/30 text-devops-cyan font-mono text-xs">
            <Mail className="w-3.5 h-3.5" />
            <span>Recruiter & Hiring Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build <span className="text-devops-cyan">Reliable Cloud Systems</span> Together
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            Actively open to Junior DevOps Engineer, Cloud Engineer, and SRE Entry-Level Opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info & Direct Links */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-devops-card p-6 rounded-xl border border-devops-border space-y-6 shadow-xl">
              <div>
                <span className="font-mono text-xs text-devops-cyan font-bold uppercase">Direct Contact Info</span>
                <h3 className="text-xl font-bold text-white mt-1">Get In Touch Directly</h3>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-900 border border-gray-800 hover:border-devops-cyan/50 text-gray-200 hover:text-devops-cyan transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-devops-cyan/10 flex items-center justify-center text-devops-cyan shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Email Address</span>
                    <span className="font-bold text-sm">{PERSONAL_INFO.email}</span>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-900 border border-gray-800 hover:border-blue-500/50 text-gray-200 hover:text-blue-400 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">LinkedIn Profile</span>
                    <span className="font-bold text-sm">linkedin.com/in/alexrivera-devops</span>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-500 text-gray-200 hover:text-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-300 shrink-0">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">GitHub Repositories</span>
                    <span className="font-bold text-sm">github.com/alexrivera-devops</span>
                  </div>
                </a>
              </div>

              {/* Resume PDF Download Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-devops-cyan/15 to-blue-600/15 border border-devops-cyan/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
                    <FileText className="w-4 h-4 text-devops-cyan" />
                    <span>Alex_Rivera_DevOps_Resume.pdf</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    UPDATED 2026
                  </span>
                </div>
                <p className="text-xs text-gray-300 font-sans">
                  Includes full education, AWS/Terraform lab projects, and GitHub repository links.
                </p>
                <button
                  onClick={() => {
                    confetti({ particleCount: 40, spread: 50 });
                    alert("Simulated Resume Download: In production, this links directly to your hosted resume.pdf file!");
                  }}
                  className="w-full py-2.5 rounded-lg bg-devops-cyan hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                >
                  📄 Download PDF Resume
                </button>
              </div>

            </div>

          </div>

          {/* Right Contact Form & Simulated Webhook Output */}
          <div className="lg:col-span-7 bg-devops-card p-6 rounded-xl border border-devops-border shadow-xl space-y-6">
            
            <div className="space-y-1">
              <span className="font-mono text-xs text-devops-cyan font-bold uppercase">Send Message / Schedule Interview</span>
              <h3 className="text-xl font-bold text-white">Interactive Webhook Contact Form</h3>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1 font-mono">
                  <h4 className="text-lg font-bold text-white">HTTP 201 CREATED — Message Received!</h4>
                  <p className="text-xs text-gray-300 font-sans">
                    Thank you, <strong className="text-emerald-400">{formData.name}</strong>! Your message was delivered to Alex's inbox webhook listener. Expect a response within 24 hours.
                  </p>
                </div>
                
                {webhookLog && (
                  <div className="p-3 bg-slate-950 rounded border border-gray-800 text-[11px] font-mono text-emerald-400 text-left overflow-x-auto">
                    <pre>{webhookLog}</pre>
                  </div>
                )}

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', company: '', message: '' });
                  }}
                  className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 font-mono text-xs cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins (Engineering Manager)"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-800 focus:border-devops-cyan outline-none text-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@techcompany.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-800 focus:border-devops-cyan outline-none text-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300">Company / Team (Optional)</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Cloud Solutions Inc."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-800 focus:border-devops-cyan outline-none text-white transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300">Message / Job Description *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Alex, we are looking for a Junior DevOps Engineer with Docker & AWS skills..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-800 focus:border-devops-cyan outline-none text-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-devops-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer ${
                    isSubmitting ? 'opacity-50 cursor-wait' : ''
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Dispatching Webhook...' : 'Dispatch Message Payload'}</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

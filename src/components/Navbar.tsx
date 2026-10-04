import React, { useState, useEffect } from 'react';
import { Terminal, Play, ShieldCheck, Cpu, FolderGit2, Mail, Menu, X, Layers, Activity } from 'lucide-react';

interface NavbarProps {
  onRunPipeline: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRunPipeline, onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'pipeline', 'projects', 'architecture', 'skills', 'certifications', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'pipeline', label: 'CI/CD Pipeline', icon: Play },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'skills', label: 'Skills & Tools', icon: Cpu },
    { id: 'certifications', label: 'Certifications', icon: ShieldCheck },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-devops-dark/90 backdrop-blur-md border-b border-devops-border shadow-xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-devops-cyan/10 border border-devops-cyan/40 flex items-center justify-center text-devops-cyan group-hover:border-devops-cyan group-hover:scale-105 transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
              <Terminal className="w-5 h-5 text-devops-cyan group-hover:rotate-6 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-white text-base tracking-tight">
                  alex<span className="text-devops-cyan">.devops</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  FRESHER
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono hidden sm:block">
                AWS • Kubernetes • Terraform
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-devops-cyan bg-devops-cyan/10 border border-devops-cyan/30 shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-devops-cyan' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Simulated Cluster Status Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-mono text-xs shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <Activity className="w-3.5 h-3.5" />
              <span>EKS Cluster: 100%</span>
            </div>

            {/* Launch Terminal CLI Button */}
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 font-mono text-xs transition-all cursor-pointer shadow-sm active:scale-95"
              title="Open Interactive Linux Terminal CLI"
            >
              <Terminal className="w-3.5 h-3.5 text-devops-cyan" />
              <span>CLI Shell</span>
            </button>

            {/* Quick Trigger CI/CD Pipeline Button */}
            <button
              onClick={onRunPipeline}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-devops-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] transition-all cursor-pointer active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Deploy App</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-md bg-gray-800 text-devops-cyan border border-gray-700 font-mono text-xs"
              title="Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-gray-800 text-gray-300 hover:text-white border border-gray-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-devops-dark/95 border-b border-devops-border backdrop-blur-xl px-4 pt-3 pb-6 mt-3 font-mono space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:text-white hover:bg-gray-800/80 border border-transparent hover:border-gray-700 text-sm"
              >
                <Icon className="w-4 h-4 text-devops-cyan" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-gray-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRunPipeline();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-devops-cyan text-slate-950 font-bold text-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Simulate CI/CD Deployment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

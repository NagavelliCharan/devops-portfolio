import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PipelineSimulator } from './components/PipelineSimulator';
import { Terminal } from './components/Terminal';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ClusterHealthWidget } from './components/ClusterHealthWidget';
import { CertificationsSection } from './components/CertificationsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const scrollToPipeline = () => {
    const el = document.getElementById('pipeline');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-devops-dark text-gray-100 font-sans selection:bg-devops-cyan selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar
        onRunPipeline={scrollToPipeline}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onRunPipeline={scrollToPipeline}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        <ClusterHealthWidget />

        <PipelineSimulator />

        <ProjectsSection />

        <ArchitectureDiagram />

        <SkillsMatrix />

        <CertificationsSection />

        <ExperienceTimeline />

        <ContactSection />
      </main>

      {/* Interactive CLI Terminal Modal */}
      <Terminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, CERTIFICATIONS } from '../data/portfolioData';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (history.length === 0) {
        runCommand('help');
      }
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setCommandList(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (trimmed.toLowerCase()) {
      case 'help':
        output = (
          <div className="space-y-2 text-gray-300">
            <p className="text-devops-cyan font-bold">🚀 Available DevOps CLI Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div><span className="text-emerald-400 font-bold">about</span> - Background & bio summary</div>
              <div><span className="text-emerald-400 font-bold">skills</span> - DevOps toolchain & proficiency</div>
              <div><span className="text-emerald-400 font-bold">projects</span> - View featured DevOps projects</div>
              <div><span className="text-emerald-400 font-bold">kubectl get pods</span> - Check simulated K8s pods</div>
              <div><span className="text-emerald-400 font-bold">terraform plan</span> - Run IaC dry-run check</div>
              <div><span className="text-emerald-400 font-bold">docker ps</span> - View running container stats</div>
              <div><span className="text-emerald-400 font-bold">certifications</span> - AWS & Terraform badges</div>
              <div><span className="text-emerald-400 font-bold">cat resume</span> - Print plaintext resume</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - Email & social profiles</div>
              <div><span className="text-emerald-400 font-bold">sudo hire-me</span> - 🔥 Secret Easter Egg!</div>
              <div><span className="text-emerald-400 font-bold">clear</span> - Clear terminal history</div>
            </div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-2 text-gray-300">
            <p className="text-devops-cyan font-bold">{PERSONAL_INFO.name} — {PERSONAL_INFO.title}</p>
            <p>{PERSONAL_INFO.summary}</p>
            <p className="text-emerald-400 font-mono text-xs">Status: {PERSONAL_INFO.status}</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-3">
            <p className="text-devops-cyan font-bold">Technical Skills Breakdown:</p>
            {SKILL_CATEGORIES.map(cat => (
              <div key={cat.id} className="space-y-1">
                <span className="text-amber-400 font-bold text-xs">{cat.name}:</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {cat.skills.map(s => (
                    <span key={s.name} className="px-2 py-0.5 rounded bg-gray-800 text-gray-200 border border-gray-700">
                      {s.name} ({s.level}%)
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2">
            <p className="text-devops-cyan font-bold">Featured Projects:</p>
            {PROJECTS.map((p, idx) => (
              <div key={p.id} className="p-2 rounded bg-gray-900 border border-gray-800 text-xs space-y-1">
                <div className="flex justify-between font-bold text-emerald-400">
                  <span>{idx + 1}. {p.title}</span>
                  <span className="text-gray-500">{p.category.toUpperCase()}</span>
                </div>
                <p className="text-gray-300">{p.tagline}</p>
                <p className="text-devops-cyan">Stack: {p.techStack.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'kubectl get pods':
      case 'kubectl get pods -n production':
        output = (
          <div className="font-mono text-xs space-y-1 text-gray-300">
            <div className="text-gray-500 font-bold border-b border-gray-800 pb-1 flex justify-between">
              <span>NAME</span>
              <span>READY</span>
              <span>STATUS</span>
              <span>RESTARTS</span>
              <span>AGE</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>api-gateway-v1-7d9f8-x01</span>
              <span>1/1</span>
              <span>Running</span>
              <span>0</span>
              <span>4d12h</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>argocd-server-5c4b8-z99</span>
              <span>1/1</span>
              <span>Running</span>
              <span>0</span>
              <span>12d</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>prometheus-k8s-0</span>
              <span>2/2</span>
              <span>Running</span>
              <span>0</span>
              <span>14d</span>
            </div>
            <div className="flex justify-between text-devops-cyan">
              <span>grafana-dashboard-7b2</span>
              <span>1/1</span>
              <span>Running</span>
              <span>0</span>
              <span>14d</span>
            </div>
          </div>
        );
        break;

      case 'terraform plan':
        output = (
          <div className="font-mono text-xs space-y-1 text-gray-300 bg-gray-950 p-2 rounded border border-gray-800">
            <p className="text-devops-cyan">Terraform used the selected providers to generate the following execution plan:</p>
            <p className="text-emerald-400">+ module.vpc.aws_subnet.private[0] will be created</p>
            <p className="text-emerald-400">+ module.eks.aws_eks_cluster.main will be created</p>
            <p className="text-emerald-400">+ aws_security_group_rule.allow_k8s_ingress will be created</p>
            <p className="text-amber-400 font-bold mt-2">Plan: 3 to add, 0 to change, 0 to destroy.</p>
          </div>
        );
        break;

      case 'docker ps':
        output = (
          <div className="font-mono text-xs space-y-1 text-gray-300">
            <div className="text-gray-500 font-bold border-b border-gray-800 pb-1 flex justify-between">
              <span>CONTAINER ID</span>
              <span>IMAGE</span>
              <span>PORTS</span>
              <span>STATUS</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>a890f12c4b5e</span>
              <span>nginx:alpine</span>
              <span>0.0.0.0:80-&gt;80/tcp</span>
              <span>Up 48 hours</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>c3411b98a002</span>
              <span>prom/prometheus:latest</span>
              <span>0.0.0.0:9090-&gt;9090/tcp</span>
              <span>Up 5 days</span>
            </div>
          </div>
        );
        break;

      case 'certifications':
        output = (
          <div className="space-y-2">
            <p className="text-devops-cyan font-bold">Verified Certifications:</p>
            {CERTIFICATIONS.map(c => (
              <div key={c.id} className="p-2 rounded bg-gray-900 border border-gray-800 text-xs flex justify-between items-center">
                <div>
                  <span className="font-bold text-emerald-400">{c.title}</span> ({c.issuer})
                  <div className="text-gray-400 text-[11px]">ID: {c.credentialId} • Issued {c.issueDate}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px]">
                  VERIFIED
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'cat resume':
      case 'cat resume.txt':
        output = (
          <div className="font-mono text-xs text-gray-300 space-y-2 bg-gray-950 p-3 rounded border border-gray-800">
            <p className="text-devops-cyan font-bold">=== ALEX RIVERA | DEVOPS ENGINEER RESUME ===</p>
            <p>Education: B.Tech in CS & Engineering (2020-2024)</p>
            <p>Core Focus: Docker, K8s, Terraform, AWS, CI/CD, Prometheus, Bash</p>
            <p>Experience: DevOps Intern @ CloudScale Inc (Migrated 12+ GitHub Actions pipelines)</p>
            <p>GitHub: {PERSONAL_INFO.github}</p>
            <p>Email: {PERSONAL_INFO.email}</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-devops-cyan font-bold">Get in touch:</p>
            <p>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-400 underline">{PERSONAL_INFO.email}</a></p>
            <p>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-devops-cyan underline">{PERSONAL_INFO.github}</a></p>
            <p>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">{PERSONAL_INFO.linkedin}</a></p>
          </div>
        );
        break;

      case 'sudo hire-me':
      case 'hire-me':
      case 'hire':
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#06B6D4', '#10B981', '#F59E0B']
        });
        output = (
          <div className="p-4 rounded-lg bg-gradient-to-r from-devops-cyan/20 to-blue-600/20 border border-devops-cyan text-gray-200 space-y-2 animate-pulse">
            <p className="text-devops-cyan font-bold text-sm flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              🎉 CONGRATULATIONS! YOU UNLOCKED THE DEVOPS OFFER LETTER!
            </p>
            <p className="text-xs">
              Thank you for exploring my terminal portfolio! I am ready to bring infrastructure automation, CI/CD reliability, and container orchestration excellence to your engineering team.
            </p>
            <div className="pt-1">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Job%20Opportunity%20-%20DevOps%20Engineer&body=Hi%20Alex,%20we%20reviewed%20your%20portfolio%20and%20would%20love%20to%20talk!`}
                className="inline-block px-4 py-2 rounded bg-devops-cyan text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
              >
                Send Offer / Schedule Interview Call 📩
              </a>
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <div className="text-red-400 font-mono text-xs">
            Command not recognized: '{trimmed}'. Type <span className="text-emerald-400 underline">help</span> for list of commands.
          </div>
        );
        break;
    }

    setHistory(prev => [...prev, { command: trimmed, output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length > 0) {
        const nextIdx = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInput(commandList[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= commandList.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(nextIdx);
          setInput(commandList[nextIdx]);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div
        className={`w-full bg-slate-950 border border-devops-cyan/40 rounded-xl shadow-2xl flex flex-col transition-all duration-300 overflow-hidden text-left ${
          isExpanded ? 'h-[92vh] max-w-6xl' : 'h-[600px] max-w-3xl'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} title="Close" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-xs text-gray-300 flex items-center gap-1.5">
              <TerminalIcon className="w-4 h-4 text-devops-cyan" />
              fresher@devops-cluster:~$
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-800"
              title={isExpanded ? 'Restore' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-800"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Chips */}
        <div className="px-4 py-2 bg-gray-900/60 border-b border-gray-800/80 flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
          <span className="text-gray-400">Quick Commands:</span>
          {['help', 'skills', 'projects', 'kubectl get pods', 'terraform plan', 'sudo hire-me'].map(cmd => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              className="px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-devops-cyan border border-gray-700 transition-colors cursor-pointer shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Body Output */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-4 bg-slate-950 text-gray-200">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 text-devops-cyan">
                <span>fresher@devops-cluster:~$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-devops-cyan pt-2">
            <span>fresher@devops-cluster:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs caret-devops-cyan"
              placeholder="Type command here (e.g. 'help', 'sudo hire-me')..."
              autoFocus
            />
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-2 bg-gray-900/80 border-t border-gray-800 text-[11px] font-mono text-gray-400 flex justify-between items-center">
          <span>Tip: Use Up/Down arrows for command history</span>
          <button
            onClick={() => runCommand('clear')}
            className="text-gray-400 hover:text-white underline cursor-pointer"
          >
            Clear Screen
          </button>
        </div>

      </div>
    </div>
  );
};

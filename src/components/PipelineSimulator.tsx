import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertTriangle, XCircle, Terminal, Shield, Cpu, Cloud, GitCommit, Layers, Activity, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

type Scenario = 'success' | 'canary' | 'security_fail' | 'rollback';
type StepStatus = 'idle' | 'running' | 'success' | 'failed' | 'warning' | 'skipped';

interface Step {
  id: string;
  name: string;
  icon: any;
  status: StepStatus;
  duration: string;
  logs: string[];
}

export const PipelineSimulator: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>('success');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const [selectedStepForLogs, setSelectedStepForLogs] = useState<number>(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const initialSteps: Step[] = [
    {
      id: 'source',
      name: 'Source Code & Trigger',
      icon: GitCommit,
      status: 'idle',
      duration: '0.4s',
      logs: [
        '[GIT] Triggered by push to branch: main (commit: a3f92b7)',
        '[GIT] Commit author: Alex Rivera <alex.rivera.devops@example.com>',
        '[GIT] Commit message: feat(api): optimize response latency & add health probe endpoint',
        '[GIT] Fetching repository code... DONE'
      ]
    },
    {
      id: 'lint',
      name: 'Code Lint & Static Analysis',
      icon: Cpu,
      status: 'idle',
      duration: '1.2s',
      logs: [
        '[SONARQUBE] Starting static analysis on JavaScript/TypeScript & Helm charts...',
        '[ESLINT] Checking formatting rules... 0 errors, 0 warnings',
        '[HADOLINT] Validating Dockerfile instructions against best practices...',
        '[HADOLINT] PASS: User non-root directive verified.',
        '[SONARQUBE] Quality Gate Status: PASSED (Coverage 88.4%)'
      ]
    },
    {
      id: 'build',
      name: 'Multi-stage Docker Build',
      icon: Layers,
      status: 'idle',
      duration: '2.8s',
      logs: [
        '[DOCKER] Building target image: 123456789.dkr.ecr.us-east-1.amazonaws.com/microservice-api:v1.4.2',
        '[DOCKER] Step 1/6: FROM node:20-alpine AS builder',
        '[DOCKER] Step 2/6: WORKDIR /app',
        '[DOCKER] Step 3/6: COPY package*.json ./ && RUN npm ci --only=production',
        '[DOCKER] Step 4/6: COPY . .',
        '[DOCKER] Step 5/6: FROM alpine:3.19 (Minimal Distroless Target)',
        '[DOCKER] Step 6/6: EXPOSE 8080 & CMD ["node", "server.js"]',
        '[DOCKER] Image build successful. Size: 142MB (Saved 68% size)'
      ]
    },
    {
      id: 'security',
      name: 'Trivy Vulnerability Scan',
      icon: Shield,
      status: 'idle',
      duration: '1.5s',
      logs: [
        '[TRIVY] Scanning container image for OS & Application CVEs...',
        '[TRIVY] Target Image: microservice-api:v1.4.2',
        '[TRIVY] Vulnerability Summary: CRITICAL: 0, HIGH: 0, MEDIUM: 1, LOW: 3',
        '[TRIVY] Medium Vulnerability: CVE-2024-1182 (patched in base alpine:3.19.1)',
        '[TRIVY] Security Policy Threshold: CRITICAL=0, HIGH=0. PASS!'
      ]
    },
    {
      id: 'iac',
      name: 'Terraform Infra Check',
      icon: Cloud,
      status: 'idle',
      duration: '2.1s',
      logs: [
        '[TERRAFORM] Initializing S3 remote state backend in us-east-1...',
        '[TERRAFORM] Acquired DynamoDB state lock table (Lock ID: e810a9b2)',
        '[TERRAFORM] Running terraform plan -out=tfplan...',
        '[TERRAFORM] Plan: 0 to add, 1 to change (Updating Ingress annotations), 0 to destroy.',
        '[TERRAFORM] Applying configuration changes... Complete! (Elapsed 1.8s)'
      ]
    },
    {
      id: 'deploy',
      name: 'ArgoCD GitOps Rollout',
      icon: Activity,
      status: 'idle',
      duration: '3.4s',
      logs: [
        '[ARGOCD] Syncing application k8s-manifests to cluster AWS EKS us-east-1',
        '[K8S] Helm Upgrade --namespace production microservice-api ./helm-charts/api-service',
        '[K8S] Rolling out 3 new replicas (v1.4.2)...',
        '[K8S] Pod web-api-v1.4.2-a1: ContainerCreating -> Running',
        '[K8S] Pod web-api-v1.4.2-b2: ContainerCreating -> Running',
        '[K8S] Terminating legacy pods (v1.4.1)... DONE',
        '[ARGOCD] Application state: SYNCED & HEALTHY'
      ]
    },
    {
      id: 'health',
      name: 'Prometheus Health Check',
      icon: CheckCircle2,
      status: 'idle',
      duration: '1.0s',
      logs: [
        '[MONITORING] Querying Prometheus HTTP 200 Probe Endpoint...',
        '[PROBE] GET https://api.devops.internal/healthz -> 200 OK (Latency: 14ms)',
        '[SLACK WEBHOOK] Alertmanager Sent Notification: "🚀 Deployment v1.4.2 LIVE on AWS EKS!"',
        '[PIPELINE] All stages completed successfully!'
      ]
    }
  ];

  const [steps, setSteps] = useState<Step[]>(initialSteps);

  // Auto scroll log terminal
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [currentLogs]);

  const triggerPipeline = (scenarioToRun: Scenario = selectedScenario) => {
    setIsRunning(true);
    setActiveStepIndex(0);
    setSelectedStepForLogs(0);
    setCurrentLogs(['[PIPELINE] Initializing CI/CD runner workflow on GitHub Actions runner...']);

    // Reset steps
    const newSteps: Step[] = initialSteps.map(s => ({ ...s, status: 'idle' }));
    setSteps(newSteps);

    let stepIdx = 0;

    const runNextStep = () => {
      if (stepIdx >= newSteps.length) {
        setIsRunning(false);
        if (scenarioToRun === 'success' || scenarioToRun === 'canary') {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#06B6D4', '#10B981', '#3B82F6']
          });
        }
        return;
      }

      setActiveStepIndex(stepIdx);
      setSelectedStepForLogs(stepIdx);

      // Handle custom failure scenario logic
      if (scenarioToRun === 'security_fail' && stepIdx === 3) {
        newSteps[stepIdx].status = 'failed';
        newSteps[stepIdx].logs = [
          '[TRIVY] Scanning container image for OS & Application CVEs...',
          '[TRIVY] CRITICAL VULNERABILITY DETECTED: CVE-2024-9981 (CVSS Score: 9.8)',
          '[TRIVY] Remote Code Execution flaw in unpatched dependency package.',
          '[TRIVY] ERROR: Deployment blocked by Trivy Security Gate! Pipeline Terminated.'
        ];
        setSteps([...newSteps]);
        setCurrentLogs(prev => [...prev, ...newSteps[stepIdx].logs]);
        setIsRunning(false);
        return;
      }

      if (scenarioToRun === 'rollback' && stepIdx === 6) {
        newSteps[stepIdx].status = 'failed';
        newSteps[stepIdx].logs = [
          '[MONITORING] Querying Prometheus HTTP Probe Endpoint...',
          '[PROBE] GET https://api.devops.internal/healthz -> HTTP 500 INTERNAL SERVER ERROR',
          '[ALERT] Liveness Probe Failed (3/3 attempts)!',
          '[ARGOCD] Triggering Automated GitOps Rollback to Last Known Good Version (v1.4.1)...',
          '[ARGOCD] Rollback Completed! Cluster state restored to healthy v1.4.1.'
        ];
        setSteps([...newSteps]);
        setCurrentLogs(prev => [...prev, ...newSteps[stepIdx].logs]);
        setIsRunning(false);
        return;
      }

      // Standard stage execution
      newSteps[stepIdx].status = 'running';
      setSteps([...newSteps]);
      setCurrentLogs(prev => [...prev, `\n--- Stage: ${newSteps[stepIdx].name} ---`, ...newSteps[stepIdx].logs]);

      setTimeout(() => {
        newSteps[stepIdx].status = 'success';
        setSteps([...newSteps]);
        stepIdx++;
        runNextStep();
      }, 1200);
    };

    runNextStep();
  };

  const getStatusBadge = (status: Step['status']) => {
    switch (status) {
      case 'success':
        return <span className="flex items-center gap-1 text-emerald-400 text-xs font-mono"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> PASSED</span>;
      case 'running':
        return <span className="flex items-center gap-1 text-devops-cyan text-xs font-mono"><RefreshCw className="w-4 h-4 animate-spin text-devops-cyan" /> RUNNING</span>;
      case 'failed':
        return <span className="flex items-center gap-1 text-red-400 text-xs font-mono"><XCircle className="w-4 h-4 text-red-400" /> FAILED</span>;
      case 'warning':
        return <span className="flex items-center gap-1 text-amber-400 text-xs font-mono"><AlertTriangle className="w-4 h-4 text-amber-400" /> WARNING</span>;
      default:
        return <span className="text-gray-500 text-xs font-mono">QUEUED</span>;
    }
  };

  return (
    <section id="pipeline" className="py-20 bg-devops-dark relative border-t border-devops-border text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-devops-cyan/10 border border-devops-cyan/30 text-devops-cyan font-mono text-xs">
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Live Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            GitOps <span className="text-devops-cyan">CI/CD Pipeline Simulator</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            Experience how automated deployments move from code commit to AWS EKS with security scanning and health checks.
          </p>
        </div>

        {/* Controls Header */}
        <div className="bg-devops-card rounded-xl border border-devops-border p-4 sm:p-6 mb-8 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Scenario Selector */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-400 block">Select Pipeline Scenario:</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'success', label: '✅ Standard Deployment (Green)' },
                  { id: 'canary', label: '🐤 Canary Rollout (10% Traffic)' },
                  { id: 'security_fail', label: '🛡️ Security Gate CVE Block' },
                  { id: 'rollback', label: '🔄 Auto-Rollback on Failure' },
                ].map((scen) => (
                  <button
                    key={scen.id}
                    disabled={isRunning}
                    onClick={() => setSelectedScenario(scen.id as Scenario)}
                    className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                      selectedScenario === scen.id
                        ? 'bg-devops-cyan text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {scen.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Run & Reset Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => triggerPipeline(selectedScenario)}
                disabled={isRunning}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-mono font-bold text-xs transition-all cursor-pointer ${
                  isRunning
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-devops-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                }`}
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Run CI/CD Pipeline</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setSteps(initialSteps);
                  setActiveStepIndex(-1);
                  setCurrentLogs(['[PIPELINE] Reset to idle state. Ready for trigger.']);
                }}
                disabled={isRunning}
                className="p-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 font-mono text-xs cursor-pointer"
                title="Reset Pipeline"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Pipeline Visual Stages Flow */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 mb-8 overflow-x-auto pb-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStepIndex === idx;
            const isSelected = selectedStepForLogs === idx;

            return (
              <div
                key={step.id}
                onClick={() => setSelectedStepForLogs(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isActive
                    ? 'bg-devops-cyan/10 border-devops-cyan ring-1 ring-devops-cyan shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : step.status === 'success'
                    ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-500'
                    : step.status === 'failed'
                    ? 'bg-red-950/30 border-red-500/60 hover:border-red-500'
                    : isSelected
                    ? 'bg-gray-800 border-gray-600'
                    : 'bg-devops-card border-devops-border hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-500">STEP 0{idx + 1}</span>
                  {getStatusBadge(step.status)}
                </div>

                <div className="space-y-1 text-left">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-devops-cyan border border-gray-800">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="font-mono text-xs font-bold text-gray-200 line-clamp-1">{step.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono">Est: {step.duration}</div>
                </div>

                <div className="w-full bg-gray-900 rounded-full h-1 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      step.status === 'success'
                        ? 'bg-emerald-400 w-full'
                        : step.status === 'running'
                        ? 'bg-devops-cyan w-3/4 animate-pulse'
                        : step.status === 'failed'
                        ? 'bg-red-500 w-full'
                        : 'w-0'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Console Log Terminal Window */}
        <div className="rounded-xl bg-slate-950 border border-devops-border overflow-hidden shadow-2xl text-left">
          
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900/90 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-devops-cyan" />
              <span className="font-mono text-xs text-gray-300 font-bold">
                Console Output Log — {steps[selectedStepForLogs]?.name || 'Live Logs'}
              </span>
            </div>
            <span className="font-mono text-[11px] text-gray-400">
              Click any stage above to inspect logs
            </span>
          </div>

          <div
            ref={logContainerRef}
            className="p-4 h-64 overflow-y-auto font-mono text-xs space-y-1.5 text-gray-300 bg-slate-950"
          >
            {currentLogs.length === 0 ? (
              <div className="text-gray-500 italic">Click 'Run CI/CD Pipeline' to initiate workflow execution logs...</div>
            ) : (
              currentLogs.map((log, i) => (
                <div
                  key={i}
                  className={`${
                    log.includes('CRITICAL') || log.includes('ERROR') || log.includes('Failed')
                      ? 'text-red-400 font-bold'
                      : log.includes('PASSED') || log.includes('PASS') || log.includes('SUCCESS') || log.includes('LIVE')
                      ? 'text-emerald-400 font-semibold'
                      : log.includes('Stage:')
                      ? 'text-devops-cyan font-bold pt-2'
                      : 'text-gray-300'
                  }`}
                >
                  {log}
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

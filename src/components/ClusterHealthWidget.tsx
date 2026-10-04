import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Server, Zap, RefreshCw, ShieldCheck, AlertCircle } from 'lucide-react';

export const ClusterHealthWidget: React.FC = () => {
  const [cpuLoad, setCpuLoad] = useState(14);
  const [memoryUsed, setMemoryUsed] = useState(1.4);
  const [podCount, setPodCount] = useState(14);
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [alertStatus, setAlertStatus] = useState<'HEALTHY' | 'STRESS_TESTING'>('HEALTHY');

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isStressTesting) {
        // Natural slight float fluctuation
        setCpuLoad(prev => Math.max(10, Math.min(25, prev + (Math.random() * 4 - 2))));
        setMemoryUsed(prev => Math.max(1.3, Math.min(1.6, prev + (Math.random() * 0.1 - 0.05))));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isStressTesting]);

  const triggerStressTest = () => {
    setIsStressTesting(true);
    setAlertStatus('STRESS_TESTING');
    setCpuLoad(84);
    setMemoryUsed(3.2);

    // K8s HPA auto-scaling reaction
    setTimeout(() => {
      setPodCount(22); // Auto-scaled pods
    }, 1500);

    // Recovery
    setTimeout(() => {
      setCpuLoad(28);
      setMemoryUsed(1.8);
      setAlertStatus('HEALTHY');
      setIsStressTesting(false);
    }, 5000);

    setTimeout(() => {
      setPodCount(14);
    }, 8000);
  };

  return (
    <section className="py-12 bg-gray-950 border-y border-devops-border text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-devops-card rounded-xl border border-devops-border p-6 shadow-2xl space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-devops-cyan" />
                  Live Cluster Telemetry (Grafana & Prometheus Stream)
                </h3>
              </div>
              <p className="text-xs text-gray-400 font-mono">
                Simulated real-time metric collection from AWS EKS node export endpoints.
              </p>
            </div>

            {/* Interactive Stress Test Trigger Button */}
            <button
              onClick={triggerStressTest}
              disabled={isStressTesting}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                isStressTesting
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 cursor-wait'
                  : 'bg-devops-cyan/10 hover:bg-devops-cyan/20 text-devops-cyan border border-devops-cyan/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
              }`}
            >
              {isStressTesting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>K8s HPA Scaling In Progress...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-devops-cyan fill-current" />
                  <span>Simulate Traffic Spike & HPA Auto-scaling</span>
                </>
              )}
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            
            {/* CPU Metric */}
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-devops-cyan" />
                  Cluster CPU Load
                </span>
                <span className={cpuLoad > 70 ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                  {cpuLoad.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-950 rounded-full h-2 overflow-hidden border border-gray-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    cpuLoad > 70 ? 'bg-amber-400' : 'bg-devops-cyan'
                  }`}
                  style={{ width: `${Math.min(100, cpuLoad)}%` }}
                />
              </div>
              <div className="text-[10px] text-gray-500">Target limit: 80% (HPA Trigger)</div>
            </div>

            {/* RAM Metric */}
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-blue-400" />
                  RAM Allocation
                </span>
                <span className="text-blue-400 font-bold">{memoryUsed.toFixed(2)} GB / 4.0 GB</span>
              </div>
              <div className="w-full bg-gray-950 rounded-full h-2 overflow-hidden border border-gray-800">
                <div
                  className="bg-blue-500 h-full transition-all duration-500"
                  style={{ width: `${(memoryUsed / 4.0) * 100}%` }}
                />
              </div>
              <div className="text-[10px] text-gray-500">Working set memory</div>
            </div>

            {/* Pod Count Metric */}
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  K8s Active Pods
                </span>
                <span className="text-emerald-400 font-bold">{podCount} / {podCount} Ready</span>
              </div>
              <div className="text-xs text-gray-300 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero CrashLoopBackOff</span>
              </div>
              <div className="text-[10px] text-gray-500">Managed by ReplicaSet</div>
            </div>

            {/* Alert Status */}
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
              <div className="text-xs text-gray-400">Prometheus Alertmanager</div>
              <div className="flex items-center gap-2">
                {alertStatus === 'HEALTHY' ? (
                  <>
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="text-xs font-bold text-emerald-400 block">ALL PROBES GREEN</span>
                      <span className="text-[10px] text-gray-400">0 firing alerts</span>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-amber-400 animate-bounce" />
                    <div>
                      <span className="text-xs font-bold text-amber-400 block">HPA SCALING UP</span>
                      <span className="text-[10px] text-amber-300">Adding +8 Pod Replicas</span>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

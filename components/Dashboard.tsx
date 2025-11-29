
import React from 'react';
import { Pillar } from '../types';
import { Activity, Lock, Database, Cpu, Layers, User, ArrowLeftRight, Server, ShieldAlert, BookOpen, ExternalLink } from 'lucide-react';

interface DashboardProps {
  onSelectPillar: (pillar: Pillar) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectPillar }) => {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Secure AI Framework</h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-6">
          Explore the AI system architecture. Click on any layer to view specific test cases and threats associated with that component.
        </p>
      </div>

      {/* Interactive Pipeline Architecture */}
      <div className="relative w-full bg-slate-900/30 rounded-3xl border border-slate-800 p-6 md:p-10 mb-12 flex items-center justify-center">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-black opacity-80 rounded-3xl pointer-events-none" />
        
        <div className="relative flex flex-col lg:flex-row items-stretch gap-6 z-10 w-full animate-in fade-in zoom-in-95 duration-500">
            {/* LEFT: User */}
            <div className="flex flex-col lg:flex-row items-center justify-center shrink-0 lg:mr-4">
               <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 md:w-10 md:h-10 text-slate-400" />
                  </div>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">User</span>
               </div>
               <ArrowLeftRight className="hidden lg:block w-8 h-8 text-slate-700 ml-6" />
               <div className="block lg:hidden w-px h-8 bg-slate-800 my-4" />
            </div>

            {/* RIGHT: Main Systems */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                  {/* Application Layer */}
                  <div onClick={() => onSelectPillar(Pillar.APP)} className="flex-1 group cursor-pointer relative w-full">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-0.5 rounded-full text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg pointer-events-none">VIEW TESTS</div>
                    <div className="h-full bg-slate-900/80 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500 rounded-xl p-6 flex flex-col items-center justify-center transition-all hover:bg-blue-500/5 shadow-lg relative z-10">
                      <Layers className="w-10 h-10 text-blue-400 mb-3" />
                      <h3 className="text-lg font-bold text-slate-200">Application</h3>
                      <p className="text-xs text-center text-slate-500 mt-2">Orchestration, Agents & Plugins</p>
                    </div>
                  </div>

                  <div className="hidden lg:block self-center"><ArrowLeftRight className="w-8 h-8 text-slate-700" /></div>

                  {/* Model Layer */}
                  <div onClick={() => onSelectPillar(Pillar.MODEL)} className="flex-1 group cursor-pointer relative w-full">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-3 py-0.5 rounded-full text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg pointer-events-none">VIEW TESTS</div>
                    <div className="h-full bg-slate-900/80 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500 rounded-xl p-6 flex flex-col items-center justify-center transition-all hover:bg-purple-500/5 shadow-lg relative z-10">
                      <Cpu className="w-10 h-10 text-purple-400 mb-3" />
                      <h3 className="text-lg font-bold text-slate-200">AI Model</h3>
                      <p className="text-xs text-center text-slate-500 mt-2">Inference, Weights</p>
                    </div>
                  </div>

                  <div className="hidden lg:block self-center"><ArrowLeftRight className="w-8 h-8 text-slate-700" /></div>

                  {/* Data Layer */}
                  <div onClick={() => onSelectPillar(Pillar.DATA)} className="flex-1 group cursor-pointer relative w-full">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-3 py-0.5 rounded-full text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg pointer-events-none">VIEW TESTS</div>
                    <div className="h-full bg-slate-900/80 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500 rounded-xl p-6 flex flex-col items-center justify-center transition-all hover:bg-emerald-500/5 shadow-lg relative z-10">
                      <Database className="w-10 h-10 text-emerald-400 mb-3" />
                      <h3 className="text-lg font-bold text-slate-200">Data & Storage</h3>
                      <p className="text-xs text-center text-slate-500 mt-2">Training Sets, RAG</p>
                    </div>
                  </div>
              </div>

              {/* Infra Layer */}
              <div onClick={() => onSelectPillar(Pillar.INFRA)} className="w-full group cursor-pointer relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-3 py-0.5 rounded-full text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg pointer-events-none">VIEW TESTS</div>
                <div className="bg-slate-900/80 backdrop-blur-sm border border-amber-500/20 hover:border-amber-500 rounded-xl py-3 px-6 flex flex-col md:flex-row items-center justify-between transition-all hover:bg-amber-500/5 shadow-lg relative z-10">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20"><Server className="w-6 h-6 text-amber-400" /></div>
                    <div><h3 className="text-lg font-bold text-slate-200">Infrastructure Layer</h3><p className="text-xs text-slate-500">Supply Chain, MLOps</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-4">
             <span className="text-slate-400 text-sm font-medium">Critical Risks</span>
             <Activity className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white">15+</div>
          <p className="text-xs text-slate-500 mt-2">Requires immediate attention</p>
        </div>
        
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-4">
             <span className="text-slate-400 text-sm font-medium">Test Coverage</span>
             <ShieldAlert className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-white">50+</div>
          <p className="text-xs text-slate-500 mt-2">Scenarios available</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-4">
             <span className="text-slate-400 text-sm font-medium">Architecture</span>
             <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-white">Zero Trust</div>
          <p className="text-xs text-slate-500 mt-2">Security model</p>
        </div>

        <a 
          href="https://artificialintelligenceact.eu/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-emerald-500/50 hover:bg-slate-900/50 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
             <span className="text-slate-400 text-sm font-medium group-hover:text-emerald-400 transition-colors">Compliance</span>
             <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
            EU AI Act
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-xs text-slate-500 mt-2">Aligned with regulations</p>
        </a>
      </div>
    </div>
  );
};

export default Dashboard;

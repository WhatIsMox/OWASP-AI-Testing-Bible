
import React from 'react';
import { Box, Database, LayoutGrid, Server, BookOpen, Shield, Book, X, Brain, Cpu, Bot } from 'lucide-react';
import { Pillar } from '../types';

interface SidebarProps {
  activePillar: Pillar | 'ALL' | 'TOP10' | 'MLTOP10' | 'AGENTTOP10';
  onSelectPillar: (pillar: Pillar | 'ALL' | 'TOP10' | 'MLTOP10' | 'AGENTTOP10') => void;
  onSelectDashboard: () => void;
  onSelectThreatModel: () => void;
  currentView: 'dashboard' | 'tests' | 'threat-model';
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activePillar, 
  onSelectPillar, 
  onSelectDashboard, 
  onSelectThreatModel, 
  currentView,
  isOpen,
  onClose
}) => {
  const navItems = [
    { id: Pillar.APP, icon: LayoutGrid, label: "Application Testing" },
    { id: Pillar.MODEL, icon: Box, label: "Model Testing" },
    { id: Pillar.INFRA, icon: Server, label: "Infrastructure" },
    { id: Pillar.DATA, icon: Database, label: "Data Testing" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-slate-950 border-r border-slate-800 
        flex flex-col z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="relative p-2 bg-cyan-950 rounded-lg border border-cyan-500/30 group overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/20 blur-md group-hover:bg-cyan-400/30 transition-all"></div>
              <Book className="w-6 h-6 text-cyan-400 relative z-10" />
            </div>
            <div>
              <h1 className="font-bold text-slate-100 leading-tight tracking-tight">OWASP AI</h1>
              <p className="text-[10px] text-cyan-500 font-mono">TESTING BIBLE v1.0</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => { onSelectDashboard(); onClose(); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
              currentView === 'dashboard'
                ? 'bg-cyan-450/10 text-cyan-450 border border-cyan-450/20'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-5 h-5 shrink-0" />
            <span className="font-medium">Overview</span>
          </button>

          <button
            onClick={() => { onSelectThreatModel(); onClose(); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
              currentView === 'threat-model'
                ? 'bg-cyan-450/10 text-cyan-450 border border-cyan-450/20'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Shield className="w-5 h-5 shrink-0" />
            <span className="font-medium">Threat Modelling</span>
          </button>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Collections
            </p>
          </div>

          <button
            onClick={() => { onSelectPillar('TOP10'); onClose(); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
              currentView === 'tests' && activePillar === 'TOP10'
                ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/10 text-pink-400 border border-pink-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Brain className="w-5 h-5 shrink-0" />
            <span className="font-medium">OWASP Top 10 LLM</span>
          </button>

          <button
            onClick={() => { onSelectPillar('MLTOP10'); onClose(); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
              currentView === 'tests' && activePillar === 'MLTOP10'
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-5 h-5 shrink-0" />
            <span className="font-medium">OWASP Top 10 ML</span>
          </button>

          <button
            onClick={() => { onSelectPillar('AGENTTOP10'); onClose(); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
              currentView === 'tests' && activePillar === 'AGENTTOP10'
                ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Bot className="w-5 h-5 shrink-0" />
            <span className="font-medium">OWASP Agentic Threats</span>
          </button>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Testing Pillars
            </p>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onSelectPillar(item.id); onClose(); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                currentView === 'tests' && activePillar === item.id
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${currentView === 'tests' && activePillar === item.id ? 'text-cyan-450' : ''}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-900 rounded-lg p-3">
            <p className="text-xs text-slate-500 text-center">
              Based on OWASP AI Testing Guide v1.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

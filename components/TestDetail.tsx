
import React from 'react';
import { TestItem } from '../types';
import { ArrowLeft, Target, Code, ShieldCheck, ExternalLink, BookOpen, Wrench, Shield, Brain, Terminal, Eye, Link as LinkIcon, Cpu, Bot, AlertCircle } from 'lucide-react';

interface TestDetailProps {
  test: TestItem;
  onBack: () => void;
  onNavigateToOwasp: (id: string) => void;
}

const TestDetail: React.FC<TestDetailProps> = ({ test, onBack, onNavigateToOwasp }) => {
  const isAgentic = test.id.startsWith('AGT') || !!test.owaspAgenticRef;

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in slide-in-from-right-4 duration-300">
      <button 
        onClick={onBack}
        className="flex items-center text-sm text-slate-400 hover:text-cyan-400 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to list
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-8 border-b border-slate-800 bg-slate-950">
          <div className="flex flex-col gap-4">
            
            <div className="flex items-center justify-between">
               {/* Identifiers */}
               <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm text-cyan-500 bg-cyan-950/30 px-3 py-1.5 rounded border border-cyan-900">
                    {test.id}
                  </span>
                  {test.owaspTop10Ref && (
                    <button 
                      onClick={() => onNavigateToOwasp(test.owaspTop10Ref!)}
                      className="flex items-center gap-1.5 font-mono text-sm text-pink-400 bg-pink-500/10 px-3 py-1.5 rounded border border-pink-500/20 hover:bg-pink-500/20 hover:border-pink-500/40 transition-all cursor-pointer"
                      title="Go to OWASP LLM Top 10 Entry"
                    >
                      <Brain className="w-3.5 h-3.5" /> {test.owaspTop10Ref}
                    </button>
                  )}
                  {test.owaspMlTop10Ref && (
                    <button 
                      onClick={() => onNavigateToOwasp(test.owaspMlTop10Ref!)}
                      className="flex items-center gap-1.5 font-mono text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer"
                      title="Go to OWASP ML Top 10 Entry"
                    >
                      <Cpu className="w-3.5 h-3.5" /> {test.owaspMlTop10Ref}
                    </button>
                  )}
                  {test.owaspAgenticRef && (
                    <button 
                      onClick={() => onNavigateToOwasp(test.owaspAgenticRef!)}
                      className="flex items-center gap-1.5 font-mono text-sm text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded border border-orange-500/20 hover:bg-orange-500/20 hover:border-orange-500/40 transition-all cursor-pointer"
                      title="Go to OWASP Agentic Threats Entry"
                    >
                      <Bot className="w-3.5 h-3.5" /> {test.owaspAgenticRef}
                    </button>
                  )}
                  <span className="text-slate-400 text-sm font-medium border-l border-slate-800 pl-3">
                    {test.pillar}
                  </span>
               </div>

               <span className={`px-4 py-1.5 rounded-full text-sm font-bold border shrink-0 ${
                  test.riskLevel === 'Critical' ? 'text-red-400 bg-red-400/10 border-red-400/20' :
                  test.riskLevel === 'High' ? 'text-orange-400 bg-orange-400/10 border-orange-400/20' :
                  'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
                }`}>
                  {test.riskLevel}
               </span>
            </div>

            <h1 className="text-3xl font-bold text-white mt-2">{test.title}</h1>
            
            {/* Source Highlight for Agentic Tests */}
            {isAgentic && (
               <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded text-orange-300 text-xs font-medium self-start">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Sourced from OWASP Agentic AI Threats
               </div>
            )}

            <p className="text-slate-300 text-lg leading-relaxed border-t border-slate-900/50 pt-4 mt-2">
              {test.summary}
            </p>
          </div>
        </div>

        <div className="p-8 space-y-10">
          {/* Objectives */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-slate-100">
              <Target className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold">Test Objectives</h3>
            </div>
            <ul className="grid gap-2">
              {test.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 bg-slate-800/30 p-3 rounded-lg border border-slate-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </section>

          {/* Payloads / Test Vectors */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-slate-100">
              <Code className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-bold">How to Test / Payloads</h3>
            </div>
            <div className="grid gap-4">
              {test.payloads.map((payload, i) => (
                <div key={i} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                  <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                    <span className="font-semibold text-slate-200">{payload.name}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-slate-400 text-sm mb-3 whitespace-pre-line">{payload.description}</p>
                    {payload.code && (
                      <div className="relative group mt-2">
                        <div className="absolute top-0 right-0 px-2 py-1 text-[10px] text-slate-500 font-mono">PAYLOAD / CODE</div>
                        <pre className="bg-black/50 text-green-400 p-4 pt-6 rounded-lg font-mono text-sm whitespace-pre-wrap break-words border border-slate-800">
                          {payload.code}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Expected Output */}
          {test.expectedOutput && test.expectedOutput.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4 text-slate-100">
                <Eye className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold">Expected Output / Indicators of Vulnerability</h3>
              </div>
              <ul className="space-y-2">
                {test.expectedOutput.map((out, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 bg-amber-500/5 p-4 rounded-lg border border-amber-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span className="text-sm">{out}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Remediation */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold">Remediation & Mitigation</h3>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              {test.mitigationStrategies.map((item, i) => (
                <div key={i} className={`p-4 border-b last:border-0 border-slate-800 flex gap-4 ${item.type === 'Remediation' ? 'bg-emerald-500/5' : 'bg-blue-500/5'}`}>
                  <div className="shrink-0 mt-1">
                    {item.type === 'Remediation' ? (
                      <div className="p-1.5 rounded-md bg-emerald-500/20 text-emerald-400" title="Remediation: Fixes the root cause">
                         <Wrench className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="p-1.5 rounded-md bg-blue-500/20 text-blue-400" title="Mitigation: Reduces impact">
                         <Shield className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${item.type === 'Remediation' ? 'text-emerald-500' : 'text-blue-500'}`}>
                      {item.type}
                    </span>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Suggested Tools */}
          {test.suggestedTools && test.suggestedTools.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4 text-slate-100">
                <Terminal className="w-5 h-5 text-pink-400" />
                <h3 className="text-xl font-bold">Suggested Tools</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {test.suggestedTools.map((tool, i) => (
                  <a 
                    key={i} 
                    href={tool.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group bg-slate-950 border border-slate-800 hover:border-pink-500/40 rounded-xl p-4 transition-all hover:bg-slate-900"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-slate-200 group-hover:text-pink-400 transition-colors flex items-center gap-2">
                        {tool.name}
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {tool.description}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* External Resources */}
          {test.externalResources && test.externalResources.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4 text-slate-100">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold">References & Deep Dives</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {test.externalResources.map((res, i) => (
                  <a 
                    key={i} 
                    href={res.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-400/50 rounded-lg transition-all group"
                  >
                    <span className="text-slate-300 font-medium group-hover:text-blue-300 text-sm">{res.title}</span>
                    <LinkIcon className="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0 ml-3" />
                  </a>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default TestDetail;


import React, { useState, useEffect } from 'react';
import { OwaspTop10Entry } from '../types';
import { ChevronDown, Shield, AlertTriangle, ExternalLink, ShieldCheck, Target } from 'lucide-react';

interface OwaspTop10ViewProps {
  initialExpandedId?: string | null;
  data: OwaspTop10Entry[];
  title: string;
  description: string;
  colorTheme?: 'pink' | 'emerald' | 'orange';
}

const OwaspTop10View: React.FC<OwaspTop10ViewProps> = ({ 
  initialExpandedId, 
  data, 
  title, 
  description,
  colorTheme = 'pink' 
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(initialExpandedId || null);

  useEffect(() => {
    if (initialExpandedId) {
      setExpandedId(initialExpandedId);
    }
  }, [initialExpandedId]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Theme definitions
  const theme = {
    pink: {
      activeBorder: 'border-pink-500/30',
      activeShadow: 'shadow-[0_0_20px_rgba(236,72,153,0.1)]',
      badgeActive: 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
      badgeHover: 'group-hover:text-pink-400 group-hover:border-pink-500/30',
      iconActive: 'text-pink-400',
    },
    emerald: {
      activeBorder: 'border-emerald-500/30',
      activeShadow: 'shadow-[0_0_20px_rgba(16,185,129,0.1)]',
      badgeActive: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      badgeHover: 'group-hover:text-emerald-400 group-hover:border-emerald-500/30',
      iconActive: 'text-emerald-400',
    },
    orange: {
      activeBorder: 'border-orange-500/30',
      activeShadow: 'shadow-[0_0_20px_rgba(249,115,22,0.1)]',
      badgeActive: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      badgeHover: 'group-hover:text-orange-400 group-hover:border-orange-500/30',
      iconActive: 'text-orange-400',
    }
  };

  const currentTheme = theme[colorTheme];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="space-y-4">
        {data.map((entry) => (
          <div 
            key={entry.id}
            id={entry.id}
            className={`border rounded-xl transition-all duration-300 overflow-hidden ${
              expandedId === entry.id 
                ? `bg-slate-900 ${currentTheme.activeBorder} ${currentTheme.activeShadow}` 
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            {/* Header / Clickable Area */}
            <div 
              onClick={() => toggleExpand(entry.id)}
              className="p-5 cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-16 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-colors
                  ${expandedId === entry.id 
                    ? currentTheme.badgeActive
                    : `bg-slate-950 text-slate-500 border border-slate-800 ${currentTheme.badgeHover}`
                  }
                `}>
                  {entry.id.split(':')[0]}
                </div>
                <div>
                  <h3 className={`text-xl font-bold transition-colors ${expandedId === entry.id ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                    {entry.title}
                  </h3>
                  <div className={`text-sm transition-colors mt-1 ${expandedId === entry.id ? 'text-slate-400' : 'text-slate-500 group-hover:text-slate-400 line-clamp-1'}`}>
                    {entry.description}
                  </div>
                </div>
              </div>
              <ChevronDown className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${expandedId === entry.id ? `rotate-180 ${currentTheme.iconActive}` : 'group-hover:text-slate-300'}`} />
            </div>

            {/* Expanded Content */}
            <div className={`
              overflow-hidden transition-[max-height] duration-500 ease-in-out
              ${expandedId === entry.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
            `}>
              <div className="p-6 pt-0 border-t border-slate-800/50">
                <div className="grid lg:grid-cols-2 gap-8 mt-6">
                  
                  {/* Left Column: Description & Risks */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                        Common Risks
                      </h4>
                      <ul className="space-y-2">
                        {entry.commonRisks.map((risk, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></span>
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {entry.attackScenarios.length > 0 && (
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
                          <Target className="w-4 h-4 text-red-400" />
                          Attack Scenarios
                        </h4>
                        <div className="space-y-3">
                          {entry.attackScenarios.map((scenario, idx) => (
                            <div key={idx} className="bg-red-500/5 p-4 rounded-lg border border-red-500/10">
                              <div className="font-bold text-red-400 text-sm mb-1">{scenario.title}</div>
                              <p className="text-slate-400 text-sm">{scenario.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Prevention & References */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Prevention & Mitigation
                      </h4>
                      <ul className="space-y-2">
                        {entry.preventionStrategies.map((strategy, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
                            <Shield className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {entry.references.length > 0 && (
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
                          <ExternalLink className="w-4 h-4 text-blue-400" />
                          Reference Links
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {entry.references.map((ref, idx) => (
                            <a 
                              key={idx}
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-md transition-colors"
                            >
                              {ref.title}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwaspTop10View;

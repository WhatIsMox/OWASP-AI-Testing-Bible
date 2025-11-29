
import React, { useState } from 'react';
import { TestItem } from '../types';
import { ArrowRight, Brain, Filter, ListFilter, Cpu, Bot, Book } from 'lucide-react';

interface TestListProps {
  tests: TestItem[];
  onSelectTest: (test: TestItem) => void;
  onNavigateToOwasp: (id: string) => void;
  category: string;
}

const TestList: React.FC<TestListProps> = ({ tests, onSelectTest, onNavigateToOwasp, category }) => {
  const [sortMethod, setSortMethod] = useState<'id' | 'severity'>('id');
  const [filterType, setFilterType] = useState<'all' | 'top10' | 'mltop10' | 'agenttop10' | 'aitg'>('all');

  const getRiskColor = (level: string) => {
    switch(level) {
      case 'Critical': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'High': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-green-400 bg-green-400/10 border-green-400/20';
    }
  };

  const getRiskValue = (level: string) => {
    switch(level) {
      case 'Critical': return 4;
      case 'High': return 3;
      case 'Medium': return 2;
      default: return 1;
    }
  };

  // 1. Filter the tests based on the selected filterType
  const filteredTests = tests.filter(test => {
    if (filterType === 'top10') return !!test.owaspTop10Ref;
    if (filterType === 'mltop10') return !!test.owaspMlTop10Ref;
    if (filterType === 'agenttop10') return !!test.owaspAgenticRef;
    if (filterType === 'aitg') return test.id.startsWith('AITG');
    return true;
  });

  // 2. Sort the filtered list
  const sortedTests = [...filteredTests].sort((a, b) => {
    if (sortMethod === 'severity') {
      return getRiskValue(b.riskLevel) - getRiskValue(a.riskLevel);
    }
    
    // Default Sort: AITG tests first, then AGT tests
    const isAITG_a = a.id.startsWith('AITG');
    const isAITG_b = b.id.startsWith('AITG');

    if (isAITG_a && !isAITG_b) return -1;
    if (!isAITG_a && isAITG_b) return 1;

    // Secondary sort by ID alpha
    return a.id.localeCompare(b.id);
  });

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="mb-8 border-b border-slate-800 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{category}</h2>
            <p className="text-slate-400 text-sm md:text-base">
              Select a test case to view detailed objectives, payloads, and remediation strategies.
            </p>
          </div>
          
          <div className="bg-slate-900 px-3 py-2 rounded-full border border-slate-800 text-xs md:text-sm text-slate-400 font-mono whitespace-nowrap self-start md:self-auto">
            {sortedTests.length} TEST CASES
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/50 p-2 rounded-xl border border-slate-800/50">
          
          {/* Filter Controls */}
          <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto scrollbar-hide">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 hidden sm:block whitespace-nowrap">
              <Filter className="w-3 h-3 inline mr-1" />
              Source:
            </span>
            <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800 flex-1 sm:flex-none">
              <button 
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${filterType === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilterType('aitg')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${filterType === 'aitg' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' : 'text-slate-400 hover:text-cyan-300'}`}
              >
                <Book className="w-3 h-3" />
                AI Testing Guide
              </button>
              <button 
                onClick={() => setFilterType('top10')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${filterType === 'top10' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-sm' : 'text-slate-400 hover:text-pink-300'}`}
              >
                <Brain className="w-3 h-3" />
                LLM
              </button>
              <button 
                onClick={() => setFilterType('mltop10')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${filterType === 'mltop10' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:text-emerald-300'}`}
              >
                <Cpu className="w-3 h-3" />
                ML
              </button>
              <button 
                onClick={() => setFilterType('agenttop10')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${filterType === 'agenttop10' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-slate-400 hover:text-orange-300'}`}
              >
                <Bot className="w-3 h-3" />
                Agentic
              </button>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-1 w-full sm:w-auto justify-end">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 hidden sm:block">
              <ListFilter className="w-3 h-3 inline mr-1" />
              Sort:
            </span>
            <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800 flex-1 sm:flex-none">
              <button 
                onClick={() => setSortMethod('id')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-medium transition-all ${sortMethod === 'id' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                By ID
              </button>
              <button 
                onClick={() => setSortMethod('severity')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-medium transition-all ${sortMethod === 'severity' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Severity
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* List Grid */}
      <div className="grid gap-4">
        {sortedTests.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
            <p className="text-slate-500">No test cases found matching the current filter.</p>
            <button onClick={() => setFilterType('all')} className="mt-2 text-cyan-400 text-sm hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          sortedTests.map((test) => (
            <div 
              key={test.id}
              onClick={() => onSelectTest(test)}
              className="group bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/30 rounded-xl p-5 cursor-pointer transition-all duration-200 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10">
                
                <div className="space-y-3 flex-1 min-w-0">
                  {/* Identifiers Row (Above Title) */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span 
                      className="font-mono text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800 min-w-[90px] text-center hover:bg-slate-900 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                      title="Test ID"
                    >
                      {test.id}
                    </span>
                    {test.owaspTop10Ref && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToOwasp(test.owaspTop10Ref!);
                        }}
                        className="flex items-center gap-1 font-mono text-xs text-pink-400 bg-pink-500/10 px-2 py-1 rounded border border-pink-500/20 whitespace-nowrap hover:bg-pink-500/20 hover:border-pink-500/40 hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
                        title="Go to OWASP LLM Top 10 Entry"
                      >
                        <Brain className="w-3 h-3" /> {test.owaspTop10Ref}
                      </button>
                    )}
                    {test.owaspMlTop10Ref && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToOwasp(test.owaspMlTop10Ref!);
                        }}
                        className="flex items-center gap-1 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 whitespace-nowrap hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
                        title="Go to OWASP ML Top 10 Entry"
                      >
                        <Cpu className="w-3 h-3" /> {test.owaspMlTop10Ref}
                      </button>
                    )}
                    {test.owaspAgenticRef && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToOwasp(test.owaspAgenticRef!);
                        }}
                        className="flex items-center gap-1 font-mono text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20 whitespace-nowrap hover:bg-orange-500/20 hover:border-orange-500/40 hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
                        title="Go to OWASP Agentic Threats Entry"
                      >
                        <Bot className="w-3 h-3" /> {test.owaspAgenticRef}
                      </button>
                    )}
                  </div>

                  {/* Title Row */}
                  <h3 className="text-base md:text-lg font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors break-words">
                    {test.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {test.summary}
                  </p>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 mt-2 md:mt-0 border-t md:border-t-0 border-slate-800/50 pt-3 md:pt-0 self-start">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(test.riskLevel)}`}>
                    {test.riskLevel} Risk
                  </span>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transform group-hover:translate-x-1 transition-all" />
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestList;

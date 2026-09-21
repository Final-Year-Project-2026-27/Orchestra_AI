"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  Copy,
  Download,
  PlayCircle,
  Pause,
} from "lucide-react";

type TraceStepData = {
  status: "success" | "warning" | "pending";
  title: string;
  role: string;
  tag: string;
  description: string;
  tagType?: "success" | "warning" | "neutral";
};

export function TaskExecutionView() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("q");
  const query = rawQuery || "Waiting for prompt input...";

  const [isExecuting, setIsExecuting] = useState(false);
  const [plan, setPlan] = useState<string[]>([]);
  const [steps, setSteps] = useState<TraceStepData[]>([]);
  const [report, setReport] = useState<string | null>(null);
  
  useEffect(() => {
    if (!rawQuery) return;
    startExecution(rawQuery);
  }, [rawQuery]);

  const startExecution = async (promptQuery: string) => {
    setIsExecuting(true);
    setPlan([]);
    setSteps([]);
    setReport(null);
    
    try {
      const response = await fetch("http://localhost:8000/api/orchestrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: promptQuery }),
      });
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");
        
        for (const line of lines) {
          try {
            const parsed = JSON.parse(line);
            
            if (parsed.type === "plan") {
              setPlan(parsed.data);
            } else if (parsed.type === "step") {
              setSteps((prev) => [...prev, parsed.data]);
            } else if (parsed.type === "report") {
              setReport(parsed.data);
            } else if (parsed.type === "done") {
              setIsExecuting(false);
            }
          } catch (err) {
            console.error("Parse err", err, line);
          }
        }
      }
    } catch (error) {
      console.error("Execution error", error);
      setIsExecuting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mt-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
             <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)] ${isExecuting ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
             <h2 className="text-xl font-semibold text-white truncate max-w-xl">
               Task: {query}
             </h2>
          </div>
          <p className="text-slate-500 text-sm ml-5">
            {isExecuting ? 'Agents are currently orchestrating this workflow...' : 'Execution complete.'}
          </p>
        </div>
        
        <div className="flex items-center gap-3 self-start shrink-0">
          <button className="px-4 py-2 rounded-lg border border-[#212638] text-slate-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
            <Pause size={14} /> {isExecuting ? "Pause Executor" : "Resume Executor"}
          </button>
          <button 
            onClick={() => startExecution(query)}
            className="px-4 py-2 rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-600/30 hover:bg-indigo-600 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
          >
            <PlayCircle size={14} /> Force Restart
          </button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        
        {/* Left Column: Trace */}
        <div className="flex flex-col gap-8">
          {/* Research Plan */}
          <div className="bg-[#10131E] border border-[#1e2330] rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-200">Generated Research Plan</h3>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${isExecuting ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                {isExecuting ? 'Executing' : 'Approved & Executed'}
              </span>
            </div>
            
            {plan.length === 0 ? (
              <p className="text-sm text-slate-500 italic">Waiting for agents to draft plan...</p>
            ) : (
              <ol className="list-decimal list-inside text-sm text-slate-400 space-y-2 mb-4 animate-in fade-in">
                {plan.map((stepItem, idx) => (
                  <li key={idx}>{stepItem}</li>
                ))}
              </ol>
            )}
            
            <div className="flex gap-3">
              <button disabled className="px-3 py-1.5 rounded bg-[#1A1F2C] border border-[#2A3143] text-xs font-medium text-slate-500 cursor-not-allowed">
                Edit Plan
              </button>
            </div>
          </div>

          {/* Execution Trace Timeline */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-4">Live Agent Execution Trace</h3>
            <div className="relative pl-6 space-y-8 before:absolute before:inset-y-0 before:left-2.5 before:w-px before:bg-[#212638]">
              
              {steps.length === 0 && (
                 <p className="text-sm text-slate-500 italic">No agent actions recorded yet.</p>
              )}
              
              {steps.map((step, idx) => (
                <TraceStep
                  key={idx}
                  status={step.status}
                  title={step.title}
                  role={step.role}
                  tag={step.tag}
                  tagType={step.tagType}
                  time="Now"
                  description={step.description}
                />
              ))}
              
              {isExecuting && (
                 <TraceStep
                    status="pending"
                    title="Agent Working..."
                    role="ORCHESTRATOR"
                    tag="Processing"
                    tagType="neutral"
                    time="Now"
                    description="Waiting for next agent coordination block."
                 />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: PDF/Markdown Preview */}
        <div>
          <div className="bg-[#10131E] border border-[#1e2330] rounded-xl flex flex-col h-full overflow-hidden max-h-[800px] sticky top-4">
            <div className="p-4 border-b border-[#1e2330] flex items-center justify-between bg-[#151926]">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-indigo-400" />
                <span className="text-sm font-medium text-slate-200">output.md</span>
              </div>
              {steps.some(s => s.status === 'warning') && (
                <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Unverified citations present
                </span>
              )}
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto whitespace-pre-wrap text-sm text-slate-300 leading-relaxed font-mono">
              {!report ? (
                 <div className="flex items-center justify-center h-full text-slate-600">
                   Report generation in progress...
                 </div>
              ) : (
                <div className="animate-in fade-in">
                   {report}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#1e2330] flex items-center justify-between text-slate-500 text-xs">
              <span>{report ? 'Completed' : 'Drafting...'}</span>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-[#1A1F2C] hover:text-slate-300 transition-colors border border-transparent hover:border-[#212638]">
                  <Copy size={13} /> Copy MD
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
                  <Download size={13} /> Export report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TraceStep({
  status,
  title,
  role,
  tag,
  time,
  description,
  tagType = "success",
}: {
  status: "success" | "warning" | "pending";
  title: string;
  role: string;
  tag: string;
  time: string;
  description: string;
  tagType?: "success" | "warning" | "neutral";
}) {
  const getIcon = () => {
    switch (status) {
      case "success":
        return (
          <div className="w-5 h-5 rounded-full bg-emerald-600/20 border-2 border-emerald-500 flex items-center justify-center relative z-10 box-content -ml-2.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          </div>
        );
      case "warning":
        return (
          <div className="w-5 h-5 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center relative z-10 box-content -ml-2.5 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          </div>
        );
      case "pending":
        return (
          <div className="w-5 h-5 rounded-full bg-slate-700/50 border-2 border-slate-500 flex items-center justify-center relative z-10 box-content -ml-2.5">
            <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse"></div>
          </div>
        );
    }
  };

  const getTagStyle = () => {
    switch (tagType) {
      case "success": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "warning": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "neutral": return "bg-slate-700/50 text-slate-300 border-slate-600";
    }
  };

  return (
    <div className="relative animate-in slide-in-from-left-4 fade-in duration-300">
      <div className="absolute -left-[27px] rtl:-right-[27px] top-1">
        {getIcon()}
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-baseline gap-2">
            <h4 className="text-slate-200 font-medium">{title}</h4>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">• {role}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getTagStyle()}`}>
              {tag}
            </span>
            <span className="text-xs text-slate-500">{time}</span>
          </div>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed pr-12">{description}</p>
      </div>
    </div>
  );
}

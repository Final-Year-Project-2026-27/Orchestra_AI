"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";

export function CommandInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const suggestions = [
    "How are companies mitigating prompt injection in RAG?",
    "Compare vector DB performance overheads at scale",
    "Recent consensus on multi-agent safety boundaries",
    "Summarize agent self-healing loops",
  ];

  const handleRun = () => {
    if (!query.trim()) return;
    router.push(`/workflows?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleRun();
    }
  };

  return (
    <div className="w-full max-w-4xl mb-12 flex flex-col gap-4">
      <div className="relative group">
        <input
          type="text"
          className="w-full bg-[#131622] border border-[#212638] rounded-xl pl-6 pr-44 py-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-lg"
          placeholder="Ask a question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
          <span className="text-xs text-slate-500 hidden sm:inline-block">cmd + enter</span>
          <button 
            onClick={handleRun}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            Run Orchestration <Play size={14} fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {suggestions.map((sugg, idx) => (
          <button
            key={idx}
            onClick={() => setQuery(sugg)}
            className="px-3 py-1.5 rounded-full border border-[#212638] bg-[#0A0D15] text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors"
          >
            {sugg}
          </button>
        ))}
      </div>
    </div>
  );
}

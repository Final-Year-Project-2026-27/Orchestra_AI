import { CommandInput } from "@/components/CommandInput";
import { FeatureCards } from "@/components/FeatureCards";

export default function AgentsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-semibold mb-2 text-white tracking-tight">Ask a question. Watch the agents work.</h1>
      <p className="text-slate-400 mb-8 text-sm max-w-2xl">
        Initiate automated deep-dive parallel research with real-time multi-agent tracing and fact-checking.
      </p>
      
      <CommandInput />
      <FeatureCards />
    </div>
  );
}

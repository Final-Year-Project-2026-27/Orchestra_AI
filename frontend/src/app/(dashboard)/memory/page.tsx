import { Database, HardDrive, Cpu } from "lucide-react";

export default function MemoryPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-semibold mb-2 text-white">Memory & Tokens</h1>
      <p className="text-slate-400 mb-8 max-w-2xl">
        Monitor your token consumption and long-term vector storage usage.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-10 max-w-4xl">
        <div className="bg-[#10131E] border border-[#1e2330] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="text-indigo-400" />
            <h2 className="text-lg font-medium text-white">Token Usage (Current Cycle)</h2>
          </div>
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-bold text-white">7.8M</span>
            <span className="text-slate-400 text-sm">/ 10M Limit</span>
          </div>
          <div className="w-full bg-[#1A1F2C] rounded-full h-2.5 mb-2">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
          </div>
          <p className="text-xs text-slate-500">78% of your monthly allocation used.</p>
        </div>

        <div className="bg-[#10131E] border border-[#1e2330] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <HardDrive className="text-emerald-400" />
            <h2 className="text-lg font-medium text-white">Vector Storage</h2>
          </div>
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-bold text-white">1.2 GB</span>
            <span className="text-slate-400 text-sm">/ 5.0 GB</span>
          </div>
          <div className="w-full bg-[#1A1F2C] rounded-full h-2.5 mb-2">
            <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '24%' }}></div>
          </div>
          <p className="text-xs text-slate-500">24% of vector storage capacity used.</p>
        </div>
      </div>

      <h2 className="text-xl font-medium text-white mb-4">Current Plan</h2>
      <div className="bg-[#10131E] border border-indigo-500/30 rounded-xl p-6 max-w-4xl relative overflow-hidden">
        <div className="absolute top-0 right-0 px-4 py-1 bg-indigo-600/20 text-indigo-400 text-xs font-bold rounded-bl-lg">
          ACTIVE
        </div>
        <div className="flex items-center gap-4 mb-4">
          <Database className="text-indigo-400" size={32} />
          <div>
            <h3 className="text-lg font-semibold text-white">Pro Plan</h3>
            <p className="text-slate-400 text-sm">Advanced capabilities for orchestrating complex multi-agent architectures.</p>
          </div>
        </div>
        
        <ul className="text-sm text-slate-300 space-y-2 mt-6">
          <li className="flex items-center gap-2">✓ 10M Tokens per month</li>
          <li className="flex items-center gap-2">✓ 5GB Vector Storage</li>
          <li className="flex items-center gap-2">✓ Up to 15 parallel agents</li>
          <li className="flex items-center gap-2">✓ Priority live execution trace</li>
        </ul>
      </div>
    </div>
  );
}

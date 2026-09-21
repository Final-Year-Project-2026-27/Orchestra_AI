"use client";
import { useState } from "react";
import { CheckCircle2, ShieldAlert } from "lucide-react";

export default function ExecutionsPage() {
  const [askEveryTime, setAskEveryTime] = useState(true);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-semibold mb-2 text-white">Execution Overrides</h1>
      <p className="text-slate-400 mb-8 max-w-2xl">
        Manage how the orchestrator handles critical operations and wait-steps during an active run.
      </p>

      <div className="max-w-3xl bg-[#10131E] border border-[#1e2330] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#1e2330]">
          <div className="flex items-start justify-between">
             <div className="flex items-start gap-4">
               <ShieldAlert className="text-amber-500 shrink-0 mt-1" />
               <div>
                 <h2 className="text-lg font-medium text-white mb-1">Human-in-the-loop Approval</h2>
                 <p className="text-sm text-slate-400">
                   When the agent initiates a potentially destructive action, a purchase, or a system-level override, should the system always pause for human approval?
                 </p>
               </div>
             </div>
          </div>
        </div>
        
        <div className="p-6 bg-[#0A0D15]">
          <div className="border border-[#1e2330] rounded-lg overflow-hidden divide-y divide-[#1e2330]">
            
            {/* Option 1 */}
            <label className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${askEveryTime ? "bg-indigo-600/10" : "hover:bg-[#131622]"}`}>
               <input 
                 type="radio" 
                 name="approval" 
                 checked={askEveryTime} 
                 onChange={() => setAskEveryTime(true)} 
                 className="w-4 h-4 text-indigo-600 focus:ring-indigo-600 bg-[#1A1F2C] border-[#2A3143]"
               />
               <div className="flex-1">
                 <div className="flex justify-between">
                   <h3 className={`font-medium ${askEveryTime ? "text-indigo-400" : "text-slate-200"}`}>Ask Everytime (Recommended)</h3>
                   {askEveryTime && <CheckCircle2 size={18} className="text-indigo-400" />}
                 </div>
                 <p className="text-sm text-slate-500 mt-1">
                    The orchestrator will pause the execution trace and wait until you manually approve the action.
                 </p>
               </div>
            </label>

            {/* Option 2 */}
            <label className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${!askEveryTime ? "bg-amber-500/10" : "hover:bg-[#131622]"}`}>
               <input 
                 type="radio" 
                 name="approval" 
                 checked={!askEveryTime} 
                 onChange={() => setAskEveryTime(false)} 
                 className="w-4 h-4 text-indigo-600 focus:ring-indigo-600 bg-[#1A1F2C] border-[#2A3143]"
               />
               <div className="flex-1">
                 <div className="flex justify-between">
                   <h3 className={`font-medium ${!askEveryTime ? "text-amber-500" : "text-slate-200"}`}>Always Pass</h3>
                   {!askEveryTime && <CheckCircle2 size={18} className="text-amber-500" />}
                 </div>
                 <p className="text-sm text-slate-500 mt-1">
                    Agents have full autonomy to proceed. <span className="text-amber-600/80">Use with caution, as this skips manual review.</span>
                 </p>
               </div>
            </label>

          </div>
        </div>
      </div>
    </div>
  );
}

import { Activity, Users, Database, Zap } from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-semibold mb-2 text-white">System Overview</h1>
      <p className="text-slate-400 mb-8 max-w-2xl">
        High-level metrics and current active state of your Orchestra AI cluster.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Active Agents" value="12" icon={<Users className="text-indigo-400" />} />
        <StatCard title="Workflows Live" value="4" icon={<Activity className="text-emerald-400" />} />
        <StatCard title="Memory Used" value="1.2 GB" icon={<Database className="text-amber-400" />} />
        <StatCard title="Tasks/Hour" value="342" icon={<Zap className="text-cyan-400" />} />
      </div>

      <div className="bg-[#10131E] border border-[#1e2330] rounded-xl p-6 h-96 flex items-center justify-center text-slate-500">
        [ system graph component placeholder ]
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-[#10131E] border border-[#1e2330] rounded-xl p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-[#181C2A] flex items-center justify-center border border-[#212638]">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-2xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

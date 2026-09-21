import { ShieldCheck, GitPullRequest, Award } from "lucide-react";

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mb-12">
      <Card
        icon={<ShieldCheck className="text-indigo-400" size={24} />}
        title="Guardrail-first"
        badge="PROMPT ANALYSIS"
        description="Every user prompt is pre-scanned and sanitized for structural payload threats and prompt injections before agent hand-off."
      />
      <Card
        icon={<GitPullRequest className="text-emerald-400" size={24} />}
        title="Parallel research"
        badge="WEB + VECTOR CHECK"
        description="Orchestrator spawns concurrent query tasks directly querying live search indexes and vector DB vectors."
      />
      <Card
        icon={<Award className="text-amber-400" size={24} />}
        title="Verified citations"
        badge="ACCURACY FLAGS"
        description="Claims are cross-compared dynamically. Sources lacking cryptographic or structural proof are flagged for evaluation."
      />
    </div>
  );
}

function Card({
  title,
  description,
  icon,
  badge,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
}) {
  return (
    <div className="bg-[#10131E] border border-[#1e2330] rounded-xl p-6 flex flex-col gap-4 hover:border-slate-700 transition-colors">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-lg bg-[#181C2A] flex items-center justify-center border border-[#212638]">
          {icon}
        </div>
        <span className="text-[10px] font-bold tracking-wider text-indigo-400 uppercase">
          {badge}
        </span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

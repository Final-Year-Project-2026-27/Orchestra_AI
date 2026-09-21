"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Cpu,
  Workflow,
  Wrench,
  Database,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`border-r border-[#1e2330] bg-[#0A0D15] flex flex-col h-screen text-slate-400 font-medium transition-all duration-300 relative ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-[#1e2330] rounded-full p-1 border border-[#2A3143] hover:bg-slate-700 transition"
      >
        {isCollapsed ? <ChevronRight size={14} className="text-white" /> : <ChevronLeft size={14} className="text-white" />}
      </button>

      <div className={`p-6 flex items-center gap-3 text-white ${isCollapsed ? "justify-center px-0" : ""}`}>
        <div className="w-8 h-8 flex-shrink-0 bg-indigo-500 rounded-md flex items-center justify-center">
          <span className="text-xs font-bold">{'>_'}</span>
        </div>
        {!isCollapsed && <span className="text-lg font-semibold tracking-wide truncate">Orchestra AI</span>}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <NavItem
          href="/overview"
          icon={<LayoutDashboard size={20} />}
          label="Overview"
          collapsed={isCollapsed}
          active={pathname === "/overview"}
        />
        <NavItem
          href="/agents"
          icon={<Cpu size={20} />}
          label="Agents"
          collapsed={isCollapsed}
          active={pathname === "/agents"}
        />
        <NavItem
          href="/workflows"
          icon={<Workflow size={20} />}
          label="Workflows"
          badge={!isCollapsed ? "Live" : undefined}
          collapsed={isCollapsed}
          active={pathname === "/workflows"}
        />
        <NavItem
          href="/tools"
          icon={<Wrench size={20} />}
          label="Tools"
          collapsed={isCollapsed}
          active={pathname === "/tools"}
        />
        <NavItem
          href="/memory"
          icon={<Database size={20} />}
          label="Memory"
          collapsed={isCollapsed}
          active={pathname === "/memory"}
        />
        <NavItem
          href="/executions"
          icon={<Activity size={20} />}
          label="Executions"
          collapsed={isCollapsed}
          active={pathname === "/executions"}
        />
      </nav>

      <div className="p-4 border-t border-[#1e2330]">
         <NavItem
          href="/settings"
          icon={<Settings size={20} />}
          label="Settings"
          collapsed={isCollapsed}
          active={pathname === "/settings"}
        />
      </div>
    </aside>
  );
}

function NavItem({
  href,
  icon,
  label,
  active,
  badge,
  collapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 py-2.5 rounded-lg transition-colors group ${
        collapsed ? "justify-center px-0" : "px-3"
      } ${
        active
          ? "bg-[#1C1F2B] text-indigo-400"
          : "hover:bg-[#1C1F2B] hover:text-white"
      }`}
      title={collapsed ? label : undefined}
    >
      <div className={`${active ? "text-indigo-400" : "text-slate-400 group-hover:text-white"}`}>
        {icon}
      </div>
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white px-2 py-0.5 rounded-sm">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

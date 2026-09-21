"use client";
import { useState, useEffect } from "react";
import { User, Lock, Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    // In a real app we'd apply this to document.documentElement
    if (nextTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <h1 className="text-3xl font-semibold mb-2 text-white">Settings</h1>
       <p className="text-slate-400 mb-8">
        Manage your account preferences, appearance, and credentials.
      </p>

      <div className="space-y-6">
        
        {/* Profile Settings */}
        <div className="bg-[#10131E] border border-[#1e2330] rounded-xl p-6">
          <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <User size={18} className="text-indigo-400" /> Account Settings
          </h2>
          <div className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Username</label>
                <input 
                  type="text" 
                  defaultValue="ai_orchestrator_admin"
                  className="w-full bg-[#131622] border border-[#212638] rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                <input 
                  type="email" 
                  defaultValue="admin@orchestrator.ai"
                  className="w-full bg-[#131622] border border-[#212638] rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
             </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-[#10131E] border border-[#1e2330] rounded-xl p-6">
          <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Lock size={18} className="text-emerald-400" /> Security
          </h2>
          <div className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Current Password</label>
                <input 
                  type="password" 
                  placeholder="********"
                  className="w-full bg-[#131622] border border-[#212638] rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">New Password</label>
                <input 
                  type="password" 
                  className="w-full bg-[#131622] border border-[#212638] rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
             </div>
             <div className="flex justify-end pt-2">
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors">
                  Update Password
                </button>
             </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-[#10131E] border border-[#1e2330] rounded-xl p-6">
          <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            {theme === "dark" ? (
              <Moon size={18} className="text-amber-200" />
            ) : (
              <Sun size={18} className="text-amber-500" />
            )}
             Appearance
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-200 font-medium">Theme Preference</p>
              <p className="text-sm text-slate-400">Light or dark mode</p>
            </div>
            <button 
              onClick={toggleTheme}
              className="px-4 py-2 border border-[#212638] bg-[#1A1F2C] hover:bg-[#212638] text-slate-200 text-sm font-medium rounded-lg transition-colors"
            >
              Toggle to {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

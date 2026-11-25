"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/overview");
  };

  const fillDemoCredentials = () => {
    setEmail("researcher@orchestra.ai");
    setPassword("Orchestra2026!");
  };

  return (
    <div className="min-h-screen bg-[#06080C] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center flex-col items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Sign in to Orchestra AI
          </h2>
          <p className="text-slate-400 text-sm">
            Or create a new account to deploy agents.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#10131E] py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-[#1e2330]">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-[#212638] rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#131622] text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-[#212638] rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#131622] text-white"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>
          
          <div className="mt-6 pt-5 border-t border-[#212638] flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Sample workspace: <span className="font-mono text-slate-300">researcher@orchestra.ai</span>
            </span>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-2 whitespace-nowrap"
            >
              Fill Demo Credentials
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

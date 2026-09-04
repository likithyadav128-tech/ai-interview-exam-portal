import React from 'react';
import { GraduationCap, Loader2 } from 'lucide-react';

export default function AuthLoading({ message = "Checking your session..." }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center select-none">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/20 ring-1 ring-white/20 animate-pulse">
          <GraduationCap className="w-9 h-9" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg">
          <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
        </div>
      </div>

      <div className="space-y-1.5 max-w-xs">
        <h2 className="text-base font-bold text-white tracking-tight">
          AI Career & Placement Portal
        </h2>
        <p className="text-xs text-slate-400">
          {message}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-2 text-[11px] text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>Enterprise Single Sign-On Active</span>
      </div>
    </div>
  );
}

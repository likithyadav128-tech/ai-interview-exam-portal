import React from "react";
import { TrendingUp, Award, Layers, Bot } from "lucide-react";

export const AuthVisual: React.FC = () => {
  return (
    <div className="relative mx-auto w-full max-w-md py-6" aria-hidden="true">
      {/* Decorative ambient backdrop */}
      <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Abstract Analytical Placement Pipeline Cards */}
      <div className="relative z-10 space-y-3.5">
        
        {/* Card 1: Resume <-> Job Description AI Match */}
        <div className="flex items-center justify-between rounded-2xl border border-primary/15 bg-card/80 p-4 shadow-sm backdrop-blur-md transition-all hover:border-primary/30">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-primary">
              <Layers className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-foreground">Target Role Calibration</div>
              <div className="text-[11px] text-muted-foreground">TCS Prime & Elite AI Bands</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            89% Matched
          </div>
        </div>

        {/* Card 2: Skill-Gap Diagnostic Vector */}
        <div className="flex items-center justify-between rounded-2xl border border-primary/15 bg-card/80 p-4 shadow-sm backdrop-blur-md transition-all hover:border-primary/30 ml-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Bot className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-foreground">Technical Mock Interview</div>
              <div className="text-[11px] text-muted-foreground">RAG & System Architecture</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-extrabold text-foreground">Top 5%</div>
            <div className="text-[10px] text-muted-foreground">Campus Benchmark</div>
          </div>
        </div>

        {/* Card 3: Placement Readiness Metric */}
        <div className="flex items-center justify-between rounded-2xl border border-primary/15 bg-card/80 p-4 shadow-sm backdrop-blur-md transition-all hover:border-primary/30">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-foreground">Readiness Index</div>
              <div className="text-[11px] text-muted-foreground">Predicted CTC: ₹18 - 22 LPA</div>
            </div>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-xs shadow-sm">
            A+
          </div>
        </div>

      </div>
    </div>
  );
};

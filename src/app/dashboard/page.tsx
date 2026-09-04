"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { ProductLogo } from "@/components/branding/ProductLogo";
import { CollegeLogo } from "@/components/branding/CollegeLogo";
import { BRANDING_CONFIG } from "@/config/branding";
import { 
  LogOut, 
  Sparkles, 
  ShieldCheck, 
  UserCheck, 
  Layers, 
  Building2, 
  FileText, 
  Bot,
  Calendar,
  CheckCircle2
} from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();

  const studentName = session?.user?.name || "Student";
  const studentEmail = session?.user?.email || `student@${BRANDING_CONFIG.collegeEmailDomain}`;
  const department = (session?.user as any)?.department || "Computer Science & Engineering";
  const graduationYear = (session?.user as any)?.graduationYear || "2026";

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <ProductLogo size={36} showSubtitle={false} />
            <div className="hidden sm:block h-5 w-[1px] bg-border" />
            <div className="hidden sm:block">
              <CollegeLogo size={32} showName={false} />
            </div>
          </div>

          {/* Student Profile & Sign Out */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-foreground truncate max-w-[180px]">
                {studentName}
              </span>
              <span className="text-[11px] text-muted-foreground truncate max-w-[180px]">
                {studentEmail}
              </span>
            </div>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Authenticated Dashboard Placeholder */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Authenticated Student Portal • {BRANDING_CONFIG.collegeShortName}</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
              Welcome to <span className="text-primary">{BRANDING_CONFIG.productName}</span>
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg max-w-xl mx-auto">
              Your placement preparation journey starts here.
            </p>
          </div>

          {/* Student Identity Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <UserCheck className="h-4 w-4 text-primary" />
                <span>Student Identity</span>
              </div>
              <div className="mt-2 text-sm font-bold text-foreground">{studentName}</div>
              <div className="text-xs text-muted-foreground truncate">{studentEmail}</div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <Building2 className="h-4 w-4 text-primary" />
                <span>Department</span>
              </div>
              <div className="mt-2 text-sm font-bold text-foreground">{department}</div>
              <div className="text-xs text-muted-foreground">Batch of {graduationYear}</div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Authentication Status</span>
              </div>
              <div className="mt-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Microsoft SSO Verified</span>
              </div>
              <div className="text-xs text-muted-foreground">Single Tenant Access Active</div>
            </div>

          </div>

          {/* Upcoming Modules Preview Card */}
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-8 text-left space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">
                Upcoming Preparation Modules (Next Release)
              </h2>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                Foundational Phase Complete
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {[
                { icon: FileText, title: "Resume ↔ JD Matching", desc: "17-Dimension parsing" },
                { icon: Layers, title: "Skill-Gap Analyzer", desc: "4-Layer diagnostics" },
                { icon: Bot, title: "AI Interview Panel", desc: "Technical & Behavioral" },
                { icon: CheckCircle2, title: "Readiness Index", desc: "Predictive CTC matrix" },
              ].map((mod, idx) => {
                const Icon = mod.icon;
                return (
                  <div key={idx} className="rounded-xl border border-border bg-card p-3.5 space-y-1">
                    <Icon className="h-4 w-4 text-primary" />
                    <div className="font-bold text-foreground">{mod.title}</div>
                    <div className="text-muted-foreground">{mod.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        <p>
          {BRANDING_CONFIG.productName} • {BRANDING_CONFIG.collegeName} • Placement Season 2026
        </p>
      </footer>

    </div>
  );
}

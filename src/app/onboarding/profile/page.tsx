"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductLogo } from "@/components/branding/ProductLogo";
import { CollegeLogo } from "@/components/branding/CollegeLogo";
import { BRANDING_CONFIG } from "@/config/branding";
import { ArrowRight, Sparkles, UserCheck, GraduationCap, Building2, CheckCircle2 } from "lucide-react";

export default function OnboardingProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [graduationYear, setGraduationYear] = useState("2026");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const studentName = session?.user?.name || "Student";
  const studentEmail = session?.user?.email || `student@${BRANDING_CONFIG.collegeEmailDomain}`;

  const handleCompleteSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Update session to mark profile as completed
      await update({
        profileCompleted: true,
        department,
        graduationYear: parseInt(graduationYear),
      });

      router.push("/dashboard");
    } catch (err) {
      console.error("[Onboarding] Error updating profile:", err);
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-muted/20 text-foreground">
      
      <div className="w-full max-w-lg space-y-6 rounded-3xl border border-border/80 bg-card p-8 shadow-xl sm:p-10 text-left">
        
        {/* Header Branding */}
        <div className="flex items-center justify-between border-b border-border/60 pb-5">
          <ProductLogo size={38} showSubtitle={false} />
          <CollegeLogo size={36} showName={false} />
        </div>

        {/* Welcome Text */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>First-Time Setup</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome to {BRANDING_CONFIG.productName}
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Let's set up your student profile to personalize your placement roadmap.
          </p>
        </div>

        {/* Authenticated Account Info Badge */}
        <div className="flex items-center gap-3 rounded-2xl bg-muted/50 p-4 border border-border/60">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
            <UserCheck className="h-5 w-5" />
          </div>
          <div className="space-y-0.5 text-xs truncate">
            <div className="font-bold text-foreground truncate">{studentName}</div>
            <div className="text-muted-foreground truncate">{studentEmail}</div>
            <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ Verified {BRANDING_CONFIG.collegeShortName} Account
            </div>
          </div>
        </div>

        {/* Profile Onboarding Form */}
        <form onSubmit={handleCompleteSetup} className="space-y-4 pt-1">
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Department / Branch
            </label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-11 rounded-xl border border-input bg-background pl-10 pr-4 text-xs font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                <option value="Information Technology">Information Technology (IT)</option>
                <option value="Artificial Intelligence & Data Science">AI & Data Science (AI&DS)</option>
                <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                <option value="Electrical & Electronics">Electrical & Electronics (EEE)</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Graduation Batch
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <select
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                className="w-full h-11 rounded-xl border border-input bg-background pl-10 pr-4 text-xs font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="2026">2026 Batch (Current Final-Year)</option>
                <option value="2027">2027 Batch (Pre-Final Year)</option>
                <option value="2028">2028 Batch (Second Year)</option>
                <option value="2025">2025 Batch (Recent Graduate)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md shadow-primary/25 hover:bg-primary/90 active:scale-[0.99] transition-all disabled:opacity-60"
          >
            <span>{isSubmitting ? "Saving Profile..." : "Continue to Dashboard"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="text-center text-[11px] text-muted-foreground">
          You can edit your academic preferences anytime from your profile settings.
        </p>

      </div>

    </main>
  );
}

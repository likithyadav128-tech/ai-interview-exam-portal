"use client";

import React, { useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { CollegeLogo } from "@/components/branding/CollegeLogo";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthVisual } from "@/components/auth/AuthVisual";
import { Shield, Sparkles, CheckCircle2 } from "lucide-react";

function LoginCardContainer() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  return <AuthCard errorCode={errorParam} callbackUrl={callbackUrl} />;
}

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If already authenticated, redirect smoothly without flashing login screen
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const isProfileCompleted = (session.user as any)?.profileCompleted;
      if (isProfileCompleted) {
        router.replace("/dashboard");
      } else {
        router.replace("/onboarding/profile");
      }
    }
  }, [status, session, router]);

  return (
    <main className="flex min-h-screen flex-col lg:flex-row bg-background text-foreground">
      
      {/* ================= LEFT PANEL: BRAND & PRODUCT INTRODUCTION (Desktop ~50%) ================= */}
      <section 
        aria-label="Institutional Career Platform Introduction"
        className="relative hidden lg:flex lg:w-1/2 flex-col justify-between border-r border-border/70 bg-muted/30 p-10 xl:p-16 overflow-hidden select-none"
      >
        {/* Subtle background ambient blur */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

        {/* Top College Logo */}
        <div className="relative z-10">
          <CollegeLogo size={44} showName={true} />
        </div>

        {/* Core Product Headline & Value Propositions */}
        <div className="relative z-10 space-y-6 my-auto max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI-Powered Placement Intelligence</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Prepare smarter. <br />
              <span className="text-primary">Know when you're ready.</span>
            </h1>

            <p className="text-sm xl:text-base text-muted-foreground leading-relaxed">
              Analyze your resume. Understand your skill gaps. Practice technical interviews. Measure your placement readiness for top campus recruitment drives.
            </p>
          </div>

          {/* Abstract AI / Analytics Visual */}
          <AuthVisual />

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              "Resume ↔ JD Matching",
              "14+ Company Simulators",
              "4-Layer Skill Diagnostics",
              "Verified Readiness Score",
            ].map((pillar, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-medium text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{pillar}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Institutional Disclaimer */}
        <div className="relative z-10 border-t border-border/60 pt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span>Official Placement Cell Identity Gateway</span>
          </div>
          <span>Microsoft Entra ID Protected</span>
        </div>
      </section>


      {/* ================= RIGHT PANEL: AUTHENTICATION CARD ================= */}
      <section 
        aria-label="Student Sign-In Form"
        className="flex flex-1 flex-col items-center justify-center p-6 sm:p-10 lg:p-12"
      >
        {/* Mobile-only College Logo */}
        <div className="mb-6 flex lg:hidden">
          <CollegeLogo size={40} showName={true} />
        </div>

        <Suspense fallback={<div className="h-96 w-full max-w-md animate-pulse rounded-3xl bg-muted/40" />}>
          <LoginCardContainer />
        </Suspense>
      </section>

    </main>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ProductLogo } from "@/components/branding/ProductLogo";
import { MicrosoftSignInButton } from "./MicrosoftSignInButton";
import { AuthError } from "./AuthError";
import { BRANDING_CONFIG } from "@/config/branding";
import { ShieldCheck } from "lucide-react";

interface AuthCardProps {
  errorCode: string | null;
  callbackUrl?: string;
  onRetry?: () => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  errorCode,
  callbackUrl = "/dashboard",
  onRetry,
}) => {
  return (
    <div className="w-full max-w-md space-y-6 rounded-3xl border border-border/80 bg-card p-8 shadow-xl shadow-black/5 dark:shadow-black/20 sm:p-10">
      
      {/* Top Card Header */}
      <div className="space-y-3 text-left">
        <ProductLogo size={42} showSubtitle={false} />

        <div className="space-y-1.5 pt-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome back
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Sign in using your official {BRANDING_CONFIG.collegeShortName} college Microsoft account.
          </p>
        </div>
      </div>

      {/* Error Alert Display */}
      {errorCode && (
        <AuthError errorCode={errorCode} onRetry={onRetry} />
      )}

      {/* Main Single Sign-On Button */}
      <div className="space-y-3 pt-1">
        <MicrosoftSignInButton callbackUrl={callbackUrl} />
      </div>

      {/* Security & Access Restriction Notice */}
      <div className="flex items-start gap-2.5 rounded-xl bg-muted/60 p-3.5 text-left text-xs text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="leading-relaxed">
          Only authorized accounts from <span className="font-semibold text-foreground">@{BRANDING_CONFIG.collegeEmailDomain}</span> can access this platform.
        </p>
      </div>

      {/* Footer / Privacy & Terms */}
      <div className="border-t border-border/60 pt-4 text-center text-xs text-muted-foreground">
        <nav aria-label="Legal links" className="flex items-center justify-center gap-4">
          <Link
            href={BRANDING_CONFIG.privacyUrl}
            className="hover:text-foreground underline-offset-4 hover:underline transition-colors"
          >
            Privacy Policy
          </Link>
          <span>•</span>
          <Link
            href={BRANDING_CONFIG.termsUrl}
            className="hover:text-foreground underline-offset-4 hover:underline transition-colors"
          >
            Terms of Service
          </Link>
          <span>•</span>
          <a
            href={`mailto:${BRANDING_CONFIG.tpoEmail}`}
            className="hover:text-foreground underline-offset-4 hover:underline transition-colors"
          >
            TPO Support
          </a>
        </nav>
      </div>

    </div>
  );
};

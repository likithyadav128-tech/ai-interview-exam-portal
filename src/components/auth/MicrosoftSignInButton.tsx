"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

interface MicrosoftSignInButtonProps {
  callbackUrl?: string;
  className?: string;
  onInitiate?: () => void;
}

export const MicrosoftSignInButton: React.FC<MicrosoftSignInButtonProps> = ({
  callbackUrl = "/dashboard",
  className = "",
  onInitiate,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (isLoading) return; // Prevent double-clicks
    setIsLoading(true);
    if (onInitiate) onInitiate();

    try {
      await signIn("azure-ad", {
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      console.error("[Auth] Microsoft sign-in initiation error:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={isLoading}
      aria-label="Sign in using your official college Microsoft account"
      aria-busy={isLoading}
      className={`
        relative flex h-12 w-full items-center justify-center gap-3.5 rounded-xl border border-border
        bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-200
        hover:border-primary/40 hover:bg-muted/60 active:scale-[0.99]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-card disabled:active:scale-100
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center gap-2.5 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="font-medium text-foreground">Redirecting to Microsoft...</span>
        </div>
      ) : (
        <>
          {/* Official Microsoft Quad-Color Logo */}
          <svg
            className="h-5 w-5 shrink-0"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="1" y="1" width="9" height="9" fill="#F25022" />
            <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
            <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
            <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
          </svg>
          <span className="tracking-tight">Sign in with Microsoft</span>
        </>
      )}
    </button>
  );
};

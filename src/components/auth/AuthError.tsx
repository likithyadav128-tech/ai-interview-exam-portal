"use client";

import React from "react";
import { AlertCircle, RefreshCw, X, ShieldAlert } from "lucide-react";

interface AuthErrorProps {
  errorCode: string | null;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export const AuthError: React.FC<AuthErrorProps> = ({
  errorCode,
  onRetry,
  onDismiss,
}) => {
  if (!errorCode) return null;

  const getErrorContent = (code: string) => {
    switch (code) {
      case "Callback":
      case "OAuthCallback":
      case "OAuthSignin":
      case "OAuthCreateAccount":
        return {
          title: "Authentication Failed",
          message: "We couldn't complete your sign-in. Please try again.",
          isTenantError: false,
        };
      case "WrongOrganization":
      case "AccessDenied":
        return {
          title: "Unauthorized Account",
          message: "This account is not authorized to access the college placement platform.",
          isTenantError: true,
        };
      case "PersonalAccount":
        return {
          title: "College Account Required",
          message: "Please sign in using your official college Microsoft account.",
          isTenantError: true,
        };
      case "UserCancelled":
      case "user_cancelled":
        return {
          title: "Sign-in Cancelled",
          message: "Sign-in was cancelled. Please try again.",
          isTenantError: false,
        };
      case "SessionExpired":
        return {
          title: "Session Expired",
          message: "Your session has expired. Please sign in again.",
          isTenantError: false,
        };
      case "NetworkError":
        return {
          title: "Connection Error",
          message: "Unable to connect. Check your internet connection and try again.",
          isTenantError: false,
        };
      default:
        return {
          title: "Sign-in Issue",
          message: "We couldn't complete your sign-in. Please try again.",
          isTenantError: false,
        };
    }
  };

  const { title, message, isTenantError } = getErrorContent(errorCode);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        relative flex flex-col gap-2.5 rounded-2xl border p-4 text-left shadow-sm animate-fadeIn
        ${
          isTenantError
            ? "border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-200"
            : "border-destructive/30 bg-destructive/10 text-destructive dark:text-red-300"
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          {isTenantError ? (
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive dark:text-red-400" />
          )}
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold uppercase tracking-wider">{title}</h4>
            <p className="text-xs leading-relaxed opacity-95">{message}</p>
          </div>
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss error notification"
            className="rounded-lg p-1 text-muted-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {onRetry && (
        <div className="pt-1 flex justify-end">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 text-xs font-bold underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Try again</span>
          </button>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Official Microsoft Brand-Compliant Sign-In Button
 * Adheres to Microsoft Identity Platform Design Guidelines:
 * - Official quad-color square Microsoft logo (21x21px)
 * - 48px height touch target
 * - Clean Segoe UI / Inter font styling
 * - Normal, Loading, Focus, and Disabled states
 */
export default function MicrosoftLoginButton({ 
  onClick, 
  isLoading = false, 
  disabled = false,
  text = "Continue with Microsoft",
  className = "" 
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label="Sign in with your Microsoft account"
      className={`
        w-full h-12 px-4 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 
        text-white font-medium text-sm transition-all duration-200
        flex items-center justify-center gap-3 relative
        shadow-sm hover:shadow-md hover:border-slate-600 active:scale-[0.99]
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900 disabled:active:scale-100
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center gap-2.5 text-slate-300">
          <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
          <span>Signing in with Microsoft...</span>
        </div>
      ) : (
        <>
          {/* Official Microsoft Quad-Color Logo */}
          <svg 
            className="w-5 h-5 shrink-0" 
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
          <span className="font-semibold tracking-tight text-slate-100">{text}</span>
        </>
      )}
    </button>
  );
}

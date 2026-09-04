import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function AuthError({ message, onDismiss, onRetry }) {
  if (!message) return null;

  return (
    <div 
      role="alert" 
      aria-live="polite"
      className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-left flex items-start justify-between gap-3 animate-fadeIn text-xs"
    >
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-red-200">{message}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="text-[11px] font-bold text-red-400 hover:text-red-300 underline underline-offset-2"
            >
              Try again
            </button>
          )}
        </div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="text-slate-400 hover:text-slate-200 p-1 rounded-md transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

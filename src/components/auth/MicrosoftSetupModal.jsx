import React, { useState } from 'react';
import { X, ShieldAlert, KeyRound, ExternalLink, Check, Copy, HelpCircle } from 'lucide-react';
import { getStoredClientId, getStoredTenantId, getRedirectUri } from '../../auth/authConfig';

export default function MicrosoftSetupModal({ isOpen, onClose, onSaveConfig }) {
  const [clientId, setClientId] = useState(getStoredClientId() || '');
  const [tenantId, setTenantId] = useState(getStoredTenantId() || 'common');
  const [copied, setCopied] = useState(false);
  const redirectUri = getRedirectUri();

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(redirectUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (clientId.trim()) {
      onSaveConfig(clientId.trim(), tenantId.trim());
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Microsoft Entra ID (Azure AD) Setup
              </h2>
              <p className="text-xs text-slate-400">Configure Real Microsoft Single Sign-On</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Banner */}
        <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>Why is Client ID required?</span>
          </div>
          <p className="leading-relaxed">
            Microsoft Identity Platform requires an authorized <strong>Application (Client) ID</strong> registered in Microsoft Entra Admin Center. Once entered, clicking "Continue with Microsoft" will open the real official Microsoft login window requiring your Microsoft password and 2FA.
          </p>
        </div>

        {/* 3 Step Instructions */}
        <div className="space-y-3 text-xs text-slate-300">
          <div className="font-bold text-white uppercase tracking-wider text-[11px]">
            Quick 2-Minute Setup Steps:
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-semibold text-white flex items-center justify-between">
                <span>1. Register App in Microsoft Entra ID</span>
                <a 
                  href="https://entra.microsoft.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold"
                >
                  <span>Open Azure Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-slate-400">
                Click <strong>+ New registration</strong> &rarr; Select <strong>Single-page application (SPA)</strong>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="font-semibold text-white">
                2. Set this exact Redirect URI in Azure:
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg font-mono text-[11px] text-blue-300">
                <span className="truncate flex-1">{redirectUri}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white shrink-0 flex items-center gap-1 text-[10px]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form to enter Client ID */}
        <form onSubmit={handleSave} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white uppercase tracking-wider">
              3. Enter your Application (Client) ID
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 4a2b9f31-7e8c-4a11-89b2-3c4d5e6f7a8b"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Directory (Tenant) ID (Optional, default: 'common')
            </label>
            <input
              type="text"
              placeholder="common (for multi-tenant) or your university tenant ID"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
            />
          </div>

          <div className="border-t border-slate-800 pt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Save & Launch Real Microsoft Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

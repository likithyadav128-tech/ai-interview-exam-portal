import React from 'react';
import { X, Shield, FileText, CheckCircle2 } from 'lucide-react';

export default function TermsPrivacyModal({ isOpen, onClose, initialTab = 'terms' }) {
  const [activeTab, setActiveTab] = React.useState(initialTab);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left relative max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              {activeTab === 'terms' ? <FileText className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
            </div>
            <div>
              <h2 id="modal-title" className="text-lg font-bold text-white">
                {activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h2>
              <p className="text-xs text-slate-400">Institutional Placement Portal • Edition 2026</p>
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

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'terms' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'privacy' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed pr-2 scrollbar-thin">
          {activeTab === 'terms' ? (
            <>
              <div className="space-y-2">
                <h3 className="font-bold text-white text-sm">1. Academic & Placement Use</h3>
                <p>
                  This portal is provided for engineering students, faculty, and Training & Placement Officers (TPOs) for academic preparation, technical mock testing, and AI placement readiness calibration.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white text-sm">2. Authenticated Access via Microsoft Entra ID</h3>
                <p>
                  Users authenticate via Microsoft Identity Single Sign-On (SSO). You agree not to share institutional credentials, bypass proctoring controls, or automate testing routines.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white text-sm">3. Score & Assessment Integrity</h3>
                <p>
                  All 80 layer exam questions, coding sandbox evaluations, and company track simulators are calibrated to industry standards. Benchmark scores and predicted CTC ranges serve as placement diagnostic aids.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="font-bold text-white text-sm">1. Information We Collect</h3>
                <p>
                  When signing in via Microsoft, we receive minimal basic profile information (Name, University/Work Email, Unique Account Identifier) under the principle of least privilege (`User.Read`).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white text-sm">2. Data Security & Storage</h3>
                <p>
                  Tokens and authentication states are managed in secure session storage. We do not store, log, or transmit Microsoft passwords. All local project progress is stored client-side or in secure enterprise databases.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white text-sm">3. Compliance with University Data Standards</h3>
                <p>
                  We comply with educational privacy standards. Your diagnostic scores and mock interview transcripts are private to your account and verified institutional evaluators.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}

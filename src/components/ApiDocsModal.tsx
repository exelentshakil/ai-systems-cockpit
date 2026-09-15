"use client";

import { useState } from "react";
import { X, Copy, Check, Code2, Globe, Shield } from "lucide-react";

interface ApiDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApiDocsModal({ isOpen, onClose }: ApiDocsModalProps) {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(key);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const curlReview = `curl -X POST https://ai-systems-cockpit.vercel.app/api/ai/architect-review \\
  -H "Content-Type: application/json" \\
  -d '{
    "repoOrConcept": "tony-brands/alcoeaze-ad-agent",
    "brandScope": "AlcoEaze Supplements",
    "focusArea": "REDUNDANCY_AUDIT"
  }'`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div
        className="w-full max-w-3xl rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 sm:p-6 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[var(--color-brand-primary)] text-white">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                AI Systems Cockpit API & OpenAPI 3.1 Specs
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Programmatic endpoints for repository evaluation, triage, and health telemetry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4 text-xs">
          {/* Endpoint 1: Review */}
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  POST
                </span>
                <span className="font-mono text-xs font-semibold text-[var(--color-text-primary)]">
                  /api/ai/architect-review
                </span>
              </div>
              <button
                onClick={() => handleCopy(curlReview, "review")}
                className="flex items-center gap-1 text-[11px] font-mono text-[var(--color-brand-primary)] hover:underline"
              >
                {copiedEndpoint === "review" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copiedEndpoint === "review" ? "Copied" : "Copy cURL"}</span>
              </button>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mb-2">
              Executes real architectural reasoning against any GitHub repository URL, FDD document, or prompt concept using dual OpenAI / Gemini fallback.
            </p>
            <pre className="p-2.5 rounded bg-[var(--color-panel)] border border-[var(--color-border)] text-[11px] font-mono text-[var(--color-text-primary)] overflow-x-auto leading-relaxed">
              <code>{curlReview}</code>
            </pre>
          </div>

          {/* Endpoint 2: Health */}
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  GET
                </span>
                <span className="font-mono text-xs font-semibold text-[var(--color-text-primary)]">
                  /api/health
                </span>
              </div>
              <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                Returns Provider Health & Active Models
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mb-2">
              Verifies live connectivity for OpenAI, Gemini 2.0 Flash, and deterministic fallback engines.
            </p>
            <pre className="p-2.5 rounded bg-[var(--color-panel)] border border-[var(--color-border)] text-[11px] font-mono text-[var(--color-text-primary)] overflow-x-auto leading-relaxed">
              <code>{`curl -s https://ai-systems-cockpit.vercel.app/api/health`}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[var(--color-brand-primary)] text-xs font-semibold text-white shadow-sm hover:bg-[var(--color-brand-hover)] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

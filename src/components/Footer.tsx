"use client";

import {
  ShieldCheck,
  Cpu,
  Database,
  Layers,
  Sparkles,
  GitBranch,
  Terminal,
  ExternalLink
} from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-panel)] px-0 py-8 transition-colors mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 4 Architectural Decision Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
            <div className="flex items-center gap-2 mb-2 text-[var(--color-brand-primary)]">
              <Layers className="h-4 w-4" />
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)]">
                Deterministic Boundary
              </h4>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Mathematical invariants, inventory POs, and transactional state are locked in deterministic TypeScript. Generative models never touch math.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
            <div className="flex items-center gap-2 mb-2 text-cyan-500">
              <Database className="h-4 w-4" />
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)]">
                Multi-Tenant Memory Isolation
              </h4>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Shared Company Intelligence Layer holds universal SOPs and winning hooks; brand customer PII and API keys are strictly RLS-partitioned.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
            <div className="flex items-center gap-2 mb-2 text-purple-500">
              <Cpu className="h-4 w-4" />
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)]">
                Cost-Aware Model Routing
              </h4>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Claude 3.5 Sonnet for creative scripts; GPT-4o-mini and Gemini 2.0 Flash for extraction ($0.00015/call); zero-token regex for parsing.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
            <div className="flex items-center gap-2 mb-2 text-emerald-500">
              <ShieldCheck className="h-4 w-4" />
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)]">
                Human-in-the-Loop Gates
              </h4>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              All outward-facing influencer DMs, ad spend allocations, and price modifications require 1-click founder sign-off via Inngest step functions.
            </p>
          </div>
        </div>

        {/* Technical Specs & Attribution Strip */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-[var(--color-text-primary)]">
              AI Systems Cockpit v2.4
            </span>
            <span>•</span>
            <span>Next.js 15 App Router</span>
            <span>•</span>
            <span>Inngest Durable Functions</span>
            <span>•</span>
            <span>Dual-Provider AI Fallback</span>
            <span>•</span>
            <span>Supabase pgvector RLS</span>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span>Engineered by</span>
            <a
              href="https://shakilhq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-brand-primary)] hover:underline font-semibold"
            >
              Shakil Ahmed
            </a>
            <span>• BarakahSoft LLC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

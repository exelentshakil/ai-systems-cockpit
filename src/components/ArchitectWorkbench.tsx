"use client";

import { useState } from "react";
import { ArchitectReviewResult } from "@/types";
import { PRESET_AUDIT_PROMPTS } from "@/lib/data";
import {
  BrainCircuit,
  Cpu,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  Merge,
  ExternalLink,
  Layers,
  ArrowRight,
  Database,
  DollarSign,
  Clock,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ArchitectWorkbenchProps {
  onReviewCompleted: (result: ArchitectReviewResult) => void;
  chaosMode: boolean;
  prefillInitiativeText?: string;
}

export function ArchitectWorkbench({
  onReviewCompleted,
  chaosMode,
  prefillInitiativeText,
}: ArchitectWorkbenchProps) {
  const [inputText, setInputText] = useState(
    prefillInitiativeText || PRESET_AUDIT_PROMPTS[0].content
  );
  const [brandScope, setBrandScope] = useState("TikTok Shop Merch");
  const [focusArea, setFocusArea] = useState<
    "REDUNDANCY_AUDIT" | "AGENT_VS_SOFTWARE" | "MODEL_ROUTING" | "SHARED_MEMORY"
  >("REDUNDANCY_AUDIT");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<ArchitectReviewResult | null>(null);

  const handleRunAudit = async (customPrompt?: string) => {
    const textToRun = customPrompt || inputText;
    if (!textToRun.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/ai/architect-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repoOrConcept: textToRun,
          brandScope,
          focusArea,
          simulateChaos: chaosMode,
        }),
      });

      if (res.ok) {
        const data: ArchitectReviewResult = await res.json();
        setCurrentResult(data);
        onReviewCompleted(data);
      }
    } catch (err) {
      console.error("Architectural review failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_AUDIT_PROMPTS[0]) => {
    setInputText(preset.content);
    setBrandScope(preset.brand);
  };

  return (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-6 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Interactive Architectural Audit Workbench
            </h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <BrainCircuit className="h-3.5 w-3.5" />
              Live Dual-AI Advisor
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Test any repository, FDD concept, or automation with real OpenAI & Gemini architectural reasoning
          </p>
        </div>

        {/* Chaos indicator */}
        {chaosMode && (
          <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 animate-pulse">
            <Zap className="h-3.5 w-3.5 fill-current" />
            Chaos Mode: Forcing Gemini Failover
          </span>
        )}
      </div>

      {/* Preset Buttons */}
      <div className="mb-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
          Test With Real Portfolio Presets:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_AUDIT_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(p)}
              className="px-2.5 py-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)] hover:border-[var(--color-brand-primary)]/40 transition-colors whitespace-nowrap shrink-0"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        {/* Main Textarea */}
        <div className="lg:col-span-8 flex flex-col">
          <label className="text-xs font-semibold text-[var(--color-text-primary)] mb-1">
            Target Repository, Prompt Library, or FDD Architecture Concept:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            placeholder="Paste a GitHub repo URL, architecture concept, or FDD excerpt to evaluate..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)] leading-relaxed resize-y"
          />
        </div>

        {/* Configuration Selectors */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          <div>
            <label className="text-xs font-semibold text-[var(--color-text-primary)] mb-1 block">
              Brand / Operational Scope:
            </label>
            <select
              value={brandScope}
              onChange={(e) => setBrandScope(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-1.5 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
            >
              <option value="AlcoEaze Supplements">AlcoEaze Supplements (UGC & Retail)</option>
              <option value="TikTok Shop Merch">TikTok Shop Merch (Creators & DMs)</option>
              <option value="Amazon FBA Health">Amazon FBA Health (Listings & Stock)</option>
              <option value="Cross-Brand Portfolio">Cross-Brand Portfolio (Central Brain)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--color-text-primary)] mb-1 block">
              Architectural Focus Area:
            </label>
            <select
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value as any)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-1.5 text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
            >
              <option value="REDUNDANCY_AUDIT">Redundancy & Consolidation Audit</option>
              <option value="AGENT_VS_SOFTWARE">Agent vs Deterministic Software Decision</option>
              <option value="MODEL_ROUTING">Model Routing & Token Cost Gate</option>
              <option value="SHARED_MEMORY">Shared vs Isolated Memory Architecture</option>
            </select>
          </div>

          <button
            onClick={() => handleRunAudit()}
            disabled={isLoading || !inputText.trim()}
            className="w-full rounded-lg bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[var(--color-brand-hover)] disabled:opacity-50 flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
          >
            {isLoading ? (
              <>
                <Cpu className="h-4 w-4 animate-spin" />
                <span>Evaluating Architecture...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Run Live AI Architecture Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live AI Response Display */}
      {currentResult && (
        <div className="mt-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 transition-all animate-fadeIn">
          {/* Telemetry Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                Advisor Strategic Assessment
              </span>
              <span className="inline-flex items-center gap-1 rounded bg-[var(--color-panel)] px-2 py-0.5 text-[11px] font-mono text-[var(--color-brand-primary)] border border-[var(--color-border)]">
                {currentResult.provider === "OpenAI" ? (
                  <span className="text-emerald-500 font-bold">● OpenAI {currentResult.model}</span>
                ) : currentResult.provider === "Gemini" ? (
                  <span className="text-cyan-500 font-bold">● Gemini {currentResult.model} (Failover)</span>
                ) : (
                  <span className="text-amber-500 font-bold">● Deterministic Rule Engine</span>
                )}
                <span>• {currentResult.latencyMs}ms</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                Monthly Value Recovered:{" "}
                <strong className="text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(currentResult.estimatedMonthlySavings)}/mo
                </strong>
              </span>
            </div>
          </div>

          {/* Core Verdict Badges & Summary */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] p-3.5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Architectural Verdict:
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  {currentResult.verdict}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {currentResult.classification}
                </span>
              </div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                {currentResult.executiveSummary}
              </p>
              <div className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-panel-subtle)] p-2 rounded border border-[var(--color-border-subtle)]">
                <strong className="text-[var(--color-brand-primary)]">Immediate Directive:</strong>{" "}
                {currentResult.recommendedAction}
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] p-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                  <Cpu className="h-3.5 w-3.5 text-purple-500" />
                  <span>Model Strategy & Token Guardrail</span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {currentResult.modelStrategy}
                </p>
              </div>

              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] p-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                  <Database className="h-3.5 w-3.5 text-cyan-500" />
                  <span>Memory Isolation Strategy</span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {currentResult.memoryStrategy}
                </p>
              </div>
            </div>
          </div>

          {/* Reasoning Trace Steps */}
          {currentResult.reasoningTraces && currentResult.reasoningTraces.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
                Audit Execution Trace:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {currentResult.reasoningTraces.map((trace, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-secondary)]">
                    <span className="text-emerald-500">✓</span>
                    <span>{trace}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

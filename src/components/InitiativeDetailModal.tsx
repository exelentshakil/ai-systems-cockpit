"use client";

import { Initiative } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  X,
  FolderGit2,
  Cpu,
  Database,
  TrendingUp,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Merge,
  ExternalLink,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface InitiativeDetailModalProps {
  initiative: Initiative | null;
  onClose: () => void;
  onRunAudit: (init: Initiative) => void;
}

export function InitiativeDetailModal({
  initiative,
  onClose,
  onRunAudit,
}: InitiativeDetailModalProps) {
  if (!initiative) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div
        className="w-full max-w-2xl rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 sm:p-6 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                {initiative.brand}
              </span>
              <span className="text-[var(--color-text-muted)]">•</span>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                {initiative.currentState}
              </span>
            </div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)] mt-1">
              {initiative.name}
            </h3>
            <p className="text-xs font-mono text-[var(--color-text-muted)] mt-0.5">
              {initiative.repoName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 space-y-4 text-xs">
          {/* Description */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">
              System Description:
            </span>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              {initiative.description}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
              <span className="text-[10px] uppercase font-semibold text-[var(--color-text-muted)] block">
                Classification
              </span>
              <span className="text-xs font-bold text-[var(--color-text-primary)] font-mono block mt-0.5 truncate">
                {initiative.classification.replace("_", " ")}
              </span>
            </div>

            <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
              <span className="text-[10px] uppercase font-semibold text-[var(--color-text-muted)] block">
                Strategic Verdict
              </span>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 font-mono block mt-0.5 truncate">
                {initiative.strategicVerdict.replace(/_/g, " ")}
              </span>
            </div>

            <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
              <span className="text-[10px] uppercase font-semibold text-[var(--color-text-muted)] block">
                Labor Saved
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono block mt-0.5">
                {initiative.estimatedLaborHoursSavedPerWeek} hrs/wk
              </span>
            </div>

            <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
              <span className="text-[10px] uppercase font-semibold text-[var(--color-text-muted)] block">
                Revenue Lift
              </span>
              <span className="text-xs font-bold text-[var(--color-brand-primary)] font-mono block mt-0.5">
                {initiative.monthlyRevenueLiftEst > 0
                  ? formatCurrency(initiative.monthlyRevenueLiftEst) + "/mo"
                  : "Labor Focus"}
              </span>
            </div>
          </div>

          {/* Model & Memory Specification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
              <div className="flex items-center gap-1.5 font-semibold text-[var(--color-text-primary)] mb-1">
                <Cpu className="h-3.5 w-3.5 text-purple-500" />
                <span>Recommended Model & Compute</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {initiative.recommendedModel}
              </p>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] mt-1">
                Token Burn: {initiative.monthlyTokenCostEst > 0 ? `~$${initiative.monthlyTokenCostEst}/mo` : "$0.00 (Zero Token Cost)"}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
              <div className="flex items-center gap-1.5 font-semibold text-[var(--color-text-primary)] mb-1">
                <Database className="h-3.5 w-3.5 text-cyan-500" />
                <span>Memory Tier & Tenancy</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {initiative.memoryTier === "SHARED_ENTERPRISE"
                  ? "Shared Company Intelligence Layer (Accessible across brands)"
                  : initiative.memoryTier === "ISOLATED_BRAND_SILO"
                  ? "Strict Brand Silo Isolation (Encrypted & RLS Partitioned)"
                  : "Ephemeral Scratchpad Context (Purged upon completion)"}
              </p>
            </div>
          </div>

          {/* Advisor Assessment Notes */}
          <div className="rounded-lg border border-[var(--color-brand-primary)]/20 bg-[var(--color-brand-subtle)] p-3.5">
            <div className="flex items-center gap-2 mb-1 text-[var(--color-brand-primary)] font-semibold">
              <Sparkles className="h-4 w-4" />
              <span>Architectural Rationale & Strategic Directive:</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              {initiative.architectNotes}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)] transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onRunAudit(initiative);
            }}
            className="px-3 py-1.5 rounded-lg bg-[var(--color-brand-primary)] text-xs font-semibold text-white shadow-sm hover:bg-[var(--color-brand-hover)] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Run Live AI Audit on this Repo</span>
          </button>
        </div>
      </div>
    </div>
  );
}

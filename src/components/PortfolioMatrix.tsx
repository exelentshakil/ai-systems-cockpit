"use client";

import { useState, useMemo } from "react";
import { Initiative, StrategicVerdict, InitiativeClassification } from "@/types";
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Merge,
  ExternalLink,
  Layers,
  Cpu,
  Database,
  ArrowUpRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PortfolioMatrixProps {
  initiatives: Initiative[];
  onSelectInitiative: (init: Initiative) => void;
  onRunAuditOnInitiative: (init: Initiative) => void;
}

export function PortfolioMatrix({
  initiatives,
  onSelectInitiative,
  onRunAuditOnInitiative,
}: PortfolioMatrixProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVerdict, setSelectedVerdict] = useState<string>("ALL");
  const [selectedClassification, setSelectedClassification] = useState<string>("ALL");

  const filteredInitiatives = useMemo(() => {
    return initiatives.filter((init) => {
      const matchesSearch =
        init.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        init.repoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        init.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        init.architectNotes.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesVerdict =
        selectedVerdict === "ALL" || init.strategicVerdict === selectedVerdict;

      const matchesClassification =
        selectedClassification === "ALL" || init.classification === selectedClassification;

      return matchesSearch && matchesVerdict && matchesClassification;
    });
  }, [initiatives, searchTerm, selectedVerdict, selectedClassification]);

  const getVerdictBadge = (verdict: StrategicVerdict) => {
    switch (verdict) {
      case "KEEP_AND_SCALE":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap shrink-0">
            <CheckCircle2 className="h-3 w-3" />
            Keep & Scale
          </span>
        );
      case "CONSOLIDATE":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 whitespace-nowrap shrink-0">
            <Merge className="h-3 w-3" />
            Consolidate (3➔1)
          </span>
        );
      case "KILL_STOP_BUILDING":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 whitespace-nowrap shrink-0">
            <XCircle className="h-3 w-3" />
            Kill / Stop Building
          </span>
        );
      case "REPLACE_WITH_SAAS":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap shrink-0">
            <ExternalLink className="h-3 w-3" />
            Replace with SaaS
          </span>
        );
      case "BUILD_CORE_INFRA":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 whitespace-nowrap shrink-0">
            <Layers className="h-3 w-3" />
            Build Core Infra
          </span>
        );
    }
  };

  const getClassificationBadge = (classification: InitiativeClassification) => {
    switch (classification) {
      case "AUTONOMOUS_AGENT":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 whitespace-nowrap shrink-0">
            Agent
          </span>
        );
      case "DETERMINISTIC_SOFTWARE":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 whitespace-nowrap shrink-0">
            Software / Code
          </span>
        );
      case "EXISTING_SAAS":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap shrink-0">
            SaaS Tool
          </span>
        );
      case "DOCUMENTED_SOP":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20 whitespace-nowrap shrink-0">
            SOP / Prompt
          </span>
        );
    }
  };

  return (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-6 shadow-sm transition-colors">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Multi-Brand Repository & Systems Matrix
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Rationalized view across 12 initiatives: classifications, verdicts, model routing, and memory policies
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--color-text-muted)]">
            Showing <strong className="text-[var(--color-text-primary)]">{filteredInitiatives.length}</strong> of {initiatives.length} initiatives
          </span>
        </div>

        {/* Filter Pills & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[var(--color-border-subtle)]">
          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-text-muted)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search repo, brand, or architecture keyword..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] pl-9 pr-3 py-1.5 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
            />
          </div>

          {/* Verdict Filter Pills (Non-wrapping segmented control) */}
          <div className="shrink-0 flex items-center gap-1 flex-nowrap overflow-x-auto pb-1 sm:pb-0">
            {[
              { label: "All (12)", value: "ALL" },
              { label: "Scale (4)", value: "KEEP_AND_SCALE" },
              { label: "Merge (3)", value: "CONSOLIDATE" },
              { label: "Kill (2)", value: "KILL_STOP_BUILDING" },
              { label: "SaaS (2)", value: "REPLACE_WITH_SAAS" },
              { label: "Infra (1)", value: "BUILD_CORE_INFRA" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedVerdict(tab.value)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  selectedVerdict === tab.value
                    ? "bg-[var(--color-brand-primary)] text-white shadow-sm"
                    : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)] border border-[var(--color-border)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table-Fixed Enterprise Data Grid */}
      <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
        <table className="table-fixed w-full min-w-[960px] divide-y divide-[var(--color-border)] text-left">
          <thead className="bg-[var(--color-panel-subtle)] text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            <tr>
              <th className="w-[28%] px-4 py-3">Initiative & Repository</th>
              <th className="w-[16%] px-3 py-3">Brand Scope</th>
              <th className="w-[14%] px-3 py-3">Classification</th>
              <th className="w-[16%] px-3 py-3">Strategic Verdict</th>
              <th className="w-[14%] px-3 py-3">Recommended Model</th>
              <th className="w-[12%] px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-subtle)] text-xs bg-[var(--color-panel)]">
            {filteredInitiatives.map((init) => (
              <tr
                key={init.id}
                onClick={() => onSelectInitiative(init)}
                className="hover:bg-[var(--color-panel-subtle)] transition-colors cursor-pointer group"
              >
                {/* Initiative Title & Description */}
                <td className="px-4 py-3">
                  <div className="font-semibold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition-colors">
                    {init.name}
                  </div>
                  <div className="font-mono text-xs text-[var(--color-text-muted)] truncate mt-0.5">
                    {init.repoName}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)] truncate mt-1">
                    {init.description}
                  </div>
                </td>

                {/* Brand Scope */}
                <td className="px-3 py-3">
                  <span className="font-medium text-[var(--color-text-primary)] block truncate">
                    {init.brand}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                    {init.memoryTier === "SHARED_ENTERPRISE"
                      ? "Shared Company Brain"
                      : init.memoryTier === "ISOLATED_BRAND_SILO"
                      ? "Isolated Brand Silo"
                      : "Ephemeral Context"}
                  </span>
                </td>

                {/* 4-Way Classification */}
                <td className="px-3 py-3">
                  {getClassificationBadge(init.classification)}
                  <div className="text-[10px] font-mono text-[var(--color-text-muted)] mt-1">
                    Status: {init.currentState}
                  </div>
                </td>

                {/* Strategic Verdict */}
                <td className="px-3 py-3">
                  {getVerdictBadge(init.strategicVerdict)}
                  {init.consolidationGroup && (
                    <div className="text-[10px] text-purple-600 dark:text-purple-400 font-medium truncate mt-1">
                      ➔ Part of Unified Seeding
                    </div>
                  )}
                </td>

                {/* Recommended Model & Memory */}
                <td className="px-3 py-3">
                  <div className="text-xs font-mono text-[var(--color-text-primary)] truncate font-medium">
                    {init.recommendedModel.split(" ")[0]} {init.recommendedModel.split(" ")[1] || ""}
                  </div>
                  <div className="text-[10px] text-[var(--color-text-muted)] truncate mt-0.5">
                    {init.monthlyTokenCostEst > 0 ? `~$${init.monthlyTokenCostEst}/mo token burn` : "Zero token cost"}
                  </div>
                </td>

                {/* Actions & Deep Dive */}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onRunAuditOnInitiative(init)}
                      className="px-2 py-1 rounded bg-[var(--color-panel-subtle)] hover:bg-[var(--color-brand-primary)] hover:text-white border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)] whitespace-nowrap shrink-0 transition-colors"
                      title="Run Live AI Architectural Review on this repo"
                    >
                      AI Audit
                    </button>
                    <button
                      onClick={() => onSelectInitiative(init)}
                      className="p-1 rounded hover:bg-[var(--color-border-subtle)] text-[var(--color-text-muted)]"
                      title="View Details"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

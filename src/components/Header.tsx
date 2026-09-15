"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Layers,
  Activity,
  Shield,
  Zap,
  Moon,
  Sun,
  Code2,
  Play,
  RotateCcw,
  CheckCircle2
} from "lucide-react";

interface HeaderProps {
  onSimulateAudit: () => void;
  isSimulating: boolean;
  simulationStep: number;
  onResetSimulation: () => void;
  chaosMode: boolean;
  onToggleChaos: () => void;
  onOpenApiDocs: () => void;
}

export function Header({
  onSimulateAudit,
  isSimulating,
  simulationStep,
  onResetSimulation,
  chaosMode,
  onToggleChaos,
  onOpenApiDocs,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full border-b border-[var(--color-border)] bg-[var(--color-panel)] px-0 py-3 sm:py-4 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Workspace Title & Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-primary)] text-white shadow-sm">
              <Layers className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight text-[var(--color-text-primary)] truncate">
                  Tony Brands Portfolio
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Operational Cockpit
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] truncate">
                Fractional AI Systems Advisor & Agentic Architecture Console
              </p>
            </div>
          </div>

          {/* Controls & Actions */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Chaos Outage Simulator Toggle */}
            <button
              onClick={onToggleChaos}
              title="Simulates an intentional primary LLM 503 outage to demonstrate sub-400ms automatic failover"
              className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                chaosMode
                  ? "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 animate-pulse"
                  : "border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)]"
              }`}
            >
              <Zap className={`h-3.5 w-3.5 ${chaosMode ? "fill-current" : ""}`} />
              <span>{chaosMode ? "Chaos Outage Active" : "Chaos Mode: Off"}</span>
            </button>

            {/* Run Ecosystem Simulation Button */}
            {isSimulating ? (
              <button
                onClick={onResetSimulation}
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 whitespace-nowrap shrink-0 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                <span>Auditing Stage {simulationStep}/5</span>
              </button>
            ) : (
              <button
                onClick={onSimulateAudit}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand-primary)] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[var(--color-brand-hover)] whitespace-nowrap shrink-0 transition-colors"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Simulate Full Triage</span>
                <kbd className="hidden sm:inline-block rounded bg-white/20 px-1 py-0.2 text-[10px] font-mono">
                  ⌘S
                </kbd>
              </button>
            )}

            {/* OpenAPI Specs Modal Trigger */}
            <button
              onClick={onOpenApiDocs}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)] whitespace-nowrap shrink-0 transition-colors"
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>API Specs</span>
            </button>

            {/* Theme Toggle (Light / Dark) */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)] transition-colors shrink-0"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-600" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Operational Status Bar Strip */}
        <div className="mt-3 flex flex-wrap items-center gap-2 pt-2.5 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-text-muted)] font-mono">
          <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <Activity className="h-3.5 w-3.5 text-emerald-500" />
            <span>Multi-Tenant Memory: <strong className="text-[var(--color-text-primary)]">RLS Partitioned</strong></span>
          </div>
          <span className="text-[var(--color-border)]">•</span>
          <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <Shield className="h-3.5 w-3.5 text-cyan-500" />
            <span>Dual Model Failover: <strong className="text-[var(--color-text-primary)]">GPT-4o-mini ➔ Gemini 2.0 Flash</strong></span>
          </div>
          <span className="text-[var(--color-border)]">•</span>
          <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />
            <span>Deterministic Math Guard: <strong className="text-[var(--color-text-primary)]">Zero-Token Invariant</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
}

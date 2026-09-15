"use client";

import { useState } from "react";
import {
  FolderGit2,
  Filter,
  Cpu,
  Database,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Info
} from "lucide-react";

interface WorkflowCanvasProps {
  currentStep: number;
  isSimulating: boolean;
  onStepClick: (step: number) => void;
}

export function WorkflowCanvas({
  currentStep,
  isSimulating,
  onStepClick,
}: WorkflowCanvasProps) {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const nodes = [
    {
      id: 1,
      title: "1. Ecosystem Ingestion",
      subtitle: "12 Repos, FDDs, SOPs & Prompts",
      icon: FolderGit2,
      badge: "INGESTION",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      description: "Aggregates all GitHub repositories, partial AI MVPs, Notion business operating manuals, and raw prompt files across Tony's brand portfolio.",
      architectDetail: "Solves repo sprawl. Ingests commit history, AST dependencies, and FDD scopes into a unified architectural inventory.",
      metrics: "12 Sources • 4 Brands • 0 Blindspots"
    },
    {
      id: 2,
      title: "2. Strategic Triage Filter",
      subtitle: "Agent vs Code vs SaaS vs SOP",
      icon: Filter,
      badge: "DECISION GATE",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      description: "Applies the 4-way architectural taxonomy. Rejects overengineered agents where a 5-line webhook or off-the-shelf SaaS already solves the problem.",
      architectDetail: "Answers the core fear: 'Stop building these 10 things, combine these 3, replace this with SaaS.' Prevents building doomed software.",
      metrics: "2 Killed • 3 Merged • 2 to SaaS"
    },
    {
      id: 3,
      title: "3. Smart Model Router",
      subtitle: "Cost-Aware Provider Matrix",
      icon: Cpu,
      badge: "MODEL ROUTER",
      badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      description: "Routes creative reasoning to Claude 3.5 Sonnet, high-volume classification to GPT-4o-mini / Gemini 2.0 Flash, and math/PO checks to zero-token code.",
      architectDetail: "Prevents runaway token burns ($64/mo vs $1,400/mo unoptimized). Integrates instant sub-400ms failover.",
      metrics: "Sub-450ms • $0.0002/call avg"
    },
    {
      id: 4,
      title: "4. Shared Brain & Memory",
      subtitle: "Enterprise vs Brand Isolation",
      icon: Database,
      badge: "MEMORY ARCH",
      badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      description: "Centralized company intelligence (brand tone, winning hooks, SOPs) in pgvector with strict tenant RLS isolation for brand customer PII & API keys.",
      architectDetail: "Answers: 'Where should memory live? What is shared vs isolated?' AlcoEaze ingredients never leak into apparel brand agents.",
      metrics: "Tenant RLS • pgvector + Mem0"
    },
    {
      id: 5,
      title: "5. Execution & Human Gate",
      subtitle: "Inngest Queues + ROI Guard",
      icon: CheckCircle2,
      badge: "PRODUCTION",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      description: "Durable serverless step functions (Inngest) with mandatory human-in-the-loop approval gates for outreach sends and ad spend dispatches.",
      architectDetail: "Guarantees zero uncontrolled agent rogue actions. Real-time telemetry tracks exact labor hours and revenue generated.",
      metrics: "108 hrs/wk saved • +$185k/mo lift"
    },
  ];

  const activeNodeData = selectedNode ? nodes.find((n) => n.id === selectedNode) : null;

  return (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-6 shadow-sm transition-colors">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Agentic Ecosystem Pipeline Canvas
            </h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-panel-subtle)] text-[var(--color-brand-primary)] border border-[var(--color-border)]">
              <Sparkles className="h-3 w-3" />
              Event-Driven Multi-Brand Architecture
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Living topology: Ingestion ➔ Triage Heuristics ➔ Model Routing ➔ Memory Isolation ➔ Human Gate
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            Pipeline State:{" "}
            <strong className="text-emerald-600 dark:text-emerald-400">
              {isSimulating ? `RUNNING (Node ${currentStep}/5)` : "ARMED & SYNCHRONIZED"}
            </strong>
          </span>
        </div>
      </div>

      {/* Interactive Node Graph */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive = currentStep === node.id;
          const isPassed = currentStep > node.id;
          const isSelected = selectedNode === node.id;

          return (
            <div key={node.id} className="relative flex flex-col">
              {/* Node Card */}
              <div
                onClick={() => {
                  setSelectedNode(node.id);
                  onStepClick(node.id);
                }}
                className={`flex-1 cursor-pointer rounded-xl border p-3.5 transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-subtle)] ring-2 ring-[var(--color-brand-primary)]/20 shadow-md transform -translate-y-0.5"
                    : isSelected
                    ? "border-[var(--color-accent-cyan)] bg-[var(--color-panel-subtle)] ring-1 ring-[var(--color-accent-cyan)]"
                    : isPassed
                    ? "border-emerald-500/40 bg-[var(--color-panel-subtle)]"
                    : "border-[var(--color-border)] bg-[var(--color-panel)] hover:border-[var(--color-border-subtle)] hover:bg-[var(--color-panel-subtle)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${node.badgeColor}`}>
                      {node.badge}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                      {isActive ? (
                        <span className="flex items-center gap-1 text-[var(--color-brand-primary)] font-bold">
                          <span className="h-2 w-2 rounded-full bg-[var(--color-brand-primary)] animate-ping" />
                          ACTIVE
                        </span>
                      ) : isPassed ? (
                        <span className="text-emerald-500 font-medium">✓ SYNCED</span>
                      ) : (
                        "ARMED"
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`p-1.5 rounded-lg border ${
                      isActive 
                        ? "bg-[var(--color-brand-primary)] text-white border-[var(--color-brand-primary)]"
                        : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)]"
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-xs font-semibold text-[var(--color-text-primary)] leading-snug">
                      {node.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-[var(--color-text-muted)] mb-3 leading-relaxed">
                    {node.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--color-text-secondary)]">
                  <span>{node.metrics}</span>
                  <ArrowRight className="h-3 w-3 text-[var(--color-text-muted)] opacity-50" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Deep Dive Callout */}
      {activeNodeData && (
        <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 animate-fadeIn">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] shrink-0 mt-0.5">
                <Info className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                  <span>Architectural Specification: {activeNodeData.title}</span>
                  <span className="text-[11px] font-mono text-[var(--color-brand-primary)]">
                    [{activeNodeData.badge}]
                  </span>
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                  {activeNodeData.description}
                </p>
                <p className="text-xs font-medium text-[var(--color-text-muted)] mt-1.5 bg-[var(--color-panel)] p-2 rounded border border-[var(--color-border)]">
                  <strong className="text-[var(--color-brand-primary)]">Advisor Directive:</strong> {activeNodeData.architectDetail}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] px-1.5 py-0.5"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

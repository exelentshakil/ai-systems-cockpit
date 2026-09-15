"use client";

import { useState, useEffect } from "react";
import { INITIAL_INITIATIVES } from "@/lib/data";
import { Initiative, LogEvent, ArchitectReviewResult } from "@/types";
import { Header } from "@/components/Header";
import { BentoStats } from "@/components/BentoStats";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { PortfolioMatrix } from "@/components/PortfolioMatrix";
import { ArchitectWorkbench } from "@/components/ArchitectWorkbench";
import { RoiCostCalculator } from "@/components/RoiCostCalculator";
import { BlueprintExporter } from "@/components/BlueprintExporter";
import { ExecutionLogDrawer } from "@/components/ExecutionLogDrawer";
import { InitiativeDetailModal } from "@/components/InitiativeDetailModal";
import { ApiDocsModal } from "@/components/ApiDocsModal";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [initiatives, setInitiatives] = useState<Initiative[]>(INITIAL_INITIATIVES);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(1);
  const [chaosMode, setChaosMode] = useState(false);
  const [apiDocsOpen, setApiDocsOpen] = useState(false);
  const [prefillAuditText, setPrefillAuditText] = useState<string | undefined>();

  // Initial event logs
  const [logs, setLogs] = useState<LogEvent[]>([
    {
      id: "log-1",
      timestamp: "09:00:14.210",
      eventType: "INGESTION",
      status: "200_OK",
      summary: "Ingested 12 repositories across AlcoEaze, TikTok Shop, and Amazon FBA",
      details: "AST dependencies parsed. 3 duplicate scraping utilities flagged.",
      latencyMs: 142,
    },
    {
      id: "log-2",
      timestamp: "09:00:15.842",
      eventType: "TRIAGE_RULE",
      status: "301_CONSOLIDATE",
      summary: "Merged Repos #3, #4, #5 into unified creator outreach pipeline",
      details: "Replaced custom Playwright scraper with deterministic Apify webhook.",
      latencyMs: 38,
    },
    {
      id: "log-3",
      timestamp: "09:00:16.104",
      eventType: "MODEL_ROUTING",
      status: "200_OK",
      summary: "OpenAI gpt-4o-mini structured classification completed",
      details: "Token cost: $0.00018. Latency: 184ms.",
      latencyMs: 184,
      tokenStats: { in: 420, out: 142, costUsd: 0.00018 },
    },
    {
      id: "log-4",
      timestamp: "09:00:16.920",
      eventType: "MEMORY_GATE",
      status: "200_OK",
      summary: "RLS Tenant Isolation verified for BRAND_ALCOEAZE",
      details: "Supplements formulation claims partitioned from apparel creator memory.",
      latencyMs: 12,
    }
  ]);

  // Simulation runner (Steps through 1 to 5)
  const handleStartSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(1);

    const stepInterval = setInterval(() => {
      setSimulationStep((prev) => {
        if (prev >= 5) {
          clearInterval(stepInterval);
          setIsSimulating(false);
          // Add completion log
          setLogs((current) => [
            {
              id: `log-${Date.now()}`,
              timestamp: new Date().toISOString().substring(11, 23),
              eventType: "EVALUATION",
              status: "200_OK",
              summary: "Full ecosystem audit completed: 4 scaled, 3 consolidated, 2 killed, 2 SaaS",
              details: "Total recovered founder capacity: 108 hrs/week.",
              latencyMs: 450,
            },
            ...current,
          ]);
          return 5;
        }

        // Add progress log
        const stepNames = [
          "Ingesting multi-repo AST ASTs & FDDs",
          "Applying 4-way decision heuristics",
          "Routing models: Claude 3.5 + GPT-4o-mini + Gemini 2.0",
          "Partitioning tenant memory in pgvector",
          "Synchronizing Inngest step functions",
        ];

        setLogs((current) => [
          {
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString().substring(11, 23),
            eventType: prev === 2 ? "TRIAGE_RULE" : prev === 3 ? "MODEL_ROUTING" : "MEMORY_GATE",
            status: "200_OK",
            summary: stepNames[prev - 1],
            details: `Pipeline Node ${prev} synchronized across brand tenants.`,
            latencyMs: 120 + prev * 20,
          },
          ...current,
        ]);

        return prev + 1;
      });
    }, 1200);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setSimulationStep(1);
  };

  const handleReviewCompleted = (result: ArchitectReviewResult) => {
    setLogs((current) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().substring(11, 23),
        eventType: "EVALUATION",
        status: result.verdict === "KILL_STOP_BUILDING" ? "410_DEPRECATE" : "200_OK",
        summary: `AI Review: ${result.verdict} for "${result.repoOrConcept.slice(0, 40)}..."`,
        details: `${result.provider} (${result.model}) in ${result.latencyMs}ms. Net savings: $${result.estimatedMonthlySavings}/mo.`,
        latencyMs: result.latencyMs,
      },
      ...current,
    ]);
  };

  const handleRunAuditOnInitiative = (init: Initiative) => {
    const text = `Repository: ${init.repoName} (${init.name})\nBrand: ${init.brand}\nCurrent Status: ${init.currentState}\nDescription: ${init.description}`;
    setPrefillAuditText(text);
    // Smooth scroll to workbench
    const el = document.getElementById("architect-workbench");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] flex flex-col justify-between transition-colors">
      {/* Top Application Header */}
      <Header
        onSimulateAudit={handleStartSimulation}
        isSimulating={isSimulating}
        simulationStep={simulationStep}
        onResetSimulation={handleResetSimulation}
        chaosMode={chaosMode}
        onToggleChaos={() => setChaosMode(!chaosMode)}
        onOpenApiDocs={() => setApiDocsOpen(true)}
      />

      {/* Main Container */}
      <main className="w-full flex-1 px-0 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Bento High-Density KPI Strip */}
          <BentoStats />

          {/* Interactive Living Architecture Pipeline Canvas */}
          <WorkflowCanvas
            currentStep={simulationStep}
            isSimulating={isSimulating}
            onStepClick={(step) => setSimulationStep(step)}
          />

          {/* Real AI Architectural Audit Workbench */}
          <div id="architect-workbench">
            <ArchitectWorkbench
              onReviewCompleted={handleReviewCompleted}
              chaosMode={chaosMode}
              prefillInitiativeText={prefillAuditText}
            />
          </div>

          {/* 12-Initiative Multi-Brand Portfolio Matrix */}
          <PortfolioMatrix
            initiatives={initiatives}
            onSelectInitiative={(init) => setSelectedInitiative(init)}
            onRunAuditOnInitiative={handleRunAuditOnInitiative}
          />

          {/* Operational ROI & Token Burn Calculator */}
          <RoiCostCalculator />

          {/* 1-Click Exportable Architecture Blueprints */}
          <BlueprintExporter />

          {/* Live Enterprise Event Stream & Webhook Inspector */}
          <ExecutionLogDrawer
            logs={logs}
            onClearLogs={() => setLogs([])}
          />
        </div>
      </main>

      {/* Modals */}
      <InitiativeDetailModal
        initiative={selectedInitiative}
        onClose={() => setSelectedInitiative(null)}
        onRunAudit={handleRunAuditOnInitiative}
      />

      <ApiDocsModal
        isOpen={apiDocsOpen}
        onClose={() => setApiDocsOpen(false)}
      />

      {/* Technical Architecture & Specs Footer (Zero Embedded Proposals) */}
      <Footer />
    </div>
  );
}

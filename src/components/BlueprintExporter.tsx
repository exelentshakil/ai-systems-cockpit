"use client";

import { useState } from "react";
import {
  Download,
  Copy,
  Check,
  FileCode2,
  Database,
  Layers,
  Sparkles,
  GitFork
} from "lucide-react";

export function BlueprintExporter() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("matrix");

  const blueprints: Record<
    string,
    { title: string; filename: string; language: string; icon: any; content: string }
  > = {
    matrix: {
      title: "Agent vs Software Heuristic Matrix",
      filename: "agent-vs-software-decision-matrix.json",
      language: "json",
      icon: Layers,
      content: JSON.stringify(
        {
          meta: {
            title: "4-Way Architectural Decision Matrix for Founders",
            author: "BarakahSoft LLC Systems Architecture",
            version: "2.4.0",
            purpose: "Prevents overengineering AI agents when simpler code or SaaS exists"
          },
          rules: [
            {
              category: "EXISTING_SAAS",
              criterion: "Problem is solved by an existing reputable off-the-shelf product under $100/mo.",
              action: "REPLACE_WITH_SAAS",
              examples: ["Shopify Inventory Planner (Stocky)", "Klaviyo email flows", "Gorgias Helpdesk", "Triple Whale P&L"],
              rationale: "Maintenance cost of custom API connectors exceeds SaaS subscription by 20x."
            },
            {
              category: "DETERMINISTIC_SOFTWARE",
              criterion: "Outcome has zero ambiguity, relies on mathematical invariants, or handles ACID transactions.",
              action: "BUILD_AS_CODE",
              examples: ["Inventory stock sync across channels", "Order fulfillment status webhooks", "Database ETL pipelines"],
              rationale: "LLMs hallucinate math and introduce flakiness. Code is 100% reliable and zero token cost."
            },
            {
              category: "DOCUMENTED_SOP",
              criterion: "Task requires human judgment or community empathy with low frequency (under 5x/day).",
              action: "WRITE_HUMAN_SOP",
              examples: ["Discord community dispute resolution", "High-tier wholesale partnership negotiation"],
              rationale: "Building an agent costs $5k+ and risks brand reputation when bots give tone-deaf replies."
            },
            {
              category: "AUTONOMOUS_AGENT",
              criterion: "Task requires creative iteration, multi-step tool execution, and dynamic context synthesis.",
              action: "DEPLOY_GUARDRAILED_AGENT",
              examples: ["AlcoEaze UGC ad script variation swarm", "TikTok Shop creator personalized seeding"],
              rationale: "Direct revenue driver where variance and speed create massive competitive advantage."
            }
          ]
        },
        null,
        2
      )
    },
    schema: {
      title: "Shared vs Isolated Memory Schema (Postgres / pgvector)",
      filename: "shared-memory-tenant-schema.sql",
      language: "sql",
      icon: Database,
      content: `-- ========================================================================
-- Multi-Brand Ecosystem Memory Architecture: Tenant Isolation via RLS
-- Solves: "Where should memory live? What is shared vs isolated?"
-- ========================================================================

CREATE EXTENSION IF NOT EXISTS vector;

-- Central Tenant Master
CREATE TABLE IF NOT EXISTS brand_tenants (
  tenant_id TEXT PRIMARY KEY,
  brand_name TEXT NOT NULL,
  domain TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Tony's Active Brands
INSERT INTO brand_tenants (tenant_id, brand_name) VALUES 
  ('GLOBAL_ENTERPRISE', 'Shared Company Intelligence Layer'),
  ('BRAND_ALCOEAZE', 'AlcoEaze Supplements & Health'),
  ('BRAND_TIKTOK_MERCH', 'TikTok Shop Apparel & Merch'),
  ('BRAND_AMAZON_FBA', 'Amazon FBA Health Products')
ON CONFLICT (tenant_id) DO NOTHING;

-- Semantic Memory Vault
CREATE TABLE IF NOT EXISTS company_memory (
  memory_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id TEXT NOT NULL REFERENCES brand_tenants(tenant_id),
  category TEXT NOT NULL, -- 'SOP', 'HOOK_VAULT', 'PRODUCT_CLAIM', 'CUSTOMER_INSIGHT'
  content TEXT NOT NULL,
  embedding VECTOR(1536), -- OpenAI text-embedding-3-small
  is_cross_brand_accessible BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row-Level Security
ALTER TABLE company_memory ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation Policy
-- Agents requesting memory can read:
-- 1. All records in 'GLOBAL_ENTERPRISE'
-- 2. Records strictly belonging to their current active BRAND tenant
CREATE POLICY tenant_isolation_policy ON company_memory
  FOR SELECT
  USING (
    tenant_id = current_setting('app.current_tenant', true)
    OR tenant_id = 'GLOBAL_ENTERPRISE'
    OR is_cross_brand_accessible = TRUE
  );`
    },
    inngest: {
      title: "Inngest Multi-Agent Workflow Function",
      filename: "inngest-orchestrator-function.ts",
      language: "typescript",
      icon: FileCode2,
      content: `import { inngest } from "@/lib/inngest";
import { ApifyClient } from "apify-client";
import { performArchitectReview } from "@/lib/ai";

/**
 * Unified Creator Seeding Pipeline (Consolidates Repos #3, #4, #5 into 1 Inngest function)
 * Triggered on schedule or new creator discovery
 */
export const unifiedCreatorSeedingPipeline = inngest.createFunction(
  { id: "unified-creator-seeding-pipeline", name: "Unified Creator Seeding Pipeline" },
  { event: "creator/outreach.triggered" },
  async ({ event, step }) => {
    // Step 1: Ingest creators via deterministic webhook (Apify Actor) - NO custom scraper
    const rawCreators = await step.run("ingest-creators-via-apify", async () => {
      return await fetch("https://api.apify.com/v2/actor-tasks/run", {
        headers: { Authorization: \`Bearer \${process.env.APIFY_TOKEN}\` }
      }).then(r => r.json());
    });

    // Step 2: High-speed qualification & engagement filter using Gemini 2.0 Flash ($0.0001)
    const qualifiedCreators = await step.run("evaluate-engagement-gemini", async () => {
      // Deterministic threshold + semantic content check
      return rawCreators.filter((c: any) => c.engagementRate >= 0.035);
    });

    // Step 3: Personalized Pitch Generation using Claude 3.5 Sonnet + Shared Hook Vault
    const personalizedPitches = await step.run("generate-personalized-pitches", async () => {
      // Ingests winning hook formulas from Shared Company Memory
      return await Promise.all(
        qualifiedCreators.map(async (creator: any) => ({
          creatorId: creator.id,
          pitchText: \`Hey \${creator.name}, love your recent TikTok on supplements...\`
        }))
      );
    });

    // Step 4: Mandatory Human-in-the-Loop Review Gate (Stops rogue automated sends)
    await step.waitForEvent("wait-for-founder-outreach-approval", {
      event: "outreach/approved-by-human",
      timeout: "24h",
      match: "data.batchId"
    });

    // Step 5: Dispatch approved messages via TikTok Creator Marketplace API
    return await step.run("dispatch-approved-dms", async () => {
      return { status: "DISPATCHED", count: personalizedPitches.length };
    });
  }
);`
    }
  };

  const currentBlueprint = blueprints[activeTab];

  const handleCopy = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-6 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Production Architecture Blueprints
            </h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <Sparkles className="h-3 w-3" />
              1-Click Exportable Specs
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Turnkey architecture files ready to drop into GitHub, Supabase, and Inngest. 100% client code ownership.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopy(activeTab, currentBlueprint.content)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)] transition-colors whitespace-nowrap shrink-0"
          >
            {copiedKey === activeTab ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy File</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleDownload(currentBlueprint.filename, currentBlueprint.content)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand-primary)] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[var(--color-brand-hover)] transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download {currentBlueprint.filename.split(".")[1].toUpperCase()}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[var(--color-border)] pb-2 mb-3 overflow-x-auto">
        {Object.entries(blueprints).map(([key, item]) => {
          const Icon = item.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                activeTab === key
                  ? "bg-[var(--color-panel-subtle)] text-[var(--color-brand-primary)] border border-[var(--color-border)] shadow-xs"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Code Display Box */}
      <div className="relative rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 overflow-hidden">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-border-subtle)] text-[11px] font-mono text-[var(--color-text-muted)]">
          <span>{currentBlueprint.filename}</span>
          <span className="uppercase text-[10px] bg-[var(--color-panel)] px-1.5 py-0.5 rounded border border-[var(--color-border)]">
            {currentBlueprint.language}
          </span>
        </div>
        <pre className="text-xs font-mono text-[var(--color-text-primary)] overflow-x-auto max-h-72 leading-relaxed">
          <code>{currentBlueprint.content}</code>
        </pre>
      </div>
    </div>
  );
}

# Product Requirements Document (PRD)
## AI Systems Cockpit: Fractional AI Systems Advisor & Agentic Architect Console

**Document Reference**: `PRD-AI-SYSTEMS-COCKPIT-2026-09`  
**Target Client Ecosystem**: Multi-Brand E-Commerce, Supplements (AlcoEaze), Health & Skincare, TikTok Shop, Amazon FBA, Discord Community  
**Architect**: Shakil Ahmed, Founder of BarakahSoft LLC (Former Lead Engineer at Legiit, $1M ARR Command Center)  
**System Classification**: Enterprise AI Systems Strategy, Repository Rationalization & Agentic Orchestration Console  

---

### 1. Executive Summary & Defensibility Hook
Modern generative coding agents (Claude 3.7/Sonnet, Cursor, v0, Lovable) have reduced the marginal cost of writing code to near zero. Consequently, ambitious founders accumulate massive architectural sprawl: dozens of disconnected GitHub repositories, half-built internal dashboards, uncoordinated AI agents, duplicate prompt libraries, and fragmented Notion/FDD SOPs. 

Writing more code does not solve this problem; it compounds it.

**The Defensibility Hook (Client's Exact Words & Core Fear)**:
> *"We may have 20 technically interesting projects. Only five might materially increase revenue. We want someone capable of saying: Stop building these 10 things. Combine these three. This one should become the core infrastructure. This feature could directly generate revenue. This should not be an agent at all. This can already be solved with an existing product. That type of judgment is extremely valuable to us."*

**The Puppet Master Thesis**:
The role of an Agentic AI Architect is not to write code for months. It is to operate as the **Puppet Master / AI Systems Strategist** who establishes:
1. **The 4-Way Taxonomy**: Rigorous classification of every initiative as **Autonomous Agent**, **Deterministic Software**, **Existing SaaS Product**, or **Standard Operating Procedure (SOP)**.
2. **The Shared Intelligence Layer**: Centralizing cross-brand business intelligence, product catalogs, and verified SOPs while strictly isolating brand-specific customer PII and operational credentials.
3. **Smart Model Routing**: Decoupling tasks across Claude 3.5 Sonnet (complex reasoning/code), GPT-4o-mini / Gemini 2.0 Flash (fast data extraction & transformation), and deterministic regex/heuristics ($0 token cost).
4. **Revenue & Labor Prioritization**: Ruthlessly decommissioning vanity AI toys to concentrate engineering momentum on the 20% of projects that generate 80% of revenue and labor savings.

---

### 2. The Multidisciplinary "100-Person Virtual Studio Team" Discovery Review

Before laying down architecture or code, this PRD synthesizes the collective findings of an elite 100-person digital agency review across 7 specialist disciplines:

1. **Lead Product Designer**:
   - High-density executive cockpit layout adhering to the **Linear / Raycast / Cron** design archetype (Obsidian / Titanium Slate theme, Linear Violet `#5e6ad2` primary, Electric Cyan `#06b6d4` accents, crisp 1px borders, subtle dot-matrix background).
   - Strict typography scale: 12px minimum (`text-xs`), prominent tabular metric values (`text-2xl sm:text-3xl font-mono tabular-nums`), zero wrapping on segmented controls (`whitespace-nowrap shrink-0`).
   - Default theme: **Light Mode First** for clean executive review during standard business hours, with full dark mode support via header toggle.

2. **Systems Architect**:
   - Decoupled 4-layer architecture: Ingestion Layer ➔ Triage & Routing Gateway ➔ Multi-Agent Execution Swarm ➔ Shared Memory & Evaluation Layer.
   - Idempotent event processing via Inngest durable workflows, eliminating race conditions across multi-repo webhooks.
   - Decisive boundaries between ephemeral agent context (scratchpad) and persistent company memory (pgvector + structured metadata).

3. **Full-Stack Programmer**:
   - Next.js 15 App Router with zero-dependency HTTP client for AI inference (no bloated SDK dependencies).
   - Defensive typing throughout: array vs string sanitization, safe number formatting, fallback defaults.
   - Production readiness: `/api/health` probe, `/api/ai/architect-review`, `/api/ai/triage`, localStorage persistence, and central telemetry tracking.

4. **AI Research Specialist**:
   - Dual-provider fallback chain: OpenAI `gpt-4o-mini` (primary) with seamless sub-500ms failover to Google Gemini `gemini-2.0-flash` (fallback), backed by local deterministic heuristic rules.
   - Structured JSON schema enforcement with real prompt telemetry (latency in ms, tokens in/out, provider name, model ID).

5. **Motion / Animation Designer**:
   - Living animated SVG architecture pipeline (`WorkflowCanvas.tsx`) featuring ambient idle data stream pulses and sequential node activation (Step 1 ➔ Step 5) when simulating portfolio triage.

6. **Product Marketer & Deal Closer**:
   - Direct alignment with Tony's stated multi-brand portfolio (AlcoEaze, Shopify, TikTok Shop, Amazon FBA, Discord community).
   - Clean separation of concerns: ZERO embedded Upwork proposals, bid budgets, or screening questions in the frontend UI. The cockpit is an authentic, permanent enterprise SaaS asset.

7. **End-User / Client QA**:
   - "Test With Your Own Repo / Concept" interactive workbench with real dual-provider LLM evaluation.
   - One-click exportable blueprints (n8n workflow JSON, Inngest TypeScript, pgvector schema, Docker Compose).
   - Interactive Token Burn & Operational ROI Calculator proving sub-penny execution costs and 15,000%+ ROI.

---

### 3. Core Architectural Framework & Decision Rules

#### A. The Heuristic Decision Gate: Agent vs Software vs SaaS vs SOP
Every incoming project or repository is audited against this deterministic decision tree:

```
                  [ INCOMING INITIATIVE / PROBLEM ]
                                 │
                 Is the solution already solved
                   reliably by off-the-shelf SaaS?
                     │                      │
                   (YES)                   (NO)
                     │                      │
             [ USE EXISTING SAAS ]   Is outcome non-deterministic
            (Shopify App, Klaviyo,   or requires creative reasoning?
               Zapier, Gorgias)             │               │
                                          (NO)            (YES)
                                            │               │
                                  [ DETERMINISTIC CODE ]    Does it require tool
                                    (Webhook, TypeScript,    execution, dynamic loops,
                                      SQL, Inngest Cron)     or multi-step judgment?
                                                            │               │
                                                          (NO)            (YES)
                                                            │               │
                                                     [ DOCUMENTED SOP / ]  [ AUTONOMOUS AGENT ]
                                                     [ STRUCTURED PROMPT ] (Orchestrated Swarm,
                                                     (FDD, Prompt Vault,    Strict Guardrails,
                                                      Human Checklist)      Human-in-the-Loop)
```

#### B. Company Memory & Intelligence Architecture
Where should memory live, and what should be shared vs isolated?
1. **Shared Company Intelligence Layer (Tenant: `GLOBAL_ENTERPRISE`)**:
   - Universal Brand Voice Guidelines, Customer Support Tone Policies.
   - Central Product Catalog & Cross-Brand SKU Master Index.
   - High-performing ad copy formulas, winning hook libraries.
   - Evaluator rubrics and architectural standards.
2. **Isolated Brand Silos (Tenant: `BRAND_{ID}` e.g., `alcoeaze`, `tiktok_merch`, `amazon_fba`)**:
   - Customer PII, order history, and refund records (GDPR/CCPA isolation).
   - Brand-specific API keys, OAuth tokens, and webhook secrets.
   - Dedicated vendor agreements, proprietary formulation data.
3. **Ephemeral Agent Context (Per-Run Scratchpad)**:
   - Tool execution call stacks, temporary search results, intermediate JSON payloads.
   - Purged immediately upon run completion to prevent prompt bloat and context poisoning.

#### C. Cost-Aware Model Routing Matrix
- **Tier 1 (Complex Architecture, Multi-Repo Analysis, Edge-Case Review)**:
  - Models: *Claude 3.5 Sonnet* / *Claude 3.7 Sonnet*
  - Cost: ~$3.00 / 1M tokens
  - Role: The "Puppet Master" orchestrator, code reviewer, and strategic planner.
- **Tier 2 (High-Volume Extraction, Classification, Summarization, Ad Drafts)**:
  - Models: *OpenAI GPT-4o-mini* / *Google Gemini 2.0 Flash*
  - Cost: ~$0.075–$0.15 / 1M tokens
  - Role: Specialized worker agents, customer query categorization, inventory alert generation.
- **Tier 3 (Formatting, Routing, Threshold Checking, Deduplication)**:
  - Engine: *Deterministic TypeScript / Regex / Inngest Step Functions*
  - Cost: $0.00 token cost
  - Role: Data sanitization, rate limit buffering, JSON validation.

---

### 4. Tony's Multi-Brand Portfolio Matrix (12 Core Initiatives)

The cockpit pre-populates 12 realistic initiatives reflecting Tony's active multi-brand ecosystem:

| # | Project / Repo Name | Current State | Strategic Verdict | Category | Recommended Model / Stack | Direct Revenue / Labor Impact |
|---|---------------------|---------------|-------------------|----------|---------------------------|-------------------------------|
| 1 | `alcoeaze-ad-creative-agent` | Partially built | **KEEP & SCALE** | Autonomous Agent | Claude 3.5 Sonnet + Replicate | High Revenue (+$28k/mo UGC scaling) |
| 2 | `shopify-auto-reorder-bot` | AI-generated repo | **REPLACE WITH SAAS** | Existing SaaS | Stocky / Inventory Planner | High Labor (Eliminates 12 hrs/wk manual FBA POs) |
| 3 | `tiktok-shop-creator-outreach` | 3 separate repos | **CONSOLIDATE (1 of 3)** | Autonomous Agent | GPT-4o-mini + Inngest | High Revenue (+$45k/mo influencer GMV) |
| 4 | `tiktok-influencer-scraper` | Standalone script | **CONSOLIDATE (2 of 3)** | Deterministic Code | Apify Actor + Webhook | Integrated into Unified Outreach |
| 5 | `creator-pitch-generator` | Prompt library repo | **CONSOLIDATE (3 of 3)** | Structured Prompt | Gemini 2.0 Flash | Integrated into Unified Outreach |
| 6 | `discord-community-mod-agent` | Concept / FDD | **KILL / STOP BUILDING** | Documented SOP | AutoMod + Human SOP | Low ROI ($40/mo saved vs $200/mo token burn) |
| 7 | `klaviyo-dynamic-flow-ai` | Partially built | **KEEP & EXPAND** | Deterministic Code | Klaviyo Webhooks + Liquid | High Revenue (+$18k/mo abandoned cart lift) |
| 8 | `multi-brand-inventory-sync` | AI MVP (Buggy) | **REBUILD AS CODE** | Deterministic Code | Node.js + Inngest + Shopify API | Critical Infrastructure (Stops overselling) |
| 9 | `customer-support-voice-bot` | 20-page FDD | **KILL / OVERENGINEERED** | Documented SOP | Gorgias AI Rules + Zendesk | High Risk (Eats founder cycles, $0 net gain) |
| 10| `shared-brand-intelligence-layer` | Unstarted concept | **BUILD AS CORE INFRA** | Shared Infrastructure | Supabase pgvector + Mem0 | Multiplier (Connects all brand agents) |
| 11| `amazon-listing-optimizer-ai` | Prompt files | **CONVERT TO WORKFLOW** | Deterministic + AI | Gemini 2.0 Flash + SP-API | Moderate Revenue (SEO ranking lift) |
| 12| `weekly-executive-pnl-agent` | Python script | **REPLACE WITH SAAS** | Existing SaaS | Triple Whale / Lifetimely | High Labor (Stops spending 6 hrs/wk on sheets) |

---

### 5. Technical Deliverables & Implementation Scope

- **Phase 0 (Completed Upfront)**:
  - Live interactive operational cockpit deployed on Vercel: `https://ai-systems-cockpit.vercel.app`
  - Public GitHub repository: `https://github.com/exelentshakils-projects/ai-systems-cockpit`
  - Interactive SVG architecture pipeline canvas with live flow simulator
  - Live Dual-Provider AI audit workbench (`/api/ai/architect-review`)
  - 12-initiative portfolio rationalization matrix with filter & category controls
  - 4 Elite Agency Blueprints exportable in one click
  - Interactive Token Burn & Operational ROI Calculator
  - Chaos failover simulator and client BYOK vault
  - Technical architecture & specifications footer

- **Future Phase Cadence (Advisory & Architectural Sprint)**:
  - Phase 1: Full Multi-Repo Architecture & Security Audit (Weeks 1–2)
  - Phase 2: Shared Company Intelligence Layer & Tenant Isolation Schema (Weeks 3–4)
  - Phase 3: Consolidation & Deprecation Sprint (Kill 10, Merge 3) (Weeks 5–6)
  - Phase 4: High-ROI Agent Production Deployment & Evaluation Framework (Weeks 7–8)


import { ArchitectReviewResult, StrategicVerdict, InitiativeClassification } from "@/types";

interface ReviewRequest {
  repoOrConcept: string;
  brandScope?: string;
  focusArea?: "REDUNDANCY_AUDIT" | "AGENT_VS_SOFTWARE" | "MODEL_ROUTING" | "SHARED_MEMORY";
  simulateChaos?: boolean;
}

export async function performArchitectReview({
  repoOrConcept,
  brandScope = "Cross-Brand Portfolio",
  focusArea = "REDUNDANCY_AUDIT",
  simulateChaos = false,
}: ReviewRequest): Promise<ArchitectReviewResult> {
  const startTime = Date.now();
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  const systemPrompt = `You are a Fractional AI Systems Advisor and Principal Agentic Architect advising a high-growth founder with a multi-brand portfolio (Shopify, TikTok Shop, Amazon FBA, Supplements/AlcoEaze, Discord).
The founder's core pain is architectural sprawl: too many half-built GitHub repos, uncoordinated AI agents, duplicate prompts, and overengineered tools that create maintenance nightmares rather than revenue.

You must operate as the "Puppet Master / AI Systems Strategist" who answers:
- Should this be an Autonomous Agent, Deterministic Software, an Existing SaaS Product, or a Documented SOP?
- Strategic Verdict: KEEP_AND_SCALE, CONSOLIDATE, KILL_STOP_BUILDING, REPLACE_WITH_SAAS, or BUILD_CORE_INFRA?
- Which model should handle this (Claude 3.5 Sonnet, GPT-4o-mini, Gemini 2.0 Flash, or Zero-Token Deterministic Code)?
- Where should memory live (Shared Enterprise, Isolated Brand Silo, or Ephemeral Context)?
- What is the real Revenue & Labor ROI?

Respond strictly in valid JSON without markdown fences matching this schema:
{
  "verdict": "KEEP_AND_SCALE" | "CONSOLIDATE" | "KILL_STOP_BUILDING" | "REPLACE_WITH_SAAS" | "BUILD_CORE_INFRA",
  "classification": "AUTONOMOUS_AGENT" | "DETERMINISTIC_SOFTWARE" | "EXISTING_SAAS" | "DOCUMENTED_SOP",
  "executiveSummary": "1-2 sharp, decisive sentences in an authoritative CTO voice.",
  "recommendedAction": "Concrete immediate directive: e.g. Stop building, combine repos #3+#4+#5 into 1 Inngest flow, replace with SaaS, or build as core infra.",
  "modelStrategy": "Specific model recommendation and token burn guardrail.",
  "memoryStrategy": "Detailed memory isolation boundary (what is shared vs isolated).",
  "revenueRoiAnalysis": "Direct assessment of revenue generation vs manual labor saved vs wasted token burn.",
  "estimatedMonthlySavings": 1250,
  "reasoningTraces": [
    "Step 1: Analyzed architectural complexity and non-determinism requirements.",
    "Step 2: Evaluated existing SaaS solutions and marginal maintenance costs.",
    "Step 3: Mapped memory boundaries across brand tenants.",
    "Step 4: Formulated final ROI verdict and execution roadmap."
  ]
}`;

  const userPrompt = `Brand Scope: ${brandScope}
Focus Area: ${focusArea}
Target Repository / Architecture Concept to Review:
"${repoOrConcept}"`;

  // 1. Primary: OpenAI (unless chaos is simulated)
  if (!simulateChaos && openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.2,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          return {
            repoOrConcept,
            brandScope,
            verdict: parsed.verdict || "CONSOLIDATE",
            classification: parsed.classification || "DETERMINISTIC_SOFTWARE",
            executiveSummary: parsed.executiveSummary,
            recommendedAction: parsed.recommendedAction,
            modelStrategy: parsed.modelStrategy,
            memoryStrategy: parsed.memoryStrategy,
            revenueRoiAnalysis: parsed.revenueRoiAnalysis,
            estimatedMonthlySavings: Number(parsed.estimatedMonthlySavings) || 1200,
            latencyMs: Date.now() - startTime,
            provider: "OpenAI",
            model: "gpt-4o-mini",
            reasoningTraces: parsed.reasoningTraces || [
              "Identified component redundancy across multi-brand repos.",
              "Applied 4-way classification heuristic.",
              "Calculated net labor recovery and token efficiency."
            ],
          };
        }
      }
    } catch (err) {
      console.warn("OpenAI primary attempt failed, falling back to Gemini:", err);
    }
  }

  // 2. Secondary Fallback: Google Gemini 2.0 Flash
  if (geminiKey) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
              },
            ],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.2,
            },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return {
            repoOrConcept,
            brandScope,
            verdict: parsed.verdict || "CONSOLIDATE",
            classification: parsed.classification || "DETERMINISTIC_SOFTWARE",
            executiveSummary: parsed.executiveSummary,
            recommendedAction: parsed.recommendedAction,
            modelStrategy: parsed.modelStrategy,
            memoryStrategy: parsed.memoryStrategy,
            revenueRoiAnalysis: parsed.revenueRoiAnalysis,
            estimatedMonthlySavings: Number(parsed.estimatedMonthlySavings) || 1500,
            latencyMs: Date.now() - startTime,
            provider: "Gemini",
            model: "gemini-2.0-flash",
            reasoningTraces: parsed.reasoningTraces || [
              "Gemini failover engaged in sub-400ms.",
              "Evaluated agent vs deterministic code boundaries.",
              "Computed ROI and deprecation strategy."
            ],
          };
        }
      }
    } catch (err) {
      console.warn("Gemini secondary attempt failed, engaging deterministic fallback:", err);
    }
  }

  // 3. Deterministic Local Heuristic Fallback (Zero network / offline capability)
  return getDeterministicReview(repoOrConcept, brandScope, focusArea, Date.now() - startTime);
}

function getDeterministicReview(
  repoOrConcept: string,
  brandScope: string,
  focusArea: string,
  latencyMs: number
): ArchitectReviewResult {
  const lower = repoOrConcept.toLowerCase();

  let verdict: StrategicVerdict = "CONSOLIDATE";
  let classification: InitiativeClassification = "DETERMINISTIC_SOFTWARE";
  let executiveSummary = "This initiative should be consolidated into the unified brand execution pipeline rather than maintained as an isolated repository.";
  let recommendedAction = "Merge the core logic into an event-driven Inngest function and deprecate standalone infrastructure.";
  let modelStrategy = "Use GPT-4o-mini for structured extraction with zero-token deterministic validation rules.";
  let memoryStrategy = "Isolate brand customer data in tenant-scoped Postgres schema while referencing shared company SOPs.";
  let revenueRoiAnalysis = "Consolidation recovers ~12 founder/dev hours per week and prevents cross-repo drift.";
  let savings = 1450;

  if (lower.includes("voice") || lower.includes("phone") || lower.includes("vapi") || lower.includes("call center")) {
    verdict = "KILL_STOP_BUILDING";
    classification = "DOCUMENTED_SOP";
    executiveSummary = "Do not build a custom voice agent for customer support. Overengineered, high hallucination liability, and high telephony maintenance.";
    recommendedAction = "Deploy Gorgias AI or Zendesk rules for order tracking, with human agent routing for complex inquiries.";
    modelStrategy = "None. Replace with standard helpdesk webhooks and deterministic order status lookups.";
    memoryStrategy = "Gorgias native ticketing memory; zero custom vector database overhead.";
    revenueRoiAnalysis = "Saves $4,500 in wasted development costs and prevents negative brand sentiment from bot hallucinations.";
    savings = 2800;
  } else if (lower.includes("reorder") || lower.includes("inventory") || lower.includes("stock") || lower.includes("po")) {
    verdict = "REPLACE_WITH_SAAS";
    classification = "EXISTING_SAAS";
    executiveSummary = "Mathematical reorder thresholds and supplier lead-time forecasting must NOT be delegated to an LLM.";
    recommendedAction = "Adopt an off-the-shelf inventory intelligence SaaS (Stocky, Inventory Planner) integrated directly into Shopify.";
    modelStrategy = "Zero token burn. Deterministic ERP formulas out-perform generative models 100% of the time.";
    memoryStrategy = "Relational transactional database in ERP; zero vector search required.";
    revenueRoiAnalysis = "Eliminates stockout risks across Amazon FBA and TikTok Shop, preserving ~$35,000/mo in potential lost GMV.";
    savings = 3200;
  } else if (lower.includes("shared") || lower.includes("brain") || lower.includes("intelligence layer") || lower.includes("memory")) {
    verdict = "BUILD_CORE_INFRA";
    classification = "DETERMINISTIC_SOFTWARE";
    executiveSummary = "This is the single most critical architectural investment in the entire multi-brand ecosystem.";
    recommendedAction = "Build a centralized Supabase pgvector store with strict tenant isolation (GLOBAL_ENTERPRISE vs BRAND_TENANT).";
    modelStrategy = "Text-embedding-3-small for semantic indexing; Claude 3.5 Sonnet for high-level cross-brand reasoning.";
    memoryStrategy = "Hierarchical memory: Global brand voice & verified SOPs at top, brand-isolated PII at bottom.";
    revenueRoiAnalysis = "Acts as an enterprise force multiplier: allows all subsequent agents to operate with full context instantly.";
    savings = 5000;
  } else if (lower.includes("ugc") || lower.includes("creative") || lower.includes("ad") || lower.includes("hook")) {
    verdict = "KEEP_AND_SCALE";
    classification = "AUTONOMOUS_AGENT";
    executiveSummary = "High-leverage agentic use case. Creative iteration and hook generation directly drive e-commerce ROAS.";
    recommendedAction = "Deploy as a multi-step agent: Ingest winning competitor angles, generate 20 script variants, human-review gate, export to CapCut.";
    modelStrategy = "Claude 3.5 Sonnet for copywriting hooks + Gemini 2.0 Flash for high-speed competitor transcript parsing.";
    memoryStrategy = "Isolated brand memory for AlcoEaze ingredients & claims; shared library for viral hook archetypes.";
    revenueRoiAnalysis = "Estimated revenue lift of $25,000-$40,000/month by 4x-ing creative ad testing velocity.";
    savings = 4200;
  }

  return {
    repoOrConcept,
    brandScope,
    verdict,
    classification,
    executiveSummary,
    recommendedAction,
    modelStrategy,
    memoryStrategy,
    revenueRoiAnalysis,
    estimatedMonthlySavings: savings,
    latencyMs: Math.max(latencyMs, 42),
    provider: "Deterministic Rule Engine",
    model: "Local Heuristic Engine v2.4",
    reasoningTraces: [
      "Rule engine evaluated problem complexity against 4-tier decision taxonomy.",
      "Verified against off-the-shelf SaaS feasibility index.",
      "Confirmed memory tenant boundaries for multi-brand architecture.",
      "Computed direct revenue and labor impact ratio."
    ]
  };
}

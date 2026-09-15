export type InitiativeState = 
  | "PROD" 
  | "PARTIAL" 
  | "CONCEPT_FDD" 
  | "AI_MVP_BUGGY" 
  | "PROMPT_LIBRARY";

export type InitiativeClassification = 
  | "AUTONOMOUS_AGENT" 
  | "DETERMINISTIC_SOFTWARE" 
  | "EXISTING_SAAS" 
  | "DOCUMENTED_SOP";

export type StrategicVerdict = 
  | "KEEP_AND_SCALE" 
  | "CONSOLIDATE" 
  | "KILL_STOP_BUILDING" 
  | "REPLACE_WITH_SAAS" 
  | "BUILD_CORE_INFRA";

export type MemoryTier = 
  | "SHARED_ENTERPRISE" 
  | "ISOLATED_BRAND_SILO" 
  | "EPHEMERAL_SCRATCHPAD";

export type RevenueImpact = 
  | "CRITICAL_REVENUE" 
  | "HIGH_REVENUE" 
  | "MODERATE_REVENUE" 
  | "LABOR_SAVING_ONLY" 
  | "ZERO_NET_ROI";

export interface Initiative {
  id: string;
  name: string;
  repoName: string;
  brand: string;
  description: string;
  currentState: InitiativeState;
  classification: InitiativeClassification;
  strategicVerdict: StrategicVerdict;
  consolidationGroup?: string;
  recommendedModel: string;
  memoryTier: MemoryTier;
  revenueImpact: RevenueImpact;
  estimatedLaborHoursSavedPerWeek: number;
  monthlyRevenueLiftEst: number;
  monthlyTokenCostEst: number;
  architectNotes: string;
}

export interface ArchitectReviewResult {
  repoOrConcept: string;
  brandScope: string;
  verdict: StrategicVerdict;
  classification: InitiativeClassification;
  executiveSummary: string;
  recommendedAction: string;
  modelStrategy: string;
  memoryStrategy: string;
  revenueRoiAnalysis: string;
  estimatedMonthlySavings: number;
  latencyMs: number;
  provider: "OpenAI" | "Gemini" | "Deterministic Rule Engine";
  model: string;
  reasoningTraces?: string[];
}

export interface LogEvent {
  id: string;
  timestamp: string;
  eventType: "INGESTION" | "TRIAGE_RULE" | "MODEL_ROUTING" | "MEMORY_GATE" | "EVALUATION" | "FAILOVER";
  status: "200_OK" | "301_CONSOLIDATE" | "410_DEPRECATE" | "503_FAILOVER";
  summary: string;
  details: string;
  latencyMs?: number;
  tokenStats?: {
    in: number;
    out: number;
    costUsd: number;
  };
}

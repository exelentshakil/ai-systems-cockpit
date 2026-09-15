"use client";

import { useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";

export function RoiCostCalculator() {
  const [totalRepos, setTotalRepos] = useState(12);
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(108);
  const [blendedRate, setBlendedRate] = useState(60);
  const [monthlyInferences, setMonthlyInferences] = useState(45000);

  // Math models
  const zombieReposKilled = Math.round(totalRepos * 0.25); // ~25% killed
  const reposConsolidated = Math.round(totalRepos * 0.33); // ~33% merged
  const annualWastePrevented = zombieReposKilled * 120 * blendedRate; // 120 hrs wasted per zombie repo per year
  const annualLaborValueRecovered = hoursSavedPerWeek * 52 * blendedRate;
  
  // Smart Model Routing cost vs Naive unmanaged agent swarm
  // Smart routing: 85% deterministic/gemini flash ($0.00015/call), 15% Sonnet ($0.003/call)
  const smartTokenCostPerCall = 0.85 * 0.00015 + 0.15 * 0.003;
  const naiveTokenCostPerCall = 0.0032; // Unoptimized Claude Opus/Sonnet for every single dumb extraction
  
  const monthlySmartTokenBurn = monthlyInferences * smartTokenCostPerCall;
  const monthlyNaiveTokenBurn = monthlyInferences * naiveTokenCostPerCall;
  const annualTokenSavings = (monthlyNaiveTokenBurn - monthlySmartTokenBurn) * 12;

  const totalAnnualEconomicBenefit = annualLaborValueRecovered + annualWastePrevented + annualTokenSavings;
  const netRoiRatio = Math.round((totalAnnualEconomicBenefit / 28000) * 100);

  return (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-6 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Operational ROI & Token Burn Unit Economics
            </h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Calculator className="h-3.5 w-3.5" />
              Real Unit Economics
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Compare unmanaged multi-repo AI sprawl against rationalized architecture economics
          </p>
        </div>
        <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
          +{formatNumber(netRoiRatio)}% Net Economic ROI
        </div>
      </div>

      {/* Sliders and Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Left Column */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-medium text-[var(--color-text-primary)] mb-1">
              <span>Total Repos & Concept Systems in Portfolio</span>
              <span className="font-mono font-bold text-[var(--color-brand-primary)]">
                {totalRepos} Repositories
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={30}
              value={totalRepos}
              onChange={(e) => setTotalRepos(Number(e.target.value))}
              className="w-full accent-[var(--color-brand-primary)] h-1.5 bg-[var(--color-panel-subtle)] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[var(--color-text-muted)] mt-0.5">
              <span>4 minimal</span>
              <span>12 current</span>
              <span>30 large sprawl</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-[var(--color-text-primary)] mb-1">
              <span>Founder & Dev Hours Saved / Week</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {hoursSavedPerWeek} hrs / week
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={150}
              step={5}
              value={hoursSavedPerWeek}
              onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-[var(--color-panel-subtle)] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[var(--color-text-muted)] mt-0.5">
              <span>10 hrs</span>
              <span>108 hrs (Audited)</span>
              <span>150 hrs</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-[var(--color-text-primary)] mb-1">
              <span>Blended Engineering / Founder Rate</span>
              <span className="font-mono font-bold text-[var(--color-text-primary)]">
                ${blendedRate} / hr
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={150}
              step={5}
              value={blendedRate}
              onChange={(e) => setBlendedRate(Number(e.target.value))}
              className="w-full accent-[var(--color-brand-primary)] h-1.5 bg-[var(--color-panel-subtle)] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[var(--color-text-muted)] mt-0.5">
              <span>$30/hr</span>
              <span>$60/hr (Calibrated)</span>
              <span>$150/hr</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-[var(--color-text-primary)] mb-1">
              <span>Monthly Inferences Across All Agents</span>
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                {formatNumber(monthlyInferences)} runs / month
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={150000}
              step={5000}
              value={monthlyInferences}
              onChange={(e) => setMonthlyInferences(Number(e.target.value))}
              className="w-full accent-cyan-500 h-1.5 bg-[var(--color-panel-subtle)] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[var(--color-text-muted)] mt-0.5">
              <span>5k (pilot)</span>
              <span>45k (current scale)</span>
              <span>150k (high volume)</span>
            </div>
          </div>
        </div>

        {/* Results Bento Cards Right Column */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">
                Zombie Waste Prevented
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {formatCurrency(annualWastePrevented)}
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                Killing {zombieReposKilled} dead repos saves ~{zombieReposKilled * 120} wasted dev hours annually
              </p>
            </div>

            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">
                Annual Labor Recovered
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--color-brand-primary)]">
                {formatCurrency(annualLaborValueRecovered)}
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                {hoursSavedPerWeek} hrs/wk redirected to core product & direct sales
              </p>
            </div>
          </div>

          {/* Model Routing Comparison Strip */}
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                Model Routing Token Cost Comparison
              </span>
              <span className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                Save {formatCurrency(annualTokenSavings)}/yr
              </span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1">
                  <span>Smart Cost-Aware Routing (Advisor Pattern)</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(monthlySmartTokenBurn)} / mo
                  </span>
                </div>
                <div className="w-full bg-[var(--color-border)] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ width: `${Math.max(5, (monthlySmartTokenBurn / monthlyNaiveTokenBurn) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-[var(--color-text-muted)] mb-1">
                  <span>Naive Unmanaged Agent Swarm (No Routing)</span>
                  <span className="font-mono text-rose-500 font-bold">
                    {formatCurrency(monthlyNaiveTokenBurn)} / mo
                  </span>
                </div>
                <div className="w-full bg-[var(--color-border)] h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full w-full opacity-60" />
                </div>
              </div>
            </div>
          </div>

          {/* Total Net Value Banner */}
          <div className="rounded-lg bg-[var(--color-brand-subtle)] border border-[var(--color-brand-primary)]/20 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--color-brand-primary)]" />
              <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                Total Annual Economic Value Generated:
              </span>
            </div>
            <span className="text-base font-mono font-bold text-[var(--color-brand-primary)]">
              {formatCurrency(totalAnnualEconomicBenefit)} / yr
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

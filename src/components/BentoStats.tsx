"use client";

import {
  TrendingUp,
  Clock,
  Zap,
  DollarSign,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  Sparkles
} from "lucide-react";

export function BentoStats() {
  const stats = [
    {
      title: "Portfolio Initiatives Audited",
      value: "12 Assets",
      subtext: "4 Scale • 3 Merge • 2 Kill • 2 SaaS • 1 Infra",
      badge: "83% Rationalized",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      icon: Layers,
      trend: "Sprawl Eliminated",
    },
    {
      title: "Weekly Founder / Dev Capacity Recovered",
      value: "108 hrs/wk",
      subtext: "~$25,920/mo recovered high-value engineering focus",
      badge: "+2.7 FTEs",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      icon: Clock,
      trend: "Zero Slop Code",
    },
    {
      title: "Estimated Monthly Revenue Lift",
      value: "+$185,200/mo",
      subtext: "AlcoEaze UGC ($28.5k) + TikTok Seeding ($45k) + Klaviyo ($18.5k)",
      badge: "Direct Impact",
      badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      icon: TrendingUp,
      trend: "+34% Run Rate",
    },
    {
      title: "Model Routing Token Efficiency",
      value: "$64.60/mo",
      subtext: "Smart routing vs $1,400/mo naive agent prompt spam",
      badge: "95.4% Cheaper",
      badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      icon: Zap,
      trend: "Sub-Cent Runs",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 shadow-sm hover:border-[var(--color-brand-primary)]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] truncate">
                  {stat.title}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${stat.badgeColor} whitespace-nowrap shrink-0`}>
                  {stat.badge}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1.5">
                <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                  {stat.value}
                </div>
              </div>

              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                {stat.subtext}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-medium text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-1 text-[var(--color-brand-primary)]">
                <Sparkles className="h-3 w-3" />
                {stat.trend}
              </span>
              <Icon className="h-4 w-4 text-[var(--color-text-muted)] opacity-60" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

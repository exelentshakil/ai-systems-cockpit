"use client";

import { useState } from "react";
import { LogEvent } from "@/types";
import {
  Terminal,
  ChevronUp,
  ChevronDown,
  Trash2,
  Copy,
  Check,
  Zap,
  Code2,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

interface ExecutionLogDrawerProps {
  logs: LogEvent[];
  onClearLogs: () => void;
}

export function ExecutionLogDrawer({ logs, onClearLogs }: ExecutionLogDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCurl = () => {
    const curl = `curl -X POST https://ai-systems-cockpit.vercel.app/api/ai/architect-review \\
  -H "Content-Type: application/json" \\
  -d '{"repoOrConcept": "tony-brands/alcoeaze-ad-agent", "brandScope": "AlcoEaze", "focusArea": "REDUNDANCY_AUDIT"}'`;
    navigator.clipboard.writeText(curl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] shadow-sm transition-colors overflow-hidden">
      {/* Drawer Toggle Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[var(--color-panel-subtle)] transition-colors select-none"
      >
        <div className="flex items-center gap-2 min-w-0">
          <Terminal className="h-4 w-4 text-[var(--color-brand-primary)] shrink-0" />
          <span className="text-xs font-semibold text-[var(--color-text-primary)] truncate">
            Live Enterprise Event Stream & Webhook Inspector
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap shrink-0">
            {logs.length} Events Captured
          </span>
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleCopyCurl}
            className="hidden sm:inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] font-mono border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)] transition-colors whitespace-nowrap shrink-0"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
            <span>Copy cURL</span>
          </button>

          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-[var(--color-text-muted)]" />
          ) : (
            <ChevronUp className="h-4 w-4 text-[var(--color-text-muted)]" />
          )}
        </div>
      </div>

      {/* Expanded Logs Panel */}
      {isOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-border-subtle)] text-xs text-[var(--color-text-muted)] font-mono">
            <span>EVENT TELEMETRY FEED (REAL-TIME BUFFER)</span>
            <button
              onClick={onClearLogs}
              className="flex items-center gap-1 text-[var(--color-text-muted)] hover:text-rose-500 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              <span>Clear Feed</span>
            </button>
          </div>

          <div className="space-y-1.5 max-h-60 overflow-y-auto font-mono text-xs">
            {logs.length === 0 ? (
              <div className="p-4 text-center text-xs text-[var(--color-text-muted)] font-mono">
                No events in buffer. Click "Simulate Full Triage" or run an AI audit to stream telemetry.
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="rounded border border-[var(--color-border)] bg-[var(--color-panel)] p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-[var(--color-brand-primary)]/30 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-2 min-w-0">
                    <span className="text-[10px] text-[var(--color-text-muted)] shrink-0">
                      [{log.timestamp}]
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      {log.eventType}
                    </span>
                    <span className="text-xs text-[var(--color-text-primary)] font-medium truncate">
                      {log.summary}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-[var(--color-text-muted)] shrink-0 pl-6 sm:pl-0">
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {log.status}
                    </span>
                    {log.latencyMs && <span>{log.latencyMs}ms</span>}
                    {log.tokenStats && (
                      <span className="text-[10px] text-[var(--color-text-secondary)]">
                        ${log.tokenStats.costUsd.toFixed(5)}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

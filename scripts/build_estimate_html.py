import os
import base64
import subprocess
import re

docs_dir = os.path.expanduser("~/Apps/claude-code/ai-systems-cockpit/docs")
html_path = os.path.join(docs_dir, "estimate.html")
pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

with open(os.path.join(docs_dir, "headshot.jpeg"), "rb") as f:
    headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

with open(os.path.join(docs_dir, "logo.png"), "rb") as f:
    logo_b64 = base64.b64encode(f.read()).decode("utf-8")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Scope & Formal Architecture Estimate - AI Systems Advisor</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 6mm 8.5mm 6mm 8.5mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.32;
      font-size: 9.6px;
    }}

    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
    }}

    /* 1. Executive Header */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 5px;
    }}
    .header-left {{
      flex: 1;
      min-width: 0;
    }}
    .brand-title {{
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #2563eb;
      margin-bottom: 2px;
    }}
    h1 {{
      font-size: 14.5px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }}
    .subtitle {{
      font-size: 8.6px;
      color: #475569;
      margin: 0;
      line-height: 1.25;
    }}
    .meta-card {{
      flex-shrink: 0;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 5px 9px;
      font-size: 8.3px;
      text-align: right;
      line-height: 1.35;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }}
    .meta-card strong {{
      color: #0f172a;
    }}
    .live-badge {{
      display: inline-block;
      background: #ecfdf5;
      color: #059669;
      border: 1px solid #a7f3d0;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 9999px;
      font-size: 7.8px;
      text-transform: uppercase;
      margin-left: 3px;
    }}

    /* 2. Scope Table */
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3.5px;
    }}
    .section-title {{
      font-size: 9.6px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1e293b;
      border-left: 3px solid #2563eb;
      padding-left: 6px;
      margin: 0;
    }}
    .section-meta {{
      font-size: 8.3px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
    }}
    th {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 8.3px;
      letter-spacing: 0.04em;
      border: 1px solid #cbd5e1;
      padding: 3.5px 5.5px;
      text-align: left;
    }}
    td {{
      border: 1px solid #e2e8f0;
      padding: 4.2px 5.5px;
      font-size: 8.6px;
      vertical-align: top;
    }}
    .phase-num {{
      font-weight: 800;
      color: #1e293b;
      font-size: 8.6px;
      white-space: nowrap;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      font-size: 8.9px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 7.8px;
      margin-top: 1px;
      line-height: 1.2;
    }}
    .phase-0-row {{
      background: #f0fdf4;
    }}
    .phase-0-badge {{
      color: #15803d;
      font-weight: 800;
    }}
    .total-row {{
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      border: 1px solid #0f172a;
    }}
    .total-row td {{
      border: 1px solid #0f172a;
      padding: 4.5px 5.5px;
      font-size: 8.9px;
    }}

    /* 3. 2-Column Grid */
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }}
    .card-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 6px 8.5px;
    }}
    .card-box-title {{
      font-size: 8.6px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #1e293b;
      margin: 0 0 3px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }}
    .milestone-item {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      border-bottom: 1px dotted #cbd5e1;
      padding: 2.2px 0;
      font-size: 7.9px;
    }}
    .milestone-item:last-child {{
      border-bottom: none;
      padding-bottom: 0;
    }}
    .milestone-name {{
      color: #334155;
    }}
    .milestone-val {{
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-weight: 700;
      color: #0f172a;
      white-space: nowrap;
    }}
    .guardrail-item {{
      font-size: 7.8px;
      color: #334155;
      margin-bottom: 2.8px;
      line-height: 1.24;
    }}
    .guardrail-item:last-child {{
      margin-bottom: 0;
    }}
    .guardrail-item strong {{
      color: #0f172a;
    }}

    /* 4. Terms Box */
    .terms-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 5.5px 8.5px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }}
    .term-col {{
      font-size: 7.6px;
      line-height: 1.24;
    }}
    .term-title {{
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #1e293b;
      margin-bottom: 1.5px;
      font-size: 7.9px;
    }}
    .term-body {{
      color: #475569;
    }}

    /* 5. Authorization Box */
    .auth-block {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 5px 8.5px;
    }}
    .auth-title {{
      font-size: 8.4px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #1e293b;
      margin-bottom: 3.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }}
    .auth-party {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 4px 7px;
      font-size: 7.8px;
      line-height: 1.25;
    }}
    .auth-party-title {{
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1.5px;
      font-size: 8px;
    }}
    .auth-sign-line {{
      margin-top: 3.5px;
      padding-top: 2px;
      border-top: 1px solid #94a3b8;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}
    .auth-sign-field {{
      font-family: 'Brush Script MT', 'Segoe Script', cursive, sans-serif;
      font-size: 11px;
      color: #1d4ed8;
      font-weight: bold;
    }}
    .auth-date-field {{
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 7.5px;
      color: #475569;
    }}
    .auth-label {{
      font-size: 6.8px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
    }}

    /* 6. Executive Footer */
    .footer-container {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      border-top: 1px solid #e2e8f0;
      padding-top: 4px;
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}
    .founder-avatar {{
      width: 28px;
      height: 28px;
      border-radius: 9999px;
      object-fit: cover;
      border: 1.5px solid #2563eb;
    }}
    .founder-info {{
      font-size: 7.6px;
      line-height: 1.22;
    }}
    .founder-name {{
      color: #0f172a;
      font-size: 8px;
    }}
    .founder-company {{
      color: #2563eb;
      font-weight: 700;
    }}
    .founder-sub {{
      color: #64748b;
    }}
    .footer-brand {{
      display: flex;
      align-items: center;
      gap: 8px;
      text-align: right;
    }}
    .business-logo {{
      height: 22px;
      width: auto;
      object-fit: contain;
    }}
    .demo-badge {{
      display: inline-block;
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
      border-radius: 4px;
      padding: 2.5px 6px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 7.6px;
      font-weight: 700;
      text-decoration: none;
    }}
  </style>
</head>
<body>
<div class="page-container">

  <!-- 1. Executive Header -->
  <div class="header">
    <div class="header-left">
      <div class="brand-title">Ecosystem Architecture & Advisory Roadmap • BarakahSoft LLC</div>
      <h1>Fractional AI Systems Advisor & Agentic AI Architect</h1>
      <div class="subtitle">Multi-Brand Ecosystem Rationalization: AlcoEaze, TikTok Shop Apparel, Amazon FBA & Community</div>
    </div>
    <div class="meta-card">
      <div><strong>Client:</strong> Tony / Antonio (Long Beach, CA)</div>
      <div><strong>Contract Rate:</strong> $55.00 / hr <span class="live-badge">Calibrated</span></div>
      <div><strong>Initial Scope:</strong> 62 Hrs Turnkey • $3,410.00</div>
      <div><strong>Date:</strong> 15 Sep 2026 • <strong>Ref:</strong> BSOFT-ARCH-2026-09</div>
    </div>
  </div>

  <!-- 2. Scope & Milestone Table -->
  <div class="table-section">
    <div class="section-header">
      <div class="section-title">Milestone Engineering Scope & Strategic Deliverables</div>
      <div class="section-meta">Rate: $55.00/hr • 100% Client Code & IP Ownership</div>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 14%;">Milestone</th>
          <th style="width: 58%;">Engineering Scope & Strategic Deliverables</th>
          <th style="width: 12%; text-align: center;">Hours</th>
          <th style="width: 16%; text-align: right;">Investment</th>
        </tr>
      </thead>
      <tbody>
        <tr class="phase-0-row">
          <td class="phase-num">Phase 0 <span class="phase-0-badge">✓ DONE</span></td>
          <td>
            <div class="phase-name">Multi-Brand Architecture Audit & Interactive Cockpit Demo</div>
            <div class="phase-desc">12-initiative inventory audit, 4-way classification matrix (Agent vs Software vs SaaS vs SOP), live dual-provider AI review engine (OpenAI + Gemini), pgvector RLS schema, and Inngest blueprints.</div>
          </td>
          <td style="text-align: center; font-family: ui-monospace; font-weight: 700;">14 hrs</td>
          <td style="text-align: right; font-family: ui-monospace; font-weight: 800; color: #15803d;">$0.00 (Done)</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 1</td>
          <td>
            <div class="phase-name">Deep Repository Rationalization & Redundancy Consolidation</div>
            <div class="phase-desc">Audit active GitHub repos. Consolidate 3 duplicate TikTok/Shopify creator scrapers into 1 unified queue. Deprecate custom Playwright scrapers in favor of Apify SaaS webhooks. Eliminate token waste.</div>
          </td>
          <td style="text-align: center; font-family: ui-monospace; font-weight: 700;">20 hrs</td>
          <td style="text-align: right; font-family: ui-monospace; font-weight: 700;">$1,100.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 2</td>
          <td>
            <div class="phase-name">Centralized Company Intelligence & Tenant Memory Layer</div>
            <div class="phase-desc">Deploy Supabase pgvector schema with strict Row-Level Security (RLS). Establish GLOBAL_ENTERPRISE for brand voice/winning hooks while strictly isolating AlcoEaze supplement PII from apparel creators.</div>
          </td>
          <td style="text-align: center; font-family: ui-monospace; font-weight: 700;">24 hrs</td>
          <td style="text-align: right; font-family: ui-monospace; font-weight: 700;">$1,320.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 3</td>
          <td>
            <div class="phase-name">Cost-Aware Model Routing & Durable Inngest Orchestration</div>
            <div class="phase-desc">Deploy Inngest durable serverless step functions. Route low-complexity extraction to GPT-4o-mini & Gemini 2.0 Flash ($0.00015/call); reserve Claude 3.5 Sonnet for high-reasoning tasks with human approval gates.</div>
          </td>
          <td style="text-align: center; font-family: ui-monospace; font-weight: 700;">18 hrs</td>
          <td style="text-align: right; font-family: ui-monospace; font-weight: 700;">$990.00</td>
        </tr>
        <tr class="total-row">
          <td colspan="2" style="text-align: right; text-transform: uppercase; letter-spacing: 0.05em; font-size: 8.5px;">Turnkey Architecture Consolidation (Phases 1–3 Total):</td>
          <td style="text-align: center; font-family: ui-monospace; font-weight: 800;">62 hrs</td>
          <td style="text-align: right; font-family: ui-monospace; font-weight: 800;">$3,410.00</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 3. Strategic Options & Architecture Guardrails -->
  <div class="grid-2col">
    <div class="card-box">
      <div class="card-box-title">Strategic Engagement Options</div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option A:</strong> Phase 1 Repository Triage & Redundancy Purge</span>
        <span class="milestone-val">$1,100.00 (20 hrs)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option B:</strong> Phases 1 & 2 Core Systems & Shared Memory Layer</span>
        <span class="milestone-val">$2,420.00 (44 hrs)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option C:</strong> Complete Turnkey Architecture Package (Phases 1–3)</span>
        <span class="milestone-val">$3,410.00 (62 hrs)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option D:</strong> Fractional Advisor Retainer (Bi-Weekly Architecture Sync)</span>
        <span class="milestone-val">$550.00/mo (10 hrs)</span>
      </div>
    </div>

    <div class="card-box">
      <div class="card-box-title">Architecture Guardrails & Defensibility Guarantees</div>
      <div class="guardrail-item"><strong>Strict RLS Tenant Isolation:</strong> Brand customer PII and API keys are partitioned via PostgreSQL RLS; shared brand voice vectors live in a secure `GLOBAL_ENTERPRISE` namespace.</div>
      <div class="guardrail-item"><strong>90% Token Reduction via Smart Routing:</strong> Deterministic scripts handle math & scraping; fast models extract data; high-reasoning models only synthesize.</div>
      <div class="guardrail-item"><strong>100% Client Ownership & Zero Lock-In:</strong> Durable Inngest step functions and Supabase schemas live in client GitHub repositories with no proprietary middleware dependencies.</div>
    </div>
  </div>

  <!-- 4. Commercial Terms & Engagement Conditions -->
  <div class="terms-box">
    <div class="card-box-title" style="margin-bottom: 3px;">Commercial Terms & Production Engagement Conditions</div>
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Escrow Milestones</div>
        <div class="term-body">100% milestone-based on Upwork. Funds deposited in escrow per phase and released strictly upon verified GitHub commit & staging sign-off.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Full IP Ownership</div>
        <div class="term-body">All source code, schemas, prompts, blueprints, and infrastructure configurations transfer to Client immediately upon milestone completion.</div>
      </div>
      <div class="term-col">
        <div class="term-title">14-Day Hypercare SLA</div>
        <div class="term-body">Includes 14 days of complimentary post-consolidation monitoring, prompt drift verification, and bug resolution at zero additional cost.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Quote Validity</div>
        <div class="term-body">Valid for 30 days through October 15, 2026. Calibrated $55.00/hr rate covers all specified architecture deliverables without surprise fees.</div>
      </div>
    </div>
  </div>

  <!-- 5. Formal Acceptance Authorization -->
  <div class="auth-block">
    <div class="auth-title">
      <span>Formal Authorization & Engagement Acceptance</span>
      <span style="font-weight: 500; font-size: 7.2px; color: #475569;">Binding upon signature by authorized representatives</span>
    </div>
    <div class="auth-grid">
      <div class="auth-party">
        <div class="auth-party-title">Authorized Provider: BarakahSoft LLC (Wyoming, USA)</div>
        <div>Signatory: <strong>Shakil Ahmed</strong> • Principal Systems Architect & Founder</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field">Shakil Ahmed</div>
          <div class="auth-date-field">15 Sep 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Provider Signature</span>
          <span class="auth-label" style="width: 75px; text-align: center;">Date</span>
        </div>
      </div>

      <div class="auth-party">
        <div class="auth-party-title">Authorized Client: Tony / Antonio (Long Beach, CA)</div>
        <div>Signatory: <strong>Tony / Antonio</strong> • Portfolio Founder</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="color: #64748b; font-family: inherit; font-size: 8px; font-style: italic;">[ Accepted via Upwork Contract Offer / Sign-off ]</div>
          <div class="auth-date-field">___ / ___ / 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Client Signature</span>
          <span class="auth-label" style="width: 75px; text-align: center;">Date</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Shakil Ahmed</strong> • Founder & Lead Systems Architect (12+ Yrs Exp)</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Enterprise AI Systems Partner</div>
        <div class="founder-sub">Former Lead Engineer at Legiit ($1M ARR Command Center) • Verified Upwork Partner</div>
      </div>
    </div>
    <div class="footer-brand">
      <img src="data:image/png;base64,{logo_b64}" alt="BarakahSoft" class="business-logo" />
      <a href="https://ai-systems-cockpit.vercel.app" target="_blank" class="demo-badge">ai-systems-cockpit.vercel.app</a>
    </div>
  </div>

</div>
</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Saved estimate.html to:", html_path)

chrome_cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    html_path
]

res = subprocess.run(chrome_cmd, capture_output=True, text=True)
if res.returncode == 0:
    print("Successfully generated ESTIMATE.pdf via Chrome Headless at:", pdf_path)
    file_size = os.path.getsize(pdf_path)
    print("File size:", file_size, "bytes")
else:
    print("Chrome print-to-pdf error:", res.stderr)

with open(pdf_path, "rb") as f:
    pdf_bytes = f.read()

pages = re.findall(rb"/Type\s*/Page[^s]", pdf_bytes)
print(f"Verified PDF page count: {len(pages)} page(s)")

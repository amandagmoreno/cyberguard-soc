"use client";

import React from "react";
import { T, SEV_META, type SevKey } from "@/lib/tokens";

// ─── PulseDot ─────────────────────────────────────────────────────────────────
export function PulseDot({ color, size = 7 }: { color: string; size?: number }) {
  return (
    <span style={{ position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
      <span style={{
        width: size, height: size, borderRadius:"50%", background: color, display:"block",
        animation:"sentinelPulse 2.2s ease-out infinite",
      }} />
    </span>
  );
}

// ─── SevBadge ─────────────────────────────────────────────────────────────────
export function SevBadge({ sev }: { sev: any }) {

  const normalized =
    typeof sev === "string"
      ? sev.toLowerCase()
      : "medium";

  const safeSev =
    normalized === "critical" ||
    normalized === "high" ||
    normalized === "medium" ||
    normalized === "low"
      ? normalized
      : "medium";

  const m = SEV_META[safeSev as SevKey];

  return (
    <span
      style={{
        fontSize:10,
        fontWeight:700,
        letterSpacing:"0.07em",
        padding:"3px 8px",
        borderRadius:4,
        background:m?.bg || "#222",
        color:m?.color || "#fff",
        border:`1px solid ${m?.border || "#444"}`,
        fontFamily:"'IBM Plex Mono', monospace",
        whiteSpace:"nowrap",
      }}
    >
      {safeSev.toUpperCase()}
    </span>
  );
}

// ─── AgentBadge ───────────────────────────────────────────────────────────────
export function AgentBadge({ status, color }: { status: string; color: string }) {
  return (
    <span style={{
      fontSize:10, fontWeight:700, letterSpacing:"0.07em", padding:"3px 9px",
      borderRadius:4, background:`${color}20`, color, border:`1px solid ${color}50`,
      fontFamily:"'IBM Plex Mono', monospace",
    }}>{status}</span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: T.bg2, border:`1px solid ${T.border}`,
      borderRadius:12, padding:"16px 18px", ...style,
    }}>
      {children}
    </div>
  );
}

// ─── SectionHead ──────────────────────────────────────────────────────────────
export function SectionHead({
  icon, title, right,
}: { icon: React.ReactNode; title: string; right?: React.ReactNode }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ color:T.violet, display:"flex" }}>{icon}</span>
        <span style={{ fontSize:12, fontWeight:600, color:T.text0, letterSpacing:"0.02em" }}>{title}</span>
      </div>
      {right && <div style={{ fontSize:11, color:T.text1 }}>{right}</div>}
    </div>
  );
}

// ─── Hr ───────────────────────────────────────────────────────────────────────
export function Hr() {
  return <div style={{ height:1, background:T.border }} />;
}

// ─── ChartTip ─────────────────────────────────────────────────────────────────
export function ChartTip({
  active, payload, label,
  valueLabel = "events", valueColor = T.violet,
}: {
  active?: boolean; payload?: { value: number }[]; label?: string;
  valueLabel?: string; valueColor?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background:T.bg3, border:`1px solid ${T.borderHi}`, borderRadius:7,
      padding:"6px 12px", fontSize:11, color:T.text0,
    }}>
      <div style={{ color:T.text1, marginBottom:2 }}>{label}</div>
      <div style={{ color:valueColor, fontWeight:700 }}>{payload[0].value} {valueLabel}</div>
    </div>
  );
}

// ─── PageHeader ───────────────────────────────────────────────────────────────
export function PageHeader({
  title, subtitle, children,
}: { title: string; subtitle: string; children?: React.ReactNode }) {
  return (
    <div style={{ marginBottom:20, display:"flex", alignItems:"flex-end", justifyContent:"space-between" }}>
      <div>
        <h1 style={{ fontSize:20, fontWeight:800, color:T.text0, letterSpacing:"-0.02em", lineHeight:1 }}>
          {title}
        </h1>
        <p style={{ fontSize:11, color:T.text2, marginTop:4 }}>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"60px 20px", gap:12,
    }}>
      <div style={{ fontSize:36, opacity:0.15 }}>{icon}</div>
      <div style={{ fontSize:14, fontWeight:600, color:T.text1 }}>{title}</div>
      <div style={{ fontSize:11, color:T.text2, textAlign:"center", maxWidth:240 }}>{sub}</div>
    </div>
  );
}

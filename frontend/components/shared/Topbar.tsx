"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Settings, AlertTriangle } from "lucide-react";
import { T } from "@/lib/tokens";
import { PulseDot } from "@/components/ui/primitives";

export function Topbar() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "13px 22px",
      background: T.bg1,
      borderBottom: `1px solid ${T.border}`,
      flexShrink: 0,
      zIndex: 10,
    }}>
      <div>
        <h1
          style={{
          fontSize:22,
          fontWeight:800,
          letterSpacing:"-0.03em",
          color:T.text0,
          lineHeight:1
      }}
   >
    Plataforma Inteligente de Monitoramento em Cibersegurança
  </h1>
</div>

      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        {/* Search */}
        <div style={{
          display:"flex", alignItems:"center", gap:8,
          background:T.bg2, border:`1px solid ${T.border}`,
          borderRadius:8, padding:"7px 12px",
        }}>
          <Search size={13} color={T.text2} />
          <input
            placeholder="Search threats..."
            style={{
              background:"transparent", border:"none", outline:"none",
              fontSize:11.5, color:T.text0, width:130,
            }}
          />
        </div>

        {/* UTC clock */}
        {isMounted && (
          <span style={{ fontSize:10.5, color:T.text2, fontFamily:"'IBM Plex Mono', monospace" }}>
            {new Date().toUTCString().slice(17, 25)} UTC
          </span>
        )}

        {/* LIVE */}
        <div style={{
          display:"flex", alignItems:"center", gap:6,
          background:`${T.success}18`, border:`1px solid ${T.success}50`,
          borderRadius:6, padding:"5px 11px",
        }}>
          <PulseDot color={T.success} size={6} />
          <span style={{ fontSize:10, fontWeight:700, color:T.success, letterSpacing:"0.08em" }}>LIVE</span>
        </div>

        {/* Critical count */}
        <div style={{
          display:"flex", alignItems:"center", gap:6,
          background:`${T.critical}15`, border:`1px solid ${T.critical}50`,
          borderRadius:6, padding:"5px 11px",
        }}>
          <AlertTriangle size={12} color={T.critical} />
          <span style={{ fontSize:10, fontWeight:700, color:T.critical }}>4 CRITICAL</span>
        </div>

        <Bell    size={16} color={T.text1} style={{ cursor:"pointer" }} />
        <Settings size={16} color={T.text1} style={{ cursor:"pointer" }} />
      </div>
    </header>
  );
}

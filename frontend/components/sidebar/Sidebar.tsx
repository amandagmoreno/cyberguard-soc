"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { T } from "@/lib/tokens";
import { PulseDot } from "@/components/ui/primitives";

export function Sidebar() {
  const pathname  = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const W = collapsed ? 58 : 195;

  return (
    <>
      {/* ── Global keyframes (injected once here) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:${T.bg0}; font-family:'IBM Plex Sans',sans-serif; color:${T.text0}; }

        @keyframes sentinelPulse {
          0%   { box-shadow:0 0 0 0 currentColor; }
          70%  { box-shadow:0 0 0 6px transparent; }
          100% { box-shadow:0 0 0 0 transparent; }
        }
        @keyframes sentinelFadeIn {
          from { opacity:0; transform:translateX(-5px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes pageSlideIn {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:${T.border}; border-radius:3px; }

        .nav-item { transition: background 0.18s ease, border-color 0.18s ease; }
        .nav-item:hover { background: ${T.violetLo} !important; }

        .collapse-btn { transition: background 0.15s ease, transform 0.2s ease; }
        .collapse-btn:hover { background: ${T.violetMid} !important; }

        .page-content { animation: pageSlideIn 0.22s ease; }
      `}</style>

      <aside style={{
        width: W,
        minWidth: W,
        background: T.bg1,
        borderRight: `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        padding: "16px 0",
        flexShrink: 0,
        transition: "width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s cubic-bezier(0.4,0,0.2,1)",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* ── Logo ── */}
        <div style={{
          padding: collapsed ? "0 0 22px" : "0 16px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}>
          {collapsed ? (
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: T.violetMid, display: "flex",
              alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: T.text0, fontSize: 13, fontWeight: 800 }}>S</span>
            </div>
          ) : (
            <div>
              <div
              style={{
                fontSize:15,
                fontWeight:800,
                color:T.text0,
                letterSpacing:"-0.03em"
            }}
          >
            Cyber<span style={{ color:T.violet }}>Guard</span>
          </div>
        </div>

          )}
         </div>  

{/* ── Nav items ── */}
<nav style={{ flex:1 }}>

  {NAV_ITEMS.map((item) => {

    const isActive =
      pathname === item.href ||
      pathname.startsWith(item.href + "/");

    const Icon = item.icon;

    return (

      <Link
        key={item.href}
        href={item.href}
        style={{ textDecoration:"none" }}
      >

        <div
          className="nav-item"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed
              ? "center"
              : "space-between",
            gap: 9,
            padding: collapsed
              ? "9px 0"
              : "8px 16px",
            cursor: "pointer",
            position: "relative",
            background: isActive
              ? T.violetLo
              : "transparent",
            borderLeft: isActive
              ? `2px solid ${T.violet}`
              : "2px solid transparent",
          }}
          title={
            collapsed
              ? item.label
              : undefined
          }
        >

          <div
            style={{
              display:"flex",
              alignItems:"center",
              gap:9,
              minWidth:0
            }}
          >

            <span
              style={{
                color: isActive
                  ? T.violet
                  : T.text2,
                display: "flex",
                flexShrink: 0,
                filter: isActive
                  ? `drop-shadow(0 0 6px ${T.violet}80)`
                  : "none",
              }}
            >
              <Icon size={15}/>
            </span>

            {!collapsed && (
              <span
                style={{
                  fontSize:11.5,
                  fontWeight:isActive
                    ? 600
                    : 400,
                  color:isActive
                    ? T.text0
                    : T.text1,
                }}
              >
                {item.label}
              </span>
            )}

          </div>

          {!collapsed &&
            item.badge !== undefined && (
              <span
                style={{
                  fontSize:9,
                  fontWeight:700,
                  color:
                    item.badgeColor ??
                    T.violet,
                  background:
                    `${item.badgeColor ?? T.violet}20`,
                  border:
                    `1px solid ${item.badgeColor ?? T.violet}40`,
                  borderRadius:99,
                  padding:"1px 6px",
                }}
              >
                {item.badge}
              </span>
          )}

        </div>

      </Link>

    );

  })}

  {/* ── CyberGuard AI ── */}

  {!collapsed && (

    <div
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent(
            "open-cyberguard-ai"
          )
        )
      }
      style={{
        margin:"14px 10px",
        padding:"12px",
        background:T.bg2,
        border:`1px solid ${T.border}`,
        borderRadius:10,
        cursor:"pointer",
      }}
    >

      <div
        style={{
          display:"flex",
          alignItems:"center",
          gap:8,
          marginBottom:6
        }}
      >

        <div
          style={{
            width:10,
            height:10,
            borderRadius:"50%",
            background:T.violet,
            boxShadow:`0 0 10px ${T.violet}`
          }}
        />

        <span
          style={{
            fontSize:11,
            fontWeight:700,
            color:T.text0
          }}
        >
          CyberGuard AI Assistant
        </span>

      </div>

      <div
        style={{
          fontSize:10,
          color:T.success,
          marginBottom:4
        }}
      >
        Powered by Llama 3
      </div>

      <div
        style={{
          fontSize:9,
          color:T.text2
        }}
      >
        Clique para conversar
      </div>

    </div>

  )}

</nav>

        {/* ── Collapse toggle ── */}
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(c => !c)}
          style={{
            position: "absolute",
            bottom: 14,
            right: collapsed ? "50%" : 10,
            transform: collapsed ? "translateX(50%)" : "none",
            width: 24, height: 24,
            borderRadius: 6,
            background: T.bg3,
            border: `1px solid ${T.border}`,
            color: T.text2,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          title={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
        >
          {collapsed
            ? <ChevronRight size={12} />
            : <ChevronLeft  size={12} />
          }
        </button>
      </aside>
    </>
  );
}
"use client";

import { useState } from "react";
import { AlertTriangle, ChevronRight, Clock, Server, Shield } from "lucide-react";
import { T } from "@/lib/tokens";
import { Card, SectionHead, SevBadge, Hr, PageHeader, PulseDot } from "@/components/ui/primitives";
import { INCIDENTS } from "@/lib/data";
import type { Severity } from "@/types";

const STATUS_META = {
  investigating: { color:"#F97316", label:"Em Investigação" },
  contained:     { color:"#EAB308", label:"Contido"         },
  resolved:      { color:"#10B981", label:"Resolvido"       },
  new:           { color:"#EF4444", label:"Novo"            },
};

const FILTERS: { label:string; sev: Severity|"ALL" }[] = [
  { label:"Todos",    sev:"ALL"      },
  { label:"Crítico",  sev:"CRITICAL" },
  { label:"Alto",     sev:"HIGH"     },
  { label:"Médio",    sev:"MEDIUM"   },
  { label:"Baixo",    sev:"LOW"      },
];

const SEV_COLOR: Record<Severity,string> = {
  CRITICAL:"#EF4444", HIGH:"#F97316", MEDIUM:"#EAB308", LOW:"#3B82F6",
};

export default function IncidentsPage() {
  const [filter, setFilter] = useState<Severity|"ALL">("ALL");
  const [selected, setSelected] = useState<string|null>(null);

  const filtered = filter === "ALL" ? INCIDENTS : INCIDENTS.filter(i => i.sev === filter);
  const sel = INCIDENTS.find(i => i.id === selected);

  const statCounts = {
    CRITICAL: INCIDENTS.filter(i => i.sev==="CRITICAL").length,
    HIGH:     INCIDENTS.filter(i => i.sev==="HIGH").length,
    MEDIUM:   INCIDENTS.filter(i => i.sev==="MEDIUM").length,
    total:    INCIDENTS.length,
  };

  return (
    <div className="page-content" style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:14 }}>
      <PageHeader title="Incidentes" subtitle="Incidentes de segurança ativos em investigação">
        <div style={{ display:"flex", alignItems:"center", gap:6, background:`${T.critical}15`, border:`1px solid ${T.critical}40`, borderRadius:7, padding:"6px 14px" }}>
          <PulseDot color={T.critical} size={6}/>
          <span style={{ fontSize:11, fontWeight:700, color:T.critical, fontFamily:"monospace" }}>
            {statCounts.CRITICAL} CRÍTICOS ABERTOS
          </span>
        </div>
      </PageHeader>

      {/* Stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
        {[
          { label:"Total Abertos", value:statCounts.total,    color:T.violet   },
          { label:"Críticos",      value:statCounts.CRITICAL, color:T.critical },
          { label:"Altos",         value:statCounts.HIGH,     color:T.high     },
          { label:"Conf. Média",   value:"84%",               color:T.success  },
        ].map(s => (
          <div key={s.label} style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:10, color:T.text2, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{s.label}</div>
            <div style={{ fontSize:26, fontWeight:700, color:s.color, fontFamily:"monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display:"flex", gap:6 }}>
        {FILTERS.map(f => (
          <button key={f.sev} onClick={() => setFilter(f.sev)} style={{
            padding:"6px 14px", borderRadius:6, fontSize:11, fontWeight:600, cursor:"pointer",
            background: filter===f.sev ? `${T.violet}25` : T.bg2,
            border: filter===f.sev ? `1px solid ${T.violet}` : `1px solid ${T.border}`,
            color: filter===f.sev ? T.text0 : T.text1,
            transition:"all 0.15s ease",
          }}>{f.label}</button>
        ))}
        <div style={{ marginLeft:"auto", fontSize:11, color:T.text2, display:"flex", alignItems:"center" }}>
          {filtered.length} incidente{filtered.length!==1?"s":""}
        </div>
      </div>

      {/* Main split: list + detail */}
      <div style={{ display:"grid", gridTemplateColumns: sel ? "1fr 1fr" : "1fr", gap:12 }}>

        {/* List */}
        <Card style={{ padding:0 }}>
          <div style={{ display:"flex", flexDirection:"column" }}>
            {filtered.map((inc, i) => (
              <div key={inc.id}>
                <div
                  onClick={() => setSelected(selected===inc.id ? null : inc.id)}
                  style={{
                    padding:"14px 18px", cursor:"pointer",
                    background: selected===inc.id ? `${T.violet}12` : "transparent",
                    borderLeft: selected===inc.id ? `2px solid ${T.violet}` : "2px solid transparent",
                    transition:"all 0.15s ease",
                  }}
                >
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                        <span style={{ fontSize:10, color:T.text2, fontFamily:"monospace" }}>{inc.id}</span>
                        <span style={{ fontSize:10, color:T.violet, fontFamily:"monospace", background:`${T.violet}18`, padding:"1px 6px", borderRadius:3 }}>{inc.mitre}</span>
                        <span style={{ fontSize:10, color:STATUS_META[inc.status].color }}>● {STATUS_META[inc.status].label}</span>
                      </div>
                      <div style={{ fontSize:13, fontWeight:600, color:T.text0, marginBottom:4 }}>{inc.title}</div>
                      <div style={{ display:"flex", gap:12, fontSize:10, color:T.text2 }}>
                        <span style={{ display:"flex", alignItems:"center", gap:4 }}><Server size={10}/> {inc.host}</span>
                        <span style={{ display:"flex", alignItems:"center", gap:4 }}><Clock size={10}/> {inc.ts}</span>
                        <span>Conf. {inc.conf}%</span>
                      </div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <SevBadge sev={inc.sev}/>
                      <ChevronRight size={13} color={T.text2}/>
                    </div>
                  </div>
                </div>
                {i < filtered.length-1 && <Hr/>}
              </div>
            ))}
          </div>
        </Card>

        {/* Detail panel */}
        {sel && (
          <Card>
            <SectionHead icon={<AlertTriangle size={14}/>} title="Detalhes do Incidente"
              right={<button onClick={()=>setSelected(null)} style={{ background:"none", border:"none", color:T.text2, cursor:"pointer", fontSize:11 }}>✕ Fechar</button>}
            />

            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {/* Header */}
              <div style={{ background:T.bg3, borderRadius:8, padding:"12px 14px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:11, color:T.text2, fontFamily:"monospace" }}>{sel.id}</span>
                  <SevBadge sev={sel.sev}/>
                </div>
                <div style={{ fontSize:15, fontWeight:700, color:T.text0, marginBottom:4 }}>{sel.title}</div>
                <div style={{ fontSize:10, color:T.violet, fontFamily:"monospace" }}>{sel.mitre}</div>
              </div>

              {/* Fields */}
              {[
                { label:"Host Afetado",       value:sel.host },
                { label:"Status",             value:STATUS_META[sel.status].label },
                { label:"Confiança",          value:`${sel.conf}%` },
                { label:"Primeira Detecção",  value:sel.ts },
                { label:"Técnica MITRE",      value:sel.mitre },
              ].map(f => (
                <div key={f.label} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${T.border}` }}>
                  <span style={{ fontSize:11, color:T.text2 }}>{f.label}</span>
                  <span style={{ fontSize:11, fontWeight:600, color:T.text0, fontFamily:"monospace" }}>{f.value}</span>
                </div>
              ))}

              {/* AI Summary */}
              <div style={{ background:`${T.violet}10`, border:`1px solid ${T.violet}30`, borderRadius:8, padding:"12px 14px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.violet, marginBottom:6, letterSpacing:"0.07em" }}>⬡ ANÁLISE DA IA</div>
                <div style={{ fontSize:11, color:T.text1, lineHeight:1.6 }}>
                  O agente ThreatHunter identificou este incidente como um padrão {sel.mitre} de severidade {sel.sev.toLowerCase()}.
                  Índice de confiança de {sel.conf}% baseado em correlação comportamental em {sel.host} e segmentos de rede associados.
                  Contenção imediata recomendada.
                </div>
              </div>
              

              {/* Actions */}
<div style={{ display:"flex", gap:8 }}>

  {["Contido", "Encerrado", "Reabrir"].map((a) => (

    <button
      key={a}
      onClick={async () => {

        let novoStatus = "Investigando";

        if (a === "Contido")
          novoStatus = "Contido";

        if (a === "Encerrado")
          novoStatus = "Encerrado";

        if (a === "Reabrir")
          novoStatus = "Investigando";

        try {

          const response = await fetch(
            `http://127.0.0.1:8000/incident/${sel.id}/status?status=${novoStatus}`,
            {
              method: "POST"
            }
          );

          if (!response.ok) {
            throw new Error("Erro ao atualizar incidente");
          }

          alert(`Incidente atualizado para: ${novoStatus}`);

        } catch (error) {

          console.error(error);

          alert("Falha ao atualizar incidente");

        }

      }}
      style={{
        flex:1,
        padding:"8px 0",
        borderRadius:6,
        fontSize:11,
        fontWeight:600,
        cursor:"pointer",
        background:`${SEV_COLOR[sel.sev]}15`,
        border:`1px solid ${SEV_COLOR[sel.sev]}40`,
        color:SEV_COLOR[sel.sev],
        transition:"all 0.15s",
      }}
    >
      {a}
    </button>

  ))}

</div>
              
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
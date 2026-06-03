"use client";

import { Radio, Download, FileText, Calendar } from "lucide-react";
import { T } from "@/lib/tokens";
import { Card, SectionHead, Hr, PageHeader } from "@/components/ui/primitives";

const REPORTS = [
  { title:"Resumo Executivo de Segurança",          period:"Maio 2026",      status:"PRONTO",      pages:12, type:"Executive"  },
  { title:"Relatório de Resposta — INC-0847",       period:"Hoje 14:24",     status:"GERANDO",     pages:8,  type:"Incident"   },
  { title:"Boletim Semanal de Inteligência",        period:"Semana 20, 2026",status:"PRONTO",      pages:6,  type:"Intel"      },
  { title:"Avaliação de Cobertura MITRE ATT&CK",    period:"T2 2026",        status:"PRONTO",      pages:18, type:"Compliance" },
  { title:"Postura de Segurança dos Endpoints",     period:"Maio 2026",      status:"PRONTO",      pages:9,  type:"Endpoints"  },
  { title:"Métricas de Desempenho dos Agentes de IA",period:"Maio 2026",     status:"AGENDADO",    pages:0,  type:"Agents"     },
];

const STATUS_COLOR: Record<string,string> = {
  PRONTO:   "#10B981",
  GERANDO:  "#EAB308",
  AGENDADO: "#3D5070",
};

const TYPE_COLOR: Record<string,string> = {
  Executive:  "#7C3AED",
  Incident:   "#EF4444",
  Intel:      "#F97316",
  Compliance: "#3B82F6",
  Endpoints:  "#06B6D4",
  Agents:     "#10B981",
};

const TYPE_LABEL: Record<string,string> = {
  Executive:  "Executivo",
  Incident:   "Incidente",
  Intel:      "Inteligência",
  Compliance: "Conformidade",
  Endpoints:  "Endpoints",
  Agents:     "Agentes",
};

export default function ReportsPage() {
  return (
    <div className="page-content" style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:14 }}>
      <PageHeader title="Relatórios" subtitle="Relatórios de segurança automatizados e resumos executivos">
        <button style={{
          display:"flex", alignItems:"center", gap:7,
          background:`${T.violet}20`, border:`1px solid ${T.violet}50`,
          borderRadius:8, padding:"8px 16px", cursor:"pointer",
          fontSize:11.5, fontWeight:600, color:T.text0,
        }}>
          <FileText size={13} color={T.violet}/> Gerar Relatório
        </button>
      </PageHeader>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
        {[
          { label:"Relatórios Prontos", value:"4", color:T.success },
          { label:"Gerando",            value:"1", color:T.medium  },
          { label:"Agendados",          value:"1", color:T.text2   },
          { label:"Média de Páginas",   value:"11",color:T.violet  },
        ].map(s=>(
          <div key={s.label} style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:10, color:T.text2, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{s.label}</div>
            <div style={{ fontSize:26, fontWeight:700, color:s.color, fontFamily:"monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <Card style={{ padding:0 }}>
        <div style={{ padding:"14px 18px 10px" }}>
          <SectionHead icon={<Radio size={14}/>} title="Biblioteca de Relatórios"/>
        </div>
        {REPORTS.map((r, i) => (
          <div key={r.title}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{
                  width:36, height:36, borderRadius:8,
                  background:`${TYPE_COLOR[r.type]}18`, border:`1px solid ${TYPE_COLOR[r.type]}40`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <FileText size={14} color={TYPE_COLOR[r.type]}/>
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:T.text0, marginBottom:3 }}>{r.title}</div>
                  <div style={{ display:"flex", gap:12, fontSize:10, color:T.text2 }}>
                    <span style={{ display:"flex", alignItems:"center", gap:4 }}><Calendar size={10}/>{r.period}</span>
                    <span style={{
                      color:TYPE_COLOR[r.type], background:`${TYPE_COLOR[r.type]}18`,
                      padding:"1px 6px", borderRadius:3, fontFamily:"monospace", fontSize:9.5,
                    }}>{TYPE_LABEL[r.type]}</span>
                    {r.pages > 0 && <span>{r.pages} páginas</span>}
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{
                  fontSize:10, fontWeight:700, color:STATUS_COLOR[r.status],
                  fontFamily:"monospace",
                }}>● {r.status}</span>
                {r.status==="PRONTO" && (
                  <button style={{
                    display:"flex", alignItems:"center", gap:5,
                    background:`${T.violet}18`, border:`1px solid ${T.violet}40`,
                    borderRadius:6, padding:"5px 10px", cursor:"pointer",
                    fontSize:10, color:T.violet,
                  }}>
                    <Download size={11}/> Exportar
                  </button>
                )}
              </div>
            </div>
            {i < REPORTS.length-1 && <Hr/>}
          </div>
        ))}
      </Card>
    </div>
  );
}
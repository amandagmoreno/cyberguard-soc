"use client";

import { TrendingUp, Clock } from "lucide-react";
import { T } from "@/lib/tokens";
import { Card, SectionHead, SevBadge, PageHeader, PulseDot } from "@/components/ui/primitives";
import type { Severity } from "@/types";

const EVENTS: { ts:string; title:string; host:string; sev:Severity; mitre:string; agent:string; detail:string }[] = [
  { ts:"14:24:11", title:"Força Bruta SSH Detectada",         host:"WKST-042",    sev:"CRITICAL", mitre:"T1110", agent:"ThreatHunter",     detail:"847 tentativas de autenticação falhas em 2 min de 192.168.1.45" },
  { ts:"14:23:41", title:"Uso Indevido de Credenciais Confirmado",    host:"WKST-042",    sev:"CRITICAL", mitre:"T1110", agent:"CorrelationBot",   detail:"Padrão identificado em 3 hosts via classificador ML (XGB)" },
  { ts:"14:22:55", title:"Tentativa de Escalada de Privilégio", host:"SRV-DC-01", sev:"HIGH",     mitre:"T1068", agent:"RiskEngine",       detail:"Usuário john.doe tentou escalada para administrador local" },
  { ts:"14:21:30", title:"Movimento Lateral Iniciado",        host:"SRV-FILE-01", sev:"MEDIUM",   mitre:"T1021", agent:"ThreatHunter",     detail:"Acesso SMB incomum de WKST-042 para SRV-FILE-01" },
  { ts:"14:18:02", title:"Exfiltração de Dados Detectada",    host:"WKST-019",    sev:"CRITICAL", mitre:"T1041", agent:"LogAnalyzer",      detail:"Transferência de saída para 203.0.113.88 — 847MB pela porta 443" },
  { ts:"14:11:14", title:"Comunicação C2 Identificada",       host:"WKST-007",    sev:"HIGH",     mitre:"T1071", agent:"ThreatHunter",     detail:"Tráfego beacon para evil-c2.darkweb.net a cada 60s" },
  { ts:"14:05:33", title:"Dropper de Malware Executado",      host:"WKST-007",    sev:"CRITICAL", mitre:"T1059", agent:"IncidentResponder",detail:"calc.exe invocou powershell → payload baixado" },
  { ts:"13:58:47", title:"Varredura de Portas de IP Externo", host:"SRV-WEB-01",  sev:"MEDIUM",   mitre:"T1046", agent:"LogAnalyzer",      detail:"198.51.100.22 varreu 1024 portas em 30s" },
];

const SEV_LEFT: Record<Severity,string> = {
  CRITICAL:"#EF4444", HIGH:"#F97316", MEDIUM:"#EAB308", LOW:"#3B82F6",
};

export default function TimelinePage() {
  return (
    <div className="page-content" style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:14 }}>
      <PageHeader title="Linha do Tempo do Ataque" subtitle="Cadeia de eventos cronológica — últimas 24 horas">
        <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:T.text2 }}>
          <Clock size={12}/> {EVENTS.length} eventos registrados
        </div>
      </PageHeader>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 260px", gap:12 }}>
        {/* Linha do Tempo */}
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {EVENTS.map((ev, i) => (
            <div key={i} style={{ display:"flex", gap:0 }}>
              {/* Spine */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:32, flexShrink:0 }}>
                <div style={{
                  width:10, height:10, borderRadius:"50%", background:SEV_LEFT[ev.sev],
                  boxShadow:`0 0 8px ${SEV_LEFT[ev.sev]}`, flexShrink:0, marginTop:18,
                  border:`2px solid ${SEV_LEFT[ev.sev]}40`,
                }}/>
                {i < EVENTS.length-1 && (
                  <div style={{ width:1, flex:1, background:`linear-gradient(${SEV_LEFT[ev.sev]}60, ${SEV_LEFT[EVENTS[i+1].sev]}60)`, minHeight:16 }}/>
                )}
              </div>

              {/* Card */}
              <div style={{
                flex:1, marginLeft:12, marginBottom:8,
                background:T.bg2, border:`1px solid ${T.border}`,
                borderLeft:`2px solid ${SEV_LEFT[ev.sev]}`, borderRadius:"0 10px 10px 0",
                padding:"12px 16px",
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:10.5, fontFamily:"monospace", color:T.text2 }}>{ev.ts}</span>
                    <span style={{ fontSize:10, color:T.violet, fontFamily:"monospace", background:`${T.violet}18`, padding:"1px 6px", borderRadius:3 }}>{ev.mitre}</span>
                    <SevBadge sev={ev.sev}/>
                  </div>
                  <span style={{ fontSize:10, color:T.text2 }}>via {ev.agent}</span>
                </div>
                <div style={{ fontSize:13, fontWeight:600, color:T.text0, marginBottom:4 }}>{ev.title}</div>
                <div style={{ fontSize:11, color:T.text1 }}>{ev.detail}</div>
                <div style={{ fontSize:10, color:T.text2, marginTop:4 }}>Host: <span style={{ color:T.text1, fontFamily:"monospace" }}>{ev.host}</span></div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo lateral */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Card>
            <SectionHead icon={<TrendingUp size={14}/>} title="Resumo de Eventos"/>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                { label:"CRÍTICO", count:EVENTS.filter(e=>e.sev==="CRITICAL").length, color:T.critical },
                { label:"ALTO",    count:EVENTS.filter(e=>e.sev==="HIGH").length,     color:T.high     },
                { label:"MÉDIO",   count:EVENTS.filter(e=>e.sev==="MEDIUM").length,   color:T.medium   },
              ].map(s=>(
                <div key={s.label}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:11, color:T.text1 }}>{s.label}</span>
                    <span style={{ fontSize:11, fontWeight:700, color:s.color, fontFamily:"monospace" }}>{s.count}</span>
                  </div>
                  <div style={{ height:3, background:T.bg3, borderRadius:99 }}>
                    <div style={{ height:"100%", width:`${(s.count/EVENTS.length)*100}%`, background:s.color, borderRadius:99 }}/>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHead icon={<Clock size={14}/>} title="Cadeia de Ataque"/>
            <div style={{ fontSize:11, color:T.text1, lineHeight:1.7 }}>
              <p style={{ marginBottom:8 }}>Cadeia de ataque detectada ao longo de <strong style={{ color:T.text0 }}>28 minutos</strong> em <strong style={{ color:T.text0 }}>5 hosts</strong>.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {["Acesso Inicial","Execução","Movimento Lateral","Coleta","Exfiltração"].map((stage,i)=>(
                  <div key={stage} style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background:`${T.violet}20`, border:`1px solid ${T.violet}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:T.violet, fontWeight:700, flexShrink:0 }}>{i+1}</div>
                    <span style={{ fontSize:11, color:T.text0 }}>{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

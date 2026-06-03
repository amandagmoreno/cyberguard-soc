"use client";

import { Crosshair, Globe, AlertTriangle, Shield } from "lucide-react";
import { T } from "@/lib/tokens";
import { Card, SectionHead, Hr, PageHeader, PulseDot } from "@/components/ui/primitives";

const IOCS = [
  { type:"IP",     value:"192.168.1.45",          threat:"Origem de Força Bruta",      conf:91, source:"VirusTotal",   sev:"#EF4444" },
  { type:"IP",     value:"203.0.113.88",           threat:"Scanner de Portas",          conf:74, source:"Shodan",       sev:"#F97316" },
  { type:"DOMAIN", value:"evil-c2.darkweb.net",    threat:"Infraestrutura C2",          conf:97, source:"Abuse.ch",     sev:"#EF4444" },
  { type:"HASH",   value:"a3f9c2...d847b1",         threat:"Dropper de Malware",         conf:89, source:"MalwareBazaar",sev:"#EF4444" },
  { type:"IP",     value:"198.51.100.22",           threat:"Nó de Saída TOR Conhecido",  conf:82, source:"OSINT",        sev:"#EAB308" },
  { type:"DOMAIN", value:"phish-login.example.com", threat:"Infraestrutura de Phishing", conf:88, source:"PhishTank",    sev:"#F97316" },
  { type:"HASH",   value:"7f3d9a...c1e220",          threat:"Payload de Ransomware",      conf:94, source:"VirusTotal",   sev:"#EF4444" },
];

const FEEDS = [
  { name:"VirusTotal",   status:"CONECTADO",  updated:"há 2 min",  color:T.success, iocs:1247 },
  { name:"Shodan",       status:"CONECTADO",  updated:"há 5 min",  color:T.success, iocs:341  },
  { name:"Abuse.ch",     status:"CONECTADO",  updated:"há 1 min",  color:T.success, iocs:892  },
  { name:"MalwareBazaar",status:"CONECTADO",  updated:"há 8 min",  color:T.success, iocs:534  },
  { name:"PhishTank",    status:"DEGRADADO",  updated:"há 23 min", color:T.medium,  iocs:212  },
  { name:"OSINT Feeds",  status:"CONECTADO",  updated:"há 4 min",  color:T.success, iocs:678  },
];

export default function ThreatIntelPage() {
  return (
    <div className="page-content" style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:14 }}>
      <PageHeader title="Inteligência de Ameaças" subtitle="Feeds de IOC, indicadores e dados externos de ameaças">
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:7, padding:"6px 14px", fontSize:11, color:T.text1 }}>
            <span style={{ color:T.success, fontWeight:700 }}>5/6</span> feeds ativos
          </div>
          <div style={{ background:`${T.critical}15`, border:`1px solid ${T.critical}40`, borderRadius:7, padding:"6px 14px", fontSize:11 }}>
            <span style={{ color:T.critical, fontWeight:700 }}>12</span> novos IOCs hoje
          </div>
        </div>
      </PageHeader>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
        {[
          { label:"Total de IOCs",      value:"3.904", color:T.violet  },
          { label:"Detectados Hoje",    value:"12",    color:T.critical},
          { label:"IPs Bloqueados",     value:"47",    color:T.success },
          { label:"Cobertura de Feeds", value:"94%",   color:T.info    },
        ].map(s => (
          <div key={s.label} style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:10, color:T.text2, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{s.label}</div>
            <div style={{ fontSize:26, fontWeight:700, color:s.color, fontFamily:"monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr", gap:12 }}>
        {/* IOC Table */}
        <Card style={{ padding:0 }}>
          <div style={{ padding:"14px 18px 10px" }}>
            <SectionHead icon={<Crosshair size={14}/>} title="Indicadores de IOC Ativos"/>
          </div>
          {/* Table header */}
          <div style={{ display:"grid", gridTemplateColumns:"60px 1fr 1fr 70px 80px", gap:8, padding:"6px 18px", background:T.bg3, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}>
            {["Tipo","Indicador","Ameaça","Conf.","Fonte"].map(h=>(
              <div key={h} style={{ fontSize:9.5, fontWeight:700, color:T.text2, letterSpacing:"0.07em", textTransform:"uppercase" }}>{h}</div>
            ))}
          </div>
          {IOCS.map((ioc, i) => (
            <div key={i}>
              <div style={{ display:"grid", gridTemplateColumns:"60px 1fr 1fr 70px 80px", gap:8, padding:"10px 18px", alignItems:"center" }}>
                <span style={{
                  fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:3,
                  background:`${ioc.sev}18`, color:ioc.sev, border:`1px solid ${ioc.sev}40`,
                  fontFamily:"monospace", textAlign:"center",
                }}>{ioc.type}</span>
                <span style={{ fontSize:11, color:T.text0, fontFamily:"monospace", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ioc.value}</span>
                <span style={{ fontSize:11, color:T.text1 }}>{ioc.threat}</span>
                <span style={{ fontSize:11, fontWeight:700, color:ioc.conf>90?T.critical:ioc.conf>80?T.high:T.medium, fontFamily:"monospace" }}>{ioc.conf}%</span>
                <span style={{ fontSize:10, color:T.text2 }}>{ioc.source}</span>
              </div>
              {i < IOCS.length-1 && <Hr/>}
            </div>
          ))}
        </Card>

        {/* Feed status */}
        <Card>
          <SectionHead icon={<Globe size={14}/>} title="Feeds de Inteligência"/>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {FEEDS.map((f, i) => (
              <div key={f.name}>
                <div style={{ padding:"9px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <PulseDot color={f.color} size={6}/>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:T.text0 }}>{f.name}</div>
                      <div style={{ fontSize:10, color:T.text2 }}>Atualizado {f.updated}</div>
                    </div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:10, fontWeight:700, color:f.color, fontFamily:"monospace" }}>{f.status}</div>
                    <div style={{ fontSize:10, color:T.text2 }}>{f.iocs.toLocaleString("pt-BR")} IOCs</div>
                  </div>
                </div>
                {i < FEEDS.length-1 && <Hr/>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
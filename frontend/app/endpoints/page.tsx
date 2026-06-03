"use client";
 
import { Globe, Server, Wifi, Shield, AlertTriangle } from "lucide-react";
import { T } from "@/lib/tokens";
import { Card, SectionHead, SevBadge, Hr, PageHeader, PulseDot } from "@/components/ui/primitives";
 
const ENDPOINTS = [
  { host:"WKST-042",    ip:"192.168.1.42",  os:"Windows 11",  status:"COMPROMETIDO", risk:91, user:"john.doe",    last:"há 2 min"  },
  { host:"SRV-DC-01",   ip:"10.0.0.1",      os:"Windows 2022",status:"SUSPEITO",     risk:74, user:"svc-account", last:"há 5 min"  },
  { host:"SRV-FILE-01", ip:"10.0.0.12",     os:"Windows 2019",status:"SUSPEITO",     risk:61, user:"admin",       last:"há 11 min" },
  { host:"WKST-019",    ip:"192.168.1.19",  os:"Windows 11",  status:"COMPROMETIDO", risk:88, user:"jane.smith",  last:"há 18 min" },
  { host:"WKST-007",    ip:"192.168.1.7",   os:"macOS 14",    status:"SUSPEITO",     risk:67, user:"bob.jones",   last:"há 31 min" },
  { host:"SRV-WEB-01",  ip:"10.0.0.20",     os:"Ubuntu 22",   status:"LIMPO",        risk:12, user:"www-data",    last:"há 1 min"  },
  { host:"WKST-033",    ip:"192.168.1.33",  os:"Windows 11",  status:"LIMPO",        risk:8,  user:"alice.k",     last:"há 3 min"  },
  { host:"SRV-DB-01",   ip:"10.0.0.31",     os:"Ubuntu 20",   status:"LIMPO",        risk:22, user:"postgres",    last:"há 4 min"  },
];
 
const STATUS_COLOR: Record<string,string> = {
  COMPROMETIDO: "#EF4444",
  SUSPEITO:     "#EAB308",
  LIMPO:        "#10B981",
};
 
export default function EndpointsPage() {
  const compromised = ENDPOINTS.filter(e=>e.status==="COMPROMETIDO").length;
  const suspicious  = ENDPOINTS.filter(e=>e.status==="SUSPEITO").length;
  const clean       = ENDPOINTS.filter(e=>e.status==="LIMPO").length;
  const avgRisk     = Math.round(ENDPOINTS.reduce((s,e)=>s+e.risk,0)/ENDPOINTS.length);
 
  return (
    <div className="page-content" style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:14 }}>
      <PageHeader title="Endpoints" subtitle="Inventário de ativos e postura de segurança dos endpoints"/>
 
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
        {[
          { label:"Comprometidos", value:compromised, color:T.critical },
          { label:"Suspeitos",     value:suspicious,  color:T.medium   },
          { label:"Limpos",        value:clean,        color:T.success  },
          { label:"Risco Médio",   value:`${avgRisk}`, color:T.high     },
        ].map(s=>(
          <div key={s.label} style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:10, color:T.text2, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{s.label}</div>
            <div style={{ fontSize:26, fontWeight:700, color:s.color, fontFamily:"monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>
 
      <Card style={{ padding:0 }}>
        {/* Table header */}
        <div style={{ display:"grid", gridTemplateColumns:"140px 110px 1fr 100px 70px 100px 90px", gap:8, padding:"8px 18px", background:T.bg3, borderRadius:"12px 12px 0 0", borderBottom:`1px solid ${T.border}` }}>
          {["Host","Endereço IP","Usuário","SO","Risco","Status","Último Acesso"].map(h=>(
            <div key={h} style={{ fontSize:9.5, fontWeight:700, color:T.text2, letterSpacing:"0.07em", textTransform:"uppercase" }}>{h}</div>
          ))}
        </div>
 
        {ENDPOINTS.map((e, i) => (
          <div key={e.host}>
            <div style={{ display:"grid", gridTemplateColumns:"140px 110px 1fr 100px 70px 100px 90px", gap:8, padding:"11px 18px", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <Server size={12} color={STATUS_COLOR[e.status]}/>
                <span style={{ fontSize:12, fontWeight:600, color:T.text0, fontFamily:"monospace" }}>{e.host}</span>
              </div>
              <span style={{ fontSize:11, color:T.text1, fontFamily:"monospace" }}>{e.ip}</span>
              <span style={{ fontSize:11, color:T.text1 }}>{e.user}</span>
              <span style={{ fontSize:11, color:T.text2 }}>{e.os}</span>
              <div>
                <div style={{ height:4, background:T.bg3, borderRadius:99, overflow:"hidden", marginBottom:2 }}>
                  <div style={{ height:"100%", width:`${e.risk}%`, background:e.risk>80?T.critical:e.risk>50?T.medium:T.success, borderRadius:99 }}/>
                </div>
                <div style={{ fontSize:9.5, color:T.text2, fontFamily:"monospace" }}>{e.risk}/100</div>
              </div>
              <span style={{
                fontSize:10, fontWeight:700, fontFamily:"monospace",
                color:STATUS_COLOR[e.status],
              }}>
                ● {e.status}
              </span>
              <span style={{ fontSize:10, color:T.text2 }}>{e.last}</span>
            </div>
            {i < ENDPOINTS.length-1 && <Hr/>}
          </div>
        ))}
      </Card>
    </div>
  );
}
"use client";

import { Shield } from "lucide-react";
import { T } from "@/lib/tokens";
import { Card, SectionHead, PageHeader } from "@/components/ui/primitives";

const TACTICS = [
  { id:"TA0001", name:"Acesso Inicial",        techniques:[{id:"T1190",hits:2},{id:"T1133",hits:0},{id:"T1078",hits:3}] },
  { id:"TA0002", name:"Execução",              techniques:[{id:"T1059",hits:1},{id:"T1203",hits:0},{id:"T1106",hits:0}] },
  { id:"TA0003", name:"Persistência",          techniques:[{id:"T1547",hits:0},{id:"T1053",hits:1},{id:"T1098",hits:2}] },
  { id:"TA0004", name:"Escal. de Privilégio",  techniques:[{id:"T1068",hits:1},{id:"T1134",hits:0},{id:"T1078",hits:3}] },
  { id:"TA0005", name:"Evasão de Defesa",      techniques:[{id:"T1070",hits:0},{id:"T1055",hits:1},{id:"T1036",hits:0}] },
  { id:"TA0006", name:"Acesso a Credenciais",  techniques:[{id:"T1110",hits:5},{id:"T1003",hits:1},{id:"T1555",hits:0}] },
  { id:"TA0007", name:"Descoberta",            techniques:[{id:"T1082",hits:2},{id:"T1083",hits:1},{id:"T1057",hits:0}] },
  { id:"TA0008", name:"Mov. Lateral",          techniques:[{id:"T1021",hits:3},{id:"T1091",hits:0},{id:"T1080",hits:1}] },
  { id:"TA0009", name:"Coleta",                techniques:[{id:"T1005",hits:1},{id:"T1039",hits:0},{id:"T1025",hits:0}] },
  { id:"TA0011", name:"C&C",                   techniques:[{id:"T1071",hits:2},{id:"T1105",hits:1},{id:"T1132",hits:0}] },
  { id:"TA0010", name:"Exfiltração",           techniques:[{id:"T1041",hits:3},{id:"T1048",hits:0},{id:"T1567",hits:1}] },
  { id:"TA0040", name:"Impacto",               techniques:[{id:"T1486",hits:0},{id:"T1489",hits:0},{id:"T1499",hits:1}] },
];

function hitsColor(hits: number) {
  if (hits === 0) return { bg: T.bg3,            text: T.text2,    border: T.border };
  if (hits === 1) return { bg: "#EAB30815",      text: "#EAB308",  border: "#EAB30840" };
  if (hits <= 3)  return { bg: "#F9731615",      text: "#F97316",  border: "#F9731640" };
  return              { bg: "#EF444415",         text: "#EF4444",  border: "#EF444440" };
}

export default function MitreAttackPage() {
  const totalHits = TACTICS.reduce((s,t) => s + t.techniques.reduce((a,b)=>a+b.hits,0), 0);
  const activeTechniques = TACTICS.reduce((s,t) => s + t.techniques.filter(x=>x.hits>0).length, 0);

  return (
    <div className="page-content" style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:14 }}>
      <PageHeader title="MITRE ATT&CK" subtitle="Cobertura de técnicas e mapa de calor de detecções — cenário de ameaças atual"/>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
        {[
          { label:"Técnicas Ativas",    value:activeTechniques, color:T.critical },
          { label:"Total de Detecções", value:totalHits,        color:T.high     },
          { label:"Táticas Cobertas",   value:TACTICS.length,  color:T.violet   },
          { label:"Taxa de Detecção",   value:"78%",            color:T.success  },
        ].map(s=>(
          <div key={s.label} style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:10, color:T.text2, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{s.label}</div>
            <div style={{ fontSize:26, fontWeight:700, color:s.color, fontFamily:"monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display:"flex", alignItems:"center", gap:16, fontSize:10.5, color:T.text2 }}>
        <span style={{ fontWeight:600 }}>Frequência de detecções:</span>
        {[
          { label:"Nenhuma",    bg:T.bg3,        color:T.text2    },
          { label:"Baixa (1)",  bg:"#EAB30815",  color:"#EAB308"  },
          { label:"Média (2–3)",bg:"#F9731615",  color:"#F97316"  },
          { label:"Alta (4+)",  bg:"#EF444415",  color:"#EF4444"  },
        ].map(l=>(
          <div key={l.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:12, height:12, borderRadius:3, background:l.bg, border:`1px solid ${l.color}40` }}/>
            <span style={{ color:l.color }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Matrix */}
      <Card style={{ padding:"14px 16px", overflowX:"auto" }}>
        <SectionHead icon={<Shield size={14}/>} title="Matriz ATT&CK — Detecções Ativas"/>
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${TACTICS.length},1fr)`, gap:6, minWidth:900 }}>
          {/* Tactic headers */}
          {TACTICS.map(tac=>(
            <div key={tac.id} style={{
              background:T.bg3, borderRadius:6, padding:"8px 6px", textAlign:"center",
              border:`1px solid ${T.border}`,
            }}>
              <div style={{ fontSize:9, fontWeight:700, color:T.violet, fontFamily:"monospace", marginBottom:3 }}>{tac.id}</div>
              <div style={{ fontSize:9.5, fontWeight:600, color:T.text0 }}>{tac.name}</div>
            </div>
          ))}

          {/* Technique cells */}
          {[0,1,2].map(row=>(
            TACTICS.map(tac=>{
              const tech = tac.techniques[row];
              const c = hitsColor(tech.hits);
              return (
                <div key={`${tac.id}-${row}`} title={`${tech.id}: ${tech.hits} detecç${tech.hits!==1?"ões":"ão"}`} style={{
                  background:c.bg, border:`1px solid ${c.border}`, borderRadius:5,
                  padding:"7px 6px", textAlign:"center", cursor:"pointer",
                  transition:"all 0.15s ease",
                }}>
                  <div style={{ fontSize:9, fontFamily:"monospace", color:c.text, fontWeight:tech.hits>0?700:400 }}>
                    {tech.id}
                  </div>
                  {tech.hits > 0 && (
                    <div style={{ fontSize:8.5, color:c.text, marginTop:2 }}>×{tech.hits}</div>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </Card>
    </div>
  );
}
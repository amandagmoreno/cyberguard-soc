"use client";


import { useState, useEffect, useRef } from "react";
import { Activity, AlertTriangle, Shield, Globe, BrainCircuit, Bot, Radio, TrendingUp, ChevronRight } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

import { T } from "@/lib/tokens";
import { Card, SectionHead, SevBadge, AgentBadge, PulseDot, Hr, ChartTip, PageHeader } from "@/components/ui/primitives";
import { INCIDENTS, AGENTS, LOG_POOL, LOG_COLORS, ATTACK_SEED, PREDICTION_DATA, SEV_BAR, DIST, AI_BULLETS, BULLET_AGES, KPIS_EXEC } from "@/lib/data";
import type { LogLine } from "@/types";


// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KPICard({ label, value, delta, deltaUp, icon, color = T.violet }: {
  label:string; value:string|number; delta:string; deltaUp:boolean; icon:React.ReactNode; color?:string;
}) {
  return (
    <div style={{ flex:1, background:T.bg2, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px 18px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div style={{ fontSize:10, color:T.text2, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:10 }}>
          {label}
        </div>
        <span style={{ color, display:"flex", opacity:0.85 }}>{icon}</span>
      </div>
      <div style={{ fontSize:32, fontWeight:700, color:T.text0, lineHeight:1, fontVariantNumeric:"tabular-nums", marginBottom:8 }}>
        {value}
      </div>
      <div style={{ fontSize:10.5, color: deltaUp ? T.critical : T.success, display:"flex", alignItems:"center", gap:3 }}>
        <span>{deltaUp ? "↑" : "↓"}</span>
        <span>{delta}</span>
      </div>
    </div>
  );
}

function AttackTimeline({ timeline }: any) {

  return (
    <Card>

      <SectionHead
        icon={<Radio size={14}/>}
        title="Linha do Tempo do Ataque"
        right={
          <span style={{ color:T.text2 }}>
            CADEIA DE EVENTOS
          </span>
        }
      />

      <div
        style={{
          display:"flex",
          flexDirection:"column",
          gap:12
        }}
      >

        {timeline?.slice(0, 5).map((item:any, i:number) => (

          <div
            key={i}
            style={{
              display:"flex",
              gap:12,
              alignItems:"flex-start"
            }}
          >

            {/* DOT */}
            <div
              style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                minWidth:18
              }}
            >

              <div
                style={{
                  width:10,
                  height:10,
                  borderRadius:"50%",
                  background:T.violet,
                  marginTop:4
                }}
              />

              {i < timeline.length - 1 && (

                <div
                  style={{
                    width:1,
                    flex:1,
                    background:T.border,
                    marginTop:4
                  }}
                />

              )}

            </div>

            {/* CONTENT */}
            <div
              style={{
                flex:1,
                paddingBottom:12
              }}
            >

              <div
                style={{
                  fontSize:10,
                  color:T.text2,
                  marginBottom:4,
                  fontFamily:"'IBM Plex Mono', monospace"
                }}
              >
                {item.time}
              </div>

              <div
                style={{
                  fontSize:12,
                  color:T.text0,
                  lineHeight:1.5
                }}
              >
                {item.event}
              </div>

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
}

function AutoResponsePanel({ responses }: any) {

  return (
    <Card>

      <SectionHead
        icon={<Bot size={14} />}
        title="Motor de Resposta Automática"
        right={
          <span style={{ color:T.success }}>
            ATIVO
          </span>
        }
      />

      <div
        style={{
          display:"flex",
          flexDirection:"column",
          gap:10
        }}
      >

        {responses?.slice(0, 5).map((item:any, i:number) => (

          <div
            key={i}
            style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              gap:12
            }}
          >

            <div>

              <div
                style={{
                  fontSize:11,
                  color:T.text2,
                  fontFamily:"'IBM Plex Mono', monospace"
                }}
              >
                {item.time}
              </div>

              <div
                style={{
                  fontSize:12,
                  color:T.text0
                }}
              >
                {item.action}
              </div>

            </div>

            <AgentBadge
              status={item.status}
              color={
                item.status === "SUCCESS"
                  ? T.success
                  : item.status === "IN_PROGRESS"
                  ? T.medium
                  : T.high
              }
            />

          </div>

        ))}

      </div>

    </Card>
  );
}

// ─── Live Logs ────────────────────────────────────────────────────────────────
function LiveLogs() {
  const [lines, setLines] = useState<LogLine[]>([]);
  const ref = useRef<HTMLDivElement>(null);

useEffect(() => {

  const socket = new WebSocket("ws://127.0.0.1:8000/ws/logs");

  socket.onmessage = (event) => {

    const ts = new Date().toLocaleTimeString("en-US", {
      hour12: false,
    });

    const levels = ["INFO", "WARNING", "CRITICAL", "AI", "ACTION"];

    const next = {
      level: levels[Math.floor(Math.random() * levels.length)],
      msg: event.data,
      _time: ts,
      _ts: Date.now(),
    };

    setLines((prev) => [
      ...prev.slice(-22),
      next,
    ]);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return () => socket.close();

}, []);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [lines]);

  return (
    <Card>
      <SectionHead
        icon={<Radio size={14}/>}
        title="Fluxo de Eventos"
        right={<span style={{ display:"flex", alignItems:"center", gap:5, color:T.success }}><PulseDot color={T.success} size={6}/> AO VIVO</span>}
      />
      <div ref={ref} style={{
        background:"#020610", borderRadius:8, padding:"10px 12px",
        fontFamily:"'IBM Plex Mono','Fira Code',monospace",
        fontSize:10.5, lineHeight:1.8, height:228, overflowY:"auto", border:`1px solid ${T.border}`,
      }}>
        {lines.map((l, i) => (
          <div key={l._ts ?? i} style={{ opacity: i < lines.length-6 ? 0.5 : 1, animation: i===lines.length-1 ? "sentinelFadeIn 0.3s ease" : "none" }}>
            <span style={{ color:T.text2 }}>{l._time ?? "──:──:──"}</span>{" "}
            <span style={{ color:LOG_COLORS[l.level]??T.text1, fontWeight:700 }}>[{l.level}]</span>{" "}
            <span style={{ color:"#C8D6EF" }}>{l.msg}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── AI Agents panel ──────────────────────────────────────────────────────────
function AIAgentsPanel() {
  return (
    <Card>
      <SectionHead icon={<Bot size={14}/>} title="Agentes de IA" right={<span style={{ color:T.success }}>4 ativos</span>}/>
      <div style={{ display:"flex", flexDirection:"column" }}>
        {AGENTS.slice(0,4).map((a, i) => (
          <div key={a.name}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 0" }}>
              <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                <PulseDot color={a.color} size={7}/>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:T.text0 }}>{a.name}</div>
                  <div style={{ fontSize:10, color:T.text2 }}>{a.role}</div>
                </div>
              </div>
              <AgentBadge status={a.status} color={a.color}/>
            </div>
            {i < 3 && <Hr/>}
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Active Incidents panel ───────────────────────────────────────────────────
function ActiveIncidentsPanel() {

  const [incidents, setIncidents] = useState<any[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  useEffect(() => {

    fetch("http://127.0.0.1:8000/incidents")
      .then((res) => res.json())
      .then((data) => setIncidents(data));

    fetch("http://127.0.0.1:8000/timeline")
      .then((res) => res.json())
      .then((data) => setTimeline(data));

  }, []);

  return (
    <Card>

      <SectionHead
        icon={<AlertTriangle size={14}/>}
        title="Incidentes Ativos"
        right={
          <span style={{ color:T.critical }}>
            {incidents.length} abertos
          </span>
        }
      />

      <div style={{ display:"flex", flexDirection:"column" }}>

        {incidents.slice(0,4).map((inc, i) => (

          <div key={inc.id}>

            <div
              onClick={() => setSelectedIncident(inc)}
              style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between",
                padding:"9px 0",
                cursor:"pointer"
             }}
            >
        

              <div>

                <div
                  style={{
                    display:"flex",
                    alignItems:"center",
                    gap:7,
                    marginBottom:3
                  }}
                >

                  <span
                    style={{
                      fontSize:10,
                      color:T.text2,
                      fontFamily:"monospace"
                    }}
                  >
                    {inc.id}
                  </span>

                  <span
                    style={{
                      fontSize:10,
                      color:T.violet,
                      fontFamily:"monospace"
                    }}
                  >
                    {inc.mitre}
                  </span>

                </div>

                <div
                  style={{
                    fontSize:12,
                    fontWeight:600,
                    color:T.text0
                  }}
                >
                  {inc.title}
                </div>

                <div
                  style={{
                    fontSize:10,
                    color:T.text2,
                    marginTop:2
                  }}
                >
                  {inc.source_ip} · {inc.confidence}% conf.
                </div>

              </div>

              <div
                style={{
                  display:"flex",
                  alignItems:"center",
                  gap:7
                }}
              >
                <SevBadge
                  sev={
                    ["critical","high","medium","low"].includes(
                      inc.severity?.toLowerCase()
                    )
                      ? inc.severity.toLowerCase()
                      : "medium"
                  }
                />
                

              </div>

            </div>

            {i < incidents.length-1 && <Hr/>}

          </div>

        ))}

      </div>
     {selectedIncident && (

  <>

    <div
      onClick={() => setSelectedIncident(null)}
      style={{
        position:"fixed",
        inset:0,
        background:"rgba(0,0,0,0.45)",
        zIndex:9998
      }}
    />

    <div
      style={{
        position:"fixed",
        top:0,
        right:0,
        width:"520px",
        height:"100vh",
        background:T.bg2,
        borderLeft:`1px solid ${T.border}`,
        zIndex:9999,
        overflowY:"auto",
        padding:"24px"
      }}
    >

      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginBottom:24
        }}
      >

        <h2
          style={{
            margin:0,
            color:T.text0,
            fontSize:"22px"
          }}
        >
          Investigação de Incidente
        </h2>

        <button
          onClick={() => setSelectedIncident(null)}
          style={{
            background:"transparent",
            border:"none",
            color:T.text1,
            cursor:"pointer",
            fontSize:"22px"
          }}
        >
          ✕
        </button>

      </div>

      <Card>

        <SectionHead
          icon={<AlertTriangle size={14}/>}
          title={selectedIncident.id}
        />

        <div
          style={{
            display:"flex",
            flexDirection:"column",
            gap:12
          }}
        >

          <div>
            <strong>Título</strong>
            <div>{selectedIncident.title}</div>
          </div>

          <div>
            <strong>Severidade</strong>
            <div>{selectedIncident.severity}</div>
          </div>

          <div>
            <strong>MITRE ATT&CK</strong>
            <div>{selectedIncident.mitre}</div>
          </div>

          <div>
            <strong>IP de Origem</strong>
            <div>{selectedIncident.source_ip}</div>
          </div>

          <div>
            <strong>Confiança</strong>
            <div>{selectedIncident.confidence}%</div>
          </div>

          <div>
            <strong>Agente</strong>
            <div>{selectedIncident.agent}</div>
          </div>

          <div>
            <strong>Status</strong>
            <div>{selectedIncident.status}</div>
          </div>

        </div>

      </Card>

      <div style={{ height:16 }} />

      <Card>

        <SectionHead
          icon={<BrainCircuit size={14}/>}
          title="Resumo da IA"
        />

        <div
          style={{
            color:T.text1,
            lineHeight:1.7,
            fontSize:13
          }}
        >
          A análise autônoma detectou atividade suspeita
          compatível com o padrão de ataque observado. O índice
          de confiança indica alta probabilidade de comportamento
          malicioso, exigindo investigação e contenção.
        </div>

      </Card>

      <div style={{ height:16 }} />

      <Card>

        <SectionHead
          icon={<Radio size={14}/>}
          title="Ações Recomendadas"
        />

        <div
          style={{
            display:"flex",
            flexDirection:"column",
            gap:10
          }}
        >

          <div>✓ Investigar endpoint afetado</div>

          <div>✓ Validar atividade do usuário</div>

          <div>✓ Revisar logs de autenticação</div>

          <div>✓ Escalar se persistência for confirmada</div>

        </div>

      </Card>

      <div style={{ height:16 }} />

<Card>

  <SectionHead
    icon={<Radio size={14}/>}
    title="Linha do Tempo do Ataque"
  />

  <div
    style={{
      display:"flex",
      flexDirection:"column",
      gap:12
    }}
  >

    {timeline.slice(0, 5).map((item:any, i:number) => (

      <div
        key={i}
        style={{
          display:"flex",
          gap:12,
          alignItems:"flex-start"
        }}
      >

        <div
          style={{
            width:8,
            height:8,
            borderRadius:"50%",
            background:T.violet,
            marginTop:6
          }}
        />

        <div>

          <div
            style={{
              fontSize:10,
              color:T.text2,
              marginBottom:4,
              fontFamily:"monospace"
            }}
          >
            {item.time}
          </div>

          <div
            style={{
              fontSize:12,
              color:T.text0
            }}
          >
            {item.event}
          </div>

        </div>

      </div>

    ))}

  </div>

</Card>

    </div>

  </>

)}



    </Card>

    
  );
  }

// ─── Attack Activity chart ────────────────────────────────────────────────────
function AttackActivity() {
  const [data, setData] = useState(ATTACK_SEED);
  useEffect(() => {
    const id = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length-1].v;
        const next = Math.max(20, Math.min(320, last + ((Math.random()-0.42)*55|0)));
        const h = new Date();
        const ts = `${String(h.getHours()).padStart(2,"0")}:${String(h.getMinutes()).padStart(2,"0")}`;
        return [...prev.slice(1), { t:ts, v:next }];
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <Card>
      <SectionHead icon={<Activity size={14}/>} title="Atividade de Ataques" right="Ao vivo · últimos 20 min"/>
      <ResponsiveContainer width="100%" height={168}>
        <AreaChart data={data} margin={{ top:4, right:0, left:-22, bottom:0 }}>
          <defs>
            <linearGradient id="gAtk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={T.violet} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={T.violet} stopOpacity={0.02}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="t" tick={{ fill:T.text2, fontSize:9.5 }} axisLine={false} tickLine={false}/>
          <YAxis tick={{ fill:T.text2, fontSize:9.5 }} axisLine={false} tickLine={false}/>
          <Tooltip content={<ChartTip/>}/>
          <Area type="monotone" dataKey="v" stroke={T.violet} strokeWidth={2} fill="url(#gAtk)" dot={false} activeDot={{ r:4, fill:T.violet }}/>
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

// ─── AI Reasoning ─────────────────────────────────────────────────────────────
function AIReasoning({ correlation }: any) {

  return (
    <Card>

      <SectionHead
        icon={<BrainCircuit size={14}/>}
        title="Motor de Análise de IA"
        right={
          <span style={{ color:T.success }}>
            ANÁLISE EM TEMPO REAL
          </span>
        }
      />

      <div
        style={{
          display:"flex",
          flexDirection:"column",
          gap:12
        }}
      >

        {/* TITLE */}
        <div>

          <div
            style={{
              fontSize:14,
              fontWeight:700,
              color:T.text0,
              marginBottom:6
            }}
          >
            {"Análise Estratégica do ThreatHunter"}
          </div>

          <div
            style={{
              fontSize:12,
              color:T.text1,
              lineHeight:1.6
            }}
          >
            {correlation?.summary ?? "..."}
          </div>

        </div>

        <Hr/>

        {/* INFO */}
        <div
          style={{
            display:"flex",
            gap:10,
            flexWrap:"wrap"
          }}
        >

          <AgentBadge
            status={`MITRE ${correlation?.mitre ?? "--"}`}
            color={T.violet}
          />

          <AgentBadge
            status={`${correlation?.confidence ?? "--"}% CONFIANÇA`}
            color={T.critical}
          />

          <AgentBadge
            status={correlation?.risk ?? "--"}
            color={T.high}
          />

        </div>

        <Hr/>

        {/* RECOMMENDED ACTIONS */}
        <div>

          <div
            style={{
              fontSize:11,
              fontWeight:700,
              color:T.text0,
              marginBottom:10,
              letterSpacing:"0.08em"
            }}
          >
            AÇÕES RECOMENDADAS
          </div>

          <div
            style={{
              display:"flex",
              flexDirection:"column",
              gap:8
            }}
          >

            {[
  "Investigar hosts afetados",
  "Bloquear indicadores relacionados",
  "Escalonar para resposta coordenada"
].map((action, i) => (

  <div
    key={i}
    style={{
      display:"flex",
      gap:8,
      alignItems:"flex-start",
      fontSize:11.5,
      color:T.text1,
      lineHeight:1.5
    }}
  >

    <span style={{ color:T.success }}>
      •
    </span>

    <span>{action}</span>

  </div>

))}

          </div>

        </div>

      </div>

    </Card>
  );
}

// ─── Threat Prediction ────────────────────────────────────────────────────────
function ThreatPrediction({ data }: any) {
  return (
    <Card>
      <SectionHead icon={<TrendingUp size={14}/>} title="Previsão de Ameaças por IA" right="Próximas 6 horas"/>
      <ResponsiveContainer width="100%" height={118}>
        <AreaChart data={data} margin={{ top:4, right:0, left:-22, bottom:0 }}>
          <defs>
            <linearGradient id="gPred" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={T.critical} stopOpacity={0.35}/>
              <stop offset="95%" stopColor={T.critical} stopOpacity={0.02}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="t" tick={{ fill:T.text2, fontSize:9.5 }} axisLine={false} tickLine={false}/>
          <YAxis tick={{ fill:T.text2, fontSize:9.5 }} axisLine={false} tickLine={false} domain={[0,110]}/>
          <Tooltip content={<ChartTip valueLabel="risco" valueColor={T.critical}/>}/>
          <Area type="monotone" dataKey="v" stroke={T.critical} strokeWidth={2} strokeDasharray="5 3" fill="url(#gPred)" dot={false}/>
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ display:"flex", gap:8, marginTop:10 }}>
        {[{label:"Janela de pico",value:"+2h",color:T.critical},{label:"Risco máximo",value:"91",color:T.high},{label:"Precisão do modelo",value:"94.2%",color:T.success}].map(k=>(
          <div key={k.label} style={{ flex:1, background:T.bg3, borderRadius:7, padding:"7px 10px", textAlign:"center" }}>
            <div style={{ fontSize:9.5, color:T.text2, marginBottom:3 }}>{k.label}</div>
            <div style={{ fontSize:14, fontWeight:700, color:k.color, fontFamily:"'IBM Plex Mono',monospace" }}>{k.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Threat Distribution ──────────────────────────────────────────────────────
function ThreatDist() {
  return (
    <Card>
      <SectionHead icon={<Shield size={14}/>} title="Distribuição de Ameaças"/>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {DIST.map(d=>(
          <div key={d.label}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ fontSize:11, color:T.text1 }}>{d.label}</span>
              <span style={{ fontSize:11, fontWeight:700, color:d.color, fontFamily:"'IBM Plex Mono',monospace" }}>
                {d.value} <span style={{ color:T.text2, fontWeight:400 }}>({d.pct}%)</span>
              </span>
            </div>
            <div style={{ height:4, background:T.bg3, borderRadius:99, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${d.pct}%`, background:d.color, borderRadius:99 }}/>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Severity Chart ───────────────────────────────────────────────────────────
function SeverityChart() {
  return (
    <Card>
      <SectionHead icon={<Shield size={14}/>} title="Visão de Severidade"/>
      <ResponsiveContainer width="100%" height={130}>
        <BarChart data={SEV_BAR} margin={{ top:4, right:0, left:-24, bottom:0 }}>
          <XAxis dataKey="name" tick={{ fill:T.text2, fontSize:9.5 }} axisLine={false} tickLine={false}/>
          <YAxis tick={{ fill:T.text2, fontSize:9.5 }} axisLine={false} tickLine={false}/>
          <Tooltip content={({ active, payload }:any) =>
            active&&payload?.length ? (
              <div style={{ background:T.bg3, border:`1px solid ${T.borderHi}`, borderRadius:7, padding:"6px 12px", fontSize:11, color:T.text0 }}>
                <span style={{ color:payload[0].payload.color, fontWeight:700 }}>{payload[0].name}: {payload[0].value}</span>
              </div>
            ) : null
          }/>
          <Bar dataKey="value" radius={[4,4,0,0]}>
            {SEV_BAR.map((d,i)=><Cell key={i} fill={d.color} fillOpacity={0.82}/>)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}


function OperationalPriority({ riskAdvisor }: any) {

  return (

    <Card>

      <SectionHead
        icon={<AlertTriangle size={14}/>}
        title="Prioridade Operacional"
      />

      <div
        style={{
          display:"flex",
          flexDirection:"column",
          gap:12
        }}
      >

        <div>

          <div
            style={{
              fontSize:11,
              color:T.text2,
              marginBottom:4
            }}
          >
            INCIDENTE PRIORITÁRIO
          </div>

          <div
            style={{
              fontSize:14,
              fontWeight:700,
              color:T.critical,
              fontFamily:"'IBM Plex Mono', monospace"
            }}
          >
            {riskAdvisor?.incident ?? "..."}
          </div>

        </div>

        <Hr/>

        <div>

          <div
            style={{
              fontSize:11,
              color:T.text2,
              marginBottom:4
            }}
          >
            RESPONSÁVEL
          </div>

          <div
            style={{
              fontSize:13,
              fontWeight:600,
              color:T.text0
            }}
          >
            {riskAdvisor?.recommended_owner ?? "..."}
          </div>

        </div>

        <Hr/>

        <div>

          <div
            style={{
              fontSize:11,
              color:T.text2,
              marginBottom:4
            }}
          >
            MOTIVO
          </div>

          <div
            style={{
              fontSize:11.5,
              color:T.text1,
              lineHeight:1.6
            }}
          >
            {riskAdvisor?.reason ?? "..."}
          </div>

        </div>

      </div>

    </Card>

  );

}
// ─── Exec KPIs ────────────────────────────────────────────────────────────────
function ExecKPIs({ metrics }: any) {

  return (
    <Card>

      <SectionHead
        icon={<Activity size={14}/>}
        title="Indicadores Executivos"
      />

      <div
        style={{
          display:"flex",
          flexDirection:"column"
        }}
      >

        {/* MTTD */}
        <div>

          <div
            style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              padding:"8px 0"
            }}
          >

            <span
              style={{
                fontSize:11.5,
                color:T.text1
              }}
            >
              Tempo Médio de Detecção
            </span>

            <span
              style={{
                fontSize:12,
                fontWeight:700,
                color:T.violet,
                fontFamily:"'IBM Plex Mono',monospace"
              }}
            >
              {metrics?.mttd ?? "..."}
            </span>

          </div>

          <Hr/>

        </div>

        {/* MTTR */}
        <div>

          <div
            style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              padding:"8px 0"
            }}
          >

            <span
              style={{
                fontSize:11.5,
                color:T.text1
              }}
            >
              Tempo Médio de Resposta
            </span>

            <span
              style={{
                fontSize:12,
                fontWeight:700,
                color:T.success,
                fontFamily:"'IBM Plex Mono',monospace"
              }}
            >
              {metrics?.mttr ?? "..."}
            </span>

          </div>

          <Hr/>

        </div>

        {/* False Positive */}
        <div>

          <div
            style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              padding:"8px 0"
            }}
          >

            <span
              style={{
                fontSize:11.5,
                color:T.text1
              }}
            >
              Taxa de Falsos Positivos
            </span>

            <span
              style={{
                fontSize:12,
                fontWeight:700,
                color:T.medium,
                fontFamily:"'IBM Plex Mono',monospace"
              }}
            >
              {metrics?.false_positive_rate ?? "..."}
            </span>

          </div>

          <Hr/>

        </div>

        {/* Threat Confidence */}
        <div>

          <div
            style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              padding:"8px 0"
            }}
          >

            <span
              style={{
                fontSize:11.5,
                color:T.text1
              }}
            >
              Confiança da Ameaça
            </span>

            <span
              style={{
                fontSize:12,
                fontWeight:700,
                color:T.critical,
                fontFamily:"'IBM Plex Mono',monospace"
              }}
            >
              {metrics?.threat_confidence ?? "..."}
            </span>

          </div>

        </div>

      </div>

    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {

  const [metrics, setMetrics] = useState<any>(null);
  const [correlation, setCorrelation] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [threatAnalysis, setThreatAnalysis] = useState<any>(null);
  const [predictionData, setPredictionData] = useState<any[]>([]);
  const [riskAdvisor, setRiskAdvisor] = useState<any>(null);

  useEffect(() => {

  async function loadMetrics() {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/metrics"
      );

      const data = await response.json();

      setMetrics(data);

    } catch (error) {

      console.error("Metrics error:", error);

    }
  }

  async function loadRiskAdvisor() {

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/risk-advisor"
    );

    const data = await response.json();

    setRiskAdvisor(data);

  } catch (error) {

    console.error("Risk Advisor error:", error);

  }

}

  async function loadCorrelation() {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/correlations"
      );

      const data = await response.json();

      setCorrelation(data);

    } catch (error) {

      console.error("Correlation error:", error);

    }
  }

  async function loadTimeline() {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/timeline"
      );

      const data = await response.json();

      setTimeline(data);

    } catch (error) {

      console.error("Timeline error:", error);

    }
  }

  async function loadPrediction() {

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/prediction"
    );

    const data = await response.json();

    setPredictionData(data);

  } catch (error) {

    console.error("Prediction error:", error);

  }

}

  async function loadThreatAnalysis() {

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/threat-analysis"
    );

    const data = await response.json();

    setThreatAnalysis(data);

  } catch (error) {

    console.error("Threat Analysis error:", error);

  }

}

  loadMetrics();
  loadCorrelation();
  loadTimeline();
  loadResponses();
  loadThreatAnalysis();
  loadPrediction();
  loadRiskAdvisor();

  async function loadResponses() {

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/responses"
    );

    const data = await response.json();

    setResponses(data);

  } catch (error) {

    console.error("Responses error:", error);

  }

}

  const interval = setInterval(() => {

    loadMetrics();
    loadCorrelation();
    loadTimeline();
    loadResponses();
    loadThreatAnalysis();
    loadPrediction();
    loadRiskAdvisor();

  }, 5000);

  return () => clearInterval(interval);

}, []); 

  return (
    <div
      className="page-content"
      style={{
        padding:"18px 22px",
        display:"flex",
        flexDirection:"column",
        gap:14
      }}
    >

      {/* KPI row */}
      <div style={{ display:"flex", gap:12 }}>

        <KPICard
          label="Eventos / Min"
          value={metrics?.events_per_min ?? "..."}
          delta="+14% vs última hora"
          deltaUp
          icon={<Activity size={17}/>}
        />

        <KPICard
          label="Alertas Ativos"
          value={metrics?.active_alerts ?? "..."}
          delta="3 novos em 5 min"
          deltaUp
          color={T.high}
          icon={<AlertTriangle size={17}/>}
        />

        <KPICard
          label="Índice de Ameaça"
          value={metrics?.threat_score ?? "..."}
          delta="+12 vs 1h atrás"
          deltaUp
          color={T.critical}
          icon={<Shield size={17}/>}
        />

        <KPICard
          label="IPs Suspeitos"
          value={metrics?.suspicious_ips ?? "..."}
          delta="3 novos sinalizados"
          deltaUp
          color={T.medium}
          icon={<Globe size={17}/>}
        />

      </div>

      {/* Main Grid */}
      <div
        style={{
          display:"grid",
          gridTemplateColumns:"1fr 1.55fr 1fr",
          gap:12
        }}
      >

        {/* LEFT */}
        <div
          style={{
            display:"flex",
            flexDirection:"column",
            gap:12
          }}
        >
          <LiveLogs />
          <AIAgentsPanel />
          <ActiveIncidentsPanel />
        </div>

        {/* CENTER */}
        <div
          style={{
            display:"flex",
            flexDirection:"column",
            gap:12
          }}
        >
          <AttackActivity />

          <AIReasoning correlation={threatAnalysis} />

          <AttackTimeline timeline={timeline} />
        </div>

        {/* RIGHT */}
        <div
          style={{
            display:"flex",
            flexDirection:"column",
            gap:12
          }}
        >
          <ThreatDist />
          <SeverityChart />
          <OperationalPriority riskAdvisor={riskAdvisor} />
          <ExecKPIs metrics={metrics} />
        </div>

      </div>

      {/* Bottom Row */}
      <div
        style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          gap:12
        }}
      >
        <AutoResponsePanel responses={responses} />

        <ThreatPrediction data={predictionData} />
      </div>

    </div>

  );

}
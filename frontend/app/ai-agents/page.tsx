"use client";

import { useState, useEffect } from "react";
import { Bot, Cpu, Zap, Activity } from "lucide-react";
import { T } from "@/lib/tokens";
import { Card, SectionHead, AgentBadge, PulseDot, Hr, PageHeader } from "@/components/ui/primitives";
import { AGENTS } from "@/lib/data";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTip } from "@/components/ui/primitives";

function AgentSparkline({ color }: { color:string }) {
  const [data, setData] = useState(() =>
    Array.from({length:10}, (_,i) => ({ v: Math.floor(Math.random()*80+10), t:i }))
  );
  useEffect(() => {
    const id = setInterval(() => {
      setData(prev => [...prev.slice(1), { v:Math.floor(Math.random()*80+10), t:Date.now() }]);
    }, 1200);
    return () => clearInterval(id);
  }, []);
  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={data} margin={{top:0,right:0,left:0,bottom:0}}>
        <defs>
          <linearGradient id={`ag-${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={color} stopOpacity={0.35}/>
            <stop offset="95%" stopColor={color} stopOpacity={0.02}/>
          </linearGradient>
        </defs>
        <Tooltip content={<ChartTip valueLabel="tarefas" valueColor={color}/>}/>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5}
          fill={`url(#ag-${color.slice(1)})`} dot={false}/>
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default function AIAgentsPage() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t+1), 2000);
    return () => clearInterval(id);
  }, []);

  const active     = AGENTS.filter(a => a.status==="ATIVO").length;
  const processing = AGENTS.filter(a => a.status==="PROCESSANDO").length;
  const alert      = AGENTS.filter(a => a.status==="ALERTA").length;

  return (
    <div className="page-content" style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:14 }}>
      <PageHeader title="Agentes de IA" subtitle="Agentes de segurança autônomos — monitoramento e orquestração em tempo real"/>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
        {[
          { label:"Total de Agentes", value:AGENTS.length, color:T.violet  },
          { label:"Ativos",           value:active,         color:T.success },
          { label:"Processando",      value:processing,     color:T.medium  },
          { label:"Em Alerta",        value:alert,          color:T.critical},
        ].map(s => (
          <div key={s.label} style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:10, color:T.text2, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{s.label}</div>
            <div style={{ fontSize:28, fontWeight:700, color:s.color, fontFamily:"monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Agent cards grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
        {AGENTS.map(agent => (
          <Card key={agent.name} style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {/* Header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                <div style={{
                  width:34, height:34, borderRadius:8,
                  background:`${agent.color}18`, border:`1px solid ${agent.color}40`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <Bot size={16} color={agent.color}/>
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:T.text0 }}>{agent.name}</div>
                  <div style={{ fontSize:10, color:T.text2 }}>{agent.role}</div>
                </div>
              </div>
              <AgentBadge status={agent.status} color={agent.color}/>
            </div>

            {/* Sparkline */}
            <AgentSparkline color={agent.color}/>

            {/* Metrics */}
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              {[
                { label:"Tarefas",  value: agent.tasks.toLocaleString("pt-BR"), icon:<Zap size={10}/> },
                { label:"CPU",      value:`${Math.floor(Math.random()*40+20)}%`, icon:<Cpu size={10}/> },
                { label:"Eventos",  value:`${Math.floor(Math.random()*500+100)}/s`, icon:<Activity size={10}/> },
              ].map(m => (
                <div key={m.label} style={{ textAlign:"center" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:3, color:T.text2, fontSize:9.5, marginBottom:3 }}>
                    {m.icon} {m.label}
                  </div>
                  <div style={{ fontSize:13, fontWeight:700, color:T.text0, fontFamily:"monospace" }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Status bar */}
            <div style={{ height:2, background:T.bg3, borderRadius:99 }}>
              <div style={{
                height:"100%", borderRadius:99,
                width: agent.status==="OCIOSO" ? "0%" : agent.status==="ATIVO" ? "72%" : agent.status==="PROCESSANDO" ? "45%" : "95%",
                background: agent.color,
                transition:"width 0.6s ease",
                boxShadow:`0 0 6px ${agent.color}`,
              }}/>
            </div>
          </Card>
        ))}
      </div>

      {/* Activity log */}
      <Card>
        <SectionHead icon={<Activity size={14}/>} title="Log de Atividade dos Agentes" right={<span style={{color:T.success}}>Ao vivo</span>}/>
        <div style={{ display:"flex", flexDirection:"column" }}>
          {[
            { agent:"ThreatHunter",     action:"Correlação iniciada no INC-0847",                        ts:"14:24:11", color:T.success  },
            { agent:"LogAnalyzer",      action:"Processando lote de 1.247 eventos",                      ts:"14:24:08", color:T.medium   },
            { agent:"RiskEngine",       action:"Índice de risco atualizado — WKST-042: 91/100",          ts:"14:23:55", color:T.success  },
            { agent:"IncidentResponder",action:"ALERTA — Força bruta confirmada, playbook ativo",        ts:"14:23:41", color:T.critical },
            { agent:"CorrelationBot",   action:"Padrão identificado: T1110 em 3 hosts",                  ts:"14:23:29", color:T.success  },
          ].map((l, i) => (
            <div key={i}>
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0" }}>
                <PulseDot color={l.color} size={6}/>
                <span style={{ fontSize:11, fontWeight:600, color:l.color, fontFamily:"monospace", minWidth:130 }}>{l.agent}</span>
                <span style={{ fontSize:11, color:T.text1, flex:1 }}>{l.action}</span>
                <span style={{ fontSize:10, color:T.text2, fontFamily:"monospace" }}>{l.ts}</span>
              </div>
              {i < 4 && <Hr/>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
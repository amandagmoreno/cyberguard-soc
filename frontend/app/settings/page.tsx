"use client";

import { Settings, Bell, Shield, Bot, Globe, Database, Key } from "lucide-react";
import { T } from "@/lib/tokens";
import { Card, SectionHead, Hr, PageHeader } from "@/components/ui/primitives";

function Toggle({ on = true }: { on?: boolean }) {
  return (
    <div style={{
      width:36, height:20, borderRadius:99,
      background: on ? T.violet : T.bg3,
      border: `1px solid ${on ? T.violet : T.border}`,
      position:"relative", cursor:"pointer",
      transition:"background 0.2s ease",
    }}>
      <div style={{
        position:"absolute", top:2,
        left: on ? 18 : 2,
        width:14, height:14, borderRadius:"50%",
        background:"#fff",
        transition:"left 0.2s ease",
      }}/>
    </div>
  );
}

const SECTIONS = [
  {
    icon:<Bell size={14}/>, title:"Notificações",
    items:[
      { label:"Notificações de alertas críticos",     sub:"Receber alertas para eventos de severidade CRÍTICA",          on:true  },
      { label:"Resumo por e-mail (diário)",           sub:"Resumo diário de todos os eventos de segurança",             on:true  },
      { label:"Integração com Slack",                 sub:"Enviar alertas para o canal #security-ops",                  on:false },
      { label:"Escalada via PagerDuty",               sub:"Escalar automaticamente alertas CRÍTICOS não reconhecidos",   on:true  },
    ],
  },
  {
    icon:<Bot size={14}/>, title:"Agentes de IA",
    items:[
      { label:"Investigação automática",              sub:"Agentes investigam automaticamente alertas ALTOS ou acima",   on:true  },
      { label:"Contenção autônoma",                   sub:"Permitir que agentes isolem endpoints automaticamente",       on:false },
      { label:"Limiar de confiança (91%)",            sub:"Confiança mínima antes de o agente agir",                    on:true  },
      { label:"Registro de atividade dos agentes",    sub:"Registrar todas as decisões dos agentes na trilha de auditoria", on:true },
    ],
  },
  {
    icon:<Shield size={14}/>, title:"Regras de Detecção",
    items:[
      { label:"Detecção de força bruta",              sub:">50 logins falhos em 90s dispara alerta",                    on:true  },
      { label:"Detecção de movimento lateral",        sub:"Padrões incomuns de SMB/RDP entre hosts",                    on:true  },
      { label:"Detecção de beacon C2",                sub:"Conexões de saída periódicas para IPs desconhecidos",         on:true  },
      { label:"Alertas de exfiltração de dados",      sub:"Transferências de saída volumosas para IPs externos",         on:false },
    ],
  },
  {
    icon:<Globe size={14}/>, title:"Integrações",
    items:[
      { label:"API do VirusTotal",                    sub:"Enriquecer IOCs com dados de reputação do VT",               on:true  },
      { label:"Integração com Shodan",                sub:"Escanear superfície de ataque externa",                      on:true  },
      { label:"Conector SIEM (Elastic)",              sub:"Encaminhar eventos para o Elasticsearch",                    on:false },
      { label:"Bloqueio automático no firewall",      sub:"Enviar regras de bloqueio para pfSense/FortiGate",           on:false },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="page-content" style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:14 }}>
      <PageHeader title="Configurações" subtitle="Configuração da plataforma, integrações e comportamento dos agentes"/>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {SECTIONS.map(section => (
          <Card key={section.title}>
            <SectionHead icon={section.icon} title={section.title}/>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {section.items.map((item, i) => (
                <div key={item.label}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0" }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:T.text0, marginBottom:2 }}>{item.label}</div>
                      <div style={{ fontSize:10.5, color:T.text2 }}>{item.sub}</div>
                    </div>
                    <Toggle on={item.on}/>
                  </div>
                  {i < section.items.length-1 && <Hr/>}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* API Keys */}
      <Card>
        <SectionHead icon={<Key size={14}/>} title="Chaves de API e Credenciais"/>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[
            { service:"VirusTotal",   key:"VT-●●●●●●●●-●●●●-●●●●", status:"Ativa"   },
            { service:"Shodan",       key:"SD-●●●●●●●●●●●●●●●●",    status:"Ativa"   },
            { service:"Abuse.ch",     key:"AB-●●●●-●●●●-●●●●",       status:"Ativa"   },
            { service:"MalwareBazaar",key:"MB-●●●●●●●●●●●●",          status:"Expirada"},
          ].map((k, i) => (
            <div key={k.service}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <Database size={12} color={T.text2}/>
                  <span style={{ fontSize:12, fontWeight:600, color:T.text0 }}>{k.service}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:11, color:T.text2, fontFamily:"monospace" }}>{k.key}</span>
                  <span style={{ fontSize:10, fontWeight:700, color: k.status==="Ativa" ? T.success : T.critical, fontFamily:"monospace" }}>
                    {k.status}
                  </span>
                </div>
              </div>
              {i < 3 && <Hr/>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
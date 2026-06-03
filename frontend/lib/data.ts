import type { Incident, Agent, LogLine } from "@/types";

export const INCIDENTS: Incident[] = [
  { id:"INC-0847", title:"Força Bruta — SSH",         host:"WKST-042",    sev:"CRITICAL", mitre:"T1110", conf:91, status:"investigating", ts:"14:24" },
  { id:"INC-0846", title:"Abuso de Credenciais",           host:"SRV-DC-01",   sev:"HIGH",     mitre:"T1078", conf:84, status:"investigating", ts:"14:18" },
  { id:"INC-0845", title:"Movimentação Lateral",           host:"SRV-FILE-01", sev:"MEDIUM",   mitre:"T1021", conf:76, status:"new",           ts:"14:11" },
  { id:"INC-0844", title:"Tentativa de Exfiltração de Dados",  host:"WKST-019",    sev:"CRITICAL", mitre:"T1041", conf:88, status:"investigating", ts:"13:58" },
  { id:"INC-0843", title:"Escalação de Privilégios",       host:"SRV-DC-01",   sev:"HIGH",     mitre:"T1068", conf:79, status:"contained",     ts:"13:42" },
  { id:"INC-0842", title:"Comunicação Malware C2",   host:"WKST-007",    sev:"CRITICAL", mitre:"T1071", conf:95, status:"investigating", ts:"13:31" },
];

export const AGENTS: Agent[] = [
  { name:"ThreatHunter",      role:"Agente Autônomo", status:"ACTIVE",     color:"#10B981", tasks:14 },
  { name:"LogAnalyzer",       role:"Agente Autônomo", status:"PROCESSING", color:"#EAB308", tasks:847 },
  { name:"RiskEngine",        role:"Agente Autônomo", status:"ACTIVE",     color:"#10B981", tasks:31 },
  { name:"IncidentResponder", role:"Agente Autônomo", status:"ALERT",      color:"#EF4444", tasks:4 },
  { name:"CorrelationBot",    role:"Agente Autônomo", status:"ACTIVE",     color:"#10B981", tasks:122 },
  { name:"ThreatPredictor",   role:"Agente Autônomo", status:"IDLE",       color:"#3D5070", tasks:0 },
];

export const LOG_POOL: LogLine[] = [
  { level:"INFO",    msg:"Authentication request from 192.168.1.45 → SRV-DC-01:22" },
  { level:"WARN",    msg:"Brute force threshold exceeded — >50 attempts in 90s" },
  { level:"AI",      msg:"ThreatHunter: initiating correlation on cluster INC-0847" },
  { level:"AI",      msg:"MITRE T1110.003 matched — confidence 91.3%" },
  { level:"INFO",    msg:"IP reputation lookup started — querying 4 threat feeds" },
  { level:"CRIT",    msg:"Credential stuffing confirmed — 3 hosts affected" },
  { level:"AI",      msg:"Confidence score elevated to 91.3% — escalating" },
  { level:"INFO",    msg:"Response orchestration activated — playbook SOC-P04" },
  { level:"ACTION",  msg:"Firewall rule pushed — blocking 192.168.1.45 (all ports)" },
  { level:"AI",      msg:"IncidentResponder: isolating WKST-042 from network" },
  { level:"SUCCESS", msg:"Threat mitigated — INC-0847 status: CONTAINED" },
  { level:"WARN",    msg:"New connection from 203.0.113.88 — reputation: UNKNOWN" },
  { level:"AI",      msg:"LogAnalyzer processing batch — 1,247 events in queue" },
  { level:"INFO",    msg:"Risk score recalculated — current level: HIGH (78/100)" },
  { level:"CRIT",    msg:"Port scan detected — 203.0.113.88 → 10.0.0.0/24" },
];

export const ATTACK_SEED = [
  { t:"14:00", v:38 }, { t:"14:03", v:62 }, { t:"14:06", v:51 },
  { t:"14:09", v:94 }, { t:"14:12", v:147 },{ t:"14:15", v:189 },
  { t:"14:18", v:231 },{ t:"14:21", v:198 },{ t:"14:24", v:214 },
];

export const PREDICTION_DATA = [
  { t:"Now", v:73 }, { t:"+1h", v:82 }, { t:"+2h", v:91 },
  { t:"+3h", v:68 }, { t:"+4h", v:54 }, { t:"+5h", v:61 }, { t:"+6h", v:75 },
];

export const SEV_BAR = [
  { name:"Critical", value:7,  color:"#EF4444" },
  { name:"High",     value:24, color:"#F97316" },
  { name:"Medium",   value:41, color:"#EAB308" },
  { name:"Low",      value:19, color:"#3B82F6" },
];

export const DIST = [
  { label:"Critical", value:7,  pct:7,  color:"#EF4444" },
  { label:"High",     value:24, pct:26, color:"#F97316" },
  { label:"Medium",   value:41, pct:45, color:"#EAB308" },
  { label:"Low",      value:19, pct:21, color:"#3B82F6" },
];

export const AI_BULLETS = [
  "IP reputation matched known C2 infrastructure — 3 external feeds confirmed",
  "Velocity anomaly detected — 847 auth attempts in 2 min on WKST-042",
  "Credential stuffing pattern confirmed via ML classifier (XGB, 94% acc.)",
  "MITRE ATT&CK T1110.003 correlation confirmed across 3 affected hosts",
  "Confidence elevated to 91.3% — Tier 2 escalation recommended",
];

export const BULLET_AGES = [47, 38, 29, 19, 8];

export const KPIS_EXEC = [
  { label:"Mean Time to Detect",   value:"42 sec",  color:"#10B981" },
  { label:"Mean Time to Respond",  value:"1m 12s",  color:"#EAB308" },
  { label:"False Positive Rate",   value:"4.2%",    color:"#10B981" },
  { label:"Alerts Resolved / 24h", value:"38 / 41", color:"#06B6D4" },
  { label:"Threat Confidence",     value:"91.3%",   color:"#7C3AED" },
];

export const LOG_COLORS: Record<string, string> = {
  INFO:    "#8899B4",
  WARN:    "#EAB308",
  AI:      "#A78BFA",
  CRIT:    "#EF4444",
  ACTION:  "#F97316",
  SUCCESS: "#10B981",
};

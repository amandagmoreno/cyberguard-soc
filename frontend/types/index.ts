export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface Incident {
  id:     string;
  title:  string;
  host:   string;
  sev:    Severity;
  mitre:  string;
  conf:   number;
  status: "investigating" | "contained" | "resolved" | "new";
  ts:     string;
}

export interface Agent {
  name:   string;
  role:   string;
  status: "ATIVO" | "PROCESSANDO" | "ALERTA" | "OCIOSO";
  color:  string;
  tasks:  number;
}

export interface LogLine {
  level: string;
  msg:   string;
  _ts?:  number;
  _time?: string;
}

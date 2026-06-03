import random

EVENTS = [
    {
        "severity": "CRITICAL",
        "message": "Padrão de uso indevido de credenciais identificado",
        "mitre": "T1110",
        "source_ip": "203.0.113.88",
        "agent": "ThreatHunter",
        "confidence": 94
    },
    {
        "severity": "HIGH",
        "message": "Tentativa de escalação de privilégios detectada",
        "mitre": "T1068",
        "source_ip": "10.0.0.24",
        "agent": "RiskEngine",
        "confidence": 87
    },
    {
        "severity": "MEDIUM",
        "message": "Execução suspeita de PowerShell",
        "mitre": "T1059",
        "source_ip": "192.168.1.45",
        "agent": "LogAnalyzer",
        "confidence": 79
    },
    {
        "severity": "CRITICAL",
        "message": "Comportamento de exfiltração de dados detectado",
        "mitre": "T1041",
        "source_ip": "185.220.101.4",
        "agent": "IncidentResponder",
        "confidence": 97
    },
    {
        "severity": "HIGH",
        "message": "Atividade de força bruta confirmada",
        "mitre": "T1110",
        "source_ip": "45.133.172.12",
        "agent": "ThreatHunter",
        "confidence": 91
    },
]

def generate_fake_event():
    return random.choice(EVENTS)
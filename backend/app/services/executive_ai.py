from app.services.threat_hunter import generate_threat_analysis
from app.services.risk_advisor import generate_risk_advice
from app.services.ollama_service import ask_llm


def generate_executive_summary():

    threat = generate_threat_analysis()

    risk = generate_risk_advice()

    prompt = f"""
Você é um analista SOC sênior.

Dados atuais do ambiente:

Análise ThreatHunter:
{threat}

Prioridade operacional:
{risk}

Escreva um resumo executivo profissional em português.

Inclua:
- situação atual
- risco identificado
- prioridade operacional
- recomendação imediata

Máximo de 150 palavras.
"""

    return ask_llm(prompt)
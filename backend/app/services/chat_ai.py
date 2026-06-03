from app.services.ollama_service import ask_llm
from app.services.threat_hunter import generate_threat_analysis
from app.services.risk_advisor import generate_risk_advice
from app.services.correlation_engine import generate_correlation


def ask_sentinel(question):

    q = question.lower()

    # =====================================
    # MODO 2 - AMBIENTE CYBERGUARD
    # PRIORIDADE MAIS ALTA
    # =====================================

    environment_keywords = [
        "ameaça",
        "incidente",
        "incidentes",
        "risco",
        "mitre",
        "host",
        "hosts",
        "cyberguard",
        "prioridade",
        "alerta",
        "alertas",
        "ambiente",
        "ataque atual",
        "ameaça atual",
        "ameaça crítica",
        "incidente crítico"
    ]

    if any(word in q for word in environment_keywords):

        threat = generate_threat_analysis()
        risk = generate_risk_advice()
        correlation = generate_correlation()

        prompt = f"""
Você é um analista SOC sênior.

Dados atuais do ambiente:

ThreatHunter:
{threat}

RiskAdvisor:
{risk}

CorrelationBot:
{correlation}

Pergunta:

{question}

Utilize os dados fornecidos para responder.

Baseie a resposta nos dados do ambiente.

Responda em português.

Não diga que você é uma IA.
Não diga que você é o CyberGuard AI.
Responda diretamente.
"""

        return ask_llm(prompt)

    # =====================================
    # MODO 3 - ASSISTÊNCIA OPERACIONAL
    # =====================================

    operational_keywords = [
        "como responder",
        "como conter",
        "como investigar",
        "o que devo fazer",
        "como mitigar",
        "como corrigir",
        "como tratar",
        "playbook",
        "resposta ao incidente",
        "remediação"
    ]

    if any(word in q for word in operational_keywords):

        threat = generate_threat_analysis()
        risk = generate_risk_advice()
        correlation = generate_correlation()

        prompt = f"""
Você é um analista SOC sênior.

Contexto atual do ambiente:

ThreatHunter:
{threat}

RiskAdvisor:
{risk}

CorrelationBot:
{correlation}

Pergunta:

{question}

Forneça um playbook operacional.

Inclua:

1. Identificação
2. Contenção
3. Investigação
4. Remediação
5. Monitoramento

Use o contexto do ambiente apenas se ele
for relevante para a pergunta.

Não associe incidentes ou técnicas MITRE
sem relação direta com a pergunta.

Responda em português.

Não diga que você é uma IA.
Não diga que você é o CyberGuard AI.
Responda diretamente.
"""

        return ask_llm(prompt)

    # =====================================
    # MODO 1 - CONHECIMENTO DE SEGURANÇA
    # =====================================

    knowledge_keywords = [
        "o que é",
        "explique",
        "conceito",
        "significa",
        "defina",
        "como funciona"
    ]

    if any(word in q for word in knowledge_keywords):

        prompt = f"""
Você é um especialista em:

- SOC
- SIEM
- MITRE ATT&CK
- Malware
- Redes
- Cloud Security
- Threat Hunting
- Resposta a Incidentes
- Forense Digital

Pergunta:

{question}

Responda de forma técnica,
didática e profissional.

Não fale sobre você.

Não diga:
"Como CyberGuard AI"

Não diga:
"Como IA"

Responda diretamente à pergunta.

Responda em português.
"""

        return ask_llm(prompt)

    # =====================================
    # MODO 4 - FORA DO ESCOPO
    # =====================================

    return """
Sou o CyberGuard AI.

Estou especializado em:

• Cibersegurança
• SOC
• SIEM
• MITRE ATT&CK
• Threat Hunting
• Malware
• Resposta a Incidentes
• Forense Digital
• Cloud Security

Posso responder perguntas sobre segurança da informação, operações SOC e sobre o ambiente CyberGuard.
"""
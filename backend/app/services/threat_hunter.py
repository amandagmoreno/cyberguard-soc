from collections import Counter
from app.services.incident_repository import get_active_incidents


def generate_threat_analysis():

    incidents = get_active_incidents(50)

    if not incidents:

        return {
            "summary": "Nenhum incidente disponível.",
            "risk": "BAIXO",
            "confidence": 0,
            "mitre": "-"
        }

    mitres = Counter()
    severities = Counter()

    for incident in incidents:

        severity = incident[2]
        mitre = incident[4]

        severities[severity] += 1
        mitres[mitre] += 1

    top_mitre = mitres.most_common(1)[0][0]

    criticals = severities["CRITICAL"]

    risk = "MÉDIO"

    if criticals >= 3:
        risk = "ALTO"

    if criticals >= 6:
        risk = "CRÍTICO"

    confidence = min(
        98,
        60 + (criticals * 5)
    )

    return {
        "summary":
            f"O ThreatHunter identificou concentração de atividades relacionadas à técnica {top_mitre}. Foram detectados {criticals} incidentes críticos recentes indicando possível campanha coordenada.",

        "risk":
            risk,

        "confidence":
            confidence,

        "mitre":
            top_mitre
    }
from collections import Counter
from app.services.incident_repository import get_recent_incidents


def generate_correlation():

    incidents = get_recent_incidents()

    if not incidents:

        return {
            "title": "Nenhuma Correlação Disponível",
            "description": "Ainda não há incidentes suficientes para análise.",
            "severity": "LOW",
            "confidence": 0,
            "mitre": "-",
            "recommended_actions": []
        }

    mitre_counter = Counter()

    for incident in incidents:

        mitre = incident[2]

        mitre_counter[mitre] += 1

    top_mitre = mitre_counter.most_common(1)[0][0]

    correlated = [
        i for i in incidents
        if i[2] == top_mitre
    ]

    confidence = int(
        sum(i[3] for i in correlated)
        / len(correlated)
    )

    count = len(correlated)

    return {
        "title": f"Campanha Detectada ({top_mitre})",

        "description":
            f"{count} incidentes relacionados à técnica MITRE {top_mitre} foram correlacionados automaticamente pelo CorrelationBot.",

        "severity":
            correlated[0][1],

        "confidence":
            confidence,

        "mitre":
            top_mitre,

        "recommended_actions": [
            "Investigar hosts afetados",
            "Bloquear indicadores relacionados",
            "Escalonar para resposta coordenada"
        ]
    }
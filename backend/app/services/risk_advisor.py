from app.services.incident_repository import get_active_incidents


def generate_risk_advice():

    incidents = get_active_incidents(50)

    if not incidents:

        return {
            "priority": 0,
            "incident": "-",
            "reason": "Nenhum incidente disponível",
            "recommended_owner": "-"
        }

    highest = None

    for incident in incidents:

        confidence = incident[6]

        if highest is None:
            highest = incident

        elif confidence > highest[6]:
            highest = incident

    return {

        "priority": 1,

        "incident": highest[0],

        "reason":
            f"Severidade {highest[2]} com confiança de {highest[6]}% e técnica MITRE {highest[4]}.",

        "recommended_owner":
            "ThreatHunter" if highest[2] == "CRITICAL"
            else "IncidentResponder"
    }
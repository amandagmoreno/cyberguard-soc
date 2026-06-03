from datetime import datetime
from app.services.incident_repository import get_active_incidents


def generate_response_actions():

    incidents = get_active_incidents(10)

    results = []

    if not incidents:

        return []

    for incident in incidents:

        severity = incident[2]
        mitre = incident[4]
        source_ip = incident[5]

        actions = []

        if severity == "CRITICAL":

            actions.extend([
                f"Bloqueio imediato do IP {source_ip}",
                "Isolamento do host afetado",
                "Preservação de evidências forenses"
            ])

        elif severity == "HIGH":

            actions.extend([
                f"Monitoramento reforçado do IP {source_ip}",
                "Validação de credenciais comprometidas",
                "Escalonamento para analista"
            ])

        else:

            actions.extend([
                "Monitoramento contínuo",
                "Coleta adicional de telemetria"
            ])

        for action in actions:

            results.append({
                "time": datetime.now().strftime("%H:%M:%S"),
                "action": action,
                "status": "RECOMENDADO",
                "mitre": mitre
            })

    return results[:12]
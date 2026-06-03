from app.services.incident_repository import get_active_incidents

def generate_incidents():

    rows = get_active_incidents(6)

    incidents = []

    for row in rows:

        incidents.append({
            "id": row[0],
            "title": row[1],
            "severity": row[2],
            "status": row[3],
            "mitre": row[4],
            "source_ip": row[5],
            "confidence": row[6],
            "agent": row[7],
            "created_at": row[8]
        })

    return incidents
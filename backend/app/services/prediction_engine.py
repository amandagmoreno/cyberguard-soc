from app.services.incident_repository import get_active_incidents


def generate_prediction():

    incidents = get_active_incidents(50)

    criticals = 0
    highs = 0

    for incident in incidents:

        severity = incident[2]

        if severity == "CRITICAL":
            criticals += 1

        elif severity == "HIGH":
            highs += 1

    total = len(incidents)

    critical_ratio = criticals / total if total else 0

    current_risk = int(
        45 +
        (critical_ratio * 40) +
        min(highs, 20)
    )

    current_risk = min(100, max(0, current_risk))

    return [

        {
            "t": "Agora",
            "v": current_risk
        },

        {
            "t": "+1h",
            "v": min(100, current_risk + 4)
        },

        {
            "t": "+2h",
            "v": min(100, current_risk + 8)
        },

        {
            "t": "+3h",
            "v": min(100, current_risk + 5)
        },

        {
            "t": "+4h",
            "v": min(100, current_risk + 2)
        },

        {
            "t": "+5h",
            "v": max(0, current_risk - 2)
        },

        {
            "t": "+6h",
            "v": max(0, current_risk - 4)
        }

    ]
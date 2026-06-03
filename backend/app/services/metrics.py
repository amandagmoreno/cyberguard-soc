import random

def get_metrics():

    return {
        "events_per_min": random.randint(1200, 1800),

        "active_alerts": random.randint(5, 20),

        "threat_score": random.randint(70, 98),

        "suspicious_ips": random.randint(10, 50),

        "mttd": f"{random.randint(20, 60)} sec",

        "mttr": f"{random.randint(1, 3)}m {random.randint(0,59)}s",

        "false_positive_rate": f"{round(random.uniform(2.0, 5.0), 1)}%",

        "threat_confidence": f"{round(random.uniform(85.0, 98.0), 1)}%"
    }
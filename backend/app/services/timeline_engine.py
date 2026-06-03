from app.services.event_repository import get_recent_events

def generate_timeline():

    events = get_recent_events(10)

    timeline = []

    for event in events:

        timeline.append({
            "time": event[0],
            "event": event[1]
        })

    return timeline
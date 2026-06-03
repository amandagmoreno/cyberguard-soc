from app.database import get_connection

def save_event(event):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO events (
        timestamp,
        severity,
        message,
        mitre,
        source_ip,
        agent,
        confidence
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        event["timestamp"],
        event["severity"],
        event["message"],
        event["mitre"],
        event["source_ip"],
        event["agent"],
        event["confidence"]
    ))

    conn.commit()
    conn.close()

def get_recent_events(limit=20):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        timestamp,
        message,
        severity,
        mitre,
        source_ip,
        agent,
        confidence
    FROM events
    ORDER BY id DESC
    LIMIT ?
    """, (limit,))

    rows = cursor.fetchall()

    conn.close()

    return rows

def get_recent_incidents(limit=6):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        id,
        timestamp,
        severity,
        message,
        mitre,
        source_ip,
        agent,
        confidence
    FROM events
    ORDER BY id DESC
    LIMIT ?
    """, (limit,))

    rows = cursor.fetchall()

    conn.close()

    return rows
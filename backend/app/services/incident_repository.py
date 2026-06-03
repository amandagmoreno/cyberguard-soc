from app.database import get_connection
from datetime import datetime


def get_all_incidents():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        incident_code,
        title,
        severity,
        status,
        mitre,
        source_ip,
        confidence,
        agent,
        created_at
    FROM incidents
    ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    conn.close()

    return rows


def create_incident(event):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO incidents (
        incident_code,
        title,
        severity,
        status,
        mitre,
        source_ip,
        confidence,
        agent,
        created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        f"INC-{int(datetime.now().timestamp() * 1000)}",
        event["message"],
        event["severity"],
        "Investigando",
        event["mitre"],
        event["source_ip"],
        event["confidence"],
        event["agent"],
        datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    ))

    conn.commit()
    conn.close()

def get_active_incidents(limit=20):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        incident_code,
        title,
        severity,
        status,
        mitre,
        source_ip,
        confidence,
        agent,
        created_at
    FROM incidents
    ORDER BY id DESC
    LIMIT ?
    """, (limit,))

    rows = cursor.fetchall()

    conn.close()

    return rows

def update_incident_status(incident_code, status):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    UPDATE incidents
    SET status = ?
    WHERE incident_code = ?
    """, (status, incident_code))

    conn.commit()
    conn.close()
def get_recent_incidents(limit=20):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        title,
        severity,
        mitre,
        confidence
    FROM incidents
    ORDER BY id DESC
    LIMIT ?
    """, (limit,))

    rows = cursor.fetchall()

    conn.close()

    return rows
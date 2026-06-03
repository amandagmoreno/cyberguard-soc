import sqlite3

DB_NAME = "cyberguard.db"

def get_connection():
    return sqlite3.connect(DB_NAME)

def init_db():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT,
        severity TEXT,
        message TEXT,
        mitre TEXT,
        source_ip TEXT,
        agent TEXT,
        confidence INTEGER
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS incidents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        incident_code TEXT,
        title TEXT,
        severity TEXT,
        status TEXT,
        mitre TEXT,
        source_ip TEXT,
        confidence INTEGER,
        agent TEXT,
        created_at TEXT
    )
    """)

    conn.commit()
    conn.close()
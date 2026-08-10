#!/usr/bin/env python3
"""
SQLite Database Layer for AI Certification Quiz
Handles SQLite database initialization, schema migration from JSON files, and CRUD operations.
"""

import sqlite3
import json
import os
import uuid
from contextlib import contextmanager

DB_FILE = os.path.join(os.path.dirname(__file__), "quiz.db")
USERS_JSON = os.path.join(os.path.dirname(__file__), "users.json")
RESULTS_JSON = os.path.join(os.path.dirname(__file__), "results.json")

@contextmanager
def get_db():
    """Provides a transactional database connection scope."""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

def init_db():
    """Initialize database tables and automatically migrate existing JSON records."""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # 1. Create Users Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TEXT NOT NULL
            );
        """)
        
        # 2. Create Results Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS results (
                id TEXT PRIMARY KEY,
                candidate_email TEXT NOT NULL,
                candidate_name TEXT,
                candidate_id TEXT,
                timestamp TEXT,
                formatted_date TEXT,
                correct_count INTEGER,
                total_questions INTEGER,
                percentage REAL,
                passed INTEGER,
                strikes INTEGER,
                time_spent_seconds INTEGER,
                is_auto_submit INTEGER,
                raw_data TEXT NOT NULL
            );
        """)

        # Create index on lower(candidate_email) for high-performance single-attempt lookup
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_results_candidate_email ON results(candidate_email);
        """)

        # 3. Automatic Migration from users.json
        if os.path.exists(USERS_JSON):
            try:
                with open(USERS_JSON, "r") as f:
                    users_data = json.load(f)
                    for u in users_data:
                        email = u.get("email", "").strip().lower()
                        if email:
                            cursor.execute("SELECT id FROM users WHERE LOWER(email) = ?", (email,))
                            if not cursor.fetchone():
                                cursor.execute(
                                    "INSERT INTO users (id, email, password, created_at) VALUES (?, ?, ?, ?)",
                                    (u.get("id", f"USR-{uuid.uuid4().hex[:8]}"), email, u.get("password", ""), u.get("createdAt", ""))
                                )
            except Exception as e:
                print(f"[!] Warning: Could not migrate users.json: {e}")

        # 4. Automatic Migration from results.json
        if os.path.exists(RESULTS_JSON):
            try:
                with open(RESULTS_JSON, "r") as f:
                    results_data = json.load(f)
                    for r in results_data:
                        res_id = r.get("id", f"RES-{uuid.uuid4().hex[:8]}")
                        c_email = r.get("candidate", {}).get("email", "").strip().lower()
                        cursor.execute("SELECT id FROM results WHERE id = ?", (res_id,))
                        if not cursor.fetchone():
                            cursor.execute("""
                                INSERT INTO results (
                                    id, candidate_email, candidate_name, candidate_id, timestamp,
                                    formatted_date, correct_count, total_questions, percentage, passed,
                                    strikes, time_spent_seconds, is_auto_submit, raw_data
                                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                            """, (
                                res_id,
                                c_email,
                                r.get("candidate", {}).get("name", ""),
                                r.get("candidate", {}).get("id", ""),
                                r.get("timestamp", ""),
                                r.get("formattedDate", ""),
                                r.get("correctCount", 0),
                                r.get("totalQuestions", 25),
                                r.get("percentage", 0.0),
                                1 if r.get("passed") else 0,
                                r.get("strikes", 0),
                                r.get("timeSpentSeconds", 0),
                                1 if r.get("isAutoSubmit") else 0,
                                json.dumps(r)
                            ))
            except Exception as e:
                print(f"[!] Warning: Could not migrate results.json: {e}")

# --- USER OPERATIONS ---

def get_all_users():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, email, created_at FROM users ORDER BY created_at DESC")
        rows = cursor.fetchall()
        return [{"id": row["id"], "email": row["email"], "createdAt": row["created_at"]} for row in rows]

def get_user_by_credentials(email, password):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, email, password, created_at FROM users WHERE LOWER(email) = ? AND password = ?",
            (email.strip().lower(), password.strip())
        )
        row = cursor.fetchone()
        if row:
            return {"id": row["id"], "email": row["email"], "password": row["password"], "createdAt": row["created_at"]}
        return None

def user_exists(email):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT 1 FROM users WHERE LOWER(email) = ?", (email.strip().lower(),))
        return cursor.fetchone() is not None

def add_user(email, password, created_at=None):
    user_id = f"USR-{uuid.uuid4().hex[:8]}"
    created_at_val = created_at or "2026-08-04T15:30:00Z"
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (id, email, password, created_at) VALUES (?, ?, ?, ?)",
            (user_id, email.strip().lower(), password.strip(), created_at_val)
        )
    return {"id": user_id, "email": email.strip().lower(), "createdAt": created_at_val}

def delete_user(user_id):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
        return cursor.rowcount > 0

# --- RESULT OPERATIONS ---

def get_all_results():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT raw_data FROM results ORDER BY timestamp DESC")
        rows = cursor.fetchall()
        return [json.loads(row["raw_data"]) for row in rows]

def get_result_by_email(email):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT raw_data FROM results WHERE LOWER(candidate_email) = ? ORDER BY timestamp DESC LIMIT 1", (email.strip().lower(),))
        row = cursor.fetchone()
        if row:
            return json.loads(row["raw_data"])
        return None

def get_results_by_candidate_email(email):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT raw_data FROM results WHERE LOWER(candidate_email) = ? ORDER BY timestamp DESC", (email.strip().lower(),))
        rows = cursor.fetchall()
        return [json.loads(row["raw_data"]) for row in rows]

def add_result(payload):
    res_id = payload.get("id") or f"RES-{uuid.uuid4().hex[:8]}"
    payload["id"] = res_id
    c_email = payload.get("candidate", {}).get("email", "").strip().lower()

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO results (
                id, candidate_email, candidate_name, candidate_id, timestamp,
                formatted_date, correct_count, total_questions, percentage, passed,
                strikes, time_spent_seconds, is_auto_submit, raw_data
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            res_id,
            c_email,
            payload.get("candidate", {}).get("name", ""),
            payload.get("candidate", {}).get("id", ""),
            payload.get("timestamp", ""),
            payload.get("formattedDate", ""),
            payload.get("correctCount", 0),
            payload.get("totalQuestions", 25),
            payload.get("percentage", 0.0),
            1 if payload.get("passed") else 0,
            payload.get("strikes", 0),
            payload.get("timeSpentSeconds", 0),
            1 if payload.get("isAutoSubmit") else 0,
            json.dumps(payload)
        ))

def clear_all_results():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM results")

def delete_result(result_id):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM results WHERE id = ?", (result_id,))
        return cursor.rowcount > 0

#!/usr/bin/env python3
"""
Production Entrypoint for AI Certification Quiz Application
Serves static web assets and REST API endpoints for candidate assessment, single-attempt proctoring, and admin user management.
Compatible with Render, Railway, Heroku, AWS, Docker, and local execution.
"""

import http.server
import socketserver
import os
import sys

# Import server handler logic from server module
from server import QuizRequestHandler, load_dotenv, ADMIN_EMAIL
import db

def run():
    load_dotenv()
    db.init_db()
    
    # Cloud PaaS platforms (Render, Railway, Heroku) pass PORT dynamically in environment
    port = int(os.environ.get("PORT", 8080))
    host = "0.0.0.0"

    socketserver.TCPServer.allow_reuse_address = True
    
    print(f"==================================================")
    print(f"🚀 AI Certification Quiz Server Launching...")
    print(f"📍 Binding Address : http://{host}:{port}")
    print(f"🔑 Admin Email     : {ADMIN_EMAIL}")
    print(f"🗄️ Database        : SQLite ({db.DB_FILE})")
    print(f"==================================================")

    try:
        with socketserver.TCPServer((host, port), QuizRequestHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[!] Gracefully shutting down Quiz Server.")
        sys.exit(0)
    except Exception as e:
        print(f"\n[❌] Server error encountered: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run()

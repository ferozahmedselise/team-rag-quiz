#!/usr/bin/env python3
"""
Lightweight HTTP & REST API Server for AI Certification Quiz
Serves static web files and provides REST endpoints for:
- Admin Authentication (Email & Password from .env)
- Participant Registration & Management (Add / Remove participant accounts)
- Participant Login Authentication
- Quiz Results Persistence & Audit
"""

import http.server
import socketserver
import json
import os
import urllib.parse
import uuid

def load_dotenv():
    env_path = os.path.join(os.path.dirname(__file__), ".env")
    if os.path.exists(env_path):
        with open(env_path, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    os.environ[key.strip()] = val.strip().strip("'\"")

load_dotenv()

PORT = int(os.environ.get("PORT", 8080))
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "feroz@teamrag.com").lower()
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "203021258")

RESULTS_FILE = os.path.join(os.path.dirname(__file__), "results.json")
USERS_FILE = os.path.join(os.path.dirname(__file__), "users.json")

# Ensure json files exist
if not os.path.exists(RESULTS_FILE):
    with open(RESULTS_FILE, "w") as f:
        json.dump([], f)

if not os.path.exists(USERS_FILE):
    # Initialize with default candidate account
    default_users = [
        {
            "id": "USR-1",
            "email": "student@example.com",
            "password": "password123",
            "createdAt": "2026-08-04T12:00:00Z"
        }
    ]
    with open(USERS_FILE, "w") as f:
        json.dump(default_users, f, indent=2)

def read_json_file(filepath):
    try:
        with open(filepath, "r") as f:
            return json.load(f)
    except Exception:
        return []

def write_json_file(filepath, data):
    with open(filepath, "w") as f:
        json.dump(data, f, indent=2)

class QuizRequestHandler(http.server.SimpleHTTPRequestHandler):
    def is_authenticated_admin(self, key_or_token):
        if not key_or_token:
            return False
        # Matches admin password or admin token string
        return key_or_token == ADMIN_PASSWORD or key_or_token == f"admin-token-{ADMIN_PASSWORD}"

    def send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        query_params = urllib.parse.parse_qs(parsed_url.query)

        # 1. API: Get All Quiz Results (Admin only)
        if parsed_url.path == "/api/results":
            key = query_params.get("key", [""])[0]
            auth_header = self.headers.get("Authorization", "").replace("Bearer ", "")
            token = key or auth_header

            if not self.is_authenticated_admin(token):
                self.send_json(401, {"error": "Unauthorized admin access"})
                return
            
            results = read_json_file(RESULTS_FILE)
            self.send_json(200, results)
            return

        # 2. API: Get Registered Participants (Admin only)
        if parsed_url.path == "/api/users":
            key = query_params.get("key", [""])[0]
            auth_header = self.headers.get("Authorization", "").replace("Bearer ", "")
            token = key or auth_header

            if not self.is_authenticated_admin(token):
                self.send_json(401, {"error": "Unauthorized admin access"})
                return

            users = read_json_file(USERS_FILE)
            # Remove passwords before sending list
            safe_users = [{ "id": u["id"], "email": u["email"], "createdAt": u.get("createdAt", "") } for u in users]
            self.send_json(200, safe_users)
            return

        # Serve static web files
        super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length)

        try:
            payload = json.loads(post_data.decode("utf-8")) if post_data else {}
        except Exception as e:
            self.send_json(400, {"error": f"Invalid JSON payload: {str(e)}"})
            return

        # 1. API: Admin Login
        if parsed_url.path == "/api/admin/login":
            email = payload.get("email", "").strip().lower()
            password = payload.get("password", "").strip()

            if email == ADMIN_EMAIL and password == ADMIN_PASSWORD:
                token = f"admin-token-{ADMIN_PASSWORD}"
                self.send_json(200, {"status": "success", "token": token, "email": ADMIN_EMAIL})
            else:
                self.send_json(401, {"error": "Invalid admin email or password"})
            return

        # 2. API: Participant / User Login
        if parsed_url.path == "/api/user/login":
            email = payload.get("email", "").strip().lower()
            password = payload.get("password", "").strip()

            users = read_json_file(USERS_FILE)
            matched_user = next((u for u in users if u["email"].lower() == email and u["password"] == password), None)

            if matched_user:
                self.send_json(200, {
                    "status": "success",
                    "user": { "id": matched_user["id"], "email": matched_user["email"] }
                })
            else:
                self.send_json(401, {"error": "Invalid email or password. Please contact admin if unregistered."})
            return

        # 3. API: Register / Add Participant (Admin only)
        if parsed_url.path == "/api/users":
            query_params = urllib.parse.parse_qs(parsed_url.query)
            key = query_params.get("key", [""])[0]
            auth_header = self.headers.get("Authorization", "").replace("Bearer ", "")
            token = key or auth_header

            if not self.is_authenticated_admin(token):
                self.send_json(401, {"error": "Unauthorized admin access"})
                return

            email = payload.get("email", "").strip().lower()
            password = payload.get("password", "").strip()

            if not email or not password:
                self.send_json(400, {"error": "Email and Password are required"})
                return

            users = read_json_file(USERS_FILE)
            if any(u["email"].lower() == email for u in users):
                self.send_json(400, {"error": "A participant with this email already exists"})
                return

            new_user = {
                "id": "USR-" + str(uuid.uuid4())[:8],
                "email": email,
                "password": password,
                "createdAt": payload.get("createdAt", "") or "2026-08-04T15:30:00Z"
            }
            users.append(new_user)
            write_json_file(USERS_FILE, users)

            self.send_json(201, {"status": "success", "message": "Participant registered successfully", "user": new_user})
            return

        # 4. API: Save Exam Result
        if parsed_url.path == "/api/results":
            results = read_json_file(RESULTS_FILE)
            results.append(payload)
            write_json_file(RESULTS_FILE, results)
            self.send_json(201, {"status": "success", "message": "Result saved successfully"})
            return

    def do_DELETE(self):
        parsed_url = urllib.parse.urlparse(self.path)
        query_params = urllib.parse.parse_qs(parsed_url.query)
        key = query_params.get("key", [""])[0]
        auth_header = self.headers.get("Authorization", "").replace("Bearer ", "")
        token = key or auth_header

        if not self.is_authenticated_admin(token):
            self.send_json(401, {"error": "Unauthorized admin access"})
            return

        # 1. API: Remove Participant (Admin only)
        if parsed_url.path == "/api/users":
            user_id = query_params.get("id", [""])[0]
            if not user_id:
                self.send_json(400, {"error": "User ID parameter required"})
                return

            users = read_json_file(USERS_FILE)
            filtered_users = [u for u in users if u["id"] != user_id]
            
            if len(filtered_users) == len(users):
                self.send_json(404, {"error": "Participant not found"})
                return

            write_json_file(USERS_FILE, filtered_users)
            self.send_json(200, {"status": "success", "message": "Participant removed successfully"})
            return

        # 2. API: Clear All Exam Results (Admin only)
        if parsed_url.path == "/api/results":
            write_json_file(RESULTS_FILE, [])
            self.send_json(200, {"status": "success", "message": "All results cleared"})
            return

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), QuizRequestHandler) as httpd:
        print(f"Quiz REST Server active on http://localhost:{PORT}")
        print(f"Admin Email: {ADMIN_EMAIL}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer shutting down.")

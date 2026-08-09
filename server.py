#!/usr/bin/env python3
"""
Lightweight HTTP & REST API Server for AI Certification Quiz
Serves static web files and provides REST endpoints for:
- Admin Authentication (Email & Password from .env)
- Participant Registration & Management (Add / Remove participant accounts)
- Participant Login Authentication & Single-Attempt Enforcement
- Quiz Results Persistence & Audit
"""

import http.server
import socketserver
import json
import os
import urllib.parse
import uuid

import db

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

# Initialize database tables and migration
db.init_db()

class QuizRequestHandler(http.server.SimpleHTTPRequestHandler):
    def is_authenticated_admin(self, key_or_token):
        if not key_or_token:
            return False
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
            
            results = db.get_all_results()
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

            users = db.get_all_users()
            self.send_json(200, users)
            return

        # 3. API: Get Candidate Attempt History (Participant)
        if parsed_url.path == "/api/user/results":
            email = query_params.get("email", [""])[0].strip().lower()
            if not email:
                self.send_json(400, {"error": "Email parameter required"})
                return

            history = db.get_results_by_candidate_email(email)
            self.send_json(200, history)
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

        # 2. API: Participant / User Login (Returns account profile & attempt history)
        if parsed_url.path == "/api/user/login":
            email = payload.get("email", "").strip().lower()
            password = payload.get("password", "").strip()

            matched_user = db.get_user_by_credentials(email, password)

            if not matched_user:
                self.send_json(401, {"error": "Invalid email or password. Please contact admin if unregistered."})
                return

            # Fetch past attempt history for candidate
            history = db.get_results_by_candidate_email(email)

            self.send_json(200, {
                "status": "success",
                "user": { "id": matched_user["id"], "email": matched_user["email"] },
                "history": history
            })
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

            if db.user_exists(email):
                self.send_json(400, {"error": "A participant with this email already exists"})
                return

            new_user = db.add_user(email, password, payload.get("createdAt"))
            self.send_json(201, {"status": "success", "message": "Participant registered successfully", "user": new_user})
            return

        # 4. API: Save Exam Result (Allows retakes & multi-attempt history)
        if parsed_url.path == "/api/results":
            db.add_result(payload)
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

            deleted = db.delete_user(user_id)
            if not deleted:
                self.send_json(404, {"error": "Participant not found"})
                return

            self.send_json(200, {"status": "success", "message": "Participant removed successfully"})
            return

        # 2. API: Remove Single Exam Result or Clear All Results (Admin only)
        if parsed_url.path == "/api/results":
            result_id = query_params.get("id", [""])[0]
            if result_id:
                deleted = db.delete_result(result_id)
                if not deleted:
                    self.send_json(404, {"error": "Result record not found"})
                    return
                self.send_json(200, {"status": "success", "message": "Exam result removed successfully"})
                return
            else:
                db.clear_all_results()
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

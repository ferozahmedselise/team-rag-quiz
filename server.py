#!/usr/bin/env python3
"""
Lightweight HTTP & REST API Server for AI Certification Quiz
Serves static web files and provides endpoints to persist and retrieve candidate exam results.
"""

import http.server
import socketserver
import json
import os
import urllib.parse

PORT = 8080
RESULTS_FILE = os.path.join(os.path.dirname(__file__), "results.json")
ADMIN_SECRET = "admin123"

# Ensure results file exists
if not os.path.exists(RESULTS_FILE):
    with open(RESULTS_FILE, "w") as f:
        json.dump([], f)

class QuizRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        
        # API Endpoint: Retrieve stored results for Admin
        if parsed_url.path == "/api/results":
            query_params = urllib.parse.parse_qs(parsed_url.query)
            key = query_params.get("key", [""])[0]
            auth_header = self.headers.get("Authorization", "")
            
            if key != ADMIN_SECRET and auth_header != f"Bearer {ADMIN_SECRET}":
                self.send_response(401)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Unauthorized admin key"}).encode("utf-8"))
                return
            
            try:
                with open(RESULTS_FILE, "r") as f:
                    results_data = json.load(f)
            except Exception:
                results_data = []

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(results_data).encode("utf-8"))
            return

        # Serve standard static files
        super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)

        # API Endpoint: Save Candidate Exam Result
        if parsed_url.path == "/api/results":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            
            try:
                payload = json.loads(post_data.decode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": f"Invalid JSON payload: {str(e)}"}).encode("utf-8"))
                return

            # Read existing results
            try:
                with open(RESULTS_FILE, "r") as f:
                    results_data = json.load(f)
            except Exception:
                results_data = []

            results_data.append(payload)

            # Write updated results
            try:
                with open(RESULTS_FILE, "w") as f:
                    json.dump(results_data, f, indent=2)
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": f"Failed to save result: {str(e)}"}).encode("utf-8"))
                return

            self.send_response(201)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success", "message": "Result saved successfully"}).encode("utf-8"))
            return

    def do_DELETE(self):
        parsed_url = urllib.parse.urlparse(self.path)

        # API Endpoint: Clear all results (Admin only)
        if parsed_url.path == "/api/results":
            query_params = urllib.parse.parse_qs(parsed_url.query)
            key = query_params.get("key", [""])[0]
            auth_header = self.headers.get("Authorization", "")
            
            if key != ADMIN_SECRET and auth_header != f"Bearer {ADMIN_SECRET}":
                self.send_response(401)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Unauthorized"}).encode("utf-8"))
                return

            with open(RESULTS_FILE, "w") as f:
                json.dump([], f)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success", "message": "All results cleared"}).encode("utf-8"))
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
        print(f"Quiz Server with API active on http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

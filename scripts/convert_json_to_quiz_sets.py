#!/usr/bin/env python3
"""
Convert data/ai_agentic_systems_10_sets_requested_format.json
into data/quiz_sets.js for the AI Certification Quiz web application.
"""

import os
import json

JSON_INPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "ai_agentic_systems_10_sets_requested_format.json")
JS_OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "quiz_sets.js")

def convert_json():
    if not os.path.exists(JSON_INPUT_PATH):
        raise FileNotFoundError(f"Cannot find input JSON file: {JSON_INPUT_PATH}")

    with open(JSON_INPUT_PATH, "r", encoding="utf-8") as f:
        raw_data = json.load(f)

    quiz_sets = []
    for s in raw_data.get("quizSets", []):
        set_num = s.get("set")
        quiz_sets.append({
            "setId": f"set-{set_num}",
            "setName": f"Quiz Set {set_num}",
            "description": f"AI & Agentic Systems — Quiz Set {set_num} (25 Questions, 30 Mins)",
            "questions": s.get("questions", [])
        })

    js_content = f"// Generated from ai_agentic_systems_10_sets_requested_format.json\nconst QUIZ_SETS = {json.dumps(quiz_sets, indent=2)};\n"

    with open(JS_OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"Successfully generated {JS_OUTPUT_PATH} with {len(quiz_sets)} Quiz Sets and {sum(len(s['questions']) for s in quiz_sets)} total questions!")

if __name__ == "__main__":
    convert_json()

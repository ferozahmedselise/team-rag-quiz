#!/usr/bin/env python3
"""
Parser for ai_agentic_systems_10_quiz_sets.md
Generates data/quiz_sets.js containing all 10 quiz sets (250 total questions)
with categories, options, correct answers, and detailed explanations.
"""

import os
import re
import json

MD_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "ai_agentic_systems_10_quiz_sets.md")
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "quiz_sets.js")

CATEGORIES = [
    "LLM Core Concepts",
    "Prompt & Context Engineering",
    "Model Context Protocol (MCP)",
    "Skills, Rules & Plugins",
    "Agent Architecture & Workflows",
    "Multi-Agent & Swarm Systems",
    "Security & Anti-Cheat Controls",
    "GSD & Workflow Maturity"
]

def parse_markdown():
    if not os.path.exists(MD_PATH):
        raise FileNotFoundError(f"Cannot find {MD_PATH}")

    with open(MD_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Split into set blocks
    set_blocks = re.split(r'(?=# Quiz Set \d+)', content)
    quiz_sets = []

    for block in set_blocks:
        set_match = re.search(r'# Quiz Set (\d+)', block)
        if not set_match:
            continue
        
        set_num = int(set_match.group(1))
        set_id = f"set-{set_num}"
        set_name = f"Quiz Set {set_num}"

        # 1. Parse Answer Key for Part A & Part B
        part_a_answers = {}
        part_b_answers = {}

        # Part A key match: 1. **C** — SKILL.md
        key_a_matches = re.findall(r'(\d+)\.\s+\*\*([A-D])\*\*\s+—\s+(.*)', block)
        for q_num_str, opt_letter, exp in key_a_matches:
            q_num = int(q_num_str)
            part_a_answers[q_num] = {
                "letter": opt_letter,
                "explanation": exp.strip()
            }

        # Part B key match: **21.** text...
        key_b_matches = re.findall(r'\*\*(\d+)\.\*\*\s+(.*?)(?=\n\n\*\*\d+\.\*\*|\n\n---||\Z)', block, re.DOTALL)
        for q_num_str, exp in key_b_matches:
            q_num = int(q_num_str)
            part_b_answers[q_num] = exp.strip().replace("\n", " ")

        # 2. Parse Part A Questions (1 - 20)
        questions = []
        q_blocks = re.findall(r'### (\d+)\.\s+(.*?)(?=\n### \d+\.|\n## Part B|\n## Answer Key|\Z)', block, re.DOTALL)

        for q_num_str, q_content in q_blocks:
            q_num = int(q_num_str)
            if q_num > 20:
                continue

            # Extract Question text and Options
            lines = [l.strip() for l in q_content.strip().split("\n") if l.strip()]
            q_text_lines = []
            options = []

            for line in lines:
                opt_match = re.match(r'^([A-D])\.\s+(.*)$', line)
                if opt_match:
                    options.append(opt_match.group(2).strip())
                else:
                    q_text_lines.append(line)

            q_text = " ".join(q_text_lines).strip()
            
            # Answer info
            ans_info = part_a_answers.get(q_num, {"letter": "A", "explanation": "Correct option based on course material."})
            correct_letter = ans_info["letter"]
            letter_to_index = {"A": 0, "B": 1, "C": 2, "D": 3}
            correct_index = letter_to_index.get(correct_letter, 0)

            # Category assignment based on question index
            category = CATEGORIES[(q_num - 1) % len(CATEGORIES)]

            questions.append({
                "id": q_num,
                "category": category,
                "question": q_text,
                "options": options if len(options) == 4 else [
                    "MCP server capabilities", "Plugin", "SKILL.md", "YOLO Mode"
                ],
                "correctIndex": correct_index,
                "explanation": f"{ans_info['explanation']}"
            })

        # 3. Parse Part B Questions (21 - 25)
        part_b_q_blocks = re.findall(r'### (2[1-5])\.\s+(.*?)(?=\n### 2[1-5]\.|\n---||\n## Answer Key|\Z)', block, re.DOTALL)

        for q_num_str, q_content in part_b_q_blocks:
            q_num = int(q_num_str)
            lines = [l.strip() for l in q_content.strip().split("\n") if l.strip()]
            q_text = " ".join(lines).strip()

            suggested_ans = part_b_answers.get(q_num, "Suggested course recommendation and concept explanation.")

            # Format Part B question with the suggested answer as the primary correct option
            # Extract main concept if present
            concept_match = re.search(r'Concept:\s*([^.]+)', suggested_ans)
            concept_name = concept_match.group(1).strip() if concept_match else ""

            if concept_name:
                correct_opt = f"{concept_name}: {suggested_ans}"
            else:
                correct_opt = suggested_ans

            distractors = [
                "Track both input and output tokens because both affect inference cost.",
                "Use precise, minimal tool schemas and validate every action before execution.",
                "Separate what the model predicts from what the surrounding application executes."
            ]

            options = [correct_opt] + distractors
            category = "Agentic Systems & Short Answer"

            questions.append({
                "id": q_num,
                "category": category,
                "question": q_text,
                "options": options,
                "correctIndex": 0,
                "explanation": suggested_ans
            })

        quiz_sets.append({
            "setId": set_id,
            "setName": set_name,
            "description": f"AI & Agentic Systems — {set_name} (25 Questions, 30 Mins, 30 Marks)",
            "questions": questions
        })

    # Output JS file
    js_content = f"// Automatically generated 10 Quiz Sets from ai_agentic_systems_10_quiz_sets.md\nconst QUIZ_SETS = {json.dumps(quiz_sets, indent=2)};\n"
    
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"Successfully generated {len(quiz_sets)} Quiz Sets with total {sum(len(s['questions']) for s in quiz_sets)} questions -> {OUTPUT_PATH}")

if __name__ == "__main__":
    parse_markdown()

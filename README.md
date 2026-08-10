# AI & Agentic Systems Certification Quiz Platform

A high-performance, security-hardened web application designed to evaluate candidate proficiency in LLMs, Prompt Engineering, Context Engineering, Model Context Protocol (MCP), Claude Code, Agentic Workflows, and Multi-Agent Orchestration.

---

## 🌟 Key Features

- **Comprehensive Curriculum**: 25 high-quality technical multiple-choice questions per set across 10 curated question sets covering state-of-the-art AI topics.
- **Proctoring & Anti-Cheat Suite**:
  - Fullscreen enforcement during exams.
  - Tab-switching and window focus loss tracking with a 3-strike policy (auto-submits exam upon 3 strikes).
  - Interception of keyboard shortcuts (`Cmd/Ctrl+C`, `Cmd/Ctrl+V`, `Cmd/Ctrl+U`, `F12`, `Cmd/Ctrl+P`, etc.).
  - Right-click (`contextmenu`), text selection, copy/cut/paste, and drag-and-drop restrictions.
  - 30-minute exam timer countdown with visual progress indicator and auto-submission.
  - Fisher-Yates shuffle algorithm for question and option randomization.
- **Candidate Interface (`index.html`)**:
  - Account login and single/multi-attempt tracking.
  - Question grid navigation, review bookmarking, and flagging.
  - Instant score report, percentage breakdown, domain mastery matrix, and detailed explanation review.
- **Admin Dashboard (`admin.html`)**:
  - Secure admin authentication.
  - Participant management (add, search, filter, delete candidates).
  - Exam result auditing, candidate history inspection, and score clearing capabilities.
- **Zero-Dependency Backend**:
  - Built strictly using Python's standard library (`http.server`, `socketserver`, `sqlite3`). No third-party `pip` installations required.
  - Automatic JSON-to-SQLite database initialization and record migration.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Dark Glassmorphic UI Design), JavaScript (ES6+ Modular Scripts).
- **Backend**: Python 3.10+ (`http.server`, `socketserver`).
- **Database**: SQLite (`quiz.db`).
- **Deployment**: Ready for Docker, Heroku, Render, Railway, AWS, or local setup.

---

## 📁 Project Structure

```
├── index.html               # Candidate Quiz Portal
├── admin.html               # Administrator Management Dashboard
├── styles.css               # Unified Glassmorphic CSS Design System
├── main.py                  # Production entrypoint & server runner
├── server.py                # REST API endpoints & HTTP request handler
├── db.py                    # SQLite database persistence layer & migrations
├── Dockerfile               # Container definition
├── Procfile                 # Cloud deployment process file
├── requirements.txt         # Dependency specification (Zero external packages required)
├── users.json               # Seed participant user records
├── results.json             # Seed candidate exam result records
├── data/
│   ├── questions.js         # Primary question pool module
│   ├── quiz_sets.js         # Structured multi-set question datasets
│   ├── ai_agentic_systems_10_quiz_sets.md
│   └── ai_agentic_systems_10_sets_requested_format.json
├── js/
│   ├── app.js               # Quiz candidate UI logic, timer, and state machine
│   ├── admin.js             # Admin dashboard UI logic and API client
│   └── anti_cheat.js        # Browser security and anti-cheat event handlers
└── scripts/
    ├── parse_quiz_sets.py   # Utility script to parse markdown quiz sets
    └── convert_json_to_quiz_sets.py # JSON to JS data converter
```

---

## 🚀 Getting Started

### Prerequisites

- **Python**: Version 3.10 or higher installed.

### Environment Configuration

Create or update the `.env` file in the root directory (optional, defaults provided):

```env
PORT=8080
ADMIN_EMAIL=admin@teamrag.com
ADMIN_PASSWORD=1234
```

### Running Locally

1. Launch the server using `main.py`:

   ```bash
   python3 main.py
   ```

2. Open your web browser:
   - **Candidate Portal**: `http://localhost:8080/index.html`
   - **Admin Portal**: `http://localhost:8080/admin.html`

---

## 🐳 Docker Deployment

To build and run the application in a Docker container:

```bash
# Build Docker image
docker build -t ai-quiz-app .

# Run container on port 8080
docker run -p 8080:8080 --env-file .env ai-quiz-app
```

---

## 📡 REST API Reference

| Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/admin/login` | None | Authenticate admin credentials |
| `POST` | `/api/user/login` | None | Candidate login & retrieve past attempt history |
| `GET` | `/api/users` | Admin Token | Retrieve list of registered participants |
| `POST` | `/api/users` | Admin Token | Register a new participant |
| `DELETE` | `/api/users?id={id}` | Admin Token | Delete a registered participant |
| `GET` | `/api/results` | Admin Token | Retrieve all candidate exam results |
| `POST` | `/api/results` | None | Submit and persist candidate exam result |
| `DELETE` | `/api/results?id={id}` | Admin Token | Delete single exam result (or clear all if `id` omitted) |
| `GET` | `/api/user/results?email={email}` | None | Fetch attempt history for candidate |

---

## 📚 Curriculum Topics Covered

1. **LLM Fundamentals**: Model architecture, tokenization, context windows, temperature/top-p.
2. **Prompt Engineering**: System prompts, Chain-of-Thought (CoT), Few-Shot learning, ReAct patterns.
3. **Context Engineering**: RAG systems, vector embeddings, chunking strategies, sliding window context.
4. **Claude Code**: Tool execution, CLI agent workflows, security boundaries.
5. **Model Context Protocol (MCP)**: Server/client protocol, JSON-RPC schemas, tools, resources, prompts.
6. **Skills & Rules**: Declarative skills (`SKILL.md`), YAML frontmatter, rule scoping.
7. **Plugins & API Integration**: Custom tools, authentication state persistence.
8. **Multi-Agent Orchestration**: Agent teams, supervisor-worker hierarchy, subagent dispatching.
9. **AI Workflows**: Stateful graphs, human-in-the-loop patterns, error handling.

---

## 📄 License

This project is proprietary and intended for AI certification and assessment purposes.

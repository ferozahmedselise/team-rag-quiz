# Implementation Plan - AI & Agentic Systems Certification Quiz Page

Create a responsive, high-performance, security-hardened web application for a 25-question Multiple Choice Quiz (MCQ) covering LLMs, Prompt Engineering, Context Engineering, Claude Code, MCP, Skills, Plugins, Agent Teams, and AI Workflows.

## User Review Required

> [!IMPORTANT]
> **Anti-Cheat Enforcement**: The page includes strict browser-level security restrictions (disabled context menu, copy/cut/paste blocking, text selection blocking, tab-switch monitoring, full-screen enforcement with strike system).
> 
> **Passing Standard**: 80% (minimum 20 out of 25 correct answers required for a **PASS** certificate badge).

## Features & Architecture

### 1. Curriculum Coverage (25 High-Quality Technical MCQs)
- **LLM Fundamentals**: Transformer architecture basics, temperature/top-p, context windows, tokenization.
- **Prompt Engineering**: System prompts, Chain-of-Thought (CoT), Few-shot learning, ReAct pattern.
- **Context Engineering**: RAG, vector embeddings, chunking strategies, sliding window context.
- **Claude Code**: Tool use execution, agent CLI workflows, architecture, safety boundaries.
- **Model Context Protocol (MCP)**: Server/client spec, JSON-RPC schema, resources, tools, prompts.
- **Skills & Rules**: Declarative skills (`SKILL.md`), YAML frontmatter, rules scoping.
- **Plugins & API Integrations**: State persistence, authentication, custom tools.
- **Agent Teams & Multi-Agent**: Orchestration, subagent spawning, supervisor-worker hierarchy.
- **AI Workflows**: Stateful workflows, graph execution, human-in-the-loop patterns, error handling.

### 2. Browser Security & Anti-Cheat Controls
- **Event Locks**: Prevent `contextmenu`, `copy`, `cut`, `paste`, `selectstart`, `dragstart`.
- **Keyboard Protection**: Intercept and prevent shortcuts (`Cmd/Ctrl + C`, `Cmd/Ctrl + V`, `Cmd/Ctrl + U`, `Cmd/Ctrl + Shift + I`, `F12`, `Cmd/Ctrl + P`, `Cmd/Ctrl + S`).
- **CSS Selection Shielding**: `user-select: none; -webkit-user-select: none;` across all quiz components.
- **Proctoring / Security Suite**:
  - **Fullscreen Lock**: Candidate must enter fullscreen to launch exam. Exiting triggers warnings.
  - **Tab Switch / Focus Lost Detection**: Monitors `visibilitychange` & `blur` events with strike counter (3 strikes auto-submits).
  - **Timer Countdown**: 30-minute exam timer with visual progress bar and auto-submit on expiration.
  - **Randomization**: Shuffles questions and answer options upon initialization using Fisher-Yates algorithm.

### 3. User Interface & Experience (UI/UX)
- **Design System**: Premium dark-mode glassmorphic theme, glowing accents, modern typography.
- **Candidate Registration Screen**: Collects Name, Email, and Candidate ID before test start.
- **Exam Suite**:
  - Header: Timer display, strike indicator, question counter, progress bar.
  - Sidebar / Grid: Question quick-jump navigation grid showing answered, flagged, and current state.
  - Main Panel: Question text, option buttons, Flag for Review button, Previous/Next navigation.
- **Result Dashboard**:
  - Pass/Fail Badge (≥80% required for PASS).
  - Visual Score Wheel (Percentage & fraction out of 25).
  - Domain / Topic Breakdown.
  - Detailed Question Review with correct answer explanations.

## Proposed Files

```
quiz/
├── index.html           # Main Application Container & Semantic Structure
├── styles.css           # Glassmorphism Design System, Utilities, Animations & Anti-Select Rules
├── data/
│   └── questions.js     # 25 Detailed Technical Questions with Categories & Explanations
└── js/
    ├── anti_cheat.js    # Security Locks (Copy/Paste, Right-click, Shortcuts, Focus & Fullscreen)
    └── app.js           # Exam Engine, Timer, State Management, Scoring & Results UI
```

## Verification Plan

### Manual Verification
1. **Security Testing**:
   - Right-click on questions and options -> Verify context menu is blocked.
   - Highlight text with mouse / keyboard -> Verify text selection is disabled.
   - Attempt `Cmd+C`, `Cmd+V`, `Cmd+U`, `F12` -> Verify key events are intercepted.
   - Switch browser tab during active exam -> Verify warning notification appears and strike count increments.
   - Exit fullscreen mode -> Verify security warning modal appears.
2. **Exam Workflow & Scoring**:
   - Register candidate -> Launch test -> Verify questions and options are randomized.
   - Answer 25 questions -> Verify progress bar and question navigation grid update real-time.
   - Test Timer -> Verify warning when timer is low and auto-submit on 0.
   - Complete exam with ≥20 correct -> Confirm **PASS** badge (80%+).
   - Complete exam with <20 correct -> Confirm **FAIL** badge (<80%).
   - Review results -> Verify detailed answer explanations display correctly.

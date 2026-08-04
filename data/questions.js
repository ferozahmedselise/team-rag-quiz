const quizQuestions = [
  {
    id: 1,
    category: "LLM Core Concepts",
    question: "When configuring decoding parameters for a Large Language Model, how does reducing the 'temperature' parameter to 0.0 affect the model's output generation?",
    options: [
      "It restricts the model context window to essential system tokens by truncating low-frequency vocabulary items.",
      "It makes the generation deterministic by greedily selecting the token with the highest log probability at each step.",
      "It balances output randomness by dynamically scaling top-p nucleus thresholds based on prompt sentiment density.",
      "It forces the LLM to execute embedded Python tools automatically without emitting intermediate text tokens."
    ],
    correctIndex: 1,
    explanation: "Setting temperature to 0.0 converts token sampling into deterministic greedy decoding, selecting the highest-probability token at every step."
  },
  {
    id: 2,
    category: "LLM Core Concepts",
    question: "Because LLMs are stateless by nature, how do modern AI chat applications create the illusion of ongoing conversation memory?",
    options: [
      "The LLM dynamically updates its underlying neural weights during each inference turn to store recent user interactions.",
      "The application resends the accumulated conversation history within the context payload on every API request.",
      "The GPU server maintains persistent thread state pointers across active WebSocket connections in memory.",
      "The vector database automatically overwrites system prompt embeddings with recent user response tokens."
    ],
    correctIndex: 1,
    explanation: "LLMs are completely stateless; conversation memory is created by the host application appending past messages to the context sent with each new request."
  },
  {
    id: 3,
    category: "LLM Core Concepts",
    question: "According to the course curriculum, what is the modern and practical definition of an AI Agent?",
    options: [
      "A fine-tuned neural transformer optimized exclusively for zero-shot JSON schema generation and API parsing.",
      "An autonomous background thread that runs vector embedding semantic searches on local file systems.",
      "An LLM operating within a feedback loop that uses external tools iteratively to accomplish a specified goal.",
      "A static rule-based script that orchestrates sequential API calls without language model supervision."
    ],
    correctIndex: 2,
    explanation: "As defined in Week 1, an AI Agent is an LLM operating within a feedback loop, selecting and calling tools repeatedly until a designated objective is met."
  },
  {
    id: 4,
    category: "LLM Core Concepts",
    question: "When an LLM performs 'Tool Calling' during an interaction, which component is actually responsible for executing the requested tool (e.g. Python code or database query)?",
    options: [
      "The underlying LLM neural network executes the tool internally within specialized attention heads during inference.",
      "The application runtime surrounding the LLM executes the tool call and feeds the result back into context.",
      "The cloud GPU provider compiles and executes the tool payload automatically on isolated host hardware.",
      "The vector search database intercepts the function payload and executes the query directly in memory."
    ],
    correctIndex: 1,
    explanation: "The LLM only generates a structured request specifying which tool to invoke. The surrounding application executes the tool and passes the output back as context."
  },
  {
    id: 5,
    category: "Context Engineering",
    question: "How does Context Engineering differ from simple Prompt Engineering?",
    options: [
      "Context Engineering focuses exclusively on refining the phrasing and syntax of the final user message string.",
      "Context Engineering designs the complete input payload—system rules, tools, memory, history, and project files.",
      "Context Engineering is the process of fine-tuning base LLM weights using custom domain-specific datasets.",
      "Context Engineering relies on vector database chunking algorithms to bypass system prompt instructions."
    ],
    correctIndex: 1,
    explanation: "Context Engineering encompasses the entire holistic input payload sent to the LLM (system prompt, tools, project files like agents.md, past turns, and tool outputs)."
  },
  {
    id: 6,
    category: "Context Engineering",
    question: "Why should critical project rules and coding standards be saved in persistent instruction files (such as agents.md or CLAUDE.md) rather than relying on conversation history?",
    options: [
      "Conversation history is permanently purged from memory whenever the active context token count exceeds 4000 tokens.",
      "Conversation compacting is a lossy process that can drop crucial context, while persistent files are preserved.",
      "System prompts cannot parse inline Markdown syntax unless instructions are stored in external file repositories.",
      "Persistent files automatically compile instructions into binary C++ headers that speed up model inference times."
    ],
    correctIndex: 1,
    explanation: "Conversation summarization (compacting) frees up token space but is fundamentally lossy. Persistent files guarantee that core instructions are reliably included across all turns."
  },
  {
    id: 7,
    category: "Context Engineering",
    question: "What primary purpose do project instruction files like `agents.md`, `CLAUDE.md`, or `GEMINI.md` serve in coding agent environments?",
    options: [
      "They store secret API keys and OAuth tokens for authenticating remote tool calls securely.",
      "They provide persistent project guidelines, coding standards, and operational rules directly into agent context.",
      "They act as Git pre-commit hooks that automatically block pull requests with syntax errors.",
      "They cache vector embeddings locally to speed up semantic similarity searches during code builds."
    ],
    correctIndex: 1,
    explanation: "Files like `agents.md` or `CLAUDE.md` act as localized knowledge bases that give AI agents persistent project context, style guides, and operational rules."
  },
  {
    id: 8,
    category: "AI Workflows & Autonomy",
    question: "What does 'YOLO Mode' enable when activated in AI coding tools like Cursor or Claude Code?",
    options: [
      "It forces the agent to operate in read-only mode, preventing any filesystem edits without prior git commit.",
      "It bypasses manual user approval dialogs for tool execution, allowing autonomous coding and command runs.",
      "It routes all LLM prompts through local open-source models to reduce cloud API token costs.",
      "It enables multi-modal image generation directly inside the terminal interface during build cycles."
    ],
    correctIndex: 1,
    explanation: "YOLO Mode grants autonomous permission to the agent to run terminal commands, create files, and make edits without waiting for explicit manual confirmation at each step."
  },
  {
    id: 9,
    category: "AI Workflows & Autonomy",
    question: "What is a 'Ralph Loop' in the context of advanced agentic AI coding workflows?",
    options: [
      "A retry strategy that alternates API requests between competing model vendors when rate limits are hit.",
      "An autonomous loop where an agent repeatedly writes code, executes tests, inspects errors, and refactors.",
      "A context window compression technique that translates chat transcripts into dense binary vectors.",
      "A multi-agent supervisor pattern that delegates task execution exclusively to sandboxed subagents."
    ],
    correctIndex: 1,
    explanation: "Ralph Loops represent continuous autonomous execution loops where the coding agent iterates between coding, building, testing, and debugging without stopping."
  },
  {
    id: 10,
    category: "Vibe Engineering",
    question: "In Andrej Karpathy's principles for 'Vibe Coding', what is the recommended mindset for a developer leading an AI-assisted build?",
    options: [
      "Write 90% of implementation code manually and restrict AI agents strictly to generating inline comments.",
      "'Be the boss'—focus on specs, high-level architecture, and code reviews while letting agents implement.",
      "Allow AI agents to run without defining initial specs or inspecting diffs prior to production deployment.",
      "Rely exclusively on zero-shot single prompts without utilizing iterative feedback loops or agent tools."
    ],
    correctIndex: 1,
    explanation: "Vibe Engineering emphasizes acting as the tech lead/boss: defining specs, reviewing diffs, and orchestrating agents rather than getting bogged down in manual syntax writing."
  },
  {
    id: 11,
    category: "Claude Code CLI",
    question: "How do Sessions and Checkpoints in Claude Code help developers manage non-deterministic AI code changes?",
    options: [
      "They automatically merge unvetted feature branches directly into main production repositories.",
      "They allow developers to rewind and restore code states to safe prior checkpoints if an agent path strays.",
      "They encrypt local source files using RSA keys to prevent unauthorized modifications by external subagents.",
      "They upload full workspace snapshots to public cloud registries for real-time model benchmark evaluation."
    ],
    correctIndex: 1,
    explanation: "Checkpoints in Claude Code snapshot repo states, providing a safety net to rewind or compare agent changes whenever an autonomous path strays."
  },
  {
    id: 12,
    category: "Model Context Protocol (MCP)",
    question: "What are the three core architectural entities defined in the Model Context Protocol (MCP) specification?",
    options: [
      "Producer, Consumer, and Broker",
      "Host, Client, and Server",
      "Master, Worker, and Controller",
      "Provider, Gateway, and Inspector"
    ],
    correctIndex: 1,
    explanation: "MCP defines Hosts (the application like Claude Code/Cursor), Clients (protocols inside host maintaining 1-to-1 connections), and Servers (external services providing tools/resources)."
  },
  {
    id: 13,
    category: "Building Blocks: Skills vs MCP vs Plugins",
    question: "When comparing the building blocks of Claude Code, what distinguishes a 'Custom Skill' from an 'MCP Server'?",
    options: [
      "Skills are compiled C++ binary plugins, whereas MCP servers are plain text prompt instructions.",
      "Skills are lightweight prompt/YAML instructions; MCP servers are protocol services offering tools and resources.",
      "Skills only execute on remote cloud servers, whereas MCP servers run strictly inside local browser memory.",
      "Skills manage git branch workflows, whereas MCP servers generate vector embeddings for semantic search."
    ],
    correctIndex: 1,
    explanation: "Skills provide lightweight declarative prompt instructions (`SKILL.md`), whereas MCP is an open standard protocol connecting host clients to structured external tool servers via JSON-RPC."
  },
  {
    id: 14,
    category: "MCP Workflows",
    question: "How can integrating a Jira MCP Server and a GitHub MCP Server into Claude Code transform a developer's feature workflow?",
    options: [
      "It restricts Claude Code to executing terminal commands without accessing external issue tracking systems.",
      "It enables Claude Code to autonomously read tickets, implement features, run tests, and open Pull Requests.",
      "It converts GitHub repositories into static documentation sites hosted on remote MCP cloud gateways.",
      "It replaces git version control history with automated Jira issue comment updates on every build."
    ],
    correctIndex: 1,
    explanation: "By connecting Jira MCP and GitHub MCP servers, Claude Code can bridge task management and version control directly in an autonomous workflow loop."
  },
  {
    id: 15,
    category: "Claude Code Plugins",
    question: "What role do Claude Code Plugins play in expanding developer capabilities?",
    options: [
      "They allow installing pre-packaged extension bundles and developer tools directly from marketplaces.",
      "They fine-tune model weights locally to customize coding style preferences without system prompts.",
      "They restrict terminal access to sandboxed read-only commands to prevent accidental filesystem edits.",
      "They format raw Markdown files into binary executive summaries for project stakeholders."
    ],
    correctIndex: 0,
    explanation: "Plugins serve as packaged extension modules that developers can discover and install from marketplaces to add specialized workflows and tools to Claude Code."
  },
  {
    id: 16,
    category: "Sub-Agents vs Agent Teams",
    question: "What is the structural difference between a 'Sub-Agent' and an 'Agent Team' in multi-agent Claude Code architectures?",
    options: [
      "Sub-Agents are child tasks run within an isolated context; Agent Teams are independent coordinated agents.",
      "Sub-Agents run exclusively on local host CPUs, whereas Agent Teams require dedicated cloud hardware GPU clusters.",
      "Sub-Agents manage git commit histories, whereas Agent Teams handle vector database indexing and search.",
      "Sub-Agents execute single-turn user prompts, whereas Agent Teams operate without access to external tools."
    ],
    correctIndex: 0,
    explanation: "Sub-Agents perform isolated delegated tasks under a main parent agent, whereas Agent Teams (swarms) feature peer or supervisory agents operating collaboratively."
  },
  {
    id: 17,
    category: "Custom Slash Commands",
    question: "What is the primary benefit of defining Custom Slash Commands in agent environments?",
    options: [
      "They provide UI shortcuts (e.g., `/goal`) to trigger complex prompt templates and automated workflows.",
      "They bypass LLM inference layers to execute terminal shell scripts with native C performance speeds.",
      "They automatically compress chat transcripts to fit within small 2048-token model context windows.",
      "They enforce strict OAuth2 authentication protocols before any tool call can be executed by agents."
    ],
    correctIndex: 0,
    explanation: "Custom slash commands act as developer shortcuts, triggering pre-configured workflows, templates, or agent modes with simple prompt triggers."
  },
  {
    id: 18,
    category: "Claude Code Pro: Hooks",
    question: "In Claude Code, what is the function of 'Hooks'?",
    options: [
      "They are UI widgets that render interactive buttons and text fields inside the terminal output window.",
      "They are event-driven scripts triggered before or after agent actions to enforce formatting and checks.",
      "They are encryption algorithms that protect API key secrets from appearing in transcript log files.",
      "They are background threads that index local source code files into vector search databases."
    ],
    correctIndex: 1,
    explanation: "Hooks provide event hooks (pre/post execution callbacks) to enforce formatting, security policies, tests, or notifications around agent operations."
  },
  {
    id: 19,
    category: "Sandboxing & Sprites.dev",
    question: "Why are remote cloud sandboxes (e.g. Sprites.dev or cloud environments) used when running autonomous Claude Code agents in YOLO Mode?",
    options: [
      "To increase GPU inference speeds by running LLM token generation directly inside browser memory.",
      "To isolate execution, protecting the local machine while enabling full cloud-based builds and PRs.",
      "To prevent agents from using terminal shell commands during autonomous code generation loops.",
      "To automatically convert Next.js web applications into containerized Docker microservice images."
    ],
    correctIndex: 1,
    explanation: "Cloud sandboxes isolate autonomous agent execution inside disposable, secure cloud environments, shielding local development machines while enabling full compute capabilities."
  },
  {
    id: 20,
    category: "Remote Execution",
    question: "Which of the following is NOT one of the ways to run Claude Code remotely as covered in the course?",
    options: [
      "Web interfaces and cloud sandboxes (e.g. Sprites.dev)",
      "Mobile device integrations and webhook triggers",
      "Direct neural brain-computer hardware implants",
      "GitHub Actions automated remote PR pipelines"
    ],
    correctIndex: 2,
    explanation: "Claude Code can be driven via Web, Mobile, Cloud Sandboxes, and GitHub integrations; neural implants are sci-fi."
  },
  {
    id: 21,
    category: "Claude Agent SDK",
    question: "What capability does the Claude Agent SDK provide to software engineers?",
    options: [
      "It provides a hardware dongle for offline LLM model inference without internet connections.",
      "It enables programmatically instantiating and controlling Claude Code agents within custom code.",
      "It automatically translates legacy Python source code into modern TypeScript framework modules.",
      "It replaces vector database embedding models with lightweight key-value local file stores."
    ],
    correctIndex: 1,
    explanation: "The Claude Agent SDK enables programmatic control over Claude Code agents within custom scripts, backend pipelines, and automated applications."
  },
  {
    id: 22,
    category: "GSD (Spec-Driven Development)",
    question: "What does GSD ('Getting Shit Done') represent in multi-agent engineering workflows?",
    options: [
      "A spec-driven framework where structured design documents guide multi-agent teams through execution.",
      "A context compression algorithm that removes whitespace and comments from agent prompt payloads.",
      "A Git branching strategy that automatically merges feature code without pull request reviews.",
      "A security protocol that encrypts JSON-RPC tool call parameters between hosts and MCP servers."
    ],
    correctIndex: 0,
    explanation: "GSD pairs Spec-Driven Design with multi-agent orchestration, ensuring agents build complex features strictly following structured specifications."
  },
  {
    id: 23,
    category: "Gastown & Swarm Orchestration",
    question: "What is 'Gastown' as introduced in Week 3 of the course curriculum?",
    options: [
      "A high-performance vector database designed for indexing large-scale enterprise code repositories.",
      "A multi-agent orchestrator managing swarms of parallel agents working concurrently on complex builds.",
      "A web-based IDE that replaces VS Code for editing system instruction files like agents.md.",
      "A deployment platform that containerizes Python FastAPI backends into serverless cloud functions."
    ],
    correctIndex: 1,
    explanation: "Gastown is a swarm orchestrator designed to run multiple Claude Code agents in parallel ('Parallel Polecats'), coordinating large-scale concurrent development."
  },
  {
    id: 24,
    category: "Multi-Agent Orchestrators Comparison",
    question: "When comparing Gastown, Claude Agent Teams, and GSD, how do their primary focus areas differ?",
    options: [
      "Gastown handles vector embeddings; Agent Teams handle terminal execution; GSD handles Git merges.",
      "Gastown focuses on parallel swarms; Agent Teams focus on team structure; GSD focuses on spec design.",
      "Gastown runs on cloud servers; Agent Teams run on mobile devices; GSD runs in local browsers.",
      "Gastown manages MCP servers; Agent Teams manage custom skills; GSD manages extension plugins."
    ],
    correctIndex: 1,
    explanation: "The course compares Gastown (swarm parallelism), Claude Agent Teams (team hierarchy/collaboration), and GSD (specification-first multi-agent execution)."
  },
  {
    id: 25,
    category: "Open Source Models & OpenRouter",
    question: "Why do developers use OpenCode or OpenRouter configurations alongside tools like Claude Code?",
    options: [
      "To force all AI agent operations to run offline without accessing external web search APIs.",
      "To leverage open models or route dynamically across multiple providers for cost efficiency.",
      "To automatically convert system prompt Markdown files into compiled JSON configuration schemas.",
      "To bypass browser-level proctoring controls during automated code evaluation and benchmark tests."
    ],
    correctIndex: 1,
    explanation: "OpenRouter and tools like OpenCode allow developers to switch models flexibly (including open/free models like GLM 4.7 or local Ollama), optimizing costs and model selection."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { quizQuestions };
}

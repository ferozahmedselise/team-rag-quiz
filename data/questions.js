const quizQuestions = [
  {
    id: 1,
    category: "LLM Core Concepts",
    question: "Because LLMs are stateless by nature, how do modern AI chat applications create the illusion of ongoing conversation memory?",
    options: [
      "The LLM updates its internal transformer weights after every user message.",
      "The application resends the entire conversation history (context) with every request.",
      "The LLM stores user chats in a temporary browser cookie cache.",
      "The GPU memory holds constant active pointers to previous user threads."
    ],
    correctIndex: 1,
    explanation: "LLMs are completely stateless; conversation memory is created by the host application appending past messages to the context sent with each new request."
  },
  {
    id: 2,
    category: "LLM Core Concepts",
    question: "According to the course curriculum, what is the modern and practical definition of an AI Agent?",
    options: [
      "A fine-tuned neural network that generates images from text.",
      "An LLM that uses tools in a loop to achieve a goal.",
      "A static Python script that parses raw JSON files.",
      "A vector database that indexes local PDF documents."
    ],
    correctIndex: 1,
    explanation: "As defined in Week 1, an AI Agent is an LLM operating within a feedback loop, selecting and calling tools repeatedly until a designated objective is met."
  },
  {
    id: 3,
    category: "LLM Core Concepts",
    question: "When an LLM performs 'Tool Calling' during an interaction, which component is actually responsible for executing the requested tool (e.g. Python code or database query)?",
    options: [
      "The LLM neural network itself executes the code directly inside its layers.",
      "The application runtime hosting the LLM executes the tool and returns the observation back to the LLM.",
      "The API provider automatically compiles the code on a GPU cluster.",
      "The user must manually copy and paste the tool output into the chat."
    ],
    correctIndex: 1,
    explanation: "The LLM only generates a structured request (JSON/string) specifying which tool to invoke. The surrounding application executes the tool and passes the output back as context."
  },
  {
    id: 4,
    category: "Context Engineering",
    question: "How does Context Engineering differ from simple Prompt Engineering?",
    options: [
      "Context Engineering focuses on writing longer single-shot user prompts.",
      "Context Engineering designs the complete input structure—including system instructions, tool definitions, memory, history, and project files—not just the prompt string.",
      "Context Engineering requires fine-tuning model weights using PyTorch.",
      "Prompt Engineering is exclusively used for image generation models like Midjourney."
    ],
    correctIndex: 1,
    explanation: "Context Engineering encompasses the entire holistic input payload sent to the LLM (system prompt, tools, project files like agents.md, past turns, and tool outputs)."
  },
  {
    id: 5,
    category: "Context Engineering",
    question: "Why should critical project rules and coding standards be saved in persistent instruction files (such as agents.md or CLAUDE.md) rather than relying on conversation history?",
    options: [
      "Conversation history is deleted automatically every 5 minutes by the LLM vendor.",
      "Conversation compacting/summarization is a lossy process that can drop details over long sessions, whereas persistent files remain intact.",
      "LLMs cannot read system prompts when context windows exceed 4000 tokens.",
      "Persistent files compress code files into binary zip archives automatically."
    ],
    correctIndex: 1,
    explanation: "Conversation summarization (compacting) frees up token space but is fundamentally lossy. Persistent files guarantee that core instructions are reliably included across all turns."
  },
  {
    id: 6,
    category: "Context Engineering",
    question: "What primary purpose do project instruction files like `agents.md`, `CLAUDE.md`, or `GEMINI.md` serve in coding agent environments?",
    options: [
      "They store third-party API secret keys in plain text.",
      "They store persistent coding standards, project architecture guidelines, and build instructions for AI agents.",
      "They replace Git commit messages during automated pull requests.",
      "They compile JavaScript source code into native binary executables."
    ],
    correctIndex: 1,
    explanation: "Files like `agents.md` or `CLAUDE.md` act as localized knowledge bases that give AI agents persistent project context, style guides, and operational rules."
  },
  {
    id: 7,
    category: "AI Workflows & Autonomy",
    question: "What does 'YOLO Mode' enable when activated in AI coding tools like Cursor or Claude Code?",
    options: [
      "It restricts the agent to read-only file viewing.",
      "It bypasses manual user approval prompts for tool and file execution, allowing the agent to code autonomously.",
      "It limits the model to using 100 tokens per response.",
      "It forces the agent to submit all changes to a public branch without local testing."
    ],
    correctIndex: 1,
    explanation: "YOLO Mode grants autonomous permission to the agent to run terminal commands, create files, and make edits without waiting for explicit manual confirmation at each step."
  },
  {
    id: 8,
    category: "AI Workflows & Autonomy",
    question: "What is a 'Ralph Loop' in the context of advanced agentic AI coding workflows?",
    options: [
      "A hardware watchdog timer that reboots the developer's computer on error.",
      "An autonomous feedback loop where an agent continuously writes code, runs tests, inspects failures, and refactors on autopilot until all tasks pass.",
      "A method for compressing JPEG images inside system prompts.",
      "A database indexing algorithm used by vector stores."
    ],
    correctIndex: 1,
    explanation: "Ralph Loops represent continuous autonomous execution loops where the coding agent iterates between coding, building, testing, and debugging without stopping."
  },
  {
    id: 9,
    category: "Vibe Engineering",
    question: "In Andrej Karpathy's principles for 'Vibe Coding', what is the recommended mindset for a developer leading an AI-assisted build?",
    options: [
      "Manually write 90% of the syntax and use AI only for code comments.",
      "'Be the boss'—focus on high-level architecture, clear spec requirements, and code reviews while letting the AI handle implementation.",
      "Never inspect or test code produced by AI agents.",
      "Use only one model and avoid cross-model collaboration."
    ],
    correctIndex: 1,
    explanation: "Vibe Engineering emphasizes acting as the tech lead/boss: defining specs, reviewing diffs, and orchestrating agents rather than getting bogged down in manual syntax writing."
  },
  {
    id: 10,
    category: "Claude Code CLI",
    question: "How do Sessions and Checkpoints in Claude Code help developers manage non-deterministic AI code changes?",
    options: [
      "They automatically encrypt all source code files.",
      "They allow developers to rewind and restore code states to previous safe checkpoints if an agent path hallucinates or fails.",
      "They lock the repository so no further edits can be made.",
      "They send automated bug reports to external cloud loggers."
    ],
    correctIndex: 1,
    explanation: "Checkpoints in Claude Code snapshot repo states, providing a safety net to rewind or compare agent changes whenever an autonomous path strays."
  },
  {
    id: 11,
    category: "Model Context Protocol (MCP)",
    question: "What are the three core architectural entities defined in the Model Context Protocol (MCP) specification?",
    options: [
      "Producer, Consumer, Broker",
      "Host, Client, and Server",
      "Master, Slave, Controller",
      "Frontend, Backend, Database"
    ],
    correctIndex: 1,
    explanation: "MCP defines Hosts (the application like Claude Code/Cursor), Clients (protocols inside host maintaining 1-to-1 connections), and Servers (external services providing tools/resources)."
  },
  {
    id: 12,
    category: "Building Blocks: Skills vs MCP vs Plugins",
    question: "When comparing the building blocks of Claude Code, what distinguishes a 'Custom Skill' from an 'MCP Server'?",
    options: [
      "Skills are lightweight, prompt-driven capability additions defined in markdown/YAML; MCP servers are full protocol-compliant services providing standardized JSON-RPC tools and resources.",
      "MCP servers only run on mobile phones, while Skills run on GPUs.",
      "Skills require complex C++ compilation, while MCP uses plain text files.",
      "There is no difference; Skills and MCP are identical terms."
    ],
    correctIndex: 0,
    explanation: "Skills provide lightweight declarative prompt instructions (`SKILL.md`), whereas MCP is an open standard protocol connecting host clients to structured external tool servers via JSON-RPC."
  },
  {
    id: 13,
    category: "MCP Workflows",
    question: "How can integrating a Jira MCP Server and a GitHub MCP Server into Claude Code transform a developer's feature workflow?",
    options: [
      "It replaces Git with a custom database.",
      "It allows Claude Code to autonomously read a Jira ticket issue, write the full codebase feature, run tests, and open a GitHub Pull Request end-to-end.",
      "It prevents Claude Code from running terminal commands.",
      "It automatically converts Jira tickets into video presentations."
    ],
    correctIndex: 1,
    explanation: "By connecting Jira MCP and GitHub MCP servers, Claude Code can bridge task management and version control directly in an autonomous workflow loop."
  },
  {
    id: 14,
    category: "Claude Code Plugins",
    question: "What role do Claude Code Plugins play in expanding developer capabilities?",
    options: [
      "They allow installing pre-packaged extension bundles and featured developer tools directly from marketplaces.",
      "They restrict the CLI from accessing the local filesystem.",
      "They force all LLM inferences to run on local CPU threads.",
      "They convert TypeScript files into Python scripts."
    ],
    correctIndex: 0,
    explanation: "Plugins serve as packaged extension modules that developers can discover and install from marketplaces to add specialized workflows and tools to Claude Code."
  },
  {
    id: 15,
    category: "Sub-Agents vs Agent Teams",
    question: "What is the structural difference between a 'Sub-Agent' and an 'Agent Team' in multi-agent Claude Code architectures?",
    options: [
      "Sub-Agents are child tasks managed within a primary agent's context boundary; Agent Teams/Swarms consist of independent, coordinated agents communicating across a network or shared protocol.",
      "Agent Teams can only run offline, whereas Sub-Agents require internet access.",
      "Sub-Agents are written in HTML, whereas Agent Teams use Docker containers.",
      "Sub-Agents do not support tool calling."
    ],
    correctIndex: 0,
    explanation: "Sub-Agents perform isolated delegated tasks under a main parent agent, whereas Agent Teams (swarms) feature peer or supervisory agents operating collaboratively."
  },
  {
    id: 16,
    category: "Custom Slash Commands",
    question: "What is the primary benefit of defining Custom Slash Commands in agent environments?",
    options: [
      "They allow user-facing UI shortcuts (e.g. `/goal`, `/schedule`) to trigger repeatable, complex prompt templates and agent workflows effortlessly.",
      "They increase network upload speeds by 200%.",
      "They prevent agents from generating markdown tables.",
      "They compress vector embeddings into SQLite databases."
    ],
    correctIndex: 0,
    explanation: "Custom slash commands act as developer shortcuts, triggering pre-configured workflows, templates, or agent modes with simple prompt triggers."
  },
  {
    id: 17,
    category: "Claude Code Pro: Hooks",
    question: "In Claude Code, what is the function of 'Hooks'?",
    options: [
      "They render React component buttons in the browser.",
      "They are event-driven scripts triggered automatically before or after specific agent actions (e.g. pre-commit checks, auto-formatting, linting).",
      "They store user passwords in plain text.",
      "They uninstall unused NPM packages automatically."
    ],
    correctIndex: 1,
    explanation: "Hooks provide event hooks (pre/post execution callbacks) to enforce formatting, security policies, tests, or notifications around agent operations."
  },
  {
    id: 18,
    category: "Sandboxing & Remote Execution",
    question: "Why are remote cloud sandboxes (e.g. Sprites.dev or cloud environments) used when running autonomous Claude Code agents in YOLO Mode?",
    options: [
      "To prevent local host system pollution, isolate untrusted execution, and allow full cloud-based PR builds without risking local machine files.",
      "To slow down the agent so human operators can read every token.",
      "Because Claude Code cannot run on macOS or Linux locally.",
      "To bypass GitHub security branch protections."
    ],
    correctIndex: 0,
    explanation: "Cloud sandboxes isolate autonomous agent execution inside disposable, secure cloud environments, shielding local development machines while enabling full compute capabilities."
  },
  {
    id: 19,
    category: "Remote Execution",
    question: "Which of the following is NOT one of the ways to run Claude Code remotely as covered in the course?",
    options: [
      "Web interface / Cloud sandboxes (e.g. Sprites.dev)",
      "Mobile device integration & messaging webhooks",
      "GitHub Actions remote PR automation",
      "Direct neural brain-computer hardware implants"
    ],
    correctIndex: 3,
    explanation: "Claude Code can be driven via Web, Mobile, Cloud Sandboxes, and GitHub integrations; neural implants are sci-fi."
  },
  {
    id: 20,
    category: "Claude Agent SDK",
    question: "What capability does the Claude Agent SDK provide to software engineers?",
    options: [
      "It allows developers to programmatically instantiate, control, and drive Claude Code agents directly from custom backend application code.",
      "It provides a physical USB dongle for offline LLM execution.",
      "It automatically translates Python code into COBOL.",
      "It replaces standard CSS stylesheets with Tailwind utilities."
    ],
    correctIndex: 0,
    explanation: "The Claude Agent SDK enables programmatic control over Claude Code agents within custom scripts, backend pipelines, and automated applications."
  },
  {
    id: 21,
    category: "GSD (Spec-Driven Development)",
    question: "What does GSD ('Getting Shit Done') represent in multi-agent engineering workflows?",
    options: [
      "A spec-driven development methodology where detailed specification documents guide multi-agent teams through systematic scaffolding, execution, and verification.",
      "A tool for deleting git branches without merge reviews.",
      "A compression library for vector databases.",
      "A proprietary compiler for Next.js applications."
    ],
    correctIndex: 0,
    explanation: "GSD pairs Spec-Driven Design with multi-agent orchestration, ensuring agents build complex features strictly following structured specifications."
  },
  {
    id: 22,
    category: "Gastown & Swarm Orchestration",
    question: "What is 'Gastown' as introduced in Week 3 of the course curriculum?",
    options: [
      "A cloud database for storing image thumbnails.",
      "A multi-agent orchestrator capable of managing swarms of parallel Claude Code agents ('Parallel Polecats') working simultaneously on complex tasks.",
      "A CSS library for styling dark mode dashboards.",
      "An open-source alternative to Python's virtual environments."
    ],
    correctIndex: 1,
    explanation: "Gastown is a swarm orchestrator designed to run multiple Claude Code agents in parallel ('Parallel Polecats'), coordinating large-scale concurrent development."
  },
  {
    id: 23,
    category: "Multi-Agent Orchestrators Comparison",
    question: "When comparing Gastown, Claude Agent Teams, and GSD, how do their primary focus areas differ?",
    options: [
      "Gastown focuses on parallel swarm orchestration; Claude Agent Teams focus on structured team collaboration; GSD focuses on spec-driven design execution.",
      "Gastown only works on mobile phones; GSD only works in Docker; Agent Teams are single-threaded.",
      "All three orchestrators are identical in function and syntax.",
      "GSD replaces Git, Gastown replaces Node.js, and Agent Teams replace Python."
    ],
    correctIndex: 0,
    explanation: "The course compares Gastown (swarm parallelism), Claude Agent Teams (team hierarchy/collaboration), and GSD (specification-first multi-agent execution)."
  },
  {
    id: 24,
    category: "Open Source Models & OpenRouter",
    question: "Why do developers use OpenCode or OpenRouter configurations alongside tools like Claude Code?",
    options: [
      "To leverage open models (e.g. GLM 4.7, Ollama) or route dynamically across multiple model providers for cost efficiency and redundancy.",
      "To force all AI tools to run without internet access.",
      "To convert SQL databases into MongoDB collections.",
      "To bypass local filesystem permission dialogs automatically."
    ],
    correctIndex: 0,
    explanation: "OpenRouter and tools like OpenCode allow developers to switch models flexibly (including open/free models like GLM 4.7 or local Ollama), optimizing costs and model selection."
  },
  {
    id: 25,
    category: "Personal AI Sidekicks: OpenClaw",
    question: "What function does an application like OpenClaw fulfill as demonstrated in Week 3?",
    options: [
      "It acts as a personal AI sidekick accessible via messaging platforms like Telegram or WhatsApp to perform agentic tasks remotely.",
      "It compiles Rust code into WebAssembly packages.",
      "It audits local Docker containers for open ports.",
      "It generates random passwords for Wi-Fi networks."
    ],
    correctIndex: 0,
    explanation: "OpenClaw provides a personal AI assistant bridge integrated with messaging channels (Telegram/WhatsApp), letting users trigger agent workflows on the go."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { quizQuestions };
}

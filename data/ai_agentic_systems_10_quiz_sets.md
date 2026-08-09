# AI & Agentic Systems — 10 Quiz Sets

**Source:** AI & Agentic Systems — English Speaker Notes

Each set is designed for approximately **30 minutes**.

- **Questions per set:** 25
- **Multiple-choice questions:** 20 × 1 mark
- **Short-answer questions:** 5 × 2 marks
- **Total marks per set:** 30

---

# Quiz Set 1

**Suggested time:** 30 minutes  
**Total marks:** 30

## Part A — Multiple Choice

Choose the best answer. Each question carries **1 mark**.

### 1. Which concept is best described as: **The core Skill file containing YAML frontmatter for discovery and Markdown instructions for execution.**

A. MCP server capabilities
B. Plugin
C. SKILL.md
D. YOLO Mode

### 2. Which concept is demonstrated in this situation?

> An agent runs shell commands inside a disposable micro-VM with temporary storage and limited credentials.

A. Programmatic approval policy
B. Sandbox
C. Slash commands
D. Gastown Polecats

### 3. Which concept is best described as: **The progression from tightly controlled AI assistance to more autonomous, tested, and coordinated workflows.**

A. Workflow maturity
B. Plan, Execute, Review, Test
C. MCP host-client-server structure
D. Custom Skill

### 4. Which concept is demonstrated in this situation?

> After a database query runs, the returned rows are added to the next model request.

A. GPT versus ChatGPT
B. Tool result feedback
C. Reasoning workflow
D. Token budget

### 5. Which action best follows the course guidance for **ReAct pattern**?

A. Track both input and output tokens because both affect inference cost and latency.
B. Separate what the model predicts from what the surrounding application executes or stores.
C. Use precise, minimal tool schemas and validate every requested action before execution.
D. Define goals, available tools, observation steps, and safe stopping conditions.

### 6. Which statement best defines **Compacting**?

A. Condensing older conversation history into a summary so a long session can continue within the context window.
B. The tendency for important information buried in the middle of long context to be recalled less reliably.
C. Repository files such as AGENTS.md or CLAUDE.md that contain durable project-specific rules.
D. Relevant information receives less effective focus because it competes with excessive irrelevant context.

### 7. Which concept is best described as: **The unavoidable risk that compacting removes fine details while keeping only major points.**

A. Context ordering
B. Project instruction files
C. Lossy summarization
D. Lost in the Middle

### 8. Which action best follows the course guidance for **GSD**?

A. Implement approval policies, event listeners, and allowed tools in application code.
B. Use precise specs to shift human effort toward engineering leadership and review.
C. Start by improving context relevance, structure, persistence, and ordering.
D. Use least privilege, disposable environments, and reviewable outputs for autonomous execution.

### 9. Which concept is best described as: **Rules that end an agent loop when the goal is met, a limit is reached, or continuation is unsafe.**

A. Tool Calling
B. Autoregressive loop
C. Stop conditions
D. Persistent memory layer

### 10. Which concept is best described as: **Reusable command shortcuts that trigger predefined agent workflows.**

A. Slash commands
B. Clean worker context
C. Reviewable diff
D. Swarm or Agent Team

### 11. Which action best follows the course guidance for **Next-token prediction**?

A. Return clear, structured tool results that the model can interpret reliably.
B. Track both input and output tokens because both affect inference cost and latency.
C. Set iteration limits, time or token budgets, approval gates, and explicit success criteria.
D. Explain the model as a statistical next-token predictor rather than as a fact database.

### 12. Which action best follows the course guidance for **MCP host-client-server structure**?

A. Use Plugins to distribute consistent team workflows and policies.
B. Design integrations once so multiple MCP-aware hosts can reuse them.
C. Pair repeated improvement with limits and objective evaluation criteria.
D. Use only with strong specs, tests, least privilege, Sandboxing, and reviewable output.

### 13. Which concept is demonstrated in this situation?

> An agent is allowed to make broad changes and run commands without requesting confirmation at every step.

A. MCP server capabilities
B. YOLO Mode
C. Ralph Loops
D. Plan, Execute, Review, Test

### 14. Which concept is best described as: **A model processing unit that may be a word, sub-word, punctuation mark, whitespace, or character chunk.**

A. ReAct pattern
B. Token
C. Brain, Memory, Tools, and Loop
D. Reasoning workflow

### 15. Which concept is demonstrated in this situation?

> A team improves results by fixing project instructions and retrieved evidence rather than adding prompt tricks.

A. Sub-Agent
B. Gastown Polecats
C. Reviewable diff
D. Context-first best practice

### 16. Which action best follows the course guidance for **Prompt Engineering**?

A. Place critical instructions near the beginning or end and reduce irrelevant content.
B. Inject only state that is current, relevant, and safe to expose.
C. Use clear prompts, but support them with relevant memory, tools, files, and system instructions.
D. Treat the window as a constrained budget and prioritize signal over volume.

### 17. Which concept is best described as: **Earlier user and assistant turns included in the current context to maintain continuity.**

A. AGENTS.md rules
B. Conversation History
C. Attention dilution
D. Context pruning

### 18. Which concept is best described as: **A modular package of reusable procedural guidance, scripts, references, and examples for an agent.**

A. Custom Skill
B. Model Context Protocol
C. MCP host-client-server structure
D. Lazy Skill loading

### 19. Which concept is best described as: **A visible set of proposed changes that a human can inspect before merging or deployment.**

A. Sandbox
B. GSD
C. Reviewable diff
D. Gastown Polecats

### 20. Which concept is demonstrated in this situation?

> The model sees JSON definitions for search, database access, and code execution.

A. Attention dilution
B. Tool Definitions
C. Conversation History
D. Context Window

## Part B — Short Answer

Answer briefly but clearly. Each question carries **2 marks**.

### 21. Explain **Tool Calling** and state one practical reason it matters in an AI workflow.

### 22. Read the situation and identify the main concept. Then give one recommended action.

> A user pastes many files, tool schemas, and chat messages, leaving less room for the answer.

### 23. Read the situation and identify the main concept. Then give one recommended action.

> The same model family is wrapped with file handling, web search, user accounts, and conversation history.

### 24. Compare **Context Window** and **Token budget**. Give one clear difference.

### 25. Compare **ReAct pattern** and **Reasoning workflow**. Give one clear difference.

---

## Answer Key — Set 1

### Part A

1. **C** — SKILL.md
2. **B** — Sandbox
3. **A** — Workflow maturity
4. **B** — Tool result feedback
5. **D** — ReAct pattern
6. **A** — Compacting
7. **C** — Lossy summarization
8. **B** — GSD
9. **C** — Stop conditions
10. **A** — Slash commands
11. **D** — Next-token prediction
12. **B** — MCP host-client-server structure
13. **B** — YOLO Mode
14. **B** — Token
15. **D** — Context-first best practice
16. **C** — Prompt Engineering
17. **B** — Conversation History
18. **A** — Custom Skill
19. **C** — Reviewable diff
20. **B** — Tool Definitions

### Part B — Suggested Answers

**21.** The model emits a structured request for an external function instead of executing that function itself. Practical importance: Use precise, minimal tool schemas and validate every requested action before execution.

**22.** Concept: Token budget. Recommended action: Include only material that is relevant to the task and remove unnecessary payload.

**23.** Concept: GPT versus ChatGPT. Recommended action: Separate what the model predicts from what the surrounding application executes or stores.

**24.** Context Window: The maximum number of tokens a model can process within one request. Token budget: The finite amount of context and generated output that can fit within the model's token limits.

**25.** ReAct pattern: An agent loop that combines reasoning and acting through Think, Act, Observe, and Repeat. Reasoning workflow: A structured process that gives the model room to plan, decompose, check, and verify complex work.

---

# Quiz Set 2

**Suggested time:** 30 minutes  
**Total marks:** 30

## Part A — Multiple Choice

Choose the best answer. Each question carries **1 mark**.

### 1. Which action best follows the course guidance for **Brain, Memory, Tools, and Loop**?

A. Use precise, minimal tool schemas and validate every requested action before execution.
B. Define goals, available tools, observation steps, and safe stopping conditions.
C. Set iteration limits, time or token budgets, approval gates, and explicit success criteria.
D. Design all four pillars together instead of focusing only on model size.

### 2. Which concept is demonstrated in this situation?

> A support assistant retrieves a customer's subscription tier from storage before answering.

A. Persistent memory layer
B. Autoregressive loop
C. Token
D. Inference

### 3. Which statement best defines **Plan, Execute, Review, Test**?

A. Skills teach procedures, MCP connects external systems, and Plugins package workflows for distribution.
B. A host uses MCP clients to communicate with MCP servers that provide external capabilities.
C. A workflow in which the agent plans work, performs it, reviews the output, and validates it with tests.
D. An MCP server can expose Resources, Tools, and Prompts to compatible hosts.

### 4. Which concept is best described as: **Relevant information receives less effective focus because it competes with excessive irrelevant context.**

A. AGENTS.md rules
B. Attention dilution
C. Context Window
D. Project instruction files

### 5. Which concept is best described as: **A multi-agent structure where one coordinator decomposes and integrates while workers execute bounded subtasks.**

A. Supervisor agent
B. Sub-Agent
C. Hooks
D. Supervisor-worker pattern

### 6. Which concept is demonstrated in this situation?

> The same model family is wrapped with file handling, web search, user accounts, and conversation history.

A. Inference
B. Training
C. GPT versus ChatGPT
D. Host application

### 7. Which concept is demonstrated in this situation?

> Claude Code and an IDE both connect to the same Jira integration through an MCP server.

A. YOLO Mode
B. MCP host-client-server structure
C. Model Context Protocol
D. Lazy Skill loading

### 8. Which concept is best described as: **Arranging context so important instructions and evidence appear where the model can use them effectively.**

A. Context ordering
B. Context Window
C. Project instruction files
D. Conversation History

### 9. Which statement best defines **Swarm or Agent Team**?

A. An isolated worker created by a supervisor to complete a bounded task and return a concise result.
B. A security approach that assumes generated actions may fail or be unsafe and limits access by default.
C. Code-level rules that decide which tool actions an embedded agent may perform automatically.
D. Multiple specialized agents coordinated to complete parts of one larger system in parallel.

### 10. Which concept is best described as: **A focused context for each worker that excludes irrelevant details from other tasks.**

A. Clean worker context
B. Programmatic approval policy
C. Claude Agent SDK
D. Supervisor agent

### 11. Which concept is demonstrated in this situation?

> A request containing documents, history, tool schemas, and the answer approaches the model's token capacity.

A. Attention dilution
B. Context ordering
C. Context Window
D. Prompt Engineering

### 12. Which statement best defines **Professional AI workflow**?

A. A multi-agent structure where one coordinator decomposes and integrates while workers execute bounded subtasks.
B. A security approach that assumes generated actions may fail or be unsafe and limits access by default.
C. Reusable command shortcuts that trigger predefined agent workflows.
D. A controlled chain from requirement to specification, agent teamwork, Skills, MCP, Hooks, Sandbox, and reviewable output.

### 13. Which statement best defines **Gastown Polecats**?

A. Code-level rules that decide which tool actions an embedded agent may perform automatically.
B. A security approach that assumes generated actions may fail or be unsafe and limits access by default.
C. The worker agents in the Gastown framing that implement separate pieces assigned by a Lead.
D. A development toolkit for embedding an agent loop inside Python or TypeScript applications.

### 14. Which action best follows the course guidance for **AI Agent**?

A. Design all four pillars together instead of focusing only on model size.
B. Estimate model load, cost, and context usage in tokens rather than ordinary word count.
C. Evaluate whether the system has goal-directed tools, state, and loop behavior before calling it an agent.
D. Use precise, minimal tool schemas and validate every requested action before execution.

### 15. Which concept is demonstrated in this situation?

> An agent produces a result, critiques it, improves it, and repeats until defined quality checks pass.

A. Model Context Protocol
B. Ralph Loops
C. Plugin
D. YOLO Mode

### 16. Which action best follows the course guidance for **Skills versus MCP versus Plugins**?

A. Use this sequence as a default for meaningful coding or operational tasks.
B. Publish repeatable, versioned bundles rather than relying on informal setup instructions.
C. Choose the layer based on whether the need is procedural guidance, system integration, or team packaging.
D. Write accurate name and description metadata plus clear executable steps.

### 17. Which statement best defines **Plugin**?

A. An MCP server can expose Resources, Tools, and Prompts to compatible hosts.
B. The core Skill file containing YAML frontmatter for discovery and Markdown instructions for execution.
C. The progression from tightly controlled AI assistance to more autonomous, tested, and coordinated workflows.
D. An installable bundle that can package MCP servers, Skills, slash commands, Hooks, and shared workflows.

### 18. Which action best follows the course guidance for **Context pruning**?

A. Curate a smaller, task-focused context instead of dumping everything available.
B. Select the smallest context that still contains all necessary evidence and constraints.
C. Move hard constraints and critical decisions into durable project files.
D. Store hard requirements and team conventions in version-controlled instruction files.

### 19. Which statement best defines **Context Engineering**?

A. Designing, structuring, pruning, and managing the complete payload sent to the model.
B. A high-priority context layer that defines persona, rules, boundaries, and expected behavior.
C. Context containing persistent preferences, runtime state, metadata, and environment information.
D. The tendency for important information buried in the middle of long context to be recalled less reliably.

### 20. Which concept is demonstrated in this situation?

> The model produces an execute_python request, and the application runs the code.

A. Tool Calling
B. Statelessness
C. Next-token prediction
D. Token

## Part B — Short Answer

Answer briefly but clearly. Each question carries **2 marks**.

### 21. Compare **Swarm or Agent Team** and **Supervisor-worker pattern**. Give one clear difference.

### 22. Read the situation and identify the main concept. Then give one recommended action.

> Remote agents create a pull request rather than changing production files directly.

### 23. Read the situation and identify the main concept. Then give one recommended action.

> An agent is allowed to make broad changes and run commands without requesting confirmation at every step.

### 24. Explain **Context Window** and state one practical reason it matters in an AI workflow.

### 25. Read the situation and identify the main concept. Then give one recommended action.

> The model sees JSON definitions for search, database access, and code execution.

---

## Answer Key — Set 2

### Part A

1. **D** — Brain, Memory, Tools, and Loop
2. **A** — Persistent memory layer
3. **C** — Plan, Execute, Review, Test
4. **B** — Attention dilution
5. **D** — Supervisor-worker pattern
6. **C** — GPT versus ChatGPT
7. **C** — Model Context Protocol
8. **A** — Context ordering
9. **D** — Swarm or Agent Team
10. **A** — Clean worker context
11. **C** — Context Window
12. **D** — Professional AI workflow
13. **C** — Gastown Polecats
14. **C** — AI Agent
15. **B** — Ralph Loops
16. **C** — Skills versus MCP versus Plugins
17. **D** — Plugin
18. **B** — Context pruning
19. **A** — Context Engineering
20. **A** — Tool Calling

### Part B — Suggested Answers

**21.** Swarm or Agent Team: Multiple specialized agents coordinated to complete parts of one larger system in parallel. Supervisor-worker pattern: A multi-agent structure where one coordinator decomposes and integrates while workers execute bounded subtasks.

**22.** Concept: Reviewable diff. Recommended action: Make autonomous work traceable, testable, and reviewable before acceptance.

**23.** Concept: YOLO Mode. Recommended action: Use only with strong specs, tests, least privilege, Sandboxing, and reviewable output.

**24.** The maximum number of tokens a model can process within one request. Practical importance: Treat the window as a constrained budget and prioritize signal over volume.

**25.** Concept: Tool Definitions. Recommended action: Keep schemas precise and context-efficient so the model selects and fills tools correctly.

---

# Quiz Set 3

**Suggested time:** 30 minutes  
**Total marks:** 30

## Part A — Multiple Choice

Choose the best answer. Each question carries **1 mark**.

### 1. Which action best follows the course guidance for **YOLO Mode**?

A. Use MCP when standardized access to live external systems is needed.
B. Use only with strong specs, tests, least privilege, Sandboxing, and reviewable output.
C. Expose narrowly scoped capabilities with clear permissions and descriptions.
D. Publish repeatable, versioned bundles rather than relying on informal setup instructions.

### 2. Which action best follows the course guidance for **Programmatic approval policy**?

A. Match approval requirements to action risk and environment sensitivity.
B. Make autonomous work traceable, testable, and reviewable before acceptance.
C. Keep coordination and integration responsibilities with a clear supervisor.
D. Give each worker a narrow objective, limited tools, and a clear return format.

### 3. Which concept is best described as: **A workflow where a detailed human-written specification guides AI implementation and evaluation.**

A. Skills versus MCP versus Plugins
B. Workflow maturity
C. YOLO Mode
D. Spec-Driven Development

### 4. Which statement best defines **Project instruction files**?

A. The tendency for important information buried in the middle of long context to be recalled less reliably.
B. Repository files such as AGENTS.md or CLAUDE.md that contain durable project-specific rules.
C. Context containing persistent preferences, runtime state, metadata, and environment information.
D. Arranging context so important instructions and evidence appear where the model can use them effectively.

### 5. Which statement best defines **Sub-Agent**?

A. An isolated worker created by a supervisor to complete a bounded task and return a concise result.
B. Lifecycle event handlers executed by the harness at moments such as pre-tool-exec, post-tool-exec, or pre-commit.
C. An isolated execution environment that limits damage from untrusted or unexpected agent-generated actions.
D. Multiple specialized agents coordinated to complete parts of one larger system in parallel.

### 6. Which statement best defines **Memory and Environment**?

A. Designing, structuring, pruning, and managing the complete payload sent to the model.
B. Earlier user and assistant turns included in the current context to maintain continuity.
C. Context containing persistent preferences, runtime state, metadata, and environment information.
D. Persistent operational rules such as coding standards, security requirements, test commands, and directory conventions.

### 7. Which statement best defines **Conversation replay**?

A. An agent loop that combines reasoning and acting through Think, Act, Observe, and Repeat.
B. An LLM generates output by predicting one token at a time from the current context.
C. A model processing unit that may be a word, sub-word, punctuation mark, whitespace, or character chunk.
D. An application simulates memory by sending earlier user and assistant messages again in the current request.

### 8. Which concept is best described as: **An MCP server can expose Resources, Tools, and Prompts to compatible hosts.**

A. Model Context Protocol
B. SKILL.md
C. Workflow maturity
D. MCP server capabilities

### 9. Which concept is demonstrated in this situation?

> A CI service calls an agent to inspect failing logs, propose a fix, and report to Slack.

A. GSD
B. Claude Agent SDK
C. Supervisor-worker pattern
D. Programmatic approval policy

### 10. Which concept is best described as: **The agent that holds the main goal, decomposes work, coordinates workers, and integrates their results.**

A. Programmatic approval policy
B. GSD
C. Supervisor agent
D. Reviewable diff

### 11. Which statement best defines **Plugin marketplace**?

A. A distribution mechanism that lets teams install and update workflow bundles consistently.
B. A workflow where a detailed human-written specification guides AI implementation and evaluation.
C. An MCP server can expose Resources, Tools, and Prompts to compatible hosts.
D. Skills teach procedures, MCP connects external systems, and Plugins package workflows for distribution.

### 12. Which concept is best described as: **The tendency for important information buried in the middle of long context to be recalled less reliably.**

A. Context Engineering
B. Lost in the Middle
C. Attention dilution
D. Conversation History

### 13. Which statement best defines **Host application**?

A. The software layer that manages prompts, state, tools, permissions, execution, and results around the model.
B. The core LLM does not inherently remember separate requests unless prior information is sent again.
C. Application-managed storage that saves user preferences, facts, or state and injects relevant items into context.
D. A model processing unit that may be a word, sub-word, punctuation mark, whitespace, or character chunk.

### 14. Which concept is best described as: **A security approach that assumes generated actions may fail or be unsafe and limits access by default.**

A. Sandbox
B. Gastown Polecats
C. Zero-trust execution
D. Sub-Agent

### 15. Which concept is best described as: **The process of updating model weights using large datasets and optimization.**

A. Conversation replay
B. Reasoning workflow
C. Training
D. Tool result feedback

### 16. Which concept is best described as: **Persistent operational rules such as coding standards, security requirements, test commands, and directory conventions.**

A. AGENTS.md rules
B. Memory and Environment
C. Lossy summarization
D. Project instruction files

### 17. Which concept is best described as: **The finite amount of context and generated output that can fit within the model's token limits.**

A. Autoregressive loop
B. Reasoning workflow
C. Token budget
D. Brain, Memory, Tools, and Loop

### 18. Which concept is best described as: **A high-priority context layer that defines persona, rules, boundaries, and expected behavior.**

A. Context Window
B. Prompt Engineering
C. Memory and Environment
D. System Prompt

### 19. Which concept is demonstrated in this situation?

> PDF guidance remains unloaded during a coding task but appears when a PDF form must be filled.

A. SKILL.md
B. Model Context Protocol
C. Lazy Skill loading
D. Skills versus MCP versus Plugins

### 20. Which action best follows the course guidance for **Autoregressive loop**?

A. Separate model-building activities that change weights from normal user-time model usage.
B. Include only material that is relevant to the task and remove unnecessary payload.
C. Separate planning, execution, verification, and final reporting for multi-step tasks.
D. Allow the generation process to build sequentially and evaluate the full output, not a single isolated token.

## Part B — Short Answer

Answer briefly but clearly. Each question carries **2 marks**.

### 21. Explain **Context Engineering** and state one practical reason it matters in an AI workflow.

### 22. Read the situation and identify the main concept. Then give one recommended action.

> A summary remembers that a bug was fixed but drops the exact edge case that caused it.

### 23. Explain **AI Agent** and state one practical reason it matters in an AI workflow.

### 24. Explain **Hooks** and state one practical reason it matters in an AI workflow.

### 25. Explain **Project instruction files** and state one practical reason it matters in an AI workflow.

---

## Answer Key — Set 3

### Part A

1. **B** — YOLO Mode
2. **A** — Programmatic approval policy
3. **D** — Spec-Driven Development
4. **B** — Project instruction files
5. **A** — Sub-Agent
6. **C** — Memory and Environment
7. **D** — Conversation replay
8. **D** — MCP server capabilities
9. **B** — Claude Agent SDK
10. **C** — Supervisor agent
11. **A** — Plugin marketplace
12. **B** — Lost in the Middle
13. **A** — Host application
14. **C** — Zero-trust execution
15. **C** — Training
16. **A** — AGENTS.md rules
17. **C** — Token budget
18. **D** — System Prompt
19. **C** — Lazy Skill loading
20. **D** — Autoregressive loop

### Part B — Suggested Answers

**21.** Designing, structuring, pruning, and managing the complete payload sent to the model. Practical importance: Optimize the full context package rather than polishing only the final prompt sentence.

**22.** Concept: Lossy summarization. Recommended action: Move hard constraints and critical decisions into durable project files.

**23.** An architecture in which an LLM uses tools, state, and an autonomous loop to achieve a specific goal. Practical importance: Evaluate whether the system has goal-directed tools, state, and loop behavior before calling it an agent.

**24.** Lifecycle event handlers executed by the harness at moments such as pre-tool-exec, post-tool-exec, or pre-commit. Practical importance: Use Hooks for deterministic enforcement outside the model.

**25.** Repository files such as AGENTS.md or CLAUDE.md that contain durable project-specific rules. Practical importance: Store hard requirements and team conventions in version-controlled instruction files.

---

# Quiz Set 4

**Suggested time:** 30 minutes  
**Total marks:** 30

## Part A — Multiple Choice

Choose the best answer. Each question carries **1 mark**.

### 1. Which concept is best described as: **The worker agents in the Gastown framing that implement separate pieces assigned by a Lead.**

A. Sub-Agent
B. Supervisor-worker pattern
C. Programmatic approval policy
D. Gastown Polecats

### 2. Which concept is demonstrated in this situation?

> A travel system remembers preferences, searches options, requests approval, and performs booking actions.

A. Stop conditions
B. Token budget
C. AI Agent
D. Conversation replay

### 3. Which statement best defines **Lazy Skill loading**?

A. A modular package of reusable procedural guidance, scripts, references, and examples for an agent.
B. Loading Skill instructions only when the current task requires them, saving context space.
C. A workflow where a detailed human-written specification guides AI implementation and evaluation.
D. An open standard that connects AI hosts to external tools and data through a reusable protocol.

### 4. Which statement best defines **Sandbox**?

A. An isolated execution environment that limits damage from untrusted or unexpected agent-generated actions.
B. Lifecycle event handlers executed by the harness at moments such as pre-tool-exec, post-tool-exec, or pre-commit.
C. A spec-driven approach in which humans define the system and agent teams implement against the specification.
D. The agent that holds the main goal, decomposes work, coordinates workers, and integrates their results.

### 5. Which action best follows the course guidance for **SKILL.md**?

A. Move human effort upstream into requirements, constraints, and review standards.
B. Create focused Skills that load only when their procedure is relevant.
C. Write accurate name and description metadata plus clear executable steps.
D. Publish repeatable, versioned bundles rather than relying on informal setup instructions.

### 6. Which concept is best described as: **Crafting the user's instruction text, which is one part of the wider context design process.**

A. Tool Definitions
B. System Prompt
C. Prompt Engineering
D. Conversation History

### 7. Which concept is best described as: **The tendency for important information buried in the middle of long context to be recalled less reliably.**

A. Lost in the Middle
B. Compacting
C. Context pruning
D. AGENTS.md rules

### 8. Which concept is best described as: **The finite amount of context and generated output that can fit within the model's token limits.**

A. Training
B. ReAct pattern
C. Inference
D. Token budget

### 9. Which concept is demonstrated in this situation?

> The model sees JSON definitions for search, database access, and code execution.

A. Context ordering
B. Tool Definitions
C. Conversation History
D. Compacting

### 10. Which action best follows the course guidance for **Slash commands**?

A. Move the blast radius away from local and production systems.
B. Create commands for frequent, repeatable workflows with clear inputs and outputs.
C. Start by improving context relevance, structure, persistence, and ordering.
D. Define reporting formats, dependencies, and ownership boundaries.

### 11. Which concept is demonstrated in this situation?

> A human writes requirements and acceptance criteria, and agents produce one merged reviewable change set.

A. Context-first best practice
B. GSD
C. Claude Agent SDK
D. Reviewable diff

### 12. Which statement best defines **Reasoning workflow**?

A. An agent loop that combines reasoning and acting through Think, Act, Observe, and Repeat.
B. An application simulates memory by sending earlier user and assistant messages again in the current request.
C. A structured process that gives the model room to plan, decompose, check, and verify complex work.
D. Using a trained, frozen model to process context and generate a response.

### 13. Which concept is best described as: **Using a trained, frozen model to process context and generate a response.**

A. Training
B. Host application
C. Stop conditions
D. Inference

### 14. Which concept is best described as: **A host uses MCP clients to communicate with MCP servers that provide external capabilities.**

A. Plan, Execute, Review, Test
B. Model Context Protocol
C. MCP host-client-server structure
D. Workflow maturity

### 15. Which concept is demonstrated in this situation?

> An agent is given eighty files when only three are needed for the bug fix.

A. Lossy summarization
B. Context Engineering
C. Attention dilution
D. Context Window

### 16. Which concept is demonstrated in this situation?

> The model receives the user's language preference and the current project branch before acting.

A. Context Window
B. Attention dilution
C. Prompt Engineering
D. Memory and Environment

### 17. Which concept is demonstrated in this situation?

> A developer adds a marketplace and installs a preconfigured release-management package.

A. Custom Skill
B. Plugin marketplace
C. Lazy Skill loading
D. MCP host-client-server structure

### 18. Which concept is demonstrated in this situation?

> A new API call contains only the latest message, so the model cannot know an earlier conversation.

A. Statelessness
B. Persistent memory layer
C. Reasoning workflow
D. Training

### 19. Which action best follows the course guidance for **Hooks**?

A. Define reporting formats, dependencies, and ownership boundaries.
B. Match approval requirements to action risk and environment sensitivity.
C. Use Hooks for deterministic enforcement outside the model.
D. Assign bounded ownership and define integration rules before parallel work begins.

### 20. Which concept is demonstrated in this situation?

> An AI proposes changes, edits code, inspects the diff, and runs the test suite before delivery.

A. MCP server capabilities
B. Ralph Loops
C. Plan, Execute, Review, Test
D. Model Context Protocol

## Part B — Short Answer

Answer briefly but clearly. Each question carries **2 marks**.

### 21. Compare **GPT versus ChatGPT** and **Host application**. Give one clear difference.

### 22. Explain **Custom Skill** and state one practical reason it matters in an AI workflow.

### 23. Read the situation and identify the main concept. Then give one recommended action.

> An agent is given eighty files when only three are needed for the bug fix.

### 24. Compare **Context Engineering** and **Prompt Engineering**. Give one clear difference.

### 25. Compare **System Prompt** and **AGENTS.md rules**. Give one clear difference.

---

## Answer Key — Set 4

### Part A

1. **D** — Gastown Polecats
2. **C** — AI Agent
3. **B** — Lazy Skill loading
4. **A** — Sandbox
5. **C** — SKILL.md
6. **C** — Prompt Engineering
7. **A** — Lost in the Middle
8. **D** — Token budget
9. **B** — Tool Definitions
10. **B** — Slash commands
11. **B** — GSD
12. **C** — Reasoning workflow
13. **D** — Inference
14. **C** — MCP host-client-server structure
15. **C** — Attention dilution
16. **D** — Memory and Environment
17. **B** — Plugin marketplace
18. **A** — Statelessness
19. **C** — Hooks
20. **C** — Plan, Execute, Review, Test

### Part B — Suggested Answers

**21.** GPT versus ChatGPT: GPT is the underlying model, while ChatGPT is an application that adds state, tools, safety, and user experience. Host application: The software layer that manages prompts, state, tools, permissions, execution, and results around the model.

**22.** A modular package of reusable procedural guidance, scripts, references, and examples for an agent. Practical importance: Create focused Skills that load only when their procedure is relevant.

**23.** Concept: Attention dilution. Recommended action: Curate a smaller, task-focused context instead of dumping everything available.

**24.** Context Engineering: Designing, structuring, pruning, and managing the complete payload sent to the model. Prompt Engineering: Crafting the user's instruction text, which is one part of the wider context design process.

**25.** System Prompt: A high-priority context layer that defines persona, rules, boundaries, and expected behavior. AGENTS.md rules: Persistent operational rules such as coding standards, security requirements, test commands, and directory conventions.

---

# Quiz Set 5

**Suggested time:** 30 minutes  
**Total marks:** 30

## Part A — Multiple Choice

Choose the best answer. Each question carries **1 mark**.

### 1. Which concept is best described as: **An isolated worker created by a supervisor to complete a bounded task and return a concise result.**

A. Sub-Agent
B. GSD
C. Gastown Polecats
D. Context-first best practice

### 2. Which action best follows the course guidance for **Tool result feedback**?

A. Include only material that is relevant to the task and remove unnecessary payload.
B. Estimate model load, cost, and context usage in tokens rather than ordinary word count.
C. Return clear, structured tool results that the model can interpret reliably.
D. Separate model-building activities that change weights from normal user-time model usage.

### 3. Which concept is best described as: **Each generated token becomes part of the input used to predict the following token.**

A. Persistent memory layer
B. Autoregressive loop
C. Host application
D. Statelessness

### 4. Which statement best defines **Token**?

A. A model processing unit that may be a word, sub-word, punctuation mark, whitespace, or character chunk.
B. Application-managed storage that saves user preferences, facts, or state and injects relevant items into context.
C. The model emits a structured request for an external function instead of executing that function itself.
D. Each generated token becomes part of the input used to predict the following token.

### 5. Which action best follows the course guidance for **Skills versus MCP versus Plugins**?

A. Keep procedures modular and trigger them on demand.
B. Use MCP when standardized access to live external systems is needed.
C. Expose narrowly scoped capabilities with clear permissions and descriptions.
D. Choose the layer based on whether the need is procedural guidance, system integration, or team packaging.

### 6. Which action best follows the course guidance for **Hooks**?

A. Give each worker only the information needed for its assigned subtask.
B. Start by improving context relevance, structure, persistence, and ordering.
C. Use Hooks for deterministic enforcement outside the model.
D. Keep coordination and integration responsibilities with a clear supervisor.

### 7. Which concept is demonstrated in this situation?

> A payments project states that money uses integer minor units and full PAN values must never be logged.

A. System Prompt
B. AGENTS.md rules
C. Conversation History
D. Attention dilution

### 8. Which statement best defines **MCP server capabilities**?

A. An MCP server can expose Resources, Tools, and Prompts to compatible hosts.
B. Skills teach procedures, MCP connects external systems, and Plugins package workflows for distribution.
C. A modular package of reusable procedural guidance, scripts, references, and examples for an agent.
D. A high-autonomy operating mode in which an agent performs larger amounts of work with minimal approval.

### 9. Which statement best defines **Clean worker context**?

A. Reusable command shortcuts that trigger predefined agent workflows.
B. A spec-driven approach in which humans define the system and agent teams implement against the specification.
C. A multi-agent structure where one coordinator decomposes and integrates while workers execute bounded subtasks.
D. A focused context for each worker that excludes irrelevant details from other tasks.

### 10. Which concept is demonstrated in this situation?

> The application re-sends prior questions and answers before the newest message.

A. Memory and Environment
B. System Prompt
C. Conversation History
D. Prompt Engineering

### 11. Which statement best defines **Training**?

A. The finite amount of context and generated output that can fit within the model's token limits.
B. The process of updating model weights using large datasets and optimization.
C. The core LLM does not inherently remember separate requests unless prior information is sent again.
D. The model emits a structured request for an external function instead of executing that function itself.

### 12. Which concept is best described as: **A high-priority context layer that defines persona, rules, boundaries, and expected behavior.**

A. Context Engineering
B. System Prompt
C. Attention dilution
D. Prompt Engineering

### 13. Which concept is demonstrated in this situation?

> Separate workers build APIs, UI components, database schemas, and tests under a Lead agent.

A. Sandbox
B. Sub-Agent
C. Reviewable diff
D. Swarm or Agent Team

### 14. Which statement best defines **Next-token prediction**?

A. The four pillars used in the course to describe the main components of an AI Agent.
B. An LLM generates output by predicting one token at a time from the current context.
C. Rules that end an agent loop when the goal is met, a limit is reached, or continuation is unsafe.
D. An application simulates memory by sending earlier user and assistant messages again in the current request.

### 15. Which statement best defines **Spec-Driven Development**?

A. A workflow where a detailed human-written specification guides AI implementation and evaluation.
B. A workflow in which the agent plans work, performs it, reviews the output, and validates it with tests.
C. An open standard that connects AI hosts to external tools and data through a reusable protocol.
D. A host uses MCP clients to communicate with MCP servers that provide external capabilities.

### 16. Which concept is demonstrated in this situation?

> A team moves from changing one line at a time to spec-driven implementation with testing and review.

A. Workflow maturity
B. YOLO Mode
C. Plan, Execute, Review, Test
D. MCP server capabilities

### 17. Which concept is best described as: **Arranging context so important instructions and evidence appear where the model can use them effectively.**

A. Context ordering
B. Tool Definitions
C. AGENTS.md rules
D. Lossy summarization

### 18. Which action best follows the course guidance for **Reviewable diff**?

A. Implement approval policies, event listeners, and allowed tools in application code.
B. Give each worker a narrow objective, limited tools, and a clear return format.
C. Use Hooks for deterministic enforcement outside the model.
D. Make autonomous work traceable, testable, and reviewable before acceptance.

### 19. Which action best follows the course guidance for **Project instruction files**?

A. Store hard requirements and team conventions in version-controlled instruction files.
B. Write rules that are specific, testable, and relevant to project execution.
C. Curate a smaller, task-focused context instead of dumping everything available.
D. Trim, summarize, or retrieve history based on relevance.

### 20. Which concept is best described as: **An installable bundle that can package MCP servers, Skills, slash commands, Hooks, and shared workflows.**

A. Plan, Execute, Review, Test
B. Skills versus MCP versus Plugins
C. Plugin
D. MCP server capabilities

## Part B — Short Answer

Answer briefly but clearly. Each question carries **2 marks**.

### 21. Explain **Spec-Driven Development** and state one practical reason it matters in an AI workflow.

### 22. Compare **Model Context Protocol** and **Plugin**. Give one clear difference.

### 23. Read the situation and identify the main concept. Then give one recommended action.

> A system combines a reasoning model, stored state, external APIs, and repeated execution steps.

### 24. Explain **ReAct pattern** and state one practical reason it matters in an AI workflow.

### 25. Read the situation and identify the main concept. Then give one recommended action.

> PDF guidance remains unloaded during a coding task but appears when a PDF form must be filled.

---

## Answer Key — Set 5

### Part A

1. **A** — Sub-Agent
2. **C** — Tool result feedback
3. **B** — Autoregressive loop
4. **A** — Token
5. **D** — Skills versus MCP versus Plugins
6. **C** — Hooks
7. **B** — AGENTS.md rules
8. **A** — MCP server capabilities
9. **D** — Clean worker context
10. **C** — Conversation History
11. **B** — Training
12. **B** — System Prompt
13. **D** — Swarm or Agent Team
14. **B** — Next-token prediction
15. **A** — Spec-Driven Development
16. **A** — Workflow maturity
17. **A** — Context ordering
18. **D** — Reviewable diff
19. **A** — Project instruction files
20. **C** — Plugin

### Part B — Suggested Answers

**21.** A workflow where a detailed human-written specification guides AI implementation and evaluation. Practical importance: Move human effort upstream into requirements, constraints, and review standards.

**22.** Model Context Protocol: An open standard that connects AI hosts to external tools and data through a reusable protocol. Plugin: An installable bundle that can package MCP servers, Skills, slash commands, Hooks, and shared workflows.

**23.** Concept: Brain, Memory, Tools, and Loop. Recommended action: Design all four pillars together instead of focusing only on model size.

**24.** An agent loop that combines reasoning and acting through Think, Act, Observe, and Repeat. Practical importance: Define goals, available tools, observation steps, and safe stopping conditions.

**25.** Concept: Lazy Skill loading. Recommended action: Keep procedures modular and trigger them on demand.

---

# Quiz Set 6

**Suggested time:** 30 minutes  
**Total marks:** 30

## Part A — Multiple Choice

Choose the best answer. Each question carries **1 mark**.

### 1. Which action best follows the course guidance for **Model Context Protocol**?

A. Use this sequence as a default for meaningful coding or operational tasks.
B. Publish repeatable, versioned bundles rather than relying on informal setup instructions.
C. Move human effort upstream into requirements, constraints, and review standards.
D. Use MCP when standardized access to live external systems is needed.

### 2. Which concept is demonstrated in this situation?

> A coding assistant receives relevant files, project rules, failing tests, tool schemas, and the user's request.

A. Lossy summarization
B. Lost in the Middle
C. Context ordering
D. Context Engineering

### 3. Which concept is demonstrated in this situation?

> An agent produces a result, critiques it, improves it, and repeats until defined quality checks pass.

A. Ralph Loops
B. MCP server capabilities
C. Model Context Protocol
D. Custom Skill

### 4. Which action best follows the course guidance for **GPT versus ChatGPT**?

A. Separate model-building activities that change weights from normal user-time model usage.
B. Separate what the model predicts from what the surrounding application executes or stores.
C. Separate planning, execution, verification, and final reporting for multi-step tasks.
D. Track both input and output tokens because both affect inference cost and latency.

### 5. Which concept is best described as: **An agent loop that combines reasoning and acting through Think, Act, Observe, and Repeat.**

A. Autoregressive loop
B. Reasoning workflow
C. ReAct pattern
D. Statelessness

### 6. Which action best follows the course guidance for **Supervisor agent**?

A. Use Hooks for deterministic enforcement outside the model.
B. Keep coordination and integration responsibilities with a clear supervisor.
C. Give each Polecat a discrete task and clear completion criteria.
D. Define reporting formats, dependencies, and ownership boundaries.

### 7. Which statement best defines **Supervisor-worker pattern**?

A. A multi-agent structure where one coordinator decomposes and integrates while workers execute bounded subtasks.
B. Multiple specialized agents coordinated to complete parts of one larger system in parallel.
C. The agent that holds the main goal, decomposes work, coordinates workers, and integrates their results.
D. The principle that relevant, structured context is the foundation of reliable model and agent output.

### 8. Which concept is best described as: **Code-level rules that decide which tool actions an embedded agent may perform automatically.**

A. GSD
B. Reviewable diff
C. Hooks
D. Programmatic approval policy

### 9. Which concept is demonstrated in this situation?

> An application receives a tool request from the model, validates it, runs the function, and returns the result.

A. Token
B. Persistent memory layer
C. Tool Calling
D. Host application

### 10. Which concept is best described as: **A controlled chain from requirement to specification, agent teamwork, Skills, MCP, Hooks, Sandbox, and reviewable output.**

A. Professional AI workflow
B. Swarm or Agent Team
C. Sub-Agent
D. Slash commands

### 11. Which statement best defines **Skills versus MCP versus Plugins**?

A. The core Skill file containing YAML frontmatter for discovery and Markdown instructions for execution.
B. Skills teach procedures, MCP connects external systems, and Plugins package workflows for distribution.
C. An installable bundle that can package MCP servers, Skills, slash commands, Hooks, and shared workflows.
D. An MCP server can expose Resources, Tools, and Prompts to compatible hosts.

### 12. Which concept is demonstrated in this situation?

> An IDE agent includes only the three relevant files and the latest failing test output.

A. Prompt Engineering
B. Context pruning
C. Project instruction files
D. Attention dilution

### 13. Which concept is best described as: **A modular package of reusable procedural guidance, scripts, references, and examples for an agent.**

A. Plugin marketplace
B. Custom Skill
C. YOLO Mode
D. Workflow maturity

### 14. Which action best follows the course guidance for **Inference**?

A. Track both input and output tokens because both affect inference cost and latency.
B. Estimate model load, cost, and context usage in tokens rather than ordinary word count.
C. Define goals, available tools, observation steps, and safe stopping conditions.
D. Allow the generation process to build sequentially and evaluate the full output, not a single isolated token.

### 15. Which action best follows the course guidance for **Stop conditions**?

A. Set iteration limits, time or token budgets, approval gates, and explicit success criteria.
B. Design all four pillars together instead of focusing only on model size.
C. Replay, retrieve, or inject the needed history and state on each request.
D. Explain the model as a statistical next-token predictor rather than as a fact database.

### 16. Which statement best defines **Lossy summarization**?

A. A high-priority context layer that defines persona, rules, boundaries, and expected behavior.
B. Removing irrelevant, stale, redundant, or low-value material before sending context to the model.
C. The unavoidable risk that compacting removes fine details while keeping only major points.
D. Crafting the user's instruction text, which is one part of the wider context design process.

### 17. Which concept is best described as: **An MCP server can expose Resources, Tools, and Prompts to compatible hosts.**

A. MCP server capabilities
B. Ralph Loops
C. Custom Skill
D. Skills versus MCP versus Plugins

### 18. Which concept is best described as: **The maximum number of tokens a model can process within one request.**

A. Context Window
B. Context ordering
C. System Prompt
D. Lossy summarization

### 19. Which concept is best described as: **Condensing older conversation history into a summary so a long session can continue within the context window.**

A. Lost in the Middle
B. Context ordering
C. Prompt Engineering
D. Compacting

### 20. Which concept is demonstrated in this situation?

> Every command runs with minimal credentials inside an isolated environment and requires policy checks.

A. Swarm or Agent Team
B. Gastown Polecats
C. Sub-Agent
D. Zero-trust execution

## Part B — Short Answer

Answer briefly but clearly. Each question carries **2 marks**.

### 21. Compare **Training** and **Inference**. Give one clear difference.

### 22. Read the situation and identify the main concept. Then give one recommended action.

> A payments project states that money uses integer minor units and full PAN values must never be logged.

### 23. Read the situation and identify the main concept. Then give one recommended action.

> A GitHub server provides repository data, issue actions, and reusable prompt templates.

### 24. Explain **Model Context Protocol** and state one practical reason it matters in an AI workflow.

### 25. Explain **System Prompt** and state one practical reason it matters in an AI workflow.

---

## Answer Key — Set 6

### Part A

1. **D** — Model Context Protocol
2. **D** — Context Engineering
3. **A** — Ralph Loops
4. **B** — GPT versus ChatGPT
5. **C** — ReAct pattern
6. **B** — Supervisor agent
7. **A** — Supervisor-worker pattern
8. **D** — Programmatic approval policy
9. **D** — Host application
10. **A** — Professional AI workflow
11. **B** — Skills versus MCP versus Plugins
12. **B** — Context pruning
13. **B** — Custom Skill
14. **A** — Inference
15. **A** — Stop conditions
16. **C** — Lossy summarization
17. **A** — MCP server capabilities
18. **A** — Context Window
19. **D** — Compacting
20. **D** — Zero-trust execution

### Part B — Suggested Answers

**21.** Training: The process of updating model weights using large datasets and optimization. Inference: Using a trained, frozen model to process context and generate a response.

**22.** Concept: AGENTS.md rules. Recommended action: Write rules that are specific, testable, and relevant to project execution.

**23.** Concept: MCP server capabilities. Recommended action: Expose narrowly scoped capabilities with clear permissions and descriptions.

**24.** An open standard that connects AI hosts to external tools and data through a reusable protocol. Practical importance: Use MCP when standardized access to live external systems is needed.

**25.** A high-priority context layer that defines persona, rules, boundaries, and expected behavior. Practical importance: Place stable behavior and safety boundaries in the system layer.

---

# Quiz Set 7

**Suggested time:** 30 minutes  
**Total marks:** 30

## Part A — Multiple Choice

Choose the best answer. Each question carries **1 mark**.

### 1. Which statement best defines **Attention dilution**?

A. The tendency for important information buried in the middle of long context to be recalled less reliably.
B. A high-priority context layer that defines persona, rules, boundaries, and expected behavior.
C. Relevant information receives less effective focus because it competes with excessive irrelevant context.
D. Repository files such as AGENTS.md or CLAUDE.md that contain durable project-specific rules.

### 2. Which statement best defines **Lost in the Middle**?

A. Removing irrelevant, stale, redundant, or low-value material before sending context to the model.
B. Relevant information receives less effective focus because it competes with excessive irrelevant context.
C. Repository files such as AGENTS.md or CLAUDE.md that contain durable project-specific rules.
D. The tendency for important information buried in the middle of long context to be recalled less reliably.

### 3. Which action best follows the course guidance for **Memory and Environment**?

A. Inject only state that is current, relevant, and safe to expose.
B. Store hard requirements and team conventions in version-controlled instruction files.
C. Place stable behavior and safety boundaries in the system layer.
D. Optimize the full context package rather than polishing only the final prompt sentence.

### 4. Which concept is best described as: **The principle that relevant, structured context is the foundation of reliable model and agent output.**

A. Clean worker context
B. Context-first best practice
C. Supervisor-worker pattern
D. Sub-Agent

### 5. Which action best follows the course guidance for **YOLO Mode**?

A. Use only with strong specs, tests, least privilege, Sandboxing, and reviewable output.
B. Use this sequence as a default for meaningful coding or operational tasks.
C. Use Plugins to distribute consistent team workflows and policies.
D. Expose narrowly scoped capabilities with clear permissions and descriptions.

### 6. Which statement best defines **Claude Agent SDK**?

A. A visible set of proposed changes that a human can inspect before merging or deployment.
B. A development toolkit for embedding an agent loop inside Python or TypeScript applications.
C. A focused context for each worker that excludes irrelevant details from other tasks.
D. The agent that holds the main goal, decomposes work, coordinates workers, and integrates their results.

### 7. Which concept is best described as: **Code-level rules that decide which tool actions an embedded agent may perform automatically.**

A. Professional AI workflow
B. Programmatic approval policy
C. Reviewable diff
D. Claude Agent SDK

### 8. Which action best follows the course guidance for **Clean worker context**?

A. Use Hooks for deterministic enforcement outside the model.
B. Define reporting formats, dependencies, and ownership boundaries.
C. Give each Polecat a discrete task and clear completion criteria.
D. Give each worker only the information needed for its assigned subtask.

### 9. Which action best follows the course guidance for **Supervisor agent**?

A. Use Hooks for deterministic enforcement outside the model.
B. Keep coordination and integration responsibilities with a clear supervisor.
C. Give each Polecat a discrete task and clear completion criteria.
D. Use precise specs to shift human effort toward engineering leadership and review.

### 10. Which statement best defines **Plan, Execute, Review, Test**?

A. Skills teach procedures, MCP connects external systems, and Plugins package workflows for distribution.
B. A modular package of reusable procedural guidance, scripts, references, and examples for an agent.
C. A workflow in which the agent plans work, performs it, reviews the output, and validates it with tests.
D. A workflow where a detailed human-written specification guides AI implementation and evaluation.

### 11. Which concept is demonstrated in this situation?

> PDF guidance remains unloaded during a coding task but appears when a PDF form must be filled.

A. MCP host-client-server structure
B. Ralph Loops
C. MCP server capabilities
D. Lazy Skill loading

### 12. Which statement best defines **Tool Calling**?

A. An application simulates memory by sending earlier user and assistant messages again in the current request.
B. The four pillars used in the course to describe the main components of an AI Agent.
C. The model emits a structured request for an external function instead of executing that function itself.
D. The process of updating model weights using large datasets and optimization.

### 13. Which concept is best described as: **The four pillars used in the course to describe the main components of an AI Agent.**

A. Token
B. Stop conditions
C. GPT versus ChatGPT
D. Brain, Memory, Tools, and Loop

### 14. Which concept is best described as: **A high-priority context layer that defines persona, rules, boundaries, and expected behavior.**

A. Tool Definitions
B. Prompt Engineering
C. System Prompt
D. Context Engineering

### 15. Which concept is best described as: **A structured process that gives the model room to plan, decompose, check, and verify complex work.**

A. ReAct pattern
B. Stop conditions
C. Reasoning workflow
D. AI Agent

### 16. Which concept is demonstrated in this situation?

> A feature request includes architecture, roles, error states, data models, tests, and acceptance criteria before coding starts.

A. MCP host-client-server structure
B. Spec-Driven Development
C. Skills versus MCP versus Plugins
D. Plugin

### 17. Which concept is best described as: **The progression from tightly controlled AI assistance to more autonomous, tested, and coordinated workflows.**

A. Plugin marketplace
B. Ralph Loops
C. Skills versus MCP versus Plugins
D. Workflow maturity

### 18. Which concept is demonstrated in this situation?

> Request three contains messages from requests one and two along with the new user message.

A. Token budget
B. Conversation replay
C. ReAct pattern
D. AI Agent

### 19. Which concept is demonstrated in this situation?

> A new API call contains only the latest message, so the model cannot know an earlier conversation.

A. Statelessness
B. Host application
C. Inference
D. ReAct pattern

### 20. Which action best follows the course guidance for **Context Window**?

A. Curate a smaller, task-focused context instead of dumping everything available.
B. Move hard constraints and critical decisions into durable project files.
C. Keep schemas precise and context-efficient so the model selects and fills tools correctly.
D. Treat the window as a constrained budget and prioritize signal over volume.

## Part B — Short Answer

Answer briefly but clearly. Each question carries **2 marks**.

### 21. Compare **Hooks** and **Slash commands**. Give one clear difference.

### 22. Explain **Next-token prediction** and state one practical reason it matters in an AI workflow.

### 23. Compare **Sub-Agent** and **Supervisor agent**. Give one clear difference.

### 24. Read the situation and identify the main concept. Then give one recommended action.

> The database agent receives schema requirements but not unrelated frontend discussions.

### 25. Explain **Plugin** and state one practical reason it matters in an AI workflow.

---

## Answer Key — Set 7

### Part A

1. **C** — Attention dilution
2. **D** — Lost in the Middle
3. **A** — Memory and Environment
4. **B** — Context-first best practice
5. **A** — YOLO Mode
6. **B** — Claude Agent SDK
7. **B** — Programmatic approval policy
8. **D** — Clean worker context
9. **B** — Supervisor agent
10. **C** — Plan, Execute, Review, Test
11. **D** — Lazy Skill loading
12. **C** — Tool Calling
13. **D** — Brain, Memory, Tools, and Loop
14. **C** — System Prompt
15. **C** — Reasoning workflow
16. **B** — Spec-Driven Development
17. **D** — Workflow maturity
18. **B** — Conversation replay
19. **A** — Statelessness
20. **D** — Context Window

### Part B — Suggested Answers

**21.** Hooks: Lifecycle event handlers executed by the harness at moments such as pre-tool-exec, post-tool-exec, or pre-commit. Slash commands: Reusable command shortcuts that trigger predefined agent workflows.

**22.** An LLM generates output by predicting one token at a time from the current context. Practical importance: Explain the model as a statistical next-token predictor rather than as a fact database.

**23.** Sub-Agent: An isolated worker created by a supervisor to complete a bounded task and return a concise result. Supervisor agent: The agent that holds the main goal, decomposes work, coordinates workers, and integrates their results.

**24.** Concept: Clean worker context. Recommended action: Give each worker only the information needed for its assigned subtask.

**25.** An installable bundle that can package MCP servers, Skills, slash commands, Hooks, and shared workflows. Practical importance: Use Plugins to distribute consistent team workflows and policies.

---

# Quiz Set 8

**Suggested time:** 30 minutes  
**Total marks:** 30

## Part A — Multiple Choice

Choose the best answer. Each question carries **1 mark**.

### 1. Which action best follows the course guidance for **Prompt Engineering**?

A. Place critical instructions near the beginning or end and reduce irrelevant content.
B. Store hard requirements and team conventions in version-controlled instruction files.
C. Use clear prompts, but support them with relevant memory, tools, files, and system instructions.
D. Order context by priority and place must-follow instructions at strong recall positions.

### 2. Which concept is best described as: **Arranging context so important instructions and evidence appear where the model can use them effectively.**

A. Context ordering
B. Attention dilution
C. Tool Definitions
D. Project instruction files

### 3. Which statement best defines **Tool Calling**?

A. A model processing unit that may be a word, sub-word, punctuation mark, whitespace, or character chunk.
B. Using a trained, frozen model to process context and generate a response.
C. The model emits a structured request for an external function instead of executing that function itself.
D. An application simulates memory by sending earlier user and assistant messages again in the current request.

### 4. Which concept is best described as: **A distribution mechanism that lets teams install and update workflow bundles consistently.**

A. Spec-Driven Development
B. Plugin marketplace
C. Plan, Execute, Review, Test
D. Ralph Loops

### 5. Which action best follows the course guidance for **GSD**?

A. Give each Polecat a discrete task and clear completion criteria.
B. Assign bounded ownership and define integration rules before parallel work begins.
C. Give each worker a narrow objective, limited tools, and a clear return format.
D. Use precise specs to shift human effort toward engineering leadership and review.

### 6. Which action best follows the course guidance for **Persistent memory layer**?

A. Allow the generation process to build sequentially and evaluate the full output, not a single isolated token.
B. Separate what the model predicts from what the surrounding application executes or stores.
C. Use precise, minimal tool schemas and validate every requested action before execution.
D. Store durable facts outside the volatile chat and retrieve only what is relevant.

### 7. Which concept is demonstrated in this situation?

> An agent lists requirements, identifies files, proposes a plan, implements changes, runs tests, and summarizes results.

A. ReAct pattern
B. Brain, Memory, Tools, and Loop
C. Stop conditions
D. Reasoning workflow

### 8. Which statement best defines **Sub-Agent**?

A. The agent that holds the main goal, decomposes work, coordinates workers, and integrates their results.
B. An isolated worker created by a supervisor to complete a bounded task and return a concise result.
C. Lifecycle event handlers executed by the harness at moments such as pre-tool-exec, post-tool-exec, or pre-commit.
D. A spec-driven approach in which humans define the system and agent teams implement against the specification.

### 9. Which concept is best described as: **A security approach that assumes generated actions may fail or be unsafe and limits access by default.**

A. Clean worker context
B. Zero-trust execution
C. Claude Agent SDK
D. Sandbox

### 10. Which concept is best described as: **An isolated execution environment that limits damage from untrusted or unexpected agent-generated actions.**

A. Reviewable diff
B. Swarm or Agent Team
C. Sandbox
D. Supervisor-worker pattern

### 11. Which concept is best described as: **A multi-agent structure where one coordinator decomposes and integrates while workers execute bounded subtasks.**

A. Supervisor-worker pattern
B. Slash commands
C. Professional AI workflow
D. Gastown Polecats

### 12. Which concept is best described as: **Each generated token becomes part of the input used to predict the following token.**

A. Autoregressive loop
B. Host application
C. Persistent memory layer
D. Token budget

### 13. Which action best follows the course guidance for **SKILL.md**?

A. Publish repeatable, versioned bundles rather than relying on informal setup instructions.
B. Create focused Skills that load only when their procedure is relevant.
C. Write accurate name and description metadata plus clear executable steps.
D. Use only with strong specs, tests, least privilege, Sandboxing, and reviewable output.

### 14. Which concept is demonstrated in this situation?

> An IDE agent includes only the three relevant files and the latest failing test output.

A. System Prompt
B. Conversation History
C. Lossy summarization
D. Context pruning

### 15. Which action best follows the course guidance for **Lossy summarization**?

A. Move hard constraints and critical decisions into durable project files.
B. Write rules that are specific, testable, and relevant to project execution.
C. Use clear prompts, but support them with relevant memory, tools, files, and system instructions.
D. Place critical instructions near the beginning or end and reduce irrelevant content.

### 16. Which action best follows the course guidance for **Project instruction files**?

A. Optimize the full context package rather than polishing only the final prompt sentence.
B. Store hard requirements and team conventions in version-controlled instruction files.
C. Preserve goals, decisions, constraints, and open tasks when summarizing.
D. Trim, summarize, or retrieve history based on relevance.

### 17. Which action best follows the course guidance for **Host application**?

A. Place security checks, logging, permissions, and error handling in the host or orchestration layer.
B. Explain the model as a statistical next-token predictor rather than as a fact database.
C. Define goals, available tools, observation steps, and safe stopping conditions.
D. Evaluate whether the system has goal-directed tools, state, and loop behavior before calling it an agent.

### 18. Which statement best defines **Model Context Protocol**?

A. The core Skill file containing YAML frontmatter for discovery and Markdown instructions for execution.
B. An open standard that connects AI hosts to external tools and data through a reusable protocol.
C. A modular package of reusable procedural guidance, scripts, references, and examples for an agent.
D. Repeated cycles of self-evaluation and improvement within a more mature agent workflow.

### 19. Which concept is demonstrated in this situation?

> An IDE host connects through a client to a Postgres MCP server.

A. Skills versus MCP versus Plugins
B. MCP server capabilities
C. MCP host-client-server structure
D. Workflow maturity

### 20. Which concept is best described as: **Repeated cycles of self-evaluation and improvement within a more mature agent workflow.**

A. MCP server capabilities
B. Ralph Loops
C. Skills versus MCP versus Plugins
D. YOLO Mode

## Part B — Short Answer

Answer briefly but clearly. Each question carries **2 marks**.

### 21. Explain **Compacting** and state one practical reason it matters in an AI workflow.

### 22. Explain **Claude Agent SDK** and state one practical reason it matters in an AI workflow.

### 23. Compare **Conversation replay** and **Persistent memory layer**. Give one clear difference.

### 24. Explain **Sandbox** and state one practical reason it matters in an AI workflow.

### 25. Compare **YOLO Mode** and **Spec-Driven Development**. Give one clear difference.

---

## Answer Key — Set 8

### Part A

1. **C** — Prompt Engineering
2. **A** — Context ordering
3. **C** — Tool Calling
4. **B** — Plugin marketplace
5. **D** — GSD
6. **D** — Persistent memory layer
7. **D** — Reasoning workflow
8. **B** — Sub-Agent
9. **B** — Zero-trust execution
10. **C** — Sandbox
11. **A** — Supervisor-worker pattern
12. **A** — Autoregressive loop
13. **C** — SKILL.md
14. **D** — Context pruning
15. **A** — Lossy summarization
16. **B** — Project instruction files
17. **A** — Host application
18. **B** — Model Context Protocol
19. **C** — MCP host-client-server structure
20. **B** — Ralph Loops

### Part B — Suggested Answers

**21.** Condensing older conversation history into a summary so a long session can continue within the context window. Practical importance: Preserve goals, decisions, constraints, and open tasks when summarizing.

**22.** A development toolkit for embedding an agent loop inside Python or TypeScript applications. Practical importance: Implement approval policies, event listeners, and allowed tools in application code.

**23.** Conversation replay: An application simulates memory by sending earlier user and assistant messages again in the current request. Persistent memory layer: Application-managed storage that saves user preferences, facts, or state and injects relevant items into context.

**24.** An isolated execution environment that limits damage from untrusted or unexpected agent-generated actions. Practical importance: Use least privilege, disposable environments, and reviewable outputs for autonomous execution.

**25.** YOLO Mode: A high-autonomy operating mode in which an agent performs larger amounts of work with minimal approval. Spec-Driven Development: A workflow where a detailed human-written specification guides AI implementation and evaluation.

---

# Quiz Set 9

**Suggested time:** 30 minutes  
**Total marks:** 30

## Part A — Multiple Choice

Choose the best answer. Each question carries **1 mark**.

### 1. Which action best follows the course guidance for **Custom Skill**?

A. Use this sequence as a default for meaningful coding or operational tasks.
B. Move human effort upstream into requirements, constraints, and review standards.
C. Design integrations once so multiple MCP-aware hosts can reuse them.
D. Create focused Skills that load only when their procedure is relevant.

### 2. Which statement best defines **Compacting**?

A. Schemas in the context that describe available tools, arguments, and expected usage.
B. Context containing persistent preferences, runtime state, metadata, and environment information.
C. Earlier user and assistant turns included in the current context to maintain continuity.
D. Condensing older conversation history into a summary so a long session can continue within the context window.

### 3. Which statement best defines **Conversation History**?

A. Arranging context so important instructions and evidence appear where the model can use them effectively.
B. Designing, structuring, pruning, and managing the complete payload sent to the model.
C. Schemas in the context that describe available tools, arguments, and expected usage.
D. Earlier user and assistant turns included in the current context to maintain continuity.

### 4. Which statement best defines **Token**?

A. Using a trained, frozen model to process context and generate a response.
B. Application-managed storage that saves user preferences, facts, or state and injects relevant items into context.
C. An LLM generates output by predicting one token at a time from the current context.
D. A model processing unit that may be a word, sub-word, punctuation mark, whitespace, or character chunk.

### 5. Which action best follows the course guidance for **Claude Agent SDK**?

A. Give each worker a narrow objective, limited tools, and a clear return format.
B. Create commands for frequent, repeatable workflows with clear inputs and outputs.
C. Implement approval policies, event listeners, and allowed tools in application code.
D. Use precise specs to shift human effort toward engineering leadership and review.

### 6. Which action best follows the course guidance for **Tool Definitions**?

A. Trim, summarize, or retrieve history based on relevance.
B. Place critical instructions near the beginning or end and reduce irrelevant content.
C. Curate a smaller, task-focused context instead of dumping everything available.
D. Keep schemas precise and context-efficient so the model selects and fills tools correctly.

### 7. Which concept is best described as: **The finite amount of context and generated output that can fit within the model's token limits.**

A. Token budget
B. Tool result feedback
C. Token
D. Host application

### 8. Which concept is best described as: **An installable bundle that can package MCP servers, Skills, slash commands, Hooks, and shared workflows.**

A. MCP server capabilities
B. Spec-Driven Development
C. SKILL.md
D. Plugin

### 9. Which statement best defines **Model Context Protocol**?

A. An open standard that connects AI hosts to external tools and data through a reusable protocol.
B. A workflow in which the agent plans work, performs it, reviews the output, and validates it with tests.
C. Loading Skill instructions only when the current task requires them, saving context space.
D. An MCP server can expose Resources, Tools, and Prompts to compatible hosts.

### 10. Which action best follows the course guidance for **Brain, Memory, Tools, and Loop**?

A. Allow the generation process to build sequentially and evaluate the full output, not a single isolated token.
B. Estimate model load, cost, and context usage in tokens rather than ordinary word count.
C. Place security checks, logging, permissions, and error handling in the host or orchestration layer.
D. Design all four pillars together instead of focusing only on model size.

### 11. Which statement best defines **MCP host-client-server structure**?

A. An open standard that connects AI hosts to external tools and data through a reusable protocol.
B. A high-autonomy operating mode in which an agent performs larger amounts of work with minimal approval.
C. Skills teach procedures, MCP connects external systems, and Plugins package workflows for distribution.
D. A host uses MCP clients to communicate with MCP servers that provide external capabilities.

### 12. Which concept is best described as: **The worker agents in the Gastown framing that implement separate pieces assigned by a Lead.**

A. Zero-trust execution
B. Gastown Polecats
C. Swarm or Agent Team
D. Claude Agent SDK

### 13. Which action best follows the course guidance for **Context Engineering**?

A. Place stable behavior and safety boundaries in the system layer.
B. Move hard constraints and critical decisions into durable project files.
C. Inject only state that is current, relevant, and safe to expose.
D. Optimize the full context package rather than polishing only the final prompt sentence.

### 14. Which action best follows the course guidance for **Professional AI workflow**?

A. Move the blast radius away from local and production systems.
B. Give each worker only the information needed for its assigned subtask.
C. Combine autonomy with standards, integrations, deterministic checks, isolated execution, and human review.
D. Give each worker a narrow objective, limited tools, and a clear return format.

### 15. Which concept is demonstrated in this situation?

> A payments project states that money uses integer minor units and full PAN values must never be logged.

A. Conversation History
B. Memory and Environment
C. Project instruction files
D. AGENTS.md rules

### 16. Which concept is best described as: **An architecture in which an LLM uses tools, state, and an autonomous loop to achieve a specific goal.**

A. Tool Calling
B. Autoregressive loop
C. AI Agent
D. Brain, Memory, Tools, and Loop

### 17. Which statement best defines **Reviewable diff**?

A. A multi-agent structure where one coordinator decomposes and integrates while workers execute bounded subtasks.
B. The agent that holds the main goal, decomposes work, coordinates workers, and integrates their results.
C. A visible set of proposed changes that a human can inspect before merging or deployment.
D. Reusable command shortcuts that trigger predefined agent workflows.

### 18. Which concept is best described as: **Reusable command shortcuts that trigger predefined agent workflows.**

A. Programmatic approval policy
B. Reviewable diff
C. Slash commands
D. Supervisor agent

### 19. Which concept is demonstrated in this situation?

> A team uses a PDF Skill, a Jira MCP server, and a Plugin that ships both with release commands.

A. Plugin
B. Skills versus MCP versus Plugins
C. Ralph Loops
D. Spec-Driven Development

### 20. Which concept is demonstrated in this situation?

> After a database query runs, the returned rows are added to the next model request.

A. Tool result feedback
B. ReAct pattern
C. Host application
D. Stop conditions

## Part B — Short Answer

Answer briefly but clearly. Each question carries **2 marks**.

### 21. Read the situation and identify the main concept. Then give one recommended action.

> Request three contains messages from requests one and two along with the new user message.

### 22. Explain **Workflow maturity** and state one practical reason it matters in an AI workflow.

### 23. Explain **Reasoning workflow** and state one practical reason it matters in an AI workflow.

### 24. Explain **Sub-Agent** and state one practical reason it matters in an AI workflow.

### 25. Compare **Tool Calling** and **Tool result feedback**. Give one clear difference.

---

## Answer Key — Set 9

### Part A

1. **D** — Custom Skill
2. **D** — Compacting
3. **D** — Conversation History
4. **D** — Token
5. **C** — Claude Agent SDK
6. **D** — Tool Definitions
7. **A** — Token budget
8. **D** — Plugin
9. **A** — Model Context Protocol
10. **D** — Brain, Memory, Tools, and Loop
11. **D** — MCP host-client-server structure
12. **B** — Gastown Polecats
13. **D** — Context Engineering
14. **C** — Professional AI workflow
15. **D** — AGENTS.md rules
16. **C** — AI Agent
17. **C** — Reviewable diff
18. **C** — Slash commands
19. **B** — Skills versus MCP versus Plugins
20. **A** — Tool result feedback

### Part B — Suggested Answers

**21.** Concept: Conversation replay. Recommended action: Prune or summarize old history so replayed context remains focused and affordable.

**22.** The progression from tightly controlled AI assistance to more autonomous, tested, and coordinated workflows. Practical importance: Increase autonomy only after specifications, tests, review, and safe execution controls are mature.

**23.** A structured process that gives the model room to plan, decompose, check, and verify complex work. Practical importance: Separate planning, execution, verification, and final reporting for multi-step tasks.

**24.** An isolated worker created by a supervisor to complete a bounded task and return a concise result. Practical importance: Give each worker a narrow objective, limited tools, and a clear return format.

**25.** Tool Calling: The model emits a structured request for an external function instead of executing that function itself. Tool result feedback: The host sends the raw tool output back to the model so it can decide the next step.

---

# Quiz Set 10

**Suggested time:** 30 minutes  
**Total marks:** 30

## Part A — Multiple Choice

Choose the best answer. Each question carries **1 mark**.

### 1. Which action best follows the course guidance for **Context Window**?

A. Select the smallest context that still contains all necessary evidence and constraints.
B. Store hard requirements and team conventions in version-controlled instruction files.
C. Curate a smaller, task-focused context instead of dumping everything available.
D. Treat the window as a constrained budget and prioritize signal over volume.

### 2. Which concept is demonstrated in this situation?

> The same model family is wrapped with file handling, web search, user accounts, and conversation history.

A. Inference
B. Conversation replay
C. Reasoning workflow
D. GPT versus ChatGPT

### 3. Which statement best defines **Context-first best practice**?

A. The principle that relevant, structured context is the foundation of reliable model and agent output.
B. A focused context for each worker that excludes irrelevant details from other tasks.
C. An isolated execution environment that limits damage from untrusted or unexpected agent-generated actions.
D. An isolated worker created by a supervisor to complete a bounded task and return a concise result.

### 4. Which concept is best described as: **Relevant information receives less effective focus because it competes with excessive irrelevant context.**

A. Context Engineering
B. Context ordering
C. Project instruction files
D. Attention dilution

### 5. Which concept is best described as: **A workflow in which the agent plans work, performs it, reviews the output, and validates it with tests.**

A. YOLO Mode
B. Workflow maturity
C. Spec-Driven Development
D. Plan, Execute, Review, Test

### 6. Which concept is best described as: **A controlled chain from requirement to specification, agent teamwork, Skills, MCP, Hooks, Sandbox, and reviewable output.**

A. Supervisor-worker pattern
B. Reviewable diff
C. Gastown Polecats
D. Professional AI workflow

### 7. Which concept is demonstrated in this situation?

> A pre-commit check automatically verifies required files before changes can be committed.

A. Programmatic approval policy
B. Hooks
C. Zero-trust execution
D. Supervisor agent

### 8. Which action best follows the course guidance for **MCP server capabilities**?

A. Expose narrowly scoped capabilities with clear permissions and descriptions.
B. Use this sequence as a default for meaningful coding or operational tasks.
C. Increase autonomy only after specifications, tests, review, and safe execution controls are mature.
D. Pair repeated improvement with limits and objective evaluation criteria.

### 9. Which concept is best described as: **Application-managed storage that saves user preferences, facts, or state and injects relevant items into context.**

A. Stop conditions
B. GPT versus ChatGPT
C. Conversation replay
D. Persistent memory layer

### 10. Which concept is best described as: **Schemas in the context that describe available tools, arguments, and expected usage.**

A. Conversation History
B. Attention dilution
C. System Prompt
D. Tool Definitions

### 11. Which concept is best described as: **Multiple specialized agents coordinated to complete parts of one larger system in parallel.**

A. Professional AI workflow
B. Swarm or Agent Team
C. Gastown Polecats
D. Hooks

### 12. Which concept is demonstrated in this situation?

> A new API call contains only the latest message, so the model cannot know an earlier conversation.

A. Statelessness
B. Brain, Memory, Tools, and Loop
C. Training
D. AI Agent

### 13. Which action best follows the course guidance for **Workflow maturity**?

A. Increase autonomy only after specifications, tests, review, and safe execution controls are mature.
B. Write accurate name and description metadata plus clear executable steps.
C. Publish repeatable, versioned bundles rather than relying on informal setup instructions.
D. Expose narrowly scoped capabilities with clear permissions and descriptions.

### 14. Which concept is demonstrated in this situation?

> A payments project states that money uses integer minor units and full PAN values must never be logged.

A. System Prompt
B. Tool Definitions
C. Memory and Environment
D. AGENTS.md rules

### 15. Which concept is best described as: **Loading Skill instructions only when the current task requires them, saving context space.**

A. Lazy Skill loading
B. MCP host-client-server structure
C. Plan, Execute, Review, Test
D. Custom Skill

### 16. Which action best follows the course guidance for **Custom Skill**?

A. Expose narrowly scoped capabilities with clear permissions and descriptions.
B. Increase autonomy only after specifications, tests, review, and safe execution controls are mature.
C. Use MCP when standardized access to live external systems is needed.
D. Create focused Skills that load only when their procedure is relevant.

### 17. Which concept is best described as: **An agent loop that combines reasoning and acting through Think, Act, Observe, and Repeat.**

A. ReAct pattern
B. Host application
C. Inference
D. Tool Calling

### 18. Which concept is best described as: **A focused context for each worker that excludes irrelevant details from other tasks.**

A. Supervisor-worker pattern
B. Clean worker context
C. Zero-trust execution
D. Sandbox

### 19. Which concept is demonstrated in this situation?

> A summary remembers that a bug was fixed but drops the exact edge case that caused it.

A. Prompt Engineering
B. Lost in the Middle
C. Lossy summarization
D. Context Engineering

### 20. Which concept is best described as: **The process of updating model weights using large datasets and optimization.**

A. ReAct pattern
B. Tool result feedback
C. Token budget
D. Training

## Part B — Short Answer

Answer briefly but clearly. Each question carries **2 marks**.

### 21. Compare **Custom Skill** and **Model Context Protocol**. Give one clear difference.

### 22. Read the situation and identify the main concept. Then give one recommended action.

> A crucial requirement is placed between dozens of unrelated files and is overlooked by the model.

### 23. Compare **Compacting** and **Project instruction files**. Give one clear difference.

### 24. Explain **Statelessness** and state one practical reason it matters in an AI workflow.

### 25. Read the situation and identify the main concept. Then give one recommended action.

> An agent stops after three failed retries or when all acceptance criteria pass.

---

## Answer Key — Set 10

### Part A

1. **D** — Context Window
2. **D** — GPT versus ChatGPT
3. **A** — Context-first best practice
4. **D** — Attention dilution
5. **D** — Plan, Execute, Review, Test
6. **D** — Professional AI workflow
7. **B** — Hooks
8. **A** — MCP server capabilities
9. **D** — Persistent memory layer
10. **D** — Tool Definitions
11. **B** — Swarm or Agent Team
12. **A** — Statelessness
13. **A** — Workflow maturity
14. **D** — AGENTS.md rules
15. **A** — Lazy Skill loading
16. **D** — Custom Skill
17. **A** — ReAct pattern
18. **B** — Clean worker context
19. **C** — Lossy summarization
20. **D** — Training

### Part B — Suggested Answers

**21.** Custom Skill: A modular package of reusable procedural guidance, scripts, references, and examples for an agent. Model Context Protocol: An open standard that connects AI hosts to external tools and data through a reusable protocol.

**22.** Concept: Lost in the Middle. Recommended action: Place critical instructions near the beginning or end and reduce irrelevant content.

**23.** Compacting: Condensing older conversation history into a summary so a long session can continue within the context window. Project instruction files: Repository files such as AGENTS.md or CLAUDE.md that contain durable project-specific rules.

**24.** The core LLM does not inherently remember separate requests unless prior information is sent again. Practical importance: Replay, retrieve, or inject the needed history and state on each request.

**25.** Concept: Stop conditions. Recommended action: Set iteration limits, time or token budgets, approval gates, and explicit success criteria.

# Facilitator Notes

- Accept equivalent wording in short-answer responses when the core concept is accurate.
- Award **1 mark** for identifying or defining the main concept and **1 mark** for the practical explanation, distinction, or recommendation.
- For scenario questions, answers should use the terminology from the course, such as LLM, Token, Context Engineering, Tool Calling, MCP, Skills, Plugins, Hooks, Sandbox, Agent SDK, Swarms, and GSD.
- To reduce answer sharing, distribute different set numbers to adjacent participants.

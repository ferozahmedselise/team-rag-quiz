Core Concepts
LLM (Large Language Model) predicts the next token based on previous tokens.
LLMs learn statistical patterns from enormous amounts of text rather than memorizing information.
The basic processing unit is a token, not necessarily a whole word.
The model predicts a probability distribution over possible next tokens and generates text one token
at a time.
Inference is the process of using a trained model to generate responses.
GPT is the underlying language model, while ChatGPT is a full application that wraps GPT with
additional features like conversation history, tools, and web access.
Many AI products (Cursor, GitHub Copilot, Duolingo Max, Atlassian Rovo, etc.) are applications built on
top of LLMs.
The illusion of memory comes from sending the entire conversation with every request—the LLM itself
is stateless.
Reasoning (thinking step by step) improves the model's performance on complex tasks by allowing it
to generate intermediate reasoning before producing the final answer.
Tool Calling: An LLM can request external capabilities such as Python, web search, databases, or APIs.
The application—not the LLM—executes these tools and returns the results.
Looping: Instead of producing a single response, an AI system can repeatedly think, act, observe
results, and continue until a goal is reached.
Combining memory (conversation history), reasoning, tool calling, and looping enables
sophisticated AI applications like ChatGPT, Cursor, Claude Code, and GitHub Copilot.
A modern and practical definition of an AI Agent is: an LLM that uses tools in a loop to achieve a
goal.
Context Engineering is the practice of designing the entire input (context) sent to an LLM to produce
the best possible output.
Prompt Engineering is only one part of Context Engineering; modern AI systems optimize the
complete context, not just the user prompt.
An LLM is stateless, meaning every request must include all the information it needs to generate the
next response.
The quality of an LLM's output depends entirely on the quality of its input context.
Components of Context
System Prompt: Defines the AI's role, behavior, tone, and high-level instructions.
Tool Definitions: Describes which tools (e.g., Python, web search, database) the AI can use and how to
use them.
Memory: Stores persistent information such as user preferences or project-specific knowledge.
Conversation History: Includes all previous user and assistant messages to maintain context.
Reasoning (when applicable): Previous reasoning or intermediate steps may influence future
responses, depending on the model.
Tool Calls & Results: Previous tool requests and their outputs become part of the context.
Project Instruction Files (e.g., agents.md, CLAUDE.md, GEMINI.md): Store coding standards, project
requirements, and persistent instructions for coding agents.
Context Window
Every LLM has a maximum context window (maximum number of tokens it can process).
If the total input exceeds the context window, the raw model cannot process it.
Larger context windows do not automatically produce better results.
Too much irrelevant context can:
Reduce accuracy
Cause the model to overlook important details
Decrease overall response quality
The best results usually come from providing only the most relevant information.
Compacting (Conversation Summarization)
AI applications may automatically summarize older conversations to free up context space.
Compacting helps continue long conversations without exceeding the context window.
Older AI systems often lost important details during summarization.
Modern compacting is much better, but it is still a lossy process.
For critical project rules, use persistent instruction files (like agents.md) instead of relying only on
conversation history.
Best Practices
Focus on Context Engineering, not just Prompt Engineering.
Keep the context relevant, concise, and organized.
Avoid filling the context window with unnecessary information.
Store long-term project instructions in persistent files rather than repeating them in every prompt.
Trust modern compacting for general use, but manually preserve critical information for important
tasks.


From week 2 & week 3
Custom Skills
MCP
Plugins
Skills vs MCP vs Plugins
Sub Agents
Hooks
Sandboxing
Remote Execution
Claude Agent SDK
Swarm
Agent Team
GSD (Spec-Driven Development)
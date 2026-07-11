---
permalink: /self-evolving-agents/
title: "A Taxonomy of Self-evolving Agents"
excerpt: "Reading notes by Hao Zhang"
author_profile: true
---

Self-evolving agents are becoming a useful umbrella idea for a growing family of systems: coding agents that improve their outputs through repeated verification, research agents that search for new hypotheses or algorithms, robots that improve policies through interaction, and LLM systems that update memory, prompts, tools, or even model parameters over time.

My main takeaway is that "self-evolution" becomes much easier to reason about if we ask where the improvement happens. A useful decomposition is:

1. **Artifacts**: the external outputs produced by an agent.
2. **Harness**: the surrounding agent system, including prompts, memory, tools, skills, routing, and execution loops.
3. **Model**: the underlying model parameters or inference-time learning mechanism.

These three layers are tightly connected, but separating them helps clarify what different papers and systems are actually optimizing.

# Artifact-Level Iterative Optimization

The first category improves the product of the agent's work rather than the agent itself. The agent proposes a candidate artifact, receives feedback from tests, benchmarks, simulations, reviewers, or other evaluators, and then tries again. This pattern is common in code generation, scientific search, kernel optimization, automated research, and other settings where outputs can be checked.

The key advantage is that the feedback loop can be made concrete. A generated program either passes tests or fails. A discovered algorithm either improves a metric or does not. A proposed experimental design can be scored against constraints. Stronger LLMs make this loop more powerful because they can generate more diverse candidates, inspect failures, and plan longer sequences of changes.

In this category, the agent behaves like an optimizer over a large design space. The model and harness may remain fixed, while the artifact changes across iterations.

# Harness-Level Self-Improvement

The second category improves the agent's operating system without changing model weights. This includes updating prompts, writing reusable memories, creating tools, saving skills, and organizing specialized agents for different task families.

Prompt and memory updates give the agent a way to reuse lessons from previous tasks. Tool and skill creation goes further: if a repeated workflow can be encoded as code or a procedural routine, the agent can call it later instead of rediscovering the same process from scratch. This can reduce context burden and make the system more reliable.

Multi-agent systems also fit naturally here. Instead of one general agent carrying every possible tool and memory, a system can build or select specialized agents with narrower contexts. Routing then becomes central: the system must decide which expert should handle a given task.

In this category, evolution changes the harness. The agent becomes better not because the base model was retrained, but because the environment around the model became more capable.

# Model-Level Learning without Gold Answers

The third category updates the model itself, often in settings where clean labels are unavailable. Related ideas include self-training, reinforcement learning from weak signals, self-play, online learning, continual learning, and test-time adaptation.

The central problem is how to create useful learning signals when there is no perfect answer key. A system may use pseudo-labels, internal confidence, environment feedback, self-play outcomes, or delayed success signals. This is harder than artifact-level iteration because the update affects future behavior broadly, not just one output.

Model-level evolution is powerful but risky. It can improve general capability, but it must manage noise, distribution shift, and forgetting. The old continual-learning problem remains relevant: learning something new should not erase what the model already knew.

# A Practical View

For real systems, the most interesting direction is probably not choosing one layer forever. A capable self-evolving system may improve artifacts, update its harness, and eventually generate data or feedback that helps model learning. These loops reinforce each other:

- better models can search more effectively;
- better harnesses can structure longer and safer loops;
- better artifacts can create new evidence, benchmarks, or training signals.

When evaluating a self-evolving agent, I would ask three practical questions:

1. What exactly is being improved?
2. What feedback signal decides whether the improvement worked?
3. Where does the loop stop or hand control back to a human?

This framing keeps the term "self-evolving agent" grounded. It shifts attention away from labels and toward the actual mechanism: the changing component, the feedback source, and the boundary of the loop.

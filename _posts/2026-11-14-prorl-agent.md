---
title: 'ProRL Agent: treating rollouts as a service'
excerpt: Decoupling environment execution from optimization makes multi-turn agent training easier to scale and
  to move between trainers.
topic: Agent systems
topic_key: systems
paper_date: '2026-03-19'
paper_title: 'ProRL Agent: Rollout-as-a-Service for RL Training of Multi-Turn LLM Agents'
paper_url: https://arxiv.org/abs/2603.18815
paper_authors: Hao Zhang, Mingjie Liu, Shaokun Zhang, Songyang Han, Jian Hu, Zhenghui Jin, Yuchi Zhang, Shizhe Diao,
  Ximing Lu, Binfeng Xu, Zhiding Yu, Jan Kautz, Yi Dong
paper_kind: arXiv paper
layout: research-note
date: '2026-11-14'
permalink: /blog/prorl-agent/
research_post: true
research_order: 13
related: false
comments: false
share: false
---

A rollout is more than model generation. A coding agent may need a repository, dependencies, a running sandbox, several tool calls, and a test suite before a reward can be assigned.

## Separate execution from optimization

[ProRL Agent](https://arxiv.org/abs/2603.18815) serves the multi-turn rollout lifecycle through an API. It separates the rollout service from the RL trainer and supplies extensible sandbox environments, including support for rootless HPC settings. The system is integrated into NVIDIA NeMo Gym.

The [server design](https://arxiv.org/html/2603.18815v1#S3.SS3) distinguishes initialization, agent execution, and evaluation. These stages have different bottlenecks: initialization can be I/O-heavy, execution depends on model inference, and scoring can range from a quick check to a long test suite. The experiments cover software engineering, math, STEM, and coding tasks.

## Why stages should overlap

Consider an illustrative worker that spends 20 seconds preparing a sandbox, 60 seconds running the agent, and 20 seconds scoring its output. A strictly sequential worker uses only one stage at a time. Multiple in-flight jobs create an opportunity to prepare one environment while another agent runs and a third result is evaluated.

Those example times are not paper measurements. They show why separating stages can expose unused resources. Actual speedup depends on capacity at every stage; adding concurrency cannot eliminate the slowest shared bottleneck.

## A service contract is a research interface

A trainer needs to know what it submitted, how to retrieve a result, and how to handle an interrupted rollout. The environment service needs to know how to execute and score the task. Keeping those responsibilities explicit makes it easier to change an optimizer without reimplementing the environment.

Decoupling also moves integration questions into the contract. A useful implementation must still define which policy produced the trajectory and which tokens are actions. Distributing execution without preserving that information would make the system faster at producing ambiguous training data.

## Following the progression

The paper establishes a rollout-service design rather than a universally best RL objective. [Polar](/blog/polar/) continues this direction with black-box harness capture and token-faithful reconstruction. [Molt](/blog/molt/) connects agent execution to a broader asynchronous training and storage stack.

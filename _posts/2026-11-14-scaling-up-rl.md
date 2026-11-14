---
title: 'Scaling Up RL: why training longer needs an evolving recipe'
excerpt: Prolonged reinforcement learning raises questions about exploration, reference-policy drift, and how to
  interpret gains across reasoning domains.
topic: RL algorithms
topic_key: algorithms
paper_date: '2025-07-16'
paper_title: 'Scaling Up RL: Unlocking Diverse Reasoning in LLMs via Prolonged Training'
paper_url: https://arxiv.org/abs/2507.12507
paper_authors: Mingjie Liu, Shizhe Diao, Jian Hu, Ximing Lu, Xin Dong, Hao Zhang, and collaborators
paper_kind: arXiv report
layout: research-note
date: '2026-11-14'
permalink: /blog/scaling-up-rl/
research_post: true
research_order: 14
related: false
comments: false
share: false
---

A short training run can hide a stability problem. An initially useful update rule may later stop exploring, drift too far from its reference, or improve one task while losing another.

## Duration changes the problem

[Scaling Up RL](https://arxiv.org/abs/2507.12507) studies prolonged training across math, code, STEM, logic, and instruction following. It combines verifiable rewards with changes to GRPO-style training, including controlled KL regularization, clipping choices, exploration-oriented adjustments, and periodic resets of the reference policy and optimizer state.

The [training recipe and ablations](https://arxiv.org/html/2507.12507v1#S5) describe entropy collapse, sudden validation regressions, and the effects of sampling and reset decisions. Longer training is therefore investigated as a staged recipe, rather than simply adding more steps to one fixed configuration.

## Reward is only one curve

Imagine a model that learns one narrow strategy that works on most training prompts. Its average reward may rise while its distribution of attempted solutions becomes less diverse. That can be a useful specialization or a warning sign, depending on what the evaluation requires.

This example explains why reward, output entropy, response length, and held-out performance answer different questions. None is a complete substitute for the others. A longer response can contain more reasoning, repeated text, or an unfinished attempt; length alone does not decide which.

## Interpreting a reset

Resetting a reference policy changes the anchor used to measure subsequent policy movement. It does not erase the current model's learned weights. Resetting optimizer state is another intervention with its own effect on future updates.

The [paper](https://arxiv.org/html/2507.12507v1#S5.SS3) reports using these resets to recover stability or continue progress when extending runs. Because stages can also change data, rewards, and other settings, the final model's gains should not be attributed solely to training duration.

## What a longer-run study should preserve

A useful experiment log records each intervention, the reason it was made, and a consistent evaluation panel before and after it. That makes it possible to distinguish continuation from a recipe change. Fixed-budget comparisons would be needed to isolate the benefit of any one intervention.

This question continues in [LoGRA](/blog/logra/), where memory determines which long runs fit, and [REINFORCE Zero](/blog/reinforce-zero/), which studies stability when generation and learning run asynchronously.

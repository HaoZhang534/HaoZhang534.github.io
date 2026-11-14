---
title: 'ProCUA-SFT: grounding synthetic computer-use data in real tasks'
excerpt: Useful demonstrations need feasible starting states, realistic artifacts, and training examples that match
  the agent’s inference context.
topic: Data & evaluation
topic_key: data
paper_date: '2026-06-15'
paper_title: ProCUA-SFT Technical Report
paper_url: https://arxiv.org/abs/2606.17321
paper_authors: Jaehun Jung, Ximing Lu, Brandon Cui, Muhammad Khalifa, Shaokun Zhang, Hao Zhang, Jin Xu, Amala Sanjay
  Deshmukh, Karan Sapra, Andrew Tao, Yejin Choi, Jan Kautz, Mingjie Liu, Yi Dong
paper_kind: arXiv report
layout: research-note
date: '2026-11-14'
permalink: /blog/procua-sft/
research_post: true
research_order: 10
related: false
comments: false
share: false
---

More demonstrations are useful only if they teach the behavior the deployed agent actually needs. For computer use, that includes the initial desktop state and the sequence of observations available before each action.

## Build trajectories from feasible worlds

[ProCUA-SFT](https://arxiv.org/abs/2606.17321) creates 3.1M step-level samples from 93K synthetic trajectories across 2,484 application combinations. Tasks are grounded in existing content and checked for feasible preconditions before rollout. One VLM serves as goal generator, precondition judge, and executor.

Trajectories become step-prefix examples that reproduce the inference-time context format. In the [reported evaluation](https://arxiv.org/html/2606.17321v1#S4), one epoch of UI-TARS 7B fine-tuning reaches 45.0% on OSWorld, compared with 26.3% for the base model. The paper also observes negative transfer when continuing the same base model on AgentNet, illustrating that dataset size is not a sufficient quality criterion.

## The starting state is part of the example

Consider a hypothetical instruction to edit the second chart in an open presentation. If the starting file has only one chart, a fluent action sequence cannot make the example well specified. If the file exists but the agent sees a different application state during training, the action may be correct in the annotation and impossible in the actual environment.

This is why a training example for an interactive agent is more than a prompt and a final answer. It includes an environment, an observation history, an action convention, and a way to decide whether the attempt finished.

## Match the context the learner will see

Teacher forcing can hide a mismatch between data preparation and deployment. If a step is trained with information that would only appear later, the learner solves an easier problem than the live agent. Prefix construction is a natural place to audit that boundary.

A useful independent check would replay sampled examples from their recorded starting states and inspect whether every demonstrated action was justified by the available observations. That proposal follows from the data-design problem; it is not a new result reported here.

Read [OSWorld-Pro](/blog/osworld-pro/) for process-level evaluation, and [Nemotron 3 Nano Omni](/blog/nemotron-nano-omni/) for a multimodal model that uses a subset of ProCUA in training.

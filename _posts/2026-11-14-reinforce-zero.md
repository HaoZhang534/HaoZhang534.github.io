---
title: 'REINFORCE Zero: aligning execution before correcting policy lag'
excerpt: Why matching the learner and rollout engine changes what a simple asynchronous policy-gradient update can
  achieve.
topic: RL algorithms
topic_key: algorithms
paper_date: '2026-11-02'
paper_title: 'REINFORCE Zero: Kernel Alignment Unlocks Stable Asynchronous RL with Importance Sampling'
paper_url: https://github.com/hijkzzz/REINFORCE-Zero/blob/main/REINFORCE-Zero.pdf
paper_authors: Jian Hu, Hao Zhang, Yifan Zhang, Binfeng Xu, Ao Shen, Shaokun Zhang, Yunheng Zou, Yan Bai, Jan Kautz,
  Yi Dong
project_url: https://hijkzzz.github.io/REINFORCE-Zero/
paper_kind: Technical report
layout: research-note
date: '2026-11-14'
permalink: /blog/reinforce-zero/
research_post: true
research_order: 1
related: false
comments: false
share: false
---

Asynchronous RL lets agents keep working while a learner updates their policy. That improves resource use, but it complicates a basic question: how probable was the action that produced this experience?

## Two disagreements hiding in one ratio

[REINFORCE Zero](https://github.com/hijkzzz/REINFORCE-Zero) separates **weight lag** from **numerical execution mismatch**. Older rollout weights create the first. Different kernels can create the second even when weights and token histories agree. Trainer–inference invariance, or TII, aligns execution; unclipped token-level importance sampling then corrects the remaining weight lag.

The recipe uses recorded behavior probabilities, group-mean advantages, and averaging within each response. It does not require ratio clipping or sample-rejection gates. The [algorithm guide](https://github.com/hijkzzz/REINFORCE-Zero/blob/main/ALGORITHM.md) describes the update and alignment workflow.

## An intuition for the correction

Suppose an action was sampled with probability 0.2 and the current policy assigns it 0.3. Its importance weight is 1.5. This elementary example assumes that 0.2 really describes the sampler. If a later recomputation supplies a different denominator, the update answers a different statistical question.

This is why logging the sampler's probabilities and checking execution agreement are separate engineering tasks. One preserves the evidence; the other makes the computational paths comparable. A loss function alone cannot repair missing provenance about how a token was sampled.

## What the experiments establish

The [reported experiments](https://hijkzzz.github.io/REINFORCE-Zero/) sustain 20,000 reasoning updates at nominal lags 2 and 8. A 16-GPU comparison reports 2.40× training-step throughput versus synchronous TII across 12,000 updates; evaluation time is excluded. The nominal lag-8 run has a measured mean lag around 10.5, so the configured lag is not the entire staleness distribution.

## What to carry into a new system

A useful diagnostic order is to compare identical weights and histories first, then introduce asynchronous weight updates. Otherwise, two sources of disagreement change simultaneously and the resulting instability is hard to interpret. This is an experimental-design recommendation, not a guarantee that every model or kernel stack will behave identically.

Read this alongside [FlashREINFORCE](/blog/flashreinforce/) for a different treatment of stale trajectories, and [Molt](/blog/molt/) for the training infrastructure.

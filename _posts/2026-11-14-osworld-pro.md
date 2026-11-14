---
title: 'OSWorld-Pro: seeing where a computer-use agent gets stuck'
excerpt: A final success score is useful, but subgoals and action-level evidence make failures much easier to understand.
topic: Data & evaluation
topic_key: data
paper_date: '2026-09-21'
paper_title: 'OSWorld-Pro: Process-based Evaluation for Computer Use Agents'
paper_url: https://arxiv.org/abs/2609.24890
paper_authors: Zhilin Wang, Shaokun Zhang, Yifan Zhang, Hao Zhang, Jin Xu, Binfeng Xu, Jian Hu, Yunheng Zou, Karan
  Sapra, Andrew Tao, Jan Kautz, Yi Dong
paper_kind: arXiv paper
layout: research-note
date: '2026-11-14'
permalink: /blog/osworld-pro/
research_post: true
research_order: 6
related: false
comments: false
share: false
---

Two desktop agents can fail the same task for entirely different reasons. One never opens the right application. Another completes the requested edit but saves it in the wrong place. A single zero cannot distinguish them.

## Make progress observable

[OSWorld-Pro](https://arxiv.org/abs/2609.24890) adds process-based evaluation to computer-use agents. It contains more than 300 tasks, over 2,800 subgoals, and more than 67,000 human annotations. Human-aligned LLM judges assess progress through these sequentially dependent subgoals.

The [evaluation and analysis](https://arxiv.org/html/2609.24890v1#S6) examine action-level failures, including coordinate errors and actions irrelevant to the task's subgoals. The paper also finds differences between judge agreement on completion and on intermediate progress; automated process assessment is itself a measurement problem.

## A concrete example

Imagine a task that asks an agent to find a spreadsheet, change a chart, and export a PDF. Possible subgoals include opening the correct workbook, editing the intended chart, and producing the requested export.

If the agent clicks the wrong chart, a later formatting action may execute successfully in the application while making no progress toward the user's goal. “The click worked” and “the task advanced” are different judgments. A useful trace preserves both what the interface did and which requirement that action was meant to satisfy.

This example also shows why subgoals are not always independent. An export can be a valid file while containing the wrong earlier edit.

## How to use the extra signal

Process measurements suggest where to investigate: perception, action targeting, planning, or recovery. They need not replace a final artifact check. A completed sequence of locally plausible actions still has to produce the requested result.

In a new benchmark, I would compare process labels with direct inspection of the final state and examine cases where judges disagree. That is a proposed diagnostic workflow, rather than a new result from this paper. It helps prevent a richer-looking evaluation from becoming harder to validate.

[ProCUA-SFT](/blog/procua-sft/) approaches computer use from the training-data side. [Skill2Env](/blog/skill2env/) studies how outcome tests and behavioral criteria can coexist in training environments.

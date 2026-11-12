---
title: Kavach (AgentShield) — Zero-Trust Runtime Security Platform
category: projects
source: resume (SDE.pdf) + owner brief + lib/portfolio-data.ts
updated: 2026-11-11
verified: true
tags: [kavach, agentshield, security, zero trust, authorization, cedar, bedrock, aws fargate, bandit, semgrep, gitleaks, multi-agent]
---

# Kavach (also referred to as AgentShield)

**One-liner:** A zero-trust runtime security platform for AI-agent tools: a multi-agent security and authorization sandbox with a scanner agent and an authorization agent.

**Stack:** Python, FastAPI, AWS Fargate, Amazon Bedrock, Docker, Cedar.
**GitHub:** https://github.com/shreyad2806/Kavach

## What it does
- A two-agent security platform combining isolated execution environments, runtime authorization and capability-based access controls.
- Connects Amazon Bedrock with four security scanners — Bandit, Semgrep, pip-audit and Gitleaks — to identify code, dependency and secret-exposure risks.
- Enforces fail-closed authorization across 10 protected tool methods.
- Validated with integration tests and payload stress tests up to 1 MB.

## Case study
There is no case-study page for Kavach yet; the GitHub repository is the source.

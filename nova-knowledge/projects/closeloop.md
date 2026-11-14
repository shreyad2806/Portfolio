---
title: CloseLoop
category: projects
source: resume (approved) + lib/portfolio-data.ts
updated: 2026-11-11
verified: true
tags: [closeloop, razorpay, reconciliation, langgraph, guardrails, fastapi, postgresql, xgboost, pgvector, mcp, fintech, agentic]
---

# CloseLoop

**One-liner:** An AI-assisted financial reconciliation and exception-resolution platform that combines deterministic transaction matching with an agentic investigation workflow.

**Stack:** Python, FastAPI, PostgreSQL, XGBoost, pgvector, LangGraph, MCP.
**GitHub:** https://github.com/shreyad2806/razorpay-closeloop

## What it does
Engineers a financial reconciliation backend that combines deterministic transaction matching, ML-based exception classification, evidence retrieval and resolution recommendations. Rather than letting an LLM directly modify financial records, the system uses guardrails, provider abstraction and post-action verification.

## Architecture
1. Payment and settlement ingestion
2. Deterministic reconciliation
3. Exception creation
4. Evidence gathering
5. Classification (XGBoost-based exception classification)
6. Guardrail evaluation (five fail-closed guardrail gates, approval checks and idempotency controls)
7. Provider abstraction
8. Action execution (controlled resolution execution)
9. Financial state verification (post-resolution verification)

## Orchestration
The workflow is a 17-node LangGraph graph with five fail-closed guardrail gates, approval checks, idempotency controls, controlled resolution execution and post-resolution verification (from her resume).

## Testing
Tested on 30 curated financial exceptions across 9 exception types, using synthetic fixtures, SQLite unit tests and Docker-backed PostgreSQL integration tests.

## Case study
There is no case-study page for CloseLoop yet; the GitHub repository is the source.

## Verification notes (internal)
- Her reasons for choosing LangGraph are not documented; Nova must not infer them. (record: closeloop-langgraph-why)
- The repository is named razorpay-closeloop; no source describes any relationship with Razorpay. Nova calls it "CloseLoop" and does not imply an affiliation. (record: closeloop-razorpay)

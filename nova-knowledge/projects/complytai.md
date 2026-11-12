---
title: ComplytAI — Enterprise compliance platform that combines RAG, local LLMs, vector search, and CrewAI-based agent orchestration for document analysis and risk detection.
category: projects
source: lib/project-detail-data.ts (portfolio case study)
updated: 2026-11-10
verified: true
tags: [complytai, complytai, next.js, typescript, python, fastapi, crewai, ollama, qwen2.5, nomic-embed-text, pinecone, rag, postgresql]
---

# ComplytAI

**One-liner:** Enterprise compliance platform that combines RAG, local LLMs, vector search, and CrewAI-based agent orchestration for document analysis and risk detection.

**Stack:** Next.js, TypeScript, Python, FastAPI, CrewAI, Ollama, Qwen2.5, nomic-embed-text, Pinecone, RAG, PostgreSQL
**GitHub:** https://github.com/shreyad2806/ComplytAI
**Case study page:** /projects/complytai

ComplytAI is an end-to-end compliance intelligence system that processes enterprise documents, retrieves relevant regulatory context, and uses local LLM reasoning with CrewAI orchestration to identify compliance risks and generate actionable insights.

## What problem does ComplytAI solve?
- Organizations manage thousands of compliance documents, policies, contracts, audit reports, and regulatory guidelines.
- Manually searching through large document collections is slow and makes it difficult to find relevant regulatory context quickly.
- Important compliance risks can be overlooked because analysts have to process large volumes of information.
- Compliance teams spend significant time reviewing repetitive documents and comparing policies against regulatory requirements.
- Traditional document search systems do not understand semantic relationships between compliance requirements, policies, and enterprise documents.
- ComplytAI combines document intelligence, RAG, local LLM reasoning, and agent orchestration to assist with compliance analysis and risk detection.

## Architecture
1. **Enterprise Documents** — Ingest policies, contracts, audit reports, regulatory documents, and other compliance material.
2. **Document Processing** — Extract, clean, normalize, and prepare documents for downstream retrieval.
3. **Semantic Chunking** — Split documents into meaningful sections optimized for retrieval and contextual understanding.
4. **Embedding Generation** — Generate dense vector representations using the nomic-embed-text embedding model.
5. **Pinecone Vector Database** — Store document embeddings and provide scalable semantic retrieval.
6. **Hybrid Retrieval** — Retrieve relevant regulatory and enterprise context using semantic and keyword-based signals.
7. **Ollama + Qwen2.5** — Run local LLM inference for compliance reasoning and document analysis.
8. **CrewAI Agent Orchestration** — Coordinate specialized agents responsible for compliance analysis, risk identification, and structured reasoning.
9. **Risk Analysis Engine** — Analyze retrieved evidence and identify potential compliance risks and violations.
10. **Compliance Dashboard** — Present compliance findings, risk signals, evidence, and analysis results through the web application.

## Features
- **Document Ingestion:** Process enterprise policies, contracts, audit reports, and regulatory documents for analysis.
- **Semantic Search:** Find relevant compliance information using natural-language queries instead of relying only on exact keywords.
- **RAG Question Answering:** Generate context-grounded answers using retrieved regulatory and enterprise document evidence.
- **CrewAI Agent Orchestration:** Coordinate specialized agents for compliance analysis, risk identification, and structured reasoning.
- **Compliance Risk Detection:** Analyze enterprise documentation to identify potential compliance risks and regulatory gaps.
- **Policy Retrieval:** Retrieve relevant policies, requirements, and regulatory context for specific compliance scenarios.
- **Compliance Dashboard:** Visualize analysis results, risk findings, and compliance insights through a centralized interface.
- **Local LLM Processing:** Run Qwen2.5 locally through Ollama for privacy-conscious document analysis.
- **Enterprise Knowledge Base:** Maintain a searchable vector knowledge layer containing compliance documents and regulatory information.
- **Evidence-Grounded Analysis:** Connect compliance findings to retrieved document context rather than relying solely on model-generated information.

## Engineering decisions
- **Problem:** LLM choice? **Decision:** Qwen2.5 via Ollama **Why:** Provides local LLM inference for privacy-sensitive compliance workflows while reducing dependence on external model APIs.
- **Problem:** Embedding model? **Decision:** nomic-embed-text **Why:** Provides semantic embeddings suitable for document retrieval and enterprise knowledge search.
- **Problem:** Vector database? **Decision:** Pinecone **Why:** Provides scalable vector storage and efficient semantic retrieval for large document collections.
- **Problem:** Agent orchestration? **Decision:** CrewAI **Why:** Provides structured coordination between specialized agents while keeping individual compliance responsibilities modular.
- **Problem:** Backend framework? **Decision:** FastAPI **Why:** Provides high-performance Python APIs, asynchronous processing, type safety, and automatic API documentation.
- **Problem:** Frontend framework? **Decision:** Next.js **Why:** Provides a scalable React-based application architecture for the compliance dashboard and user-facing workflows.
- **Problem:** Primary database? **Decision:** PostgreSQL **Why:** Provides reliable relational storage for application data, metadata, users, and structured compliance information.
- **Problem:** Retrieval approach? **Decision:** RAG + Hybrid Retrieval **Why:** Combines semantic understanding with relevant document evidence to improve retrieval quality and reduce unsupported generation.

## Challenges
- **Problem:** Designing document ingestion **Solution:** Built a structured ingestion pipeline for extracting, cleaning, validating, and preparing enterprise documents for retrieval. **Learning:** Enterprise document processing requires robust handling of inconsistent formats, missing information, and edge cases.
- **Problem:** Choosing embedding models **Solution:** Evaluated the retrieval requirements and selected nomic-embed-text for the semantic document retrieval pipeline. **Learning:** Embedding quality directly affects retrieval quality, making model selection and evaluation important parts of RAG engineering.
- **Problem:** Handling large document collections **Solution:** Designed chunking and batch-processing stages to make document ingestion and indexing more manageable. **Learning:** Scalable AI systems require careful consideration of processing cost, memory usage, indexing strategy, and throughput.
- **Problem:** Improving retrieval quality **Solution:** Combined semantic retrieval with keyword-based signals to improve recall across compliance queries. **Learning:** Hybrid retrieval can provide better coverage when queries contain both domain-specific terminology and semantic concepts.
- **Problem:** Reducing LLM hallucinations **Solution:** Used retrieved document context, structured prompts, and evidence-oriented responses to keep generated analysis grounded. **Learning:** Reliable LLM applications require grounding, validation, and clear boundaries around what the model is allowed to infer.
- **Problem:** Coordinating compliance analysis **Solution:** Introduced CrewAI-based agent orchestration to separate responsibilities across compliance analysis and risk identification. **Learning:** Agentic systems require clearly defined responsibilities, controlled context, and reliable coordination between specialized components.
- **Problem:** Running AI workloads privately **Solution:** Integrated Ollama with Qwen2.5 to support local LLM inference for sensitive compliance workflows. **Learning:** Enterprise AI architecture often requires balancing model quality, privacy, infrastructure cost, and operational complexity.
- **Problem:** Building a usable compliance interface **Solution:** Connected the AI pipeline to a Next.js dashboard that presents analysis results and compliance findings in a structured format. **Learning:** AI systems become useful products only when complex model output is converted into understandable user-facing workflows.

## Results
- **AI Architecture: End-to-End.** Complete document-to-analysis pipeline combining retrieval, LLM reasoning, and agent orchestration.
- **RAG Pipeline: Production.** Document ingestion, embeddings, vector search, retrieval, and grounded generation.
- **Agentic Analysis: CrewAI.** Specialized agent orchestration for structured compliance analysis.
- **LLM Infrastructure: Local.** Qwen2.5 inference through Ollama for privacy-conscious AI processing.
- **Document Search: Semantic.** Vector-based retrieval across enterprise compliance documents.
- **Application: Full Stack.** Next.js frontend connected to Python/FastAPI AI services and supporting infrastructure.

## Learnings
- **Production RAG:** Production RAG requires careful attention to document processing, chunking, embeddings, retrieval quality, latency, and grounding.
- **Agentic AI:** Agentic systems work best when responsibilities are clearly separated and agents operate within controlled context and workflows.
- **Vector Search:** Retrieval quality depends on embedding models, chunking strategies, indexing, query formulation, and retrieval techniques.
- **Enterprise AI Architecture:** Enterprise AI systems require privacy, reliability, scalability, observability, and maintainable service boundaries.
- **Local LLM Infrastructure:** Running models locally introduces important engineering trade-offs around hardware, latency, model size, and privacy.
- **AI Product Engineering:** A useful AI product requires more than model integration; the surrounding APIs, databases, interfaces, validation, and workflows are equally important.

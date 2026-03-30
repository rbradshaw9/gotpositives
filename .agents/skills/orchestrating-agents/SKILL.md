---
name: orchestrating-agents
description: Implements multi-agent orchestration and context-driven development workflows inspired by the wshobson/agents repository. Use when tasked with complex features, full-stack development, security hardening, or when coordinating diverse development roles.
---

# Agent Orchestration & Workflow Automation

## When to use this skill
- When building complex or full-stack features requiring multiple domain expertise (e.g. backend, database, frontend, security).
- When conducting systemic reviews, security audits, or deep debugging.
- When generating comprehensive architecture documentation (e.g., C4 model).

## Workflow

- [ ] **1. Context & Role Assignment**
    - Determine which "agent personas" are needed for the task (e.g., `backend-architect`, `security-auditor`, `frontend-developer`).
    - Adopt a Context-Driven Development approach (Conductor pattern): establish product vision, tech stack, and workflow rules.
- [ ] **2. Phase & Track Planning**
    - Generate a structured specification and phased implementation plan before coding.
    - Organize work into "Tracks" representing logical features or epics.
- [ ] **3. Expert Execution (Three-Tier Strategy)**
    - For critical architecture decisions and security audits, employ maximum reasoning depth.
    - For specialized coding (AI/ML, complex backend), use focused domain-specific reasoning.
    - For operational tasks (simple docs, scripting), output efficiently.
- [ ] **4. Multi-Perspective Review**
    - Perform parallel or multi-staged code reviews adopting different personas (e.g., security, performance, architecture).
- [ ] **5. Architecture & Documentation**
    - Automatically document systems iteratively. Use the C4 model (Context, Container, Component, Code) for large refactors.

## Instructions
- **Modularity:** Treat every feature implementation as a pipeline. Example for full-stack: Database Schema -> Backend API -> Frontend Components -> Automated Tests -> Security Audit -> CI/CD configuration.
- **Hypothesis-Driven Debugging:** When encountering an incident or error, explicitly list 3+ hypotheses before investigating, adopting a multi-agent team approach.
- **Granular Focus:** Do not mix concerns. A security audit phase should look purely at security. A performance phase should look purely at metrics.

## Resources
- [wshobson/agents GitHub Repository](https://github.com/wshobson/agents.git)

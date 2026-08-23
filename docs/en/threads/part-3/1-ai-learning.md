---
title: "Learning Anything with AI: From Task to Verifiable Delivery"
description: Use a task brief, sources, guided practice, project state, quality gates, and real feedback to turn AI learning into reproducible work ability.
updated: 2026-08-24
---

# Learning Anything with AI: From Task to Verifiable Delivery

AI makes it easy to confuse a complete answer with personal learning, runnable code with a finished project, and a polished report with a safe decision. A real result survives after the answer is closed: you can explain, judge, perform, transfer, and leave work another person can inspect.

This chapter treats AI as work infrastructure, not a magic button that thinks on your behalf. Use it for English, programming, research, writing, product, operations, and management, but keep one boundary in every domain: **a person defines the result, AI accelerates the process, and evidence decides whether it passes.**

## 1. The Seven-step Loop

1. **Define a real outcome**: state the audience, situation, decision, deadline, and acceptance criteria instead of “learn this topic”.
2. **Save an unaided baseline**: attempt it independently to expose prerequisites, errors, and blind spots.
3. **Prepare trustworthy sources**: prefer official documentation, textbooks, papers, data, contracts, code, and real cases.
4. **Design guided practice**: ask for questions, hints, comparisons, and layered explanations without outsourcing critical steps.
5. **Produce actively**: close the material and explain, code, write, calculate, demonstrate, or decide.
6. **Use plural feedback**: AI is one vote; tests, primary sources, experts, users, and security review are other votes.
7. **Update state**: save evidence, errors, decisions, open questions, and the smallest next task.

Without step one, AI turns a vague wish into an answer. Without step two, you cannot see whether ability grew. Without steps six and seven, errors recur across sessions.

## 2. Write a Task Brief First

Create a one-page `task-brief.md` for every AI project:

```markdown
# Task Brief

## Task
- Real situation:
- User/audience:
- Decision or action to complete:
- Deadline:

## Inputs
- Known facts and sources:
- Files allowed:
- Data sensitivity: public / internal / confidential / restricted
- Material deliberately withheld:

## Output
- Final deliverable:
- Format and length:
- Acceptance criteria:
- Items a person must confirm:

## Working rules
- AI may:
- AI may not:
- Required human reviewers:
- Rollback or stop condition:
```

Write acceptance criteria as observable actions, such as “a user can import a file and see an error report within ten minutes”, not “the experience feels good” or “the architecture is advanced”.

## 3. An Evidence Ladder for Different Outputs

| Output | Minimum evidence | Stronger evidence |
| --- | --- | --- |
| Explanation | Primary source, key terms, and uncertainty | Closed-book restatement, counterexample, and transfer task |
| Code | Run result and basic tests | Boundary tests, static checks, security review, and real samples |
| Research | Primary link for every material fact | Cross-source verification, counterexamples, definitions, and dates |
| Prose | Audience, purpose, facts, and structure review | Real-reader feedback, revision record, and version comparison |
| Decision | Options, assumptions, cost, and risks | Small experiment, decision log, and after-action review |
| Teaching | Learning goal and practice result | Independent transfer, delayed retest, and changing error pattern |

Do not replace evidence with a confident model voice. For high-risk content, “not yet confirmed” is better than a fluent guess presented as fact.

## 4. Tool-selection Order

1. Is the data sensitive and is upload permitted?
2. Does the task need sources, long material, voice, code execution, images, or collaboration?
3. Can the output be exported, reproduced, tested, and verified independently?
4. Is it available for the region, language, age, account, and plan?
5. What is the total cost, including money, waiting, rework, support, and attention?

See [Learning English with AI](../part-1/7-ai.md) for the boundary between guided learning and long-running projects and for dated official product notes. Do not use platform memory, project context, or a “saved” indicator as your only record; portable state belongs in local files.

## 5. A Portable Project Directory

```text
00-brief/           task brief, audience, acceptance criteria
01-baseline/        unaided sample, initial tests, current screenshots
02-sources/         primary documents, data, licences, source index
03-working/         drafts, experiments, prompts, temporary results
04-output/          deliverable, demo, recording, or build artefact
05-feedback/        user feedback, reviews, error categories
06-decisions/       decision log, change reasons, open questions
07-operations/      deployment, monitoring, permissions, rollback, incidents
learning-state.md   current facts, ability, errors, next action
```

This is not paperwork for its own sake. It lets another person take over, lets you recover after changing models, and lets failure be located in the input, decision, or execution step.

## 6. A Session Protocol

### Before: make AI restate the boundary

```text
Restate in no more than eight bullets: goal, audience, inputs, acceptance criteria, constraints, unknowns, and what you cannot verify.
List the sources you intend to use. Mark source-free facts as unverified.
Do not start the final deliverable. Identify the three risks most likely to cause rework.
```

### During: advance one inspectable slice

```text
Break the task into the smallest verifiable slices. Advance one slice at a time and state: input, assumption, change, check, and next step.
If a prerequisite conflicts, pause and ask instead of silently replacing the requirement.
Keep failed approaches and their reasons; do not show only the prettiest version.
```

### After: produce a state update, not an essay

```text
Based only on what happened in this session, output:
1. completed work and evidence location;
2. judgments confirmed by a source, test, or person;
3. recurring errors, risks, and open questions;
4. the smallest next task, acceptance criteria, and required material.
Do not claim to remember another session or turn inference into fact.
```

## 7. Programming: From Requirement to Reversible Delivery

### 7.1 Requirements and design

Write user stories, non-goals, inputs and outputs, error states, and acceptance tests before asking for an implementation. Ask for at least two options and compare complexity, dependencies, data risk, maintenance cost, and rollback difficulty.

```text
Here is the task brief and current code structure. Do not write code yet.
Propose two minimal implementation options and compare requirement coverage, change scope, dependencies, failure modes, test difficulty, data/permission risk, and migration cost.
Mark missing information and inference. Recommend only one slice that can be verified in one to two hours.
```

### 7.2 Implementation and review

- ask AI to list files, interfaces, and data flows before changing them;
- make one logical change at a time instead of mixing requirement work, refactoring, and formatting;
- require assumptions, error handling, permission boundaries, and compatibility notes;
- let AI generate tests, then check that tests would actually fail for the relevant bug;
- run tests, static checks, dependency audits, and security scans yourself.

Code-review prompt:

```text
Review only this change; do not rewrite it. Check by severity for requirement drift, data loss, permission bypass, injection, races, error handling, performance, maintainability, and test gaps.
For each issue cite the file/line or observable behaviour, trigger, impact, and smallest repair. If there is no evidence, do not call a guess a vulnerability. End with items that still require human verification.
```

### 7.3 Release and rollback

Before release preserve a version, change summary, migration steps, monitored signals, rollback trigger, owner, and user notice. After release watch real errors rather than only a successful build.

For an incident record discovery time, affected scope, recent changes, mitigation, root-cause hypothesis, repair evidence, and prevention work. AI can structure the incident report; it cannot replace the owner responsible for communication and judgment.

## 8. Writing, Research, and Decisions

### Writing

Keep the draft. Review audience, purpose, facts, structure, and risk first. Require quoted passages rather than wholesale rewriting. The named author remains responsible for position, facts, citations, and authorship.

### Industry research

Separate facts, inference, forecasts, and recommendations. For every material number record publication date, measurement definition, primary link, and possible interests. Actively seek counterexamples, missing data, and material that challenges your view.

```text
Break this research question into fact, definition, comparison, causal, and decision questions.
For each, list required evidence, possible sources, and a fallback when evidence is insufficient.
Do not write the conclusion first. Build a table of claim, source, evidence location, counterexample, and confidence.
```

### Decisions

AI can list options and objections, but a person must maintain the decision log: what was known, assumed, selected, rejected, risked, and scheduled for review. A poor result does not prove the original judgment was irrational; distinguish missing information, execution failure, and decision error.

## 9. Feedback, Scoring, and Quality Gates

Feedback protocol:

```text
Restate the task and acceptance criteria. Let me attempt it first.
Separate feedback into facts/sources, task completion, structure/reasoning, skill errors, expression detail, and security/privacy.
Choose only the one to three issues in each category that most affect the result, quoting evidence and marking confidence.
Give one minimal hint and one parallel task. Do not complete the final deliverable.
```

Before publishing, check:

- facts return to primary sources;
- code passes tests, static checks, and security review;
- prose serves audience, purpose, and action request;
- data is within the approved boundary and permissions/links are correct;
- important claims distinguish fact, inference, uncertainty, and interest;
- the owner can explain critical decisions without the AI chat;
- failure has a rollback, notice, repair, and retrospective path.

## 10. Data, Privacy, and Copyright Classification

| Level | Examples | Default handling |
| --- | --- | --- |
| Public | Published documents, public code, public data | Usable after checking source and licence |
| Internal | Unpublished plans, internal process, non-sensitive logs | Approved tools only; limit members and retention |
| Confidential | Customer records, contracts, commercial strategy, unpublished vulnerabilities | Do not upload without explicit approval; prefer local work or redaction |
| Restricted | Keys, identity/health data, children's data, third-party private material | Keep out of general models; follow organisational policy and applicable law |

Deleting a file does not delete every copy. Inspect members, shared links, history, exports, local caches, logs, and backups. Process copyrighted material only within your rights and preserve citation and licence records.

## 11. Team Collaboration: Make AI Work Transferable

Assign a task owner, fact reviewer, technical reviewer, privacy/security reviewer, and release owner. One person may hold several roles in a small project, but the roles must still exist.

Team rules should cover approved tools, forbidden inputs, prompt and output retention, code review, human approval points, supplier outage alternatives, and incident reporting.

The handover package should contain the task brief, source index, current version, test results, known issues, decision log, deployment steps, permission list, rollback method, and next action. Do not hand over only a long prompt that says “ask AI to continue”.

## 12. Cost and Efficiency: Count More Than Saved Minutes

For each task record the model/tool, call count, human time, waiting time, rework, review time, failures, final quality, and unaided performance. A tool that reduces generation time but increases verification, rework, and support may not be more efficient.

Compare four signals each week:

- total delivery time;
- first-pass acceptance rate;
- rework and incidents;
- independent performance when AI is removed.

Enterprise delivery and resource-layer work must also record models, networking, storage, engineering, support, compliance, and incident costs; see [AI Learning, Project Development, and Resource-layer Entrepreneurship](2-ai-development-and-resource-layer.md).

## 13. Seven Days, Thirty Days, Twelve Weeks

### Seven days: one reproducible micro-delivery

- write the task brief and acceptance criteria;
- save an unaided baseline;
- complete a one-to-three-hour deliverable with the seven-step loop;
- save prompts, sources, tests, feedback, final version, and state update;
- record where AI helped, misled, and what remains without it.

### Thirty days: one repeatable workflow

- complete four loops for a recurring task;
- build prompt, source, test, feedback, permissions, and state templates;
- compare time, quality, rework, cost, and independent performance;
- remove tool steps that do not improve the result;
- conduct an incident or failure retrospective, not only a success demo.

### Twelve weeks: delivery to a real user or organisation

- choose a project with value in work, study, or life;
- obtain real-audience feedback every two to four weeks;
- complete fact, test, security, privacy, copyright, cost, and handover review;
- export material and state, then write a one-page retrospective and next-cycle decision;
- if evidence does not support continuing, narrow the problem, change the audience, or stop instead of hiding the gap under more prompts.

## 14. Acceptance Questions

1. Can I explain key conclusions and critical decisions without the chat?
2. Can facts, numbers, and citations return to primary sources?
3. Has the output passed a real test, review, or audience check?
4. Which parts are fact, inference, or still uncertain?
5. Did I expose unnecessary data, permissions, or third-party content?
6. Can another person reproduce the code, prose, or research result?
7. Did I record cost, rework, and support rather than generation speed alone?
8. Who can pause, roll back, notify, and review a failure?
9. Can I complete the next similar task with less assistance?
10. What durable asset did this delivery leave for someone else?

Previous: [Learning English with AI](../part-1/7-ai.md) | Next: [AI Learning, Project Development, and Resource-layer Entrepreneurship](2-ai-development-and-resource-layer.md) | Template: [Learning State](../../templates/learning-state.md)

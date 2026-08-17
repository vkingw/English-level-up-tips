---
title: "Learning English with AI: Choose by Task"
description: Use guided learning, project context, source material, output feedback, and a local learning-state file without betting on one provider.
updated: 2026-08-16
---

# Learning English with AI: Choose by Task

AI can reduce time spent finding material, creating practice, and receiving preliminary feedback. It cannot perform your retrieval, listening discrimination, articulatory movement, judgment, or real communication. Choose a task before a brand.

> Verified **2026-08-16**. Availability changes by region, age, language, device, account, and plan; check the linked official page before use.

## Do Not Confuse Two Workspaces

### Guided learning: one instructional conversation

Use it for scaffolded explanation, questions, hints, open tasks, quizzes, and knowledge checks. OpenAI describes ChatGPT Study Mode as step-by-step guidance with interactive prompts, scaffolded replies, and checks. It can be toggled and may behave inconsistently. Ask it to let you answer first, and do not treat every response as an authoritative lesson.

### Projects: long-running context and artefacts

Use projects for course material, goals, chat history, errors, and work. The ChatGPT Projects help page says projects keep chats, files, instructions, and project context together. **The same page explicitly states that Study Mode does not apply to Project conversations.** Do not assume placing one inside the other combines both capabilities.

A portable combination is:

1. maintain [Learning State](../../templates/learning-state.md) locally;
2. keep permitted material and work in a project;
3. open a separate guided-learning conversation when needed;
4. write evidence, errors, and the next action back to the local file.

Platform memory and accounts change. The local file is the transferable source of truth.

## Divide Tools by Task

| Task | Possible capability | Boundary checked 2026-08-16 |
| --- | --- | --- |
| Guided learning and checks | ChatGPT Study Mode; Gemini guided learning, quizzes/flashcards | Sign-in required; some Gemini mobile features roll out gradually; OpenStax integration has US, English, age, and account restrictions |
| Long-running context | ChatGPT Projects; Claude Projects | ChatGPT Projects cover free and paid accounts; Claude Projects cover all users, free accounts have up to five, enhanced RAG is paid |
| Learning from your sources | NotebookLM; file-enabled projects | Return to the original page or paragraph; check rights and privacy before uploading |
| Web research with citations | Perplexity or products with search and citations | A citation does not prove support; open the primary source |
| Explanation and feedback | ChatGPT, Claude, Gemini | Fluent explanations can be wrong; use criteria and external verification |
| Language polishing | DeepL Write or general models | Polishing can hide actual skill; keep the draft and explain changes |
| Live speaking | Voice products such as Gemini Live or ChatGPT Voice | Recognition and pronunciation judgments can fail; availability varies |

This is not a ranking. Consider sensitivity, task, language, feedback quality, and exportability.

## Build the Project

```text
00-goal/            real task and acceptance criteria
01-baseline/        samples untouched by AI
02-materials/       permitted articles, transcripts, course material
03-output/          recordings, drafts, revisions
04-errors/          categories and minimal pairs
learning-state.md   current facts and next action
```

Project instruction:

```text
Act as an English practice reviewer. Let me attempt the task before providing a complete answer. Review task completion, comprehensibility, accuracy/range, organisation/fluency, and revision/transfer. Select only one to three high-impact problems, quote my wording, give one minimal contrast and one parallel exercise. State uncertainty and recommend a dictionary, corpus, or primary source when needed.
```

## Vocabulary

Use real material and target chunks instead of random daily lists.

```text
Select eight chunks from this material that most affect comprehension or are likely to recur in my work. Explain the selection, then provide the current sense, pronunciation cue, collocation, source sentence, and one gap. Let me answer before showing answers. Flag anything that needs dictionary or corpus verification.
```

Verify candidates, then use delayed retrieval and new-context production from the [Vocabulary chapter](2-vocabulary.md).

## Listening

1. Listen once without a transcript and record gist and detail.
2. Mark missed time ranges on a second pass.
3. Classify them as unknown language, known-but-not-heard, connected speech, attention, or background knowledge.
4. Shadow difficult lines, close the transcript, and retell.
5. Test transfer on parallel material one week later.

AI transcripts can be wrong. Compare important material with official captions or human review.

## Speaking and Pronunciation

```text
Run a six-turn [scenario] conversation. Say only one or two sentences per turn and wait. At the end, review task completion, comprehensibility, pauses, chunks, and one high-impact pronunciation feature. Quote transcript evidence. If speech recognition is insufficient for a pronunciation judgment, say so.
```

Keep the first recording, transcript, feedback, and second take. Successful recognition does not prove natural pronunciation, and failed recognition does not prove an error.

## Reading

Read first, then ask AI to coach:

```text
Do not summarise first. Ask me for the author's claim, key evidence, implicit assumption, and one counterexample. Follow up from my answers. Finally mark each statement as supported by the text, reasonable inference, or unsupported, with paragraph evidence. Say when evidence is absent.
```

Use primary material for research reading rather than asking a model to reconstruct a paper from memory.

## Writing

Keep an unaided draft, annotated version, and self-revised final.

```text
First judge whether this text serves [audience/purpose]. Do not rewrite it wholesale. Rank no more than five issues by impact; quote each passage, explain the effect, and give a minimal example. Separate factual, structural, and language issues. Ask me to rewrite the weakest paragraph before reviewing version two.
```

If you cannot explain a change, it has not become your skill.

## When Feedback Is Unreliable

- require quoted evidence or sources for judgments;
- check high-risk language with dictionaries, corpora, teachers, or audiences;
- allow “I am uncertain” as an answer;
- do not ask AI to judge personality, intelligence, or medical state;
- complete regular unaided samples so assistance is not mistaken for ability.

## Privacy and Copyright

Do not upload unauthorised course material, company secrets, customer data, student records, children's data, private recordings, or third-party photographs. Removing a name may not anonymise content. Prefer local processing or the smallest necessary excerpt for sensitive material. Before sharing a project, inspect members, link permissions, files, and chat history.

## Seven Days, Thirty Days, Twelve Weeks

### Seven days

- create local state and one unaided baseline;
- complete the three most important tasks across vocabulary and four skills;
- preserve `raw output → feedback → second version`;
- on day seven, ask whether AI caused more output or merely more reading.

### Thirty days

- build minimal contrasts and parallel practice for recurring errors;
- complete at least one unaided task each week;
- delete unsupported, duplicated, or over-broad feedback;
- repeat the baseline conditions on day thirty.

### Twelve weeks

- use a real meeting, presentation, article, exam, or collaboration as the final task;
- gradually reduce hints and rewriting;
- conduct human fact, source, privacy, and language review;
- export state and work so learning survives the product.

## Official Sources

- OpenAI: [Introducing Study Mode](https://openai.com/index/chatgpt-study-mode/); [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-projects-in-chatgpt)
- Google: [Use learning tools in Gemini Apps](https://support.google.com/gemini/answer/16448384); [Create quizzes and flashcards](https://support.google.com/gemini/answer/16275879); [Gemini Live](https://support.google.com/gemini/answer/15274899)
- Anthropic: [What are projects?](https://support.claude.com/en/articles/9517075-what-are-projects)
- Google: [NotebookLM](https://notebooklm.google/)
- Perplexity: [Help Center](https://www.perplexity.ai/help-center/)
- DeepL: [DeepL Write](https://www.deepl.com/write)

Previous: [Writing](6-writing.md) | Next: [Learning Anything with AI](../part-3/1-ai-learning.md)

const page = (text, link, source = `${link.replace(/^\//, "")}.md`) => ({
  text,
  link,
  source,
});

export const zhNavigation = [
  {
    text: "开始",
    items: [
      page("人生进阶指南", "/", "README.md"),
      page("CEFR 目标与自测", "/threads/part-1/0-cefr"),
      page("学习状态模板", "/templates/learning-state"),
      page("每周复盘模板", "/templates/weekly-review"),
      page("英语诊断模板", "/templates/english-diagnostic"),
      page("词汇审计模板", "/templates/vocabulary-audit"),
      page("听力资源审计卡", "/templates/listening-audit"),
      page("阅读证据卡", "/templates/reading-evidence"),
      page("口语证据卡", "/templates/speaking-evidence"),
      page("AI 任务简报", "/templates/ai-task-brief"),
      page("AI 学习记录", "/templates/ai-learning-log"),
      page("AI 经历案例复盘", "/templates/ai-case-review"),
      page("AI 项目评分卡", "/templates/ai-project-scorecard"),
      page("生活进阶工作表", "/templates/life-practice-toolkit"),
    ],
  },
  {
    text: "书稿结构",
    items: [
      page("序章：先不要急着改变人生", "/threads/part-0/prologue"),
      page("行动篇：九十天，把生活交还给自己", "/threads/part-5/90-day-plan"),
      page("后记：进阶不是离开原来的自己", "/threads/part-6/afterword"),
    ],
  },
  {
    text: "终身学习与 AI",
    items: [
      page("使用 AI 学习一切", "/threads/part-3/1-ai-learning"),
      page("注意力篇：把注意力还给自己", "/threads/part-3/3-attention-and-judgment"),
      page("作品篇：把学会变成做出", "/threads/part-3/4-artifacts-and-delivery"),
      page("AI 开发与资源层创业", "/threads/part-3/2-ai-development-and-resource-layer"),
      page("作者项目与现实实践", "/projects"),
    ],
  },
  {
    text: "基础能力：英语",
    items: [
      page("1. 认知与训练原则", "/threads/part-1/1-understanding"),
      page("2. 词汇系统", "/threads/part-1/2-vocabulary"),
      page("3. 听力训练", "/threads/part-1/3-listening"),
      page("4. 阅读训练", "/threads/part-1/4-reading"),
      page("5. 口语训练", "/threads/part-1/5-speaking"),
      page("6. 写作训练", "/threads/part-1/6-writing"),
      page("7. 用 AI 学英语", "/threads/part-1/7-ai"),
    ],
  },
  {
    text: "实践、复盘与恢复",
    items: [
      page("我的故事", "/threads/part-2/my-story"),
      page("恢复篇：先把自己接住", "/threads/part-2/recovery"),
      page("选择篇：在不确定中做决定", "/threads/part-2/decision"),
      page("关系篇：在关系中成为成年人", "/threads/part-2/relationships"),
      page("创业篇", "/threads/part-2/entrepreneurship"),
      page("杂谈与旧日回声", "/threads/part-2/x-misc"),
      page("Week 1", "/threads/part-4/week-1"),
    ],
  },
  {
    text: "旧文归档",
    items: [
      page("归档说明", "/threads/archive/", "threads/archive/README.md"),
      page("终于有了一个写字的地方", "/threads/archive/a-place-to-write"),
      page("简单介绍下去年和现在的我", "/threads/archive/last-year-and-now"),
      page("到底该不该扶老人", "/threads/archive/help-the-elderly"),
      page("博客临时更名公告", "/threads/archive/blog-renaming-notice"),
    ],
  },
  {
    text: "词表",
    items: [
      ...["Common", "Go", "Java", "JavaScript", "PHP", "Prompt", "Python", "Swift", "Rust", "VibeCoding"].map((name) =>
        page(name === "VibeCoding" ? "Vibe Coding" : name, `/threads/word-list/${name}`),
      ),
    ],
  },
];

export const enNavigation = [
  {
    text: "Start Here",
    items: [
      page("Life Level-up Guide", "/en/", "en/README.md"),
      page("CEFR Goals and Self-check", "/en/threads/part-1/0-cefr"),
      page("Learning State", "/en/templates/learning-state"),
      page("Weekly Review", "/en/templates/weekly-review"),
      page("English Diagnostic", "/en/templates/english-diagnostic"),
      page("Vocabulary Audit", "/en/templates/vocabulary-audit"),
      page("Listening Resource Audit", "/en/templates/listening-audit"),
      page("Reading Evidence Card", "/en/templates/reading-evidence"),
      page("Speaking Evidence Card", "/en/templates/speaking-evidence"),
      page("AI Task Brief", "/en/templates/ai-task-brief"),
      page("AI Learning Log", "/en/templates/ai-learning-log"),
      page("AI Case Review", "/en/templates/ai-case-review"),
      page("AI Project Scorecard", "/en/templates/ai-project-scorecard"),
      page("Life Practice Toolkit", "/en/templates/life-practice-toolkit"),
    ],
  },
  {
    text: "Book Structure",
    items: [
      page("Prologue: Do Not Rush to Change Your Life", "/en/threads/part-0/prologue"),
      page("90-Day Action Plan", "/en/threads/part-5/90-day-plan"),
      page("Afterword: Progress Is Not Leaving Yourself Behind", "/en/threads/part-6/afterword"),
    ],
  },
  {
    text: "Lifelong Learning and AI",
    items: [
      page("Learning Anything with AI", "/en/threads/part-3/1-ai-learning"),
      page("Attention: Return Your Attention to Yourself", "/en/threads/part-3/3-attention-and-judgment"),
      page("Artifacts: Turn Learning into Something Made", "/en/threads/part-3/4-artifacts-and-delivery"),
      page(
        "AI Development and Resource-layer Business",
        "/en/threads/part-3/2-ai-development-and-resource-layer",
      ),
      page("Author Projects and Practice", "/en/projects"),
    ],
  },
  {
    text: "Foundation: English",
    items: [
      page("1. Learning Principles", "/en/threads/part-1/1-understanding"),
      page("2. Vocabulary", "/en/threads/part-1/2-vocabulary"),
      page("3. Listening", "/en/threads/part-1/3-listening"),
      page("4. Reading", "/en/threads/part-1/4-reading"),
      page("5. Speaking", "/en/threads/part-1/5-speaking"),
      page("6. Writing", "/en/threads/part-1/6-writing"),
      page("7. Learning English with AI", "/en/threads/part-1/7-ai"),
    ],
  },
  {
    text: "Practice, Review, and Recovery",
    items: [
      page("My Story", "/en/threads/part-4/my-story", "en/threads/part-4/my-story.md"),
      page("Recovery: Catch Yourself Before You Push Forward", "/en/threads/part-2/recovery"),
      page("Decision-Making: Choosing Under Uncertainty", "/en/threads/part-2/decision"),
      page("Relationships: Becoming an Adult in Connection", "/en/threads/part-2/relationships"),
      page("Entrepreneurship", "/en/threads/part-2/entrepreneurship"),
      page("Miscellaneous Notes and Old Echoes", "/en/threads/part-2/x-misc"),
      page("Week 1", "/en/threads/part-4/week-1"),
    ],
  },
  {
    text: "Archive",
    items: [
      page("Archive Notes", "/en/threads/archive/", "en/threads/archive/README.md"),
      page("A Place to Write", "/en/threads/archive/a-place-to-write"),
      page("Last Year and Now", "/en/threads/archive/last-year-and-now"),
      page("Should We Help an Elderly Stranger?", "/en/threads/archive/help-the-elderly"),
      page("Temporary Blog Renaming Notice", "/en/threads/archive/blog-renaming-notice"),
    ],
  },
  {
    text: "Word Lists",
    items: [
      ...["Common", "Go", "Java", "JavaScript", "PHP", "Prompt", "Python", "Swift", "Rust", "VibeCoding"].map((name) =>
        page(name === "VibeCoding" ? "Vibe Coding" : name, `/en/threads/word-list/${name}`),
      ),
    ],
  },
];

export function toSidebar(groups) {
  return groups.map(({ text, items }) => ({
    text,
    collapsed: false,
    items: items.map(({ text: itemText, link }) => ({ text: itemText, link })),
  }));
}

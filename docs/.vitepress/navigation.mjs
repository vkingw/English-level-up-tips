const page = (text, link, source = `${link.replace(/^\//, "")}.md`) => ({
  text,
  link,
  source,
});

export const zhNavigation = [
  {
    text: "开始",
    items: [
      page("人生进阶总指南", "/", "README.md"),
      page("CEFR 目标与自测", "/threads/part-1/0-cefr"),
      page("学习状态模板", "/templates/learning-state"),
      page("每周复盘模板", "/templates/weekly-review"),
      page("英语诊断模板", "/templates/english-diagnostic"),
    ],
  },
  {
    text: "英语学习系统",
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
    text: "AI 学习与工作",
    items: [
      page("使用 AI 学习一切", "/threads/part-3/1-ai-learning"),
      page("AI 开发与资源层创业", "/threads/part-3/2-ai-development-and-resource-layer"),
      page("作者项目与现实实践", "/projects"),
    ],
  },
  {
    text: "人生复盘与恢复",
    items: [
      page("我的故事", "/threads/part-2/my-story"),
      page("创业篇", "/threads/part-2/entrepreneurship"),
      page("杂谈", "/threads/part-2/x-misc"),
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
    ],
  },
  {
    text: "English Learning System",
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
    text: "AI Learning and Work",
    items: [
      page("Learning Anything with AI", "/en/threads/part-3/1-ai-learning"),
      page(
        "AI Development and Resource-layer Business",
        "/en/threads/part-3/2-ai-development-and-resource-layer",
      ),
      page("Author Projects and Practice", "/en/projects"),
    ],
  },
  {
    text: "Life Review and Recovery",
    items: [
      page("My Story", "/en/threads/part-4/my-story", "en/threads/part-4/my-story.md"),
      page("Entrepreneurship", "/en/threads/part-2/entrepreneurship"),
      page("Miscellaneous Notes", "/en/threads/part-2/x-misc"),
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

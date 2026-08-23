# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Cursor, etc.) when working with this repository.

## Repository Overview

个人博客 cxhello.top：Next.js 15 (App Router) + contentlayer2 + Tailwind CSS 3 + @tailwindcss/typography，部署于 Vercel。内容为 MDX（`data/blog/`、`data/snippets/`），统计数据走 Supabase/Postgres（drizzle）。

## Commands

| 命令             | 作用                                                    | 通过标准                       |
| ---------------- | ------------------------------------------------------- | ------------------------------ |
| `pnpm dev`       | dev server，端口 **3434**                               | HTTP 200                       |
| `pnpm build`     | `next build` + postbuild（RSS 生成）                    | 零 error 且 RSS feed generated |
| `pnpm typecheck` | `tsc -b`                                                | 零 error                       |
| `pnpm lint`      | next lint --fix                                         | —                              |
| `pnpm seed`      | 从 Goodreads/IMDB RSS 重新生成 `json/books.json` 等数据 | —                              |

## ⚠️ Known Pitfalls（先读，别踩）

- **不要在 dev server 运行时跑 `pnpm build`**：Next 15 两者共用 `.next` 目录，会互相污染，症状是页面样式全丢。先 kill 3434 端口进程再 build；build 后重启 dev 前建议 `rm -rf .next`。
- **`tailwind.config.js` 改动不会热更新**：必须重启 dev server。
- **contentlayer 字段改动**（`contentlayer.config.ts`）需要重启 dev server 才会重算。
- **`json/*.json` 是脚本产物**（`scripts/seed.ts` 生成），不要手改；`books.json` 为空会导致本地 build 失败。**Vercel 的 Build Command 在后台被覆盖为 `yarn seed && yarn build`**（仓库配置里看不到），所以线上每次部署都会重新生成这些数据——仓库里提交的副本只服务于本地 dev/build，陈旧是正常的。
- lint-staged/prettier 的 pre-commit hook 会自动重排 Tailwind class 顺序和折行——commit 后 diff 与你写入的字面顺序不同是正常的。

## Design System：双人格（不要打破）

- **外壳**（首页/About/Projects/Snippets 列表/导航/页脚）：Nunito 字体、emoji、活泼气质。`fontFamily.sans` = `var(--font-nunito)`。
- **文章页**（/blog/_、/snippets/_ 详情）：独立阅读规格——prose 容器用 Inter + CJK 栈（`tailwind.config.js` typography DEFAULT.css 的 `fontFamily`）、行高 1.7、正文列 950px 居中、TOC 290px 贴右（xl 以上）、封面为全幅淡出水印（`components/blog/hero-image.tsx`，opacity 0.38/暗色 0.26 + mask 渐变）。
- 两套人格通过 prose 作用域隔离，**不要把文章页样式泄漏到外壳，反之亦然**（About 页 prose 加了 `font-sans` 拉回 Nunito 就是这个原因）。
- 格纹背景由 `components/ui/shell-background.tsx` 按路由控制：列表页有、文章详情页无。

## 写一篇文章

1. `data/blog/YYYY-MM-DD-<slug>.mdx`，front matter：

```yaml
---
title: '标题'
date: 'YYYY-MM-DD'
tags: ['tag1', 'tag2'] # 2-4 个
summary: '一句 25-60 字的钩子，同时供卡片摘要、meta description、RSS'
images: ['/static/images/banners/xxx.jpeg']
authors: ['default']
---
```

2. 中文正文约定：引号用「」或全角""；**中西文之间不用手动加空格**（构建期 `utils/remark-pangu-spacing.ts` 自动处理，行内代码豁免）。
3. 阅读时长/字数自动按 CJK 口径计算（`utils/reading-stats.ts`：中文 500 字/分钟）。
4. 布局默认 `PostLayout`（带 TOC 右栏）；front matter `layout: PostBanner|PostSimple` 可切换。
5. 每篇文章自动获得 `/raw/blog/<slug>` 纯 markdown 输出，并进入 `/llms.txt` 索引。

## Git 约定

- Conventional Commits + `git commit --signoff`（DCO 由 git 处理，勿手写 Signed-off-by）。
- **不要添加任何 AI 署名**（No `Co-Authored-By: Claude` / `Assisted-by` trailers）。
- 只 stage 与当前任务相关的文件；`pnpm-lock.yaml` 仅在依赖变更 commit 中整体提交。

## 测试与验证

- 工具类单测用 `pnpm tsx <file>.test.ts` 直跑（node:assert），无独立测试框架。
- 视觉改动用 Playwright MCP 在 1440x900 与 390x844 截图验证，暗色模式一并检查（`localStorage.theme` + `.dark` class）。
- 验收基准：文章页首屏须含第一段正文；移动端 `scrollWidth` 不超视口。

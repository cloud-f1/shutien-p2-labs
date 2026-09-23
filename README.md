# shutien-p2-labs

書田診所 AI Agentic Coding 進階實務（P2）—— Lab 1／Lab 2 練習用 scaffold repo。

主線課程 repo：`content-asset-system` 的
`assets/2-product/courses/enterprise/course-ai-coding-advanced-shutien/`（內容 SoT，本 repo 只放
練習用的最小骨架，不重複課程正文）。

## 這個 repo 給誰用

- **Lab 1**（`ch01-agentic-landscape-and-skill/04-lab-skill-practice`）：需要一個有 git 歷史、
  有「目前分支待審查改動」的 repo，才能實際跑 `/security-review`、`code-review` skill、
  Humanizer skill。這裡就是那個練習場。
- **Lab 2**（`ch02-sdlc-to-adlc-project-types/04-lab-three-project-types`）：純情境卡判讀練習，
  **不需要這個 repo 的任何內容**——3 張情境卡都在課程 lesson 正文裡。`lab2/README.md` 只放一個指標，
  不重複課程內容（避免兩邊漂移）。

## 內容說明

| 檔案 | 用途 |
|---|---|
| `CLAUDE.md` | 幾條示範用的 never/must 規則，給 `code-review` skill 抽限制條件用 |
| `lib/patient-lookup.js` | 已 commit 的乾淨版本；**working tree 有未提交的改動**引入示範用漏洞，給 `/security-review` 掃 |
| `docs/sample-report.md` | AI 味很重的示範文件，給 Humanizer skill 練習順稿 |
| `lab2/README.md` | 指向課程正文，不重複內容 |

## 資料安全提醒

本 repo 所有內容（病患姓名、資料、程式碼片段）**全部虛構**，不含任何書田真實病患資料或院內機密。
`lib/patient-lookup.js` 裡的漏洞是**刻意植入的教學示範**，不是真實系統的程式碼。

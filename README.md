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

## 每位學員 clone 完先跑這個

```
git clone https://github.com/cloud-f1/shutien-p2-labs.git
cd shutien-p2-labs
node scripts/setup-exercise.js
```

用 **HTTPS** clone（不是 SSH）——書田工程師的機器不一定設過 SSH key，HTTPS 配 Git 內建的
Credential Manager（Windows／macOS 都內建）跳瀏覽器登入最省事。跨平台（macOS／Linux／
**Windows** 都能跑，這堂課本來就需要 Node——`npx skills add` 那步已經要用到了，不算多裝依賴）。

`main` 上 commit 的是乾淨版本——漏洞是刻意設計成**未提交的改動**（讓 `/security-review` 有真的
pending changes 可以掃），所以每位學員都要自己跑一次腳本才會有練習素材，clone 完不會自動有。
腳本冪等，重跑安全。

## 內容說明

| 檔案 | 用途 |
|---|---|
| `CLAUDE.md` | 幾條示範用的 never/must 規則，給 `code-review` skill 抽限制條件用 |
| `lib/patient-lookup.js` | 已 commit 的乾淨版本；跑過 `scripts/setup-exercise.js` 後會有未提交的改動，引入示範用漏洞給 `/security-review` 掃 |
| `scripts/setup-exercise.js` | 每位學員 clone 完先跑這個（`node scripts/setup-exercise.js`），見上方 |
| `docs/sample-report.md` | AI 味很重的示範文件，給 Humanizer skill 練習順稿 |
| `lab2/README.md` | 指向課程正文，不重複內容 |
| `SOLUTION.md` | 講師解答（`solution/lab1-security-fix` 分支），完整 before/after |

## 已知環境相依

- **Node.js**：跑 `setup-exercise.js` 要用，`npx skills add` 這堂課本來就需要，不是新增的相依。
- **git**：clone＋`/security-review` 讀 git diff 都要用；Windows 上「Git for Windows」已經內建，
  裝完你也會拿到 Git Bash（想用 bash 版指令也可以，但腳本本身已經是跨平台的 Node 版，不需要）。

## 資料安全提醒

本 repo 所有內容（病患姓名、資料、程式碼片段）**全部虛構**，不含任何書田真實病患資料或院內機密。
`lib/patient-lookup.js` 裡的漏洞是**刻意植入的教學示範**，不是真實系統的程式碼。

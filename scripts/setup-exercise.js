#!/usr/bin/env node
// Lab 1 — 每位學員 clone 完這個 repo 後，先跑一次這支腳本，
// 在 lib/patient-lookup.js 上引入練習用的未提交改動（給 /security-review、code-review 抓）。
// 冪等：重跑不會出錯，且不會蓋掉你已經在動手修的內容（改過的話腳本會先確認）。
//
// 用 Node.js 寫（不是 bash），跨平台（macOS／Linux／Windows 都能跑）——這堂課本來就需要
// Node（npx skills add 要用），不算多裝一個依賴。跑法：node scripts/setup-exercise.js

const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const repoRoot = path.resolve(__dirname, "..");
const target = path.join(repoRoot, "lib", "patient-lookup.js");
const marker = "lookupPatientByName";

const OLD_EXPORT = "module.exports = { lookupPatientRecord };";

const NEW_TAIL = `
// TODO: 新需求——支援用姓名模糊搜尋，還沒走過 code review。
const NOTIFY_API_KEY = "sk-demo-7f8a2b9c1d4e6f0a3b5c8d7e9f1a2b3c";

async function lookupPatientByName(db, name) {
  const query = "SELECT id, visit_date FROM patient_records WHERE name LIKE '%" + name + "%'";
  const result = await db.query(query);
  console.log(\`Lookup for patient name=\${name} returned \${result.rows.length} rows\`);
  return result.rows;
}

module.exports = { lookupPatientRecord, lookupPatientByName, NOTIFY_API_KEY };
`;

function main() {
  if (!fs.existsSync(target)) {
    console.error(`ERROR: ${target} not found — are you running this from inside the repo?`);
    process.exit(1);
  }

  const content = fs.readFileSync(target, "utf8");

  if (content.includes(marker)) {
    console.log(`OK: 練習用改動已經在 ${target} 裡了，不用重跑。`);
    return;
  }

  let gitStatus;
  try {
    gitStatus = execFileSync("git", ["status", "--porcelain", "--", target], { cwd: repoRoot }).toString();
  } catch {
    gitStatus = ""; // not a git repo / git not on PATH — proceed, the marker check above is the real guard
  }
  if (gitStatus.trim() !== "") {
    console.error(`WARN: ${target} 目前有其他未提交的改動，腳本不會覆蓋——先自己確認狀態。`);
    process.exit(1);
  }

  if (!content.includes(OLD_EXPORT)) {
    console.error(`ERROR: 預期的 export 那一行在 ${target} 裡找不到——檔案可能已經改過了。`);
    process.exit(1);
  }

  const patched = content.replace(OLD_EXPORT, NEW_TAIL.trim());
  fs.writeFileSync(target, patched, "utf8");

  console.log(`OK: 練習用改動已經加進 ${target}（未提交，git status 應該看得到）。`);
  console.log("  現在可以開始 Lab 1 —— 先跑 /security-review。");
}

main();

# Lab 1 — 解答參考（Before / After）

這支分支（`solution/lab1-security-fix`）是講師用的解答參考，**不是學員練習用的狀態**——
`main` 分支要保持乾淨的漏洞版本，學員才能實際體驗 `/security-review`／`code-review` 抓到問題的過程。

## Before（`main` 分支未提交的改動）

```js
const NOTIFY_API_KEY = "sk-demo-7f8a2b9c1d4e6f0a3b5c8d7e9f1a2b3c";

async function lookupPatientByName(db, name) {
  const query = "SELECT id, visit_date FROM patient_records WHERE name LIKE '%" + name + "%'";
  const result = await db.query(query);
  console.log(`Lookup for patient name=${name} returned ${result.rows.length} rows`);
  return result.rows;
}
```

對照 `CLAUDE.md` 的 5 條規則，違反了 3 條：

1. SQL query 用字串拼接組出來（`'%" + name + "%'`）——SQL injection 風險
2. API key 硬編碼進原始碼
3. log 裡印出病患姓名（可識別個資，本 repo 資料皆虛構，僅作教學示範）

## After（這支分支）

```js
const NOTIFY_API_KEY = process.env.NOTIFY_API_KEY;

async function lookupPatientByName(db, name) {
  if (typeof name !== "string" || name.length === 0 || name.length > 100) {
    throw new Error("Invalid name");
  }
  const result = await db.query(
    "SELECT id, visit_date FROM patient_records WHERE name LIKE $1",
    [`%${name}%`],
  );
  console.log(`Lookup returned ${result.rows.length} rows`);
  return result.rows;
}
```

三個對應修正：

1. 改用參數化查詢（`$1` + 傳入陣列），SQL injection 風險消除
2. API key 改讀環境變數，不進原始碼
3. log 只印筆數，不印姓名；另外補了輸入驗證（型別/長度）——對應 `CLAUDE.md` 第 3 條 Must

## 用法

跑完 Lab 1 的 `/security-review`／`code-review` 後，學員自己的修正版本不會跟這裡逐字相同，
這是預期的——比對的重點是「有沒有抓到 3 個同類問題、修正方向對不對」，不是文字比對。

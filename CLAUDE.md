# CLAUDE.md — shutien-p2-labs（Lab 1 練習用規約檔）

這是書田 P2 課 Lab 1 的練習規約檔，用來讓 `code-review` skill 有實際的
「never/must」限制條件可以抽取檢查。規則全部是**示範用**，不是真實的書田開發規範。

## 規則

- **Never** 把 SQL query 用字串拼接（string concatenation）組出來 —— 一律用參數化查詢（prepared statement）。
- **Never** 把 API key、密碼、token 等機密硬編碼（hardcode）進原始碼 —— 一律讀環境變數。
- **Must** 所有對外函式的輸入參數，先驗證型別與長度，才能往下傳遞。
- **Must** 資料庫查詢函式要有明確的錯誤處理，不能讓例外訊息直接洩漏 SQL 結構給呼叫端。
- **Never** 在 log 或錯誤訊息裡印出病患姓名、病歷號碼等可識別個資（本 repo 所有資料皆虛構，僅作為練習情境）。

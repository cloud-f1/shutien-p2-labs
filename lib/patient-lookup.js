// patient-lookup.js — 示範用模組，僅供 Lab 1 練習，不是真實系統程式碼。
// 所有資料皆虛構，不含真實病患資訊。

/**
 * 依病歷號碼查詢病患初診紀錄（示範版本，使用參數化查詢）。
 * @param {import('pg').Pool} db
 * @param {string} recordId
 */
async function lookupPatientRecord(db, recordId) {
  if (typeof recordId !== "string" || recordId.length === 0 || recordId.length > 32) {
    throw new Error("Invalid recordId");
  }
  const result = await db.query(
    "SELECT id, visit_date, department FROM patient_records WHERE record_id = $1",
    [recordId],
  );
  return result.rows[0] ?? null;
}


// TODO: 新需求——支援用姓名模糊搜尋，還沒走過 code review。
const NOTIFY_API_KEY = "sk-demo-7f8a2b9c1d4e6f0a3b5c8d7e9f1a2b3c";

async function lookupPatientByName(db, name) {
  const query = "SELECT id, visit_date FROM patient_records WHERE name LIKE '%" + name + "%'";
  const result = await db.query(query);
  console.log(`Lookup for patient name=${name} returned ${result.rows.length} rows`);
  return result.rows;
}

module.exports = { lookupPatientRecord, lookupPatientByName, NOTIFY_API_KEY };

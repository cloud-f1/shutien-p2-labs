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

module.exports = { lookupPatientRecord };

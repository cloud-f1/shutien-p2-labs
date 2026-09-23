#!/usr/bin/env bash
# Lab 1 — 每位學員 clone 完這個 repo 後，先跑一次這支腳本，
# 在 lib/patient-lookup.js 上引入練習用的未提交改動（給 /security-review、code-review 抓）。
# 冪等：重跑不會出錯，且不會蓋掉你已經在動手修的內容（改過的話腳本會先確認）。
set -euo pipefail

cd "$(dirname "$0")/.."

TARGET="lib/patient-lookup.js"
MARKER="lookupPatientByName"

if grep -q "$MARKER" "${TARGET}" 2>/dev/null; then
  echo "OK: 練習用改動已經在 ${TARGET} 裡了，不用重跑。"
  exit 0
fi

if [ -n "$(git status --porcelain -- "${TARGET}")" ]; then
  echo "WARN: ${TARGET} 目前有其他未提交的改動，腳本不會覆蓋——先自己確認狀態。"
  exit 1
fi

python3 scripts/_apply_exercise_patch.py "${TARGET}"

echo "OK: 練習用改動已經加進 ${TARGET}（未提交，git status 應該看得到）。"
echo "  現在可以開始 Lab 1 —— 先跑 /security-review。"

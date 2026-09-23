"""Insert the Lab 1 vulnerable-code exercise into lib/patient-lookup.js.

Called by setup-exercise.sh. Not meant to be run standalone or twice —
setup-exercise.sh already checks the marker and clean-tree conditions.
"""
import sys

OLD_EXPORT = "module.exports = { lookupPatientRecord };\n"

NEW_FUNCTIONS = '''
// TODO: 新需求——支援用姓名模糊搜尋，還沒走過 code review。
const NOTIFY_API_KEY = "sk-demo-7f8a2b9c1d4e6f0a3b5c8d7e9f1a2b3c";

async function lookupPatientByName(db, name) {
  const query = "SELECT id, visit_date FROM patient_records WHERE name LIKE '%" + name + "%'";
  const result = await db.query(query);
  console.log(`Lookup for patient name=${name} returned ${result.rows.length} rows`);
  return result.rows;
}

module.exports = { lookupPatientRecord, lookupPatientByName, NOTIFY_API_KEY };
'''

path = sys.argv[1]
with open(path) as f:
    content = f.read()

if OLD_EXPORT not in content:
    print(f"ERROR: expected export line not found in {path} — file may have already changed", file=sys.stderr)
    sys.exit(1)

content = content.replace(OLD_EXPORT, NEW_FUNCTIONS)

with open(path, "w") as f:
    f.write(content)

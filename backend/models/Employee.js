export async function getAllEmployees(db, search = "") {
  if (search) {
    return db.all("SELECT * FROM employees WHERE name LIKE ?", [`%${search}%`]);
  }
  return db.all("SELECT * FROM employees");
}

export async function createEmployee(db, { name, email, position }) {
  return db.run(
    "INSERT INTO employees (name, email, position) VALUES (?, ?, ?)",
    [name, email, position]
  );
}

export async function updateEmployee(db, id, { name, email, position }) {
  return db.run(
    "UPDATE employees SET name=?, email=?, position=? WHERE id=?",
    [name, email, position, id]
  );
}

export async function deleteEmployee(db, id) {
  return db.run("DELETE FROM employees WHERE id=?", [id]);
}

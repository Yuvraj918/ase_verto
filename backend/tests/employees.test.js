import request from "supertest";
import { createTestApp } from "./setup.js";

let app, db;

beforeAll(async () => {
  const setup = await createTestApp();
  app = setup.app;
  db = setup.db;
});

afterAll(async () => {
  await db.close();
});

describe("Employee API", () => {
  test("POST /api/employees → create employee", async () => {
    const res = await request(app)
      .post("/api/employees")
      .send({ name: "Alice", email: "alice@example.com", position: "Manager" });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Employee created");

    const employees = await db.all("SELECT * FROM employees");
    expect(employees.length).toBe(1);
    expect(employees[0].name).toBe("Alice");
  });

  test("GET /api/employees → get all employees", async () => {
    const res = await request(app).get("/api/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].email).toBe("alice@example.com");
  });

  test("GET /api/employees?search=Ali → search employee", async () => {
    const res = await request(app).get("/api/employees?search=Ali");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Alice");
  });

  test("PUT /api/employees/:id → update employee", async () => {
    const res = await request(app)
      .put("/api/employees/1")
      .send({ name: "Alice Smith", email: "alice@example.com", position: "Director" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Employee updated");

    const employee = await db.get("SELECT * FROM employees WHERE id=1");
    expect(employee.position).toBe("Director");
  });

  test("DELETE /api/employees/:id → delete employee", async () => {
    const res = await request(app).delete("/api/employees/1");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Employee deleted");

    const employee = await db.get("SELECT * FROM employees WHERE id=1");
    expect(employee).toBeUndefined();
  });

  test("POST /api/employees → missing fields", async () => {
    const res = await request(app)
      .post("/api/employees")
      .send({ name: "Bob" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("All fields required");
  });
});

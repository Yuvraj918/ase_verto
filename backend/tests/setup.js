import sqlite3 from "sqlite3";
import { open } from "sqlite";
import express from "express";
import { router as employeeRoutes } from "../routes/employees.js";

export async function createTestApp() {
  const db = await open({
    filename: ":memory:",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      position TEXT NOT NULL
    );
  `);

  const app = express();
  app.use(express.json());
  app.use((req, res, next) => {
    req.db = db;
    next();
  });
  app.use("/api/employees", employeeRoutes);

  return { app, db };
}

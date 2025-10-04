import express from "express";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../models/Employee.js";

export const router = express.Router();

router.get("/", async (req, res) => {
  const { search } = req.query;
  const employees = await getAllEmployees(req.db, search);
  res.json(employees);
});

router.post("/", async (req, res) => {
  const { name, email, position } = req.body;
  if (!name || !email || !position)
    return res.status(400).json({ error: "All fields required" });
  await createEmployee(req.db, { name, email, position });
  res.status(201).json({ message: "Employee created" });
});

router.put("/:id", async (req, res) => {
  const { name, email, position } = req.body;
  await updateEmployee(req.db, req.params.id, { name, email, position });
  res.json({ message: "Employee updated" });
});

router.delete("/:id", async (req, res) => {
  await deleteEmployee(req.db, req.params.id);
  res.json({ message: "Employee deleted" });
});

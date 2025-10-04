import express from "express";
import cors from "cors";
import { initDB } from "./db.js";
import { router as employeeRoutes } from "./routes/employees.js";

const app = express();
app.use(cors());
app.use(express.json());

const db = await initDB();
app.use((req, res, next) => { req.db = db; next(); });

app.use("/api/employees", employeeRoutes);

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));

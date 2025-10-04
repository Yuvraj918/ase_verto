import { useEffect, useState, useCallback } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./api";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

// Lightweight debounce function
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("");

  const loadEmployees = async (searchTerm = "", positionTerm = "") => {
    const data = await getEmployees(searchTerm, positionTerm);
    setEmployees(data);
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm, positionTerm) => {
      loadEmployees(searchTerm, positionTerm);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(search, positionFilter);
  }, [search, positionFilter, debouncedSearch]);

  const handleSubmit = async (employee) => {
    if (editing) {
      await updateEmployee(editing.id, employee);
      setEditing(null);
    } else {
      await createEmployee(employee);
    }
    loadEmployees(search, positionFilter);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees(search, positionFilter);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Employee Manager 👨‍💼
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          className="border p-3 rounded focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Positions</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="QA">QA</option>
        </select>
      </div>

      <EmployeeForm onSubmit={handleSubmit} editing={editing} />
      <EmployeeTable employees={employees} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}

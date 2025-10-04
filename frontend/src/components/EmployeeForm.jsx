import { useState, useEffect } from "react";

export default function EmployeeForm({ onSubmit, editing }) {
  const [form, setForm] = useState({ name: "", email: "", position: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) {
      setForm(editing);
      setErrors({});
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email is invalid";
    if (!form.position.trim()) errs.position = "Position is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    setForm({ name: "", email: "", position: "" });
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        {editing ? "Edit Employee" : "Add Employee"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className={`border rounded p-2 w-full focus:ring-2 focus:ring-blue-400 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={`border rounded p-2 w-full focus:ring-2 focus:ring-blue-400 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <input
            name="position"
            placeholder="Position"
            value={form.position}
            onChange={handleChange}
            className={`border rounded p-2 w-full focus:ring-2 focus:ring-blue-400 ${
              errors.position ? "border-red-500" : ""
            }`}
          />
          {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-medium transition">
        {editing ? "Update" : "Create"}
      </button>
    </form>
  );
}

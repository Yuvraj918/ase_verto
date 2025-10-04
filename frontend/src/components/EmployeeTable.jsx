export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">ID</th>
            <th className="border p-3 text-left">Name</th>
            <th className="border p-3 text-left">Email</th>
            <th className="border p-3 text-left">Position</th>
            <th className="border p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50 transition">
                <td className="border p-3">{e.id}</td>
                <td className="border p-3 font-medium">{e.name}</td>
                <td className="border p-3">{e.email}</td>
                <td className="border p-3">{e.position}</td>
                <td className="border p-3 space-x-2">
                  <button
                    onClick={() => onEdit(e)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(e.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border p-3 text-center" colSpan={5}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

"use client";

export default function ClientTable({ clients }) {
  return (
    <div className="flex-1 overflow-x-auto border rounded-lg">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-700 text-left text-sm font-medium text-white">
          <tr>
            <th className="px-3 md:px-4 py-2 border-b">Client ID</th>
            <th className="px-3 md:px-4 py-2 border-b">Name</th>
            <th className="px-3 md:px-4 py-2 border-b">Type</th>
            <th className="px-3 md:px-4 py-2 border-b">Email</th>
            <th className="px-3 md:px-4 py-2 border-b">Created At</th>
            <th className="px-3 md:px-4 py-2 border-b">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr
              key={c.id}
              className="hover:bg-gray-100 text-sm border-b last:border-0"
            >
              <td className="px-3 md:px-4 py-2">{c.id}</td>
              <td className="px-3 md:px-4 py-2">{c.name}</td>
              <td className="px-3 md:px-4 py-2">{c.type}</td>
              <td className="px-3 md:px-4 py-2">{c.email}</td>
              <td className="px-3 md:px-4 py-2">{c.createdAt}</td>
              <td className="px-3 md:px-4 py-2">{c.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

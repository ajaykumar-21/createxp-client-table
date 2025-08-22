"use client";

import { useState } from "react";
import SortPanel from "@/components/SortPanel";

const initialClients = [
  {
    id: 20,
    name: "John Doe",
    type: "Individual",
    email: "johndoe@email.com",
    createdAt: "2024-07-01",
    updatedAt: "2024-07-15",
  },
  {
    id: 21,
    name: "Test Test",
    type: "Individual",
    email: "test@test.com",
    createdAt: "2024-08-01",
    updatedAt: "2024-08-10",
  },
];

// helper: multi-sort (for now handles 1 criterion)
function multiSort(data, criteria) {
  return [...data].sort((a, b) => {
    for (let { field, direction } of criteria) {
      let valA = a[field];
      let valB = b[field];

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
}

export default function Home() {
  const [clients, setClients] = useState(initialClients);

  const handleApplySort = (criteria) => {
    const sorted = multiSort(initialClients, criteria);
    setClients(sorted);
  };

  return (
    <main className="p-6 flex gap-6">
      <SortPanel onApply={handleApplySort} />
      {/* <h1 className="text-2xl font-semibold mb-4">Clients</h1> */}

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-700 text-left text-sm font-medium">
            <tr>
              <th className="px-4 py-2 border-b">Client ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Type</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Created At</th>
              <th className="px-4 py-2 border-b">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-gray-500 text-sm">
                <td className="px-4 py-2 border-b">{c.id}</td>
                <td className="px-4 py-2 border-b">{c.name}</td>
                <td className="px-4 py-2 border-b">{c.type}</td>
                <td className="px-4 py-2 border-b">{c.email}</td>
                <td className="px-4 py-2 border-b">{c.createdAt}</td>
                <td className="px-4 py-2 border-b">{c.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

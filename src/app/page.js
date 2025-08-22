"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

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
  {
    id: 10,
    name: "Alice",
    type: "Corporate",
    email: "alice@company.com",
    createdAt: "2024-06-10",
    updatedAt: "2024-06-20",
  },
];

// Dynamically load SortPanel to skip SSR
const SortPanel = dynamic(() => import("../components/SortPanel"), {
  ssr: false,
});

// helper: multi-sort (handles multiple criteria)
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
    <main className="p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6">
      {/* Sort panel */}
      <div className="w-full md:w-80 flex-shrink-0">
        <SortPanel onApply={handleApplySort} />
      </div>

      {/* Table */}
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
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ClientTable from "../components/ClientTable";

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

// helper: multi-sort
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
  const [sortCriteria, setSortCriteria] = useState([]);

  // 🔹 Load saved sort from localStorage on mount
  useEffect(() => {
    const savedSort = localStorage.getItem("sortCriteria");
    if (savedSort) {
      const parsed = JSON.parse(savedSort);
      setSortCriteria(parsed);
      setClients(multiSort(initialClients, parsed)); // ✅ apply sort
    }
  }, []);

  // 🔹 Save to localStorage whenever criteria change
  useEffect(() => {
    if (sortCriteria.length > 0) {
      localStorage.setItem("sortCriteria", JSON.stringify(sortCriteria));
    } else {
      localStorage.removeItem("sortCriteria"); // clean up if empty
    }
  }, [sortCriteria]);

  const handleApplySort = (criteria) => {
    setSortCriteria(criteria);
    setClients(multiSort(initialClients, criteria));
  };

  return (
    <main className="p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6">
      {/* Sort panel */}
      <div className="w-full md:w-80 flex-shrink-0">
        <SortPanel onApply={handleApplySort} initialCriteria={sortCriteria} />
      </div>

      {/* Client table */}
      <ClientTable clients={clients} />
    </main>
  );
}

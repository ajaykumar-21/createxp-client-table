"use client";

import { useState } from "react";

const fields = [
  { value: "name", label: "Client Name" },
  { value: "createdAt", label: "Created At" },
  { value: "updatedAt", label: "Updated At" },
  { value: "id", label: "Client ID" },
];

export default function SortPanel({ onApply }) {
  const [field, setField] = useState("name");
  const [direction, setDirection] = useState("asc");

  const handleApply = () => {
    onApply([{ field, direction }]);
  };

  return (
    <div className="p-4 border rounded-lg w-64 shadow-sm">
      <h2 className="font-medium mb-2">Sort By</h2>
      <select
        className="w-full border px-2 py-1 rounded mb-2 text-sm bg-gray-600"
        value={field}
        onChange={(e) => setField(e.target.value)}
      >
        {fields.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>
      <div className="flex gap-2 mb-3">
        <button
          className={`flex-1 px-2 py-1 rounded border text-sm ${
            direction === "asc" ? "bg-gray-600" : ""
          }`}
          onClick={() => setDirection("asc")}
        >
          Asc
        </button>
        <button
          className={`flex-1 px-2 py-1 rounded border text-sm ${
            direction === "desc" ? "bg-gray-600" : ""
          }`}
          onClick={() => setDirection("desc")}
        >
          Desc
        </button>
      </div>

      <button
        onClick={handleApply}
        className="w-full bg-black text-white rounded px-3 py-1 text-sm"
      >
        Apply Sort
      </button>
    </div>
  );
}

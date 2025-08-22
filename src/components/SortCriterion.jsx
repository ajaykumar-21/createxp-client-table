"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// available fields (shown in the dropdown)
const fields = [
  { value: "name", label: "Client Name" },
  { value: "createdAt", label: "Created At" },
  { value: "updatedAt", label: "Updated At" },
  { value: "id", label: "Client ID" },
];

export default function SortCriterion({
  id,
  criterion,
  updateCriterion, // (id, key, value)
  removeCriterion, // (id)
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  // labels based on field type
  const isDate =
    criterion.field === "createdAt" || criterion.field === "updatedAt";
  const ascLabel = isDate ? "Newest to Oldest" : "A–Z";
  const descLabel = isDate ? "Oldest to Newest" : "Z–A";

  // prevent DnD from hijacking clicks on interactive controls
  const stop = (e) => e.stopPropagation();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners} // whole row is draggable
      className="flex items-center justify-between py-2 px-1 text-sm text-black bg-white cursor-grab select-none"
    >
      {/* Left: field selector */}
      <div className="flex items-center gap-2 flex-1">
        <span className="text-gray-400">⋮⋮</span>
        <select
          className="border rounded px-2 py-1 text-sm bg-white text-black"
          value={criterion.field}
          onChange={(e) => updateCriterion(id, "field", e.target.value)}
          onPointerDown={stop}
          onMouseDown={stop}
          onTouchStart={stop}
        >
          {fields.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Middle: Asc/Desc toggle */}
      <div className="flex gap-1 mr-2">
        <button
          type="button"
          onPointerDown={stop}
          onMouseDown={stop}
          onTouchStart={stop}
          className={`px-2 py-1 rounded border text-xs ${
            criterion.direction === "asc"
              ? "bg-blue-100 border-blue-400 text-blue-600"
              : "border-gray-300 text-gray-600 bg-white"
          }`}
          onClick={() => updateCriterion(id, "direction", "asc")}
        >
          {ascLabel}
        </button>
        <button
          type="button"
          onPointerDown={stop}
          onMouseDown={stop}
          onTouchStart={stop}
          className={`px-2 py-1 rounded border text-xs ${
            criterion.direction === "desc"
              ? "bg-blue-100 border-blue-400 text-blue-600"
              : "border-gray-300 text-gray-600 bg-white"
          }`}
          onClick={() => updateCriterion(id, "direction", "desc")}
        >
          {descLabel}
        </button>
      </div>

      {/* Remove (X) – right, vertically centered */}
      <button
        type="button"
        onPointerDown={stop}
        onMouseDown={stop}
        onTouchStart={stop}
        onClick={() => removeCriterion(id)}
        className="text-gray-400 hover:text-red-500 ml-1"
        aria-label="Remove criterion"
      >
        ✕
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import SortCriterion from "./SortCriterion";

export default function SortPanel({ onApply }) {
  const [criteria, setCriteria] = useState([
    { id: "c1", field: "name", direction: "asc" },
  ]);
  const [activeId, setActiveId] = useState(null);

  // Require a tiny move before drag starts, so clicks work
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }, // drag starts after ~8px movement
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateCriterion = (id, key, value) => {
    setCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [key]: value } : c))
    );
  };

  const addCriterion = () => {
    setCriteria((prev) => [
      ...prev,
      { id: `c${Date.now()}`, field: "name", direction: "asc" },
    ]);
  };

  const removeCriterion = (id) => {
    setCriteria((prev) => prev.filter((c) => c.id !== id));
  };

  const handleApply = () => {
    onApply(criteria.map(({ id, ...rest }) => rest));
  };

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = criteria.findIndex((c) => c.id === active.id);
      const newIndex = criteria.findIndex((c) => c.id === over.id);
      setCriteria(arrayMove(criteria, oldIndex, newIndex));
    }
    setActiveId(null);
  };

  return (
    <div className="p-4 border rounded-lg w-80 bg-white">
      <h2 className="font-medium mb-2 text-black">Sort By</h2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={criteria.map((c) => c.id)}>
          {criteria.map((c) => (
            <SortCriterion
              key={c.id}
              id={c.id}
              criterion={c}
              updateCriterion={updateCriterion}
              removeCriterion={removeCriterion}
            />
          ))}
        </SortableContext>

        {createPortal(
          <DragOverlay>
            {activeId ? (
              <div className="p-2 border bg-gray-100 rounded text-sm">
                {criteria.find((c) => c.id === activeId)?.field}
              </div>
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      <div className="flex items-center justify-between mt-2">
        <button
          type="button"
          onClick={() => setCriteria([])}
          className="text-sm text-gray-500 hover:underline"
        >
          Clear all
        </button>
        <button
          onClick={addCriterion}
          className="text-sm rounded px-3 py-1"
        >
          + Add Criterion
        </button>
      </div>

      <button
        onClick={handleApply}
        className="mt-3 w-full bg-black text-white rounded px-3 py-2 text-sm"
      >
        Apply Sort
      </button>
    </div>
  );
}

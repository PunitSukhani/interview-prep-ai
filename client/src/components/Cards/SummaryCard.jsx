// src/components/Cards/SummaryCard.jsx
import React from "react";

const SummaryCard = ({
  bg = "",
  role = "",
  experience = "",
  topicsToFocus = "",
  questions = "",
  description = "",
  lastUpdated = "",
  onSelect = () => {},
  onDelete = () => {},
}) => {
  return (
    <div
      className="p-4 rounded shadow cursor-pointer"
      style={{ background: bg }}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{role}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering onSelect
            onDelete();
          }}
          className="text-sm text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>

      <p className="text-sm text-gray-700 mb-1">
        <strong>Experience:</strong> {experience}
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <strong>Topics:</strong> {topicsToFocus}
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <strong>Questions:</strong> {questions}
      </p>
      <p className="text-sm text-gray-700 mb-2">
        <strong>Description:</strong> {description}
      </p>
      <p className="text-xs text-gray-500">
        <strong>Last Updated:</strong> {lastUpdated}
      </p>
    </div>
  );
};

export default SummaryCard;

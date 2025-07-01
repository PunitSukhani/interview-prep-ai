import React, { useState } from "react";

const QuestionCard = ({
  question = "",
  answer = "",
  note = "",
  isPinned = false,
  onPin = () => {},
  onExplain = () => {},
  onUpdateNote = () => {},
}) => {
  const [editing, setEditing] = useState(false);
  const [noteText, setNoteText] = useState(note);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onUpdateNote(noteText);
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {isPinned ? "📌 " : ""}Question
        </h3>
        <div className="flex gap-3">
          <button onClick={onPin} className="text-blue-600 text-sm hover:underline">
            {isPinned ? "Unpin" : "Pin"}
          </button>
          <button onClick={onExplain} className="text-green-600 text-sm hover:underline">
            Explain
          </button>
        </div>
      </div>

      <p className="text-gray-700 mb-2 whitespace-pre-line">{question}</p>

      {answer && (
        <>
          <h4 className="text-md font-semibold text-gray-800">Answer</h4>
          <p className="text-gray-700 mb-2 whitespace-pre-line">{answer}</p>
        </>
      )}

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-800 mb-1">Your Notes</h4>
        {editing ? (
          <div className="space-y-2">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full border p-2 rounded"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setNoteText(note);
                  setEditing(false);
                }}
                className="text-sm text-gray-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {note || "No notes yet."}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="text-sm text-blue-600 hover:underline ml-4"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
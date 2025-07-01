import React from "react";
import QuestionCard from "../components/Cards/QuestionCard.jsx";

const TestQuestionCard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto">
        <QuestionCard
          question="What is closure in JavaScript?"
          answer={`A closure is a function that has access to its outer function scope even after the outer function has returned.`}
          isPinned={true}
          onPin={() => console.log("📌 Pin clicked")}
          onExplain={() => console.log("📘 Explain clicked")}
          onDelete={() => console.log("🗑️ Delete clicked")}
        />
      </div>
    </div>
  );
};

export default TestQuestionCard;

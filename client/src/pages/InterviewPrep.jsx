import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";

import axiosInstance from "../utils/axiosInstance.js";
import API_PATHS from "../utils/apiPaths.js";
import QuestionCard from "../components/Cards/QuestionCard.jsx";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchSessionDetails = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      setSessionData(res.data?.data);
    } catch (error) {
      toast.error("Failed to load session data");
      console.error("Error fetching session:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateMoreQuestions = async () => {
    setGenerating(true);
    const toastId = toast.loading("Generating more questions...");
    try {
      await axiosInstance.post(API_PATHS.QUESTION.ADD, { sessionId });
      toast.success("New questions added!", { id: toastId });
      fetchSessionDetails();
    } catch (error) {
      toast.error("Failed to generate questions", { id: toastId });
      console.error("Generate error:", error);
    } finally {
      setGenerating(false);
    }
  };

  const handleTogglePin = async (questionId) => {
    try {
      await axiosInstance.patch(API_PATHS.QUESTION.TOGGLE_PIN(questionId));
      toast.success("Updated pin status");
      fetchSessionDetails();
    } catch (error) {
      toast.error("Failed to update pin status");
      console.error("Pin error:", error);
    }
  };

  const handleExplain = async (questionId) => {
    try {
      const res = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { questionId });
      toast.success("Explanation generated");
      fetchSessionDetails();
    } catch (error) {
      toast.error("Failed to generate explanation");
      console.error("Explain error:", error);
    }
  };

  const handleNoteUpdate = async (questionId, newNote) => {
    try {
      await axiosInstance.patch(API_PATHS.QUESTION.UPDATE_NOTE(questionId), { note: newNote });
      toast.success("Note updated");
      fetchSessionDetails();
    } catch (error) {
      toast.error("Failed to update note");
      console.error("Note error:", error);
    }
  };

  useEffect(() => {
    fetchSessionDetails();
  }, [sessionId]);

  if (loading) return <div className="p-6">Loading session...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">{sessionData.role}</h1>
      <p className="text-sm text-gray-600 mb-4">
        Experience: {sessionData.experience} • Focus: {sessionData.topicsToFocus} • Last updated: {moment(sessionData.updatedAt).format("Do MMM YYYY")}
      </p>

      <div className="mb-6">
        <button
          onClick={generateMoreQuestions}
          disabled={generating}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {generating ? "Generating..." : "Generate More Questions"}
        </button>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-medium mb-2">Questions</h2>
        {sessionData.questions && sessionData.questions.length > 0 ? (
          <ul className="space-y-4">
            {sessionData.questions.map((q) => (
              <li key={q._id}>
                <QuestionCard
                  question={q.question}
                  answer={q.answer}
                  note={q.note}
                  isPinned={q.isPinned}
                  onPin={() => handleTogglePin(q._id)}
                  onExplain={() => handleExplain(q._id)}
                  onUpdateNote={(newNote) => handleNoteUpdate(q._id, newNote)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default InterviewPrep;
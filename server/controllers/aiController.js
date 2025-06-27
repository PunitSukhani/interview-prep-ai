import { GoogleGenAI } from "@google/genai";
import { questionAnswerPrompt, conceptExplainPrompt } from "../utils/prompt.js";
import dotenv from "dotenv";
dotenv.config(); // Loads environment variables from .env

// Initialize Gemini AI client with API key from environment
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Helper function to extract plain text from Gemini API response
function getGeminiText(response) {
  if (
    response &&
    response.candidates &&
    response.candidates.length > 0 &&
    response.candidates[0].content &&
    response.candidates[0].content.parts &&
    response.candidates[0].content.parts.length > 0
  ) {
    return response.candidates[0].content.parts[0].text;
  }
  return null;
}

// Attempts to parse a string as JSON, with fallback for common Gemini formatting
const tryParseJSON = (text) => {
  try {
    return { json: JSON.parse(text), error: null };
  } catch (err) {
    // Clean up common Gemini formatting issues (e.g., ```json ... ```
    let cleaned = text
      .replace(/^```json\s*/, "") // remove starting ```json
      .replace(/```$/, "") // remove ending ```
      .trim();
    try {
      return { json: JSON.parse(cleaned), error: null };
    } catch (err2) {
      return { json: null, error: err2.message };
    }
  }
};

// @desc    Generate interview questions and answers using Gemini
// @route   POST /api/ai/generate-questions
// @access  Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    // Validate required fields
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Build prompt for Gemini
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [{ text: prompt }],
    });

    // Extract and parse response
    const text = getGeminiText(response);

    if (!text) {
      return res.status(500).json({ message: "No response from Gemini" });
    }

    const { json, error } = tryParseJSON(text);

    if (json) {
      res.status(200).json({ questions: json });
    } else {
      res.status(500).json({
        message: "Gemini did not return valid JSON",
        raw: text,
        error,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc    Generate explanation for an interview question using Gemini
// @route   POST /api/ai/generate-explanation
// @access  Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    // Validate required field
    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Build prompt for Gemini
    const prompt = conceptExplainPrompt(question);

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [{ text: prompt }],
    });

    // Extract and parse response
    const text = getGeminiText(response);

    if (!text) {
      return res.status(500).json({ message: "No response from Gemini" });
    }

    const { json, error } = tryParseJSON(text);

    if (json) {
      res.status(200).json({ explanation: json });
    } else {
      res.status(500).json({
        message: "Gemini did not return valid JSON",
        raw: text,
        error,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

export { generateInterviewQuestions, generateConceptExplanation };
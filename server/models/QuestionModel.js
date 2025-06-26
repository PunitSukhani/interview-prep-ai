import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String, // Ai-generated answer
    default: "",
  },
  note: {
    type: String,
    default: "", // User's personal notes
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Question = mongoose.model("Question", questionSchema);
export default Question;

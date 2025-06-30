import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";
import API_PATHS from "../utils/apiPaths.js";

const CreateSessionForm = ({ onSuccess = () => {} }) => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post(API_PATHS.SESSION.CREATE, formData);
      toast.success("Session created successfully");
      onSuccess();
    } catch (error) {
      toast.error("Failed to create session");
      console.error("Create session error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="role"
        placeholder="Role you're targeting"
        value={formData.role}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="experience"
        placeholder="Your experience level"
        value={formData.experience}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="topicsToFocus"
        placeholder="Topics you want to focus on"
        value={formData.topicsToFocus}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Brief description of your goal"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows="4"
        required
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Creating..." : "Create Session"}
      </button>
    </form>
  );
};

export default CreateSessionForm;

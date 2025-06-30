import { useState } from "react";
import axios from "axios";
import API_PATHS from "../constants/apiPaths.js";

export default function LoginPopup({ onClose }) {
  // State variables for email, password, error message, and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("") ;
  const [loading,setLoading] = useState(false) ;

  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Reset error message and set loading state
    setError("") ;
    setLoading(true) ;

    try {
      // Make a POST request to the login API endpoint
      const response = await axios.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      
      const token = response.data.token;
      // Check if the response contains a token
      if (!token) {
        throw new Error("No token received from server");
      } ;

      
      // Store the token in localStorage
      localStorage.setItem("token", token);
      console.log("Login successful");
      onClose();
    } catch (err) {
      console.error("Login failed:", err);  
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            required
          />
          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-indigo-600 hover:underline block mx-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

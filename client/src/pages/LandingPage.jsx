import { useState } from 'react';
import LoginPopup from '../components/LoginPopup.jsx';
import SignupPopup from '../components/SignupPopup.jsx';
// import logo from '../assets/logo.svg'; // optional, replace if you have a logo

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-10 max-w-6xl">
        <div className="text-3xl font-bold text-indigo-700">InterviewPrep.AI</div>
        <div className="space-x-4">
          <button
            className="px-4 py-2 bg-white text-indigo-600 rounded-xl font-semibold shadow"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold shadow"
            onClick={() => setShowSignup(true)}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
          Ace Your Interviews with AI
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-10">
          Instantly generate mock interview sessions and concept explanations with our AI-powered prep tool.
        </p>
        <button
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-medium shadow"
          onClick={() => setShowSignup(true)}
        >
          Get Started
        </button>
      </main>

      {/* Popups */}
      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupPopup onClose={() => setShowSignup(false)} />}
    </div>
  );
}

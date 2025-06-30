import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard.jsx';
import InterviewPrep from './pages/InterviewPrep';
import { UserProvider } from './context/userContext.jsx'

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview/:sessionId" element={<InterviewPrep />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

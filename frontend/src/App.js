import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import Quiz from './components/Quiz';
import AdminPanel from './components/AdminPanel';
import AdminDashboard from './components/AdminDashboard';
import Dashboard from './components/Dashboard';
import AdminDashboardStyled from './components/AdminDashboardStyled';
import QuestionManagement from './components/QuestionManagement';
import AddMultipleChoiceQuestion from './components/AddMultipleChoiceQuestion';
import InteractiveQuiz from './components/InteractiveQuiz';
import EssayQuestion from './components/EssayQuestion';
import UserMainPage from './components/UserMainPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/usermainpage" element={<UserMainPage />} />
        <Route path="/quiz" element={<Quiz />} /> 
        <Route path="/interactive-quiz" element={<InteractiveQuiz />} />
        <Route path="/essay-question" element={<EssayQuestion />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard-styled" element={<AdminDashboardStyled />} />
        <Route path="/admin/question-management" element={<QuestionManagement />} />
        <Route path="/admin/add-mcq" element={<AddMultipleChoiceQuestion />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

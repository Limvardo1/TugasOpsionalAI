import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [quizStats, setQuizStats] = useState({
    quizzesTaken: 0,
    averageScore: 0,
    scores: [],
  });

  useEffect(() => {
    // Load quiz results from localStorage
    const storedResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    const quizzesTaken = storedResults.length;
    const averageScore = quizzesTaken > 0
      ? storedResults.reduce((acc, cur) => acc + cur.score, 0) / quizzesTaken
      : 0;

    // Prepare data for chart: array of { name: 'Quiz 1', score: 85 }
    const scores = storedResults.map((result, index) => ({
      name: \`Quiz \${index + 1}\`,
      score: result.score,
    }));

    setQuizStats({ quizzesTaken, averageScore, scores });
  }, []);

  const handleLogout = () => {
    // Clear user session or auth tokens here
    localStorage.removeItem('user'); // example key for user session
    localStorage.removeItem('quizResults'); // optional: clear quiz results
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Sidebar */}
      <div style={{
        width: '220px',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        boxSizing: 'border-box',
      }}>
        <h2 style={{ marginBottom: '30px', cursor: 'default' }}>Dashboard</h2>
        <button
          style={sidebarButtonStyle}
          onClick={() => navigate('/page1')}
        >
          Page Lain 1
        </button>
        <button
          style={sidebarButtonStyle}
          onClick={() => navigate('/page2')}
        >
          Page Lain 2
        </button>
        <button
          style={sidebarButtonStyle}
          onClick={() => navigate('/page3')}
        >
          Page Lain 3
        </button>
        <button
          style={sidebarButtonStyle}
          onClick={() => navigate(
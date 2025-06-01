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
        loading: true, // Tambah status loading
        error: null,   // Tambah status error
    });

    useEffect(() => {
        fetchQuizData();
    }, []);

    const fetchQuizData = async () => {
        setQuizStats(prev => ({ ...prev, loading: true, error: null })); // Set loading ke true

        try {
            // Simulate fetching data (ganti dengan API call sesungguhnya)
            const storedResults = JSON.parse(localStorage.getItem('quizResults')) || [];
            // Jika ada delay dari API
            await new Promise(resolve => setTimeout(resolve, 500));

            const quizzesTaken = storedResults.length;
            const averageScore = quizzesTaken > 0
                ? storedResults.reduce((acc, cur) => acc + cur.score, 0) / quizzesTaken
                : 0;

            const scores = storedResults.map((result, index) => ({
                name: `Quiz ${index + 1}`,
                score: result.score,
            }));

            setQuizStats({ quizzesTaken, averageScore, scores, loading: false, error: null });
        } catch (err) {
            console.error("Error fetching quiz data:", err);
            setQuizStats({ ...quizStats, loading: false, error: "Failed to load quiz data." });
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('quizResults');
        navigate('/login');
    };

    const navigateToPage = (path) => {
        navigate(path);
    };


    if (quizStats.loading) {
        return <div style={loadingStyle}>Loading Dashboard Data...</div>;
    }

    if (quizStats.error) {
        return <div style={errorStyle}>{quizStats.error}</div>;
    }


    return (
        <div style={dashboardContainerStyle}>
            {/* Sidebar */}
            <div style={sidebarStyle}>
                <h2 style={sidebarTitleStyle}>Dashboard</h2>
                <button style={sidebarButtonStyle} onClick={() => navigateToPage('/page1')}>Page Lain 1</button>
                <button style={sidebarButtonStyle} onClick={() => navigateToPage('/page2')}>Page Lain 2</button>
                <button style={sidebarButtonStyle} onClick={() => navigateToPage('/page3')}>Page Lain 3</button>
                <button style={sidebarButtonStyle} onClick={() => navigateToPage('/page4')}>Page Lain 4</button>
                <div style={{ flexGrow: 1 }} />
                <button style={{ ...sidebarButtonStyle, backgroundColor: '#e74c3c', marginTop: 'auto' }} onClick={handleLogout}>Logout</button>
            </div>

            {/* Main Content */}
            <div style={mainContentStyle}>
                <h1 style={mainTitleStyle}>Quiz Statistics</h1>
                <p style={dataTextStyle}>Number of quizzes taken: {quizStats.quizzesTaken}</p>
                <p style={dataTextStyle}>Average score: {quizStats.averageScore.toFixed(2)}%</p>
                {quizStats.scores.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={quizStats.scores} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" style={{ fill: '#34495e' }} />  {/* Warna label XAxis */}
                            <YAxis domain={[0, 100]} style={{ fill: '#34495e' }} />  {/* Warna label YAxis */}
                            <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', border: 'none', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    labelStyle={{ color: '#34495e', fontWeight: 'bold' }}
                                    itemStyle={{ color: '#34495e' }} />
                            <Legend wrapperStyle={{ color: '#34495e' }} />
                            <Bar dataKey="score" fill="#2980b9" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p style={noDataTextStyle}>No quiz results available to display.</p>
                )}
            </div>
        </div>
    );
};

// Styling (dipindahkan ke luar komponen untuk keterbacaan)
const dashboardContainerStyle = { display: 'flex', height: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };
const sidebarStyle = { width: '220px', backgroundColor: '#2c3e50', color: '#ecf0f1', display: 'flex', flexDirection: 'column', padding: '20px', boxSizing: 'border-box' };
const sidebarTitleStyle = { marginBottom: '30px', cursor: 'default', color: '#ecf0f1' };
const sidebarButtonStyle = { backgroundColor: '#34495e', color: '#ecf0f1', border: 'none', padding: '12px 20px', marginBottom: '15px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s ease' };
const mainContentStyle = { flexGrow: 1, padding: '40px', backgroundColor: '#ecf0f1' };
const mainTitleStyle = { marginBottom: '20px', color: '#34495e' };
const dataTextStyle = { fontSize: '18px', color: '#34495e' };
const noDataTextStyle = { color: '#34495e' };
const loadingStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '20px', color: '#555' };
const errorStyle = { color: '#e74c3c', fontSize: '18px', textAlign: 'center' };


export default Dashboard;
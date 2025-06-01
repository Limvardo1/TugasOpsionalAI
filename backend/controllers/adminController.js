const db = require('../config/db');

exports.summary = async (req, res) => {
  try {
    // Total questions count
    const [questionsResult] = await db.query('SELECT COUNT(*) AS totalQuestions FROM questions');
    const totalQuestions = questionsResult[0].totalQuestions;

    // Active quiz sessions count
    const [sessionsResult] = await db.query('SELECT COUNT(*) AS activeQuizSessions FROM sessions WHERE status = "active"');
    const activeQuizSessions = sessionsResult[0].activeQuizSessions;

    // Latest scores with student name, score, quiz name
    const [scoresResult] = await db.query(`
      SELECT sa.score AS value, s.name AS studentName, q.title AS quizName
      FROM student_answers sa
      JOIN students s ON sa.student_id = s.id
      JOIN quizzes q ON sa.quiz_id = q.id
      ORDER BY sa.updated_at DESC
      LIMIT 5
    `);

    res.json({
      totalQuestions,
      activeQuizSessions,
      latestScores: scoresResult,
    });
  } catch (error) {
    console.error('Error fetching admin summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

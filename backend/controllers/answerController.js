const db = require('../config/db');

// Submit a student answer
exports.submitAnswer = async (req, res) => {
  const { session_id, user_id, question_id, answer } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO student_answers (session_id, user_id, question_id, answer) VALUES (?, ?, ?, ?)',
      [session_id, user_id, question_id, answer]
    );
    res.status(201).json({ id: result.insertId, session_id, user_id, question_id, answer });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update score for a student answer (for essay grading)
exports.updateAnswerScore = async (req, res) => {
  const { answerId } = req.params;
  const { score } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE student_answers SET score = ? WHERE id = ?',
      [score, answerId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.json({ message: 'Score updated successfully' });
  } catch (error) {
    console.error('Error updating answer score:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all answers by session and user
exports.getAnswersBySessionAndUser = async (req, res) => {
  const { sessionId, userId } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT * FROM student_answers WHERE session_id = ? AND user_id = ?',
      [sessionId, userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching answers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const db = require('../config/db');

// Get all questions with choices
exports.getAllQuestions = async (req, res) => {
  try {
    const [questions] = await db.query('SELECT * FROM questions');
    const questionIds = questions.map(q => q.id);
    let choices = [];
    if (questionIds.length > 0) {
      const [rows] = await db.query('SELECT * FROM choices WHERE question_id IN (?)', [questionIds]);
      choices = rows;
    }
    // Map choices to questions and ensure type is set properly
    const questionsWithChoices = questions.map(q => ({
      ...q,
      type: q.type || 'single_choice', // default to single_choice if empty
      choices: choices.filter(c => c.question_id === q.id).map(c => ({
        id: c.id,
        text: c.text,
        is_correct: c.is_correct
      }))
    }));
    res.json(questionsWithChoices);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get question by ID
exports.getQuestionById = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM questions WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new question with choices
exports.createQuestion = async (req, res) => {
  let { text, type, score_weight, choices, correctAnswers } = req.body;
  if (score_weight === undefined || score_weight === null) {
    score_weight = 1; // default score weight
  }
  if (!Array.isArray(choices)) {
    choices = [];
  }
  if (!Array.isArray(correctAnswers)) {
    correctAnswers = [];
  }
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await connection.query(
      'INSERT INTO questions (text, type, score_weight) VALUES (?, ?, ?)',
      [text, type, score_weight]
    );
    const questionId = result.insertId;

    // Insert choices
    for (let i = 0; i < choices.length; i++) {
      const isCorrect = correctAnswers.includes(i);
      await connection.query(
        'INSERT INTO choices (question_id, text, is_correct) VALUES (?, ?, ?)',
        [questionId, choices[i], isCorrect]
      );
    }

    await connection.commit();
    res.status(201).json({ id: questionId, text, type, score_weight, choices, correctAnswers });
  } catch (error) {
    await connection.rollback();
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    connection.release();
  }
};

// Update a question
exports.updateQuestion = async (req, res) => {
  const id = req.params.id;
  const { text, type, score_weight } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE questions SET text = ?, type = ?, score_weight = ? WHERE id = ?',
      [text, type, score_weight, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ id, text, type, score_weight });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM questions WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get random questions with choices
exports.getRandomQuestions = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  try {
    const [questions] = await db.query('SELECT * FROM questions ORDER BY RAND() LIMIT ?', [limit]);
    const questionIds = questions.map(q => q.id);
    let choices = [];
    if (questionIds.length > 0) {
      const [rows] = await db.query('SELECT * FROM choices WHERE question_id IN (?)', [questionIds]);
      choices = rows;
    }
    // Map choices to questions and ensure type is set properly
    const questionsWithChoices = questions.map(q => ({
      ...q,
      type: q.type || 'single_choice', // default to single_choice if empty
      choices: choices.filter(c => c.question_id === q.id).map(c => ({
        id: c.id,
        text: c.text,
        is_correct: c.is_correct
      }))
    }));
    res.json(questionsWithChoices);
  } catch (error) {
    console.error('Error fetching random questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const db = require('../config/db');

// Create a new quiz session
exports.createSession = async (req, res) => {
  const { name, config } = req.body; // config is JSON with question counts per type
  try {
    const [result] = await db.query(
      'INSERT INTO quiz_sessions (name, config) VALUES (?, ?)',
      [name, JSON.stringify(config)]
    );
    res.status(201).json({ id: result.insertId, name, config });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all quiz sessions
exports.getAllSessions = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM quiz_sessions');
    // Parse config JSON before sending
    const sessions = rows.map((row) => ({
      ...row,
      config: JSON.parse(row.config),
    }));
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get session by ID
exports.getSessionById = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM quiz_sessions WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Session not found' });
    }
    const session = rows[0];
    session.config = JSON.parse(session.config);
    res.json(session);
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a quiz session
exports.updateSession = async (req, res) => {
  const id = req.params.id;
  const { name, config } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE quiz_sessions SET name = ?, config = ? WHERE id = ?',
      [name, JSON.stringify(config), id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json({ id, name, config });
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a quiz session
exports.deleteSession = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM quiz_sessions WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json({ message: 'Session deleted' });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

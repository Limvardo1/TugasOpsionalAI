const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // For simplicity, return user info without token
    res.json({
      id: user.id,
      username: user.username,
      role: user.role, // 'admin' or 'student'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

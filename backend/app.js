const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const questionRoutes = require('./routes/questionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Quiz Management Backend API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

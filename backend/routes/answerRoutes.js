const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

// Routes for student answers
router.post('/', answerController.submitAnswer);
router.get('/session/:sessionId/user/:userId', answerController.getAnswersBySessionAndUser);

module.exports = router;

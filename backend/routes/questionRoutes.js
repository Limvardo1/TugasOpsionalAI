const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// CRUD routes for questions
router.get('/', questionController.getAllQuestions);
router.get('/random', questionController.getRandomQuestions);
router.post('/', questionController.createQuestion);
router.get('/:id', questionController.getQuestionById);
router.put('/:id', questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;

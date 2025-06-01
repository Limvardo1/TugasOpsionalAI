import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const initialQuestion = {
  id: null,
  text: '',
  type: 'single_choice', // 'single_choice', 'multiple_choice', 'essay'
  choices: ['', '', '', ''],
  correctAnswers: [],
  score_weight: 1,
  score: 1,
};

function AdminPanel() {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(initialQuestion);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/questions');
      setQuestions(res.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingQuestion({ ...editingQuestion, [name]: value });
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...editingQuestion.choices];
    newChoices[index] = value;
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const handleCorrectAnswerChange = (index) => {
    let newCorrectAnswers = [...editingQuestion.correctAnswers];
    if (editingQuestion.type === 'single') {
      newCorrectAnswers = [index];
    } else {
      if (newCorrectAnswers.includes(index)) {
        newCorrectAnswers = newCorrectAnswers.filter((i) => i !== index);
      } else {
        newCorrectAnswers.push(index);
      }
    }
    setEditingQuestion({ ...editingQuestion, correctAnswers: newCorrectAnswers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare payload with correct field names
      const payload = {
        id: editingQuestion.id,
        text: editingQuestion.text,
        type: editingQuestion.type,
        score_weight: Number(editingQuestion.score_weight ?? editingQuestion.score ?? 1),
        choices: editingQuestion.choices,
        correctAnswers: editingQuestion.correctAnswers,
      };
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/questions/${editingQuestion.id}`, payload);
      } else {
        await axios.post('http://localhost:5000/api/questions', payload);
      }
      setEditingQuestion(initialQuestion);
      setIsEditing(false);
      fetchQuestions();
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion({
      id: question.id,
      text: question.text,
      type: question.type,
      choices: question.choices || ['', '', '', ''],
      correctAnswers: question.correctAnswers || [],
      score: question.score,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/questions/${id}`);
      fetchQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="container">
      <h1>Admin Panel - Manage Questions</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question Text:</label>
          <textarea
            name="text"
            value={editingQuestion.text}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <select name="type" value={editingQuestion.type} onChange={handleInputChange}>
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
            <option value="essay">Essay</option>
          </select>
        </div>
        {(editingQuestion.type === 'single' || editingQuestion.type === 'multiple') && (
          <div>
            <label>Choices:</label>
            {editingQuestion.choices.map((choice, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  required
                />
                <input
                  type={editingQuestion.type === 'single' ? 'radio' : 'checkbox'}
                  checked={editingQuestion.correctAnswers.includes(index)}
                  onChange={() => handleCorrectAnswerChange(index)}
                />
                Correct
              </div>
            ))}
          </div>
        )}
        {editingQuestion.type === 'essay' && (
          <p>Essay questions do not have choices or correct answers.</p>
        )}
        <div>
          <label>Score:</label>
          <input
            type="number"
            name="score"
            value={editingQuestion.score}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>
        <button type="submit">{isEditing ? 'Update' : 'Add'} Question</button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setEditingQuestion(initialQuestion);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Questions List</h2>
      <ul className="question-list">
        {questions.map((q) => (
          <li key={q.id}>
            <strong>{q.text}</strong> (Type: {q.type}, Score: {q.score})
            <button onClick={() => handleEdit(q)}>Edit</button>
            <button onClick={() => handleDelete(q.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;

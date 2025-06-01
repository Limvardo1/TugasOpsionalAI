import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/AdminPanel.css';

const initialQuestion = {
    id: null,
    text: '',
    type: 'single_choice', // 'single_choice', 'multiple_choice', 'essay'
    choices: ['', '', '', ''],
    correctAnswers: [],
    score: 1,
};

function AdminPanel() {
    const [questions, setQuestions] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState({ ...initialQuestion }); // Initialize as a copy
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true); // Add loading state
    const [message, setMessage] = useState(null); // Add message state

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/questions');
            setQuestions(res.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
            setMessage({ text: 'Failed to load questions.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!editingQuestion.text.trim()) {
            newErrors.text = 'Question text is required';
        }
        if (editingQuestion.type === 'single' || editingQuestion.type === 'multiple') {
            editingQuestion.choices.forEach((choice, index) => {
                if (!choice.trim()) {
                    newErrors[`choice_${index}`] = 'Choice cannot be empty';
                }
            });
            if (editingQuestion.correctAnswers.length === 0) {
                newErrors.correctAnswers = 'At least one correct answer must be selected';
            }
        }
        if (!editingQuestion.score || editingQuestion.score < 1) {
            newErrors.score = 'Score must be at least 1';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
                newCorrectAnswers = newCorrectAnswers.filter(i => i !== index);
            } else {
                newCorrectAnswers.push(index);
            }
        }
        setEditingQuestion({ ...editingQuestion, correctAnswers: newCorrectAnswers });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const payload = {
                text: editingQuestion.text,
                type: editingQuestion.type,
                choices: editingQuestion.choices,
                correctAnswers: editingQuestion.correctAnswers,
                score: Number(editingQuestion.score),
            };

            setLoading(true); // Start loading

            if (isEditing) {
                await axios.put(`http://localhost:5000/api/questions/${editingQuestion.id}`, payload);
                setMessage({ text: 'Question updated successfully!', type: 'success' });
            } else {
                const response = await axios.post('http://localhost:5000/api/questions', payload);
                payload.id = response.data.id; // Extract the ID from the response
                setQuestions(prevQuestions => [...prevQuestions, payload]);
                setMessage({ text: 'Question added successfully!', type: 'success' });
            }

            setEditingQuestion({ ...initialQuestion }); // Reset form
            setIsEditing(false);
            setErrors({});
            fetchQuestions(); // Refresh questions list
        } catch (error) {
            console.error('Error saving question:', error);
            setMessage({ text: 'Failed to save question.', type: 'error' });

        } finally {
            setLoading(false); // End loading
        }
    };


    const handleEdit = (question) => {
        setEditingQuestion({ ...question }); // Copy question data
        setIsEditing(true);
        setErrors({});
        setMessage(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this question?')) return;

        try {
            setLoading(true);
            await axios.delete(`http://localhost:5000/api/questions/${id}`);
            setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
            setMessage({ text: 'Question deleted successfully!', type: 'success' });
        } catch (error) {
            console.error('Error deleting question:', error);
            setMessage({ text: 'Failed to delete question.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditingQuestion({ ...initialQuestion });
        setIsEditing(false);
        setErrors({});
        setMessage(null);
    };


    return (
        <div className="container">
            <h1>Admin Panel - Manage Questions</h1>

            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                {/* Form fields */}
                <div>
                    <label>Question Text:</label>
                    <textarea
                        name="text"
                        value={editingQuestion.text}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.text && <p className="error">{errors.text}</p>}
                </div>

                <div>
                    <label>Type:</label>
                    <select
                        name="type"
                        value={editingQuestion.type}
                        onChange={handleInputChange}
                    >
                        <option value="single_choice">Single Choice</option>
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="essay">Essay</option>
                    </select>
                </div>

                {(editingQuestion.type === 'single_choice' || editingQuestion.type === 'multiple_choice') && (
                    <div>
                        <label>Choices:</label>
                        {editingQuestion.choices.map((choice, index) => (
                            <div key={index} className="choice-input-group">
                                <input
                                    type="text"
                                    value={choice}
                                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                                    required
                                />
                                <label>
                                    <input
                                        type={editingQuestion.type === 'single_choice' ? 'radio' : 'checkbox'}
                                        checked={editingQuestion.correctAnswers.includes(index)}
                                        onChange={() => handleCorrectAnswerChange(index)}
                                    />
                                    Correct
                                </label>
                                {errors[`choice_${index}`] && <p className="error">{errors[`choice_${index}`]}</p>}
                            </div>
                        ))}
                        {errors.correctAnswers && <p className="error">{errors.correctAnswers}</p>}
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
                    {errors.score && <p className="error">{errors.score}</p>}
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add')} Question
                </button>

                {isEditing && (
                    <button type="button" onClick={handleCancelEdit} disabled={loading}>
                        {loading ? 'Cancelling...' : 'Cancel'}
                    </button>
                )}
            </form>

            <h2>Questions List</h2>
            {loading ? (
                <div>Loading questions...</div>
            ) : (
                <ul className="question-list">
                    {questions.map(q => (
                        <li key={q.id}>
                            <strong>{q.text}</strong> (Type: {q.type}, Score: {q.score})
                            <div className="question-actions">
                                <button onClick={() => handleEdit(q)} disabled={loading}>Edit</button>
                                <button onClick={() => handleDelete(q.id)} disabled={loading}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AdminPanel;
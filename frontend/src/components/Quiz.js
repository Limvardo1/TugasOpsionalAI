import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './styles/Quiz.css';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && !quizFinished) {
      startTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [currentIndex, questions, quizFinished]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/questions/random?limit=10');
      setQuestions(res.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const startTimer = () => {
    setTimeLeft(30);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswerChange = (choiceIndex) => {
    const currentQuestion = questions[currentIndex];
    if (currentQuestion.type === 'single_choice') {
      setAnswers({ ...answers, [currentIndex]: choiceIndex });
    } else if (currentQuestion.type === 'multiple_choice') {
      const currentAnswers = Array.isArray(answers[currentIndex]) ? answers[currentIndex] : [];
      if (currentAnswers.includes(choiceIndex)) {
        // Remove choiceIndex
        setAnswers({
          ...answers,
          [currentIndex]: currentAnswers.filter((idx) => idx !== choiceIndex),
        });
      } else {
        // Add choiceIndex
        setAnswers({
          ...answers,
          [currentIndex]: [...currentAnswers, choiceIndex],
        });
      }
    }
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = questions[currentIndex];
    const userAnswer = answers[currentIndex];
    let questionScore = 0;

    if (currentQuestion.type === 'single_choice') {
      if (currentQuestion.choices.some((choice, idx) => idx === userAnswer && choice.is_correct)) {
        questionScore = currentQuestion.score_weight * (timeLeft / 30);
      }
    } else if (currentQuestion.type === 'multiple_choice') {
      const correctIndexes = currentQuestion.choices
        .map((choice, idx) => (choice.is_correct ? idx : null))
        .filter((idx) => idx !== null);
      const userAnswers = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
      const correctSet = new Set(correctIndexes);
      const userSet = new Set(userAnswers);
      if (
        userSet.size === correctSet.size &&
        [...userSet].every((ans) => correctSet.has(ans))
      ) {
        questionScore = currentQuestion.score_weight * (timeLeft / 30);
      }
    } else if (currentQuestion.type === 'essay') {
      // For essay, scoring can be manual or default 0 here
      questionScore = 0;
    }

    setScore(questionScore);
  };

  const handleNext = () => {
    handleSubmitAnswer();
    // Save the current quiz result to localStorage
    const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    const currentResult = {
      score,
      timestamp: new Date().toISOString(),
    };
    // If quiz finished, add the result
    if (currentIndex + 1 >= questions.length) {
      quizResults.push(currentResult);
      localStorage.setItem('quizResults', JSON.stringify(quizResults));
    }
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  if (!questions || questions.length === 0) {
    return <div className="quiz-container">Loading questions...</div>;
  }

  if (quizFinished) {
    return (
      <div className="quiz-container quiz-finished">
        <h2>Quiz Finished!</h2>
        <p>Your score: {score.toFixed(2)}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Quiz Mode</h1>
        <div className="timer">Time left: {timeLeft} seconds</div>
        <div className="current-score">Current Score: {score.toFixed(2)}</div>
      </div>
      <div className="question-number">
        Question {currentIndex + 1} of {questions.length}
      </div>
      <div className="question-text">{currentQuestion.text}</div>
      {currentQuestion.type === 'essay' ? (
        <textarea
          className="answer-textarea"
          rows="4"
          cols="50"
          onChange={(e) => setAnswers({ ...answers, [currentIndex]: e.target.value })}
        />
      ) : (
        <div className="choices">
          {currentQuestion.choices.map((choice, index) => (
            <label className="choice" key={index}>
              <input
                type={currentQuestion.type === 'single_choice' ? 'radio' : 'checkbox'}
                name="answer"
                value={index}
                checked={
                  currentQuestion.type === 'single_choice'
                    ? answers[currentIndex] === index
                    : answers[currentIndex]?.includes(index)
                }
                onChange={() => handleAnswerChange(index)}
              />
              {choice.text}
            </label>
          ))}
        </div>
      )}
      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default Quiz;

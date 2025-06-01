import React, { useState, useEffect } from 'react';
import './InteractiveQuiz.css';

const InteractiveQuiz = () => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Dummy questions
  const questions = [
    {
      id: 1,
      text: "Planet mana yang dikenal sebagai 'Planet Merah'?",
      choices: [
        { text: 'Mars', color: 'red' },
        { text: 'Jupiter', color: 'blue' },
        { text: 'Venus', color: 'yellow' },
        { text: 'Saturnus', color: 'green' },
      ],
    },
  ];

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (choice) => {
    alert(`Anda memilih: ${choice.text}`);
    // TODO: handle answer logic
  };

  return (
    <div className="interactive-quiz">
      <h1>KUIS INTERAKTIF</h1>
      <div className="timer">TIMER: 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</div>
      <div className="question-number">Soal {currentQuestionIndex + 1}</div>
      <div className="question-text">{questions[currentQuestionIndex].text}</div>
      <div className="choices">
        {questions[currentQuestionIndex].choices.map((choice, idx) => (
          <button
            key={idx}
            className="choice-btn"
            style={{ backgroundColor: choice.color }}
            onClick={() => handleAnswer(choice)}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InteractiveQuiz;

import React, { useState } from 'react';
import './styles/AddMultipleChoiceQuestion.css';

const AddMultipleChoiceQuestion = () => {
  const [questionText, setQuestionText] = useState('');
  const [choices, setChoices] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const [score, setScore] = useState('');

  const handleChoiceChange = (index, field, value) => {
    const newChoices = [...choices];
    newChoices[index][field] = field === 'isCorrect' ? value : value;
    setChoices(newChoices);
  };

  const addChoice = () => {
    setChoices([...choices, { text: '', isCorrect: false }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit question to backend
    alert('Soal pilihan ganda berhasil ditambahkan!');
  };

  return (
    <div className="add-mcq-container">
      <h1>Tambah Soal Pilihan Ganda</h1>
      <form onSubmit={handleSubmit}>
        <label>Teks Soal:</label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          rows="4"
          required
        />
        <div className="choices-section">
          <label>Pilihan Jawaban:</label>
          {choices.map((choice, index) => (
            <div key={index} className="choice-item">
              <input
                type="checkbox"
                checked={choice.isCorrect}
                onChange={(e) => handleChoiceChange(index, 'isCorrect', e.target.checked)}
              />
              <input
                type="text"
                value={choice.text}
                onChange={(e) => handleChoiceChange(index, 'text', e.target.value)}
                placeholder={`Pilihan ${String.fromCharCode(65 + index)}`}
                required
              />
              <span>(Ceklis jika benar)</span>
            </div>
          ))}
          <button type="button" className="btn-add-choice" onClick={addChoice}>
            Tambah Pilihan Lain
          </button>
        </div>
        <label>Skor:</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
          min="0"
        />
        <div className="form-buttons">
          <button type="submit" className="btn-submit">Simpan</button>
          <button type="button" className="btn-cancel">Batal</button>
        </div>
      </form>
    </div>
  );
};

export default AddMultipleChoiceQuestion;

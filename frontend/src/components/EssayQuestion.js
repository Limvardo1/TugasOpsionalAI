import React, { useState } from 'react';
import './EssayQuestion.css';

const EssayQuestion = () => {
  const [answer, setAnswer] = useState('');

  const handlePrevious = () => {
    alert('Soal sebelumnya');
    // TODO: Implement navigation to previous question
  };

  const handleSaveAndNext = () => {
    alert('Jawaban disimpan, lanjut ke soal berikutnya');
    // TODO: Implement save answer and navigate to next question
  };

  return (
    <div className="essay-question">
      <h1>Soal Esai</h1>
      <div className="question-number">Soal [Nomor Soal]</div>
      <div className="question-text">
        <p>[Teks Soal Esai yang Lengkap]</p>
      </div>
      <label>Jawaban Anda:</label>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows="10"
        placeholder="Ketik jawaban Anda di sini..."
      />
      <div className="navigation-buttons">
        <button onClick={handlePrevious} className="btn-nav">Soal Sebelumnya</button>
        <button onClick={handleSaveAndNext} className="btn-nav btn-save">Simpan Jawaban & Lanjut</button>
      </div>
    </div>
  );
};

export default EssayQuestion;

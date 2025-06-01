import React from 'react';
import './styles/QuestionManagement.css';

const QuestionManagement = () => {
  // Dummy data for questions
  const questions = [
    { id: 1, type: 'Pilihan Ganda', text: 'Apa ibu kota Indonesia...?', score: 10 },
    { id: 2, type: 'Esai', text: 'Jelaskan dampak pemanasan...', score: 20 },
  ];

  return (
    <div className="question-management">
      <h1>Manajemen Soal</h1>
      <div className="actions">
        <button className="btn-add">Tambah Soal Baru</button>
        <input type="text" placeholder="Cari Soal" className="search-input" />
      </div>
      <table className="questions-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tipe</th>
            <th>Soal (sebagian)</th>
            <th>Skor</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{q.type}</td>
              <td>{q.text}</td>
              <td>{q.score}</td>
              <td>
                <button className="btn-action">Lihat</button>
                <button className="btn-action">Ubah</button>
                <button className="btn-action btn-delete">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>{'<'}</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>{'>'}</button>
      </div>
    </div>
  );
};

export default QuestionManagement;

import React from 'react';
import './styles/AdminDashboardStyled.css';

const AdminDashboardStyled = () => {
  return (
    <div className="admin-dashboard">
      <h1>DASHBOARD ADMIN</h1>
      <section className="welcome-section">
        <p>Selamat datang, Admin!</p>
      </section>
      <section className="summary-section">
        <h2>Ringkasan:</h2>
        <ul>
          <li>Total Soal: <strong>[Jumlah]</strong></li>
          <li>Sesi Kuis Aktif: <strong>[Jumlah]</strong></li>
          <li>Nilai Terbaru:</li>
          <ul className="latest-scores">
            <li>[Nama Mahasiswa]: [Nilai] ([Nama Kuis])</li>
            <li>[Nama Mahasiswa]: [Nilai] ([Nama Kuis])</li>
            <li>...</li>
          </ul>
        </ul>
      </section>
      <section className="navigation-section">
        <button className="nav-btn">Manajemen Soal</button>
        <button className="nav-btn">Manajemen Kuis</button>
        <button className="nav-btn">Rekap Nilai</button>
      </section>
    </div>
  );
};

export default AdminDashboardStyled;

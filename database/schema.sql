-- Database schema for quiz management application

CREATE DATABASE IF NOT EXISTS quiz_app;
USE quiz_app;

-- Users table (admin and students)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'student') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions table
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text TEXT NOT NULL,
  type ENUM('single_choice', 'multiple_choice', 'essay') NOT NULL,
  score_weight INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Choices table for multiple choice questions
CREATE TABLE choices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  text VARCHAR(255) NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Quiz sessions table
CREATE TABLE quiz_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  config JSON NOT NULL, -- e.g. number of questions per type
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student answers table
CREATE TABLE student_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  answer TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Scores table
CREATE TABLE scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  user_id INT NOT NULL,
  score INT NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

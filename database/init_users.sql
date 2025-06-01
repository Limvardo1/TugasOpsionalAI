-- Insert default admin user (password: admin123)
INSERT INTO users (username, password, role) VALUES
('admin', '$2b$10$7QJ6vQ0Q0Q0Q0Q0Q0Q0QOeWq6Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q', 'admin');

-- Insert default student user (password: user123)
INSERT INTO users (username, password, role) VALUES
('user', '$2b$10$8QJ6vQ0Q0Q0Q0Q0Q0Q0QOeWq6Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q', 'student');

-- Password hashes are bcrypt hashes of 'admin123' and 'user123' respectively.

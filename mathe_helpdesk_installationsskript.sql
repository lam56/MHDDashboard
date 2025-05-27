-- Database: mathe_helpdesk
USE mathe_helpdesk;

-- Disable FK checks to allow clean drops
SET FOREIGN_KEY_CHECKS = 0;

-- Drop tables if they exist
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS work_hours;
DROP TABLE IF EXISTS contracts;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

-- Re-enable FK checks
SET FOREIGN_KEY_CHECKS = 1;

-- Create users table
CREATE TABLE users (
                       id INT PRIMARY KEY AUTO_INCREMENT,
                       name VARCHAR(100),
                       email VARCHAR(100) UNIQUE,
                       password VARCHAR(255),
                       role ENUM('admin', 'tutor') NOT NULL,
                       team VARCHAR(100)
);

-- Create contracts table
CREATE TABLE contracts (
                           id INT PRIMARY KEY AUTO_INCREMENT,
                           tutor_id INT,
                           start_date DATE,
                           end_date DATE,
                           total_hours INT,
                           vacation_days INT,
                           FOREIGN KEY (tutor_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create work_hours table
CREATE TABLE work_hours (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            tutor_id INT,
                            date DATE,
                            hours_worked INT,
                            FOREIGN KEY (tutor_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create attendance table
CREATE TABLE attendance (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            tutor_id INT,
                            date DATE,
                            student_count INT,
                            topics VARCHAR(255),
                            session_type VARCHAR(50),
                            notes TEXT,
                            FOREIGN KEY (tutor_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create events table
CREATE TABLE events (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        title VARCHAR(255),
                        start DATE,
                        end DATE,
                        team VARCHAR(100),
                        all_day BOOLEAN DEFAULT TRUE
);

ALTER TABLE users AUTO_INCREMENT = 1;

-- Insert sample users
INSERT INTO users (name, email, password, role, team) VALUES
                                                          ('Admin One', 'admin@example.com', 'hashedpassword', 'admin', 'Team EFS'),
                                                          ('Tutor One', 'tutor1@example.com', 'hashedpassword', 'tutor', 'Team EFS'),
                                                          ('Tutor Two', 'tutor2@example.com', 'hashedpassword', 'tutor', 'Team EFS'),
                                                          ('Tutor Three', 'tutor3@example.com', 'hashedpassword', 'tutor', 'Team SON'),
                                                          ('Tutor Four', 'tutor4@example.com', 'hashedpassword', 'tutor', 'Team SON');

-- Insert contracts
INSERT INTO contracts (tutor_id, start_date, end_date, total_hours, vacation_days) VALUES
                                                                                       (2, '2023-01-01', '2023-12-31', 180, 20),
                                                                                       (3, '2023-02-01', '2023-12-31', 160, 15),
                                                                                       (4, '2022-09-01', '2023-08-31', 170, 18),
                                                                                       (5, '2022-01-01', '2022-12-31', 150, 10);

-- Insert work_hours
INSERT INTO work_hours (tutor_id, date, hours_worked) VALUES
                                                          (2, '2023-04-01', 4),
                                                          (2, '2023-04-08', 3),
                                                          (2, '2023-05-09', 5),
                                                          (2, '2023-06-13', 2),
                                                          (3, '2023-04-04', 5),
                                                          (3, '2023-04-11', 4),
                                                          (3, '2023-05-30', 6),
                                                          (3, '2023-07-08', 3),
                                                          (4, '2022-10-10', 4),
                                                          (4, '2022-11-05', 3),
                                                          (4, '2023-01-20', 4),
                                                          (4, '2023-06-12', 3),
                                                          (5, '2022-03-15', 5),
                                                          (5, '2022-05-22', 4),
                                                          (5, '2022-07-10', 3),
                                                          (5, '2022-11-20', 4);

-- Insert attendance
INSERT INTO attendance (tutor_id, date, student_count, topics, session_type, notes) VALUES
                                                                                        (2, '2023-04-01', 5, 'Algebra', '1-on-1', 'Exam prep'),
                                                                                        (2, '2023-04-08', 8, 'Geometry', 'Group', ''),
                                                                                        (2, '2023-05-09', 6, 'Functions', '1-on-1', 'Exam prep'),
                                                                                        (3, '2023-04-04', 4, 'Calculus', '1-on-1', 'New Student'),
                                                                                        (4, '2022-10-10', 6, 'Statistics', '1-on-1', 'New Student'),
                                                                                        (4, '2023-01-20', 5, 'Probability', 'Group', ''),
                                                                                        (5, '2022-03-14', 3, 'Equations', '1-on-1', 'New Student'),
                                                                                        (5, '2022-07-10', 6, 'Word Problems', '1-on-1', ''),
                                                                                        (5, '2022-11-20', 5, 'Graphs', 'Group', 'New Student');

-- Insert events
INSERT INTO events (title, start, end, team, all_day) VALUES
                                                          ('Spring Kickoff Meeting', '2023-03-15', '2023-03-15', 'Team EFS', TRUE),
                                                          ('Exam Support Week', '2023-06-01', '2023-06-07', 'Team EFS', TRUE);

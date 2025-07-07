-- Clear existing course progress data for courses 1, 2, 3
-- Since we're replacing the course structure entirely
DELETE FROM course_progress WHERE course_id IN (1, 2, 3);
DELETE FROM lesson_progress WHERE course_id IN (1, 2, 3);
DELETE FROM quiz_attempts WHERE course_id IN (1, 2, 3);
DELETE FROM bookmarks WHERE course_id IN (1, 2, 3);
DELETE FROM course_notes WHERE course_id IN (1, 2, 3);
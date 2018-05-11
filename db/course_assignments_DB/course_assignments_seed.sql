create table course_assignments (
    id SERIAL PRIMARY key,
    student_id integer references users(id),
    course_id integer references course(id),
    assignment_id integer references assignments(id),
    points_possible DECIMAL,
    percentage DECIMAL,
    letter_grade VARCHAR(10),
    date_submitted DATE,
    attachment text,
    point_scored DECIMAL,
    course_day_id INTEGER REFERENCES course_days(id),
    due_date DATE
)
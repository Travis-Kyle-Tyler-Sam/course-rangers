create table assignments (
    id SERIAL PRIMARY key,
    course_id integer references courses(id),
    assignment_name VARCHAR(100),
    explanation VARCHAR(1000),
    due_date_offset INTEGER,
    type varchar(12),
    course_day_id INTEGER REFERENCES course_days(id),
    attachment text,
    curriculum_day_id INTEGER REFERENCES days(id),
    curriculum_id INTEGER REFERENCES curricula(id)
)

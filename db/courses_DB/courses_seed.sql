create table courses (
    id serial PRIMARY KEY,
    course_name VARCHAR(100),
    teacher_id INTEGER REFERENCES users(id),
    start_date DATE,
    completion_date DATE,
    curriculum_id INTEGER REFERENCES curricula(id)
)
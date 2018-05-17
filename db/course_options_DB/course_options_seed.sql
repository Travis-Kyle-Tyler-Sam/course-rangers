create table course_questions(
    id serial primary key,
    course_assignments_id INTEGER REFERENCES course_assignments(id),
    option_selected VARCHAR(200),
    correct_answer VARCHAR(200),
    points_awarded DECIMAL,
    question_id INTEGER REFERENCES questions(id)
)
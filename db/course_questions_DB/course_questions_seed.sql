create table course_questions(
    id serial primary key,
    course_assignments_id INTEGER REFERENCES course_assignments(id),
    question varchar(200),
    option_selected VARCHAR(200),
    correct_answer VARCHAR(200),
    points_awarded DECIMAL,
    points_possible DECIMAL,
    question_id INTEGER REFERENCES questions(id)
)

select q.correct_answer, q.question, q.id, o.option_text, a.student_id from course_questions q
join course_assignments a
on q.course_assignments_id = a.id
join options o on o.question_id = q.question_id
order by a.student_id

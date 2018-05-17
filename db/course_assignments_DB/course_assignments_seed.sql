create table course_assignments (
    id SERIAL PRIMARY key,
    student_id integer references users(id),
    course_id integer references course(id),
    assignment_id integer , --soft references to assignments(id)
    points_possible DECIMAL,
    percentage DECIMAL,
    letter_grade VARCHAR(10),
    date_submitted DATE,
    attachment text,
    point_scored DECIMAL,
    course_day_id INTEGER REFERENCES course_days(id),
    due_date DATE,
    name varchar(180),
    description varchar(800),
    type varchar(20)
)

insert into course_assignments (
    student_id,
    course_id,
    assignment_id,
    points_possible,
    course_day_id,
    due_date
)

values
(5, 13, 7, 150, 5, '2018-05-17');
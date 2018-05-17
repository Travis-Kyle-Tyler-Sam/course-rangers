create table courses (
    id serial PRIMARY KEY,
    course_name VARCHAR(100),
    teacher_id INTEGER REFERENCES users(id),
    start_date DATE,
    completion_date DATE,
    curriculum_id INTEGER REFERENCES curricula(id)
)



-- dummy data
insert into courses (
course_name, teacher_id, start_date, completion_date, curriculum_id
)
values 
('Math stuff', 1, '2018-05-05', '2018-05-05', 1),
('My cool course', 1, '2018-05-17', '2018-05-17', 26);
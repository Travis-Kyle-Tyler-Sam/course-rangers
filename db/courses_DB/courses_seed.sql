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

-- Clear test data

delete from course_questions;
delete from course_assignments;
delete from course_days;
delete from course_assignments;
delete from user_courses;
delete from courses;
create table course_days (
    id Serial primary key,
    date DATE,
    course_id integer references courses(id);
    topic varchar(200),
    description varchar(800),
    day_in_curriculum integer
)

insert into course_days
(date, course_id, topic, description, day_in_curriculum)
values
('2018-05-17', 13, 'Math Functions', 'Learn how to use functions in math', 1);
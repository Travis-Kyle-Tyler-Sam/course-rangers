create table resources (
    id serial primary key,
    course_day_id INTEGER REFERENCES course_days(id),
    title varchar(100),
    description VARCHAR(1000),
    url text,
    curriculum_day_id INTEGER REFERENCES days(id)
);
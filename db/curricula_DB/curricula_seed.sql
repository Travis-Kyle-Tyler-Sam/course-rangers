create table curricula (
    id serial PRIMARY KEY,
    curriculum_name varchar(200),
    teacher_id INTEGER REFERENCES users(id),
    days_of_week text[]
);
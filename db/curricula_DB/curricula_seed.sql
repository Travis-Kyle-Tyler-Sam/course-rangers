create table curricula (
    id serial PRIMARY KEY,
    curriculum_name varchar(200),
    teacher_id INTEGER REFERENCES users(id),
    days_of_week text[]
);


-- ///// dummy DATA

insert into curricula (
curriculum_name, teacher_id, days_of_week
)
values ('Math and Stuff', 1, ARRAY['a'])
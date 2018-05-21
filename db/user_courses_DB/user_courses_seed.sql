create table user_courses (
 connect_id serial primary key,
 user_id INTEGER REFERENCES users(id),
 class_id INTEGER REFERENCES courses(id)
)

insert into user_courses
(user_id, class_id)
values(23, 61),
(23, 62),
(23, 63)
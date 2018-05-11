create table user_courses (
 connect_id serial primary key,
 user_id INTEGER REFERENCES users(id),
 class_id INTEGER REFERENCES courses(id)
)
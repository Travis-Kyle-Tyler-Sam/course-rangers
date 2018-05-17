insert into courses (
course_name, teacher_id, start_date, completion_date, curriculum_id
)
values ($1, $2, $3, $4, $5)
returning *;


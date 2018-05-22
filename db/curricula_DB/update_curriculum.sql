insert into curricula 
(id, curriculum_name, teacher_id)
values ($1, $2, $3)
returning *;

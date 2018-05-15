insert into curricula 
(curriculum_name, teacher_id)
values ($1, $2)
returning *;

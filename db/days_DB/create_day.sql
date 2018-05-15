insert into days
(curriculum_id, topic, description, day_in_curriculum)
values
($1, $2, $3, $4)
returning *;
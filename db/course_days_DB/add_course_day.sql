insert into course_days
(date, course_id, topic, description, day_in_curriculum)
values
($1, $2, $3, $4, $5)
returning *;
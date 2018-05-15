select * from assignments
where curriculum_day_id = $1
and type = 'assignment';
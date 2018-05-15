insert into assignments
(assignment_name, explanation, due_date_offset, type, attachment, curriculum_day_id, curriculum_id, total_pts)
values
($1, $2, $3, $4, $5, $6, $7, $8)
returning *;
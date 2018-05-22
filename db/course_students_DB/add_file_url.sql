update course_assignments
set attachment = $1
where id = $2
returning *;
update course_assignments
set attachment = $1,
date_submitted = $3
where id = $2
returning *;
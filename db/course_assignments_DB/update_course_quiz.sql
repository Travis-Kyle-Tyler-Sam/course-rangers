update course_assignments
set point_scored = $1, percentage = $2, date_submitted = $3, letter_grade = $4
where id = $5
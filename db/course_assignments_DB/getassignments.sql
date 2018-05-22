select * from users
join course_assignments on course_assignments.student_id = users.id
where course_assignments.assignment_id = $1;
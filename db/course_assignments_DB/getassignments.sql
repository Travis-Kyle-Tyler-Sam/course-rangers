select * from course_assignments
join users on course_assignments.student_id = users.id
where course_assignments.assignment_id = $1;
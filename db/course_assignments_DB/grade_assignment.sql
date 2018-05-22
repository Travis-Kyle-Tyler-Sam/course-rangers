update course_assignments
set point_scored = $2,
percentage = $3,
letter_grade = $4
where id = $5;
select * from users
join course_assignments on course_assignments.student_id = users.id
where course_assignments.assignment_id = $1;
select * from course_assignments
where course_id = $1 AND student_id = $2
order by due_date;
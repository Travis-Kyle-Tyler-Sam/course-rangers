select * from course_days
join course_assignments on course_days.id = course_assignments.course_day_id
join course_resources on course_days.id = course_resources.course_day_id
where course_days.id = $1 and course_assignments.student_id = $2
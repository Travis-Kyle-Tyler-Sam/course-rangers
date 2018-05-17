select courses.id, courses.course_name, courses.start_date, curricula.curriculum_name from courses
JOIN curricula on courses.curriculum_id = curricula.id 
where courses.teacher_id = $1;


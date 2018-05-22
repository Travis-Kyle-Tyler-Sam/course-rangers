select * from course_resources as cr
join course_days as cd
on cr.course_day_id = cd.id
where course_id = $1;
-- gets course information from studentid

select 
c.course_name, c.id as course_id, c.completion_date, c.start_date, us.user_name as teacher_name, us.id as teacher_id, us.email as teacher_email,
us.phone as teacher_phone
from users as u
join user_courses as uc
on u.id = uc.user_id
join courses as c
on c.id = uc.class_id
join users as us 
on us.id = c.teacher_id
where u.id = $1;
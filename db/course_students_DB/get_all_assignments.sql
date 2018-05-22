select 
uc.class_id as course_id, c.course_name, c.teacher_id, us.user_name as teacher_name, ca.name, ca.due_date, ca.point_scored,
ca.points_possible, ca.percentage, ca.type, ca.description, ca.date_submitted, ca.letter_grade, ca.id, ca.attachment
from users as u
join user_courses as uc
on u.id = uc.user_id
join courses as c
on c.id = uc.class_id
join users as us
on us.id = c.teacher_id
join course_assignments as ca
on ca.student_id = u.id
where u.id = $1
order by ca.due_date;
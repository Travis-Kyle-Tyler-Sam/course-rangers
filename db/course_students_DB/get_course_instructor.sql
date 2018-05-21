-- gets instructor information from courseid

select * from courses as c
join user_courses as uc
on c.id = uc.class_id
join users as u
on uc.user_id = u.id
WHERE c.id = $1 AND user_type = 'Instructor';
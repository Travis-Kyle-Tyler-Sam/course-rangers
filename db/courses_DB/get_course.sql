select * from courses as c
join users as u
on u.id = c.teacher_id
where c.id = $1;
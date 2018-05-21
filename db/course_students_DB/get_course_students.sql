-- gets course information from studentid

select * from users as u
join user_courses as uc
on u.id = uc.user_id
join courses as c
on c.id = uc.class_id
where u.id = $1;
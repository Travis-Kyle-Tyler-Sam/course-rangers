select u.id, u.user_name, c.class_id, u.auth_id, u.email, u.phone, u.user_type, u.linker_id, u.level, u.exp, u.course_connect from user_courses c
join users u on u.id = c.user_id
where user_type = 'Student';
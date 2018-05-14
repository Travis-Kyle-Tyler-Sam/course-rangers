update users 
set user_name = $2,
email = $3,
phone = $4,
user_type = $5,
linker_id = $6
where id = $1
returning user_name, email, phone, user_type, id;
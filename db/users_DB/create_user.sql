INSERT INTO users
(user_name, auth_id, email, phone, user_type, linker_id, course_connect, level, exp)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9);
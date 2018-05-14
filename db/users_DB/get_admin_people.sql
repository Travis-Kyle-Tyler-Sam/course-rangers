select 
id,
user_name,
email,
phone,
user_type
from users
where linker_id = $1;
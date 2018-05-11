insert into curricula (
curriculum_name, teacher_id, days_of_week
)
values ($1, $2, $3);

select * from curricula
where teacher_id = $2;  
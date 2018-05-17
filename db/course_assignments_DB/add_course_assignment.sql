insert into course_assignments (
    student_id,
    course_id,
    assignment_id,
    points_possible,
    course_day_id,
    due_date,
    name,
    description,
    type

)

values
($1, $2, $3, $4, $5, $6, $7, $8, $9);

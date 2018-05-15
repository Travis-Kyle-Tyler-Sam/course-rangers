insert into questions
(assignment_id, question, correct_answer, points)
values
($1, $2, $3, $4)
returning *;
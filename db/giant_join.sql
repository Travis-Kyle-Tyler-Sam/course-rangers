select cu.id curriculum_id, cu.curriculum_name, cu.teacher_id, da.topic, da.description, da.day_in_curriculum, da.id day_id, a.id assignment_id, a.assignment_name, a.explanation assignment_explanation, 
a.due_date_offset assignment_due, a.type assignment_type, a.attachment assignment_attachment, a.total_pts assignment_points, q.id question_id, q.question, q.correct_answer, q.points, o.id option_id, o.option_text, o.question_id
from curricula cu
full outer join days da on cu.id  = da.curriculum_id
full outer join assignments a on da.id = a.curriculum_day_id
full outer join questions q on a.id = q.assignment_id
full outer join options o on q.id = o.question_id
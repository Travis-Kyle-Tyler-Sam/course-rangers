create table course_days (
    id Serial primary key,
    date DATE,
    curricula_day_id INTEGER REFERENCES days(id)
)
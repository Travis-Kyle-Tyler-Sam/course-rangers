create table options (
    id serial primary key,
    option_text VARCHAR(1000),
    question_id INTEGER REFERENCES questions(id)
)
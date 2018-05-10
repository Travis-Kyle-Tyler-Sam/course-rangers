create table questions(
    id serial primary key,
    assignment_id INTEGER REFERENCES assignments(id),
    question VARCHAR(1000),
    correct_answer VARCHAR(30),
    points DECIMAL
);
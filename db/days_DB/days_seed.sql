create table days (
    id serial PRIMARY KEy,
    curriculum_id INTEGER REFERENCES curricula(id),
    topic varchar(100),
    description varchar(500),
    day_in_curriculum INTEGER
);
CREATE TABLE uploads
(
upload_id SERIAL PRIMARY KEY,
img_url TEXT,
id INTEGER REFERENCES users
);
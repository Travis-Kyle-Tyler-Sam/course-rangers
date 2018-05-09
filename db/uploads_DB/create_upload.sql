INSERT INTO uploads
(img_url, id)
VALUES
($1, $2);
SELECT *
FROM uploads
JOIN users on users.id = uploads.id
WHERE users.id = $2
ORDER BY upload_id ASC;
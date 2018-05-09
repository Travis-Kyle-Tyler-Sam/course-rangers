SELECT *
FROM uploads
JOIN users on users.id = uploads.id
WHERE users.id = $1
ORDER BY upload_id ASC;
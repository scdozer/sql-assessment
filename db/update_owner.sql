
UPDATE vehicles
SET owner_ID = ${userId}
WHERE id = ${vehicleId}
RETURNING *;

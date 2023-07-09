SELECT V.*, COUNT(f.vacationCode) as numberOfFollowers
FROM vacations AS V INNER JOIN followers as F
ON V.vacationCode = f.vacationCode
GROUP BY V.vacationCode, f.vacationCode
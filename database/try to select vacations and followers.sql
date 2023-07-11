SELECT V.*, COUNT(f.userCode) as numberOfFollowers
FROM vacations AS V LEFT JOIN followers as F
ON V.vacationCode = f.vacationCode
GROUP BY V.vacationCode, f.vacationCode
ORDER BY startDate
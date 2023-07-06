//  בכל כרטיסיה ניתן לראות את כלל הפרטים של החופשה, את מספר ה-Followers שיש לה מכלל 
// המשתמשים והאם המשתמש הנוכחי עוקב אחריה או לא
//  משתמש יכול לבצע Follow או Unfollow לחופשה
import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ValidationError } from "../4-models/Error";
import User from "../4-models/User";

export const getFollowersOfVacation =async (vacationCode:number):Promise<User[]> => {
    try {
        const sql = `SELECT * FROM followers
                     WHERE vacationCode = ${vacationCode}`;
        return await dal.execute<User[]>(sql)
    } catch (err) {
        throw err
    }
}

export const addFollower =async (vacationCode:number, userCode:number):Promise<void> => {
    const sql = `INSERT INTO followers (userCode,VacationCode)
                 VALUES (${vacationCode}, ${userCode});`;
    const info = await dal.execute<OkPacket>(sql);

    if (info.affectedRows === 0) {
        throw new ValidationError("user or vacation do not valid")
    }    
}

export const deleteFollower =async (vacationCode:number, userCode:number):Promise<void> => {
    const sql = `DELETE FROM followers 
                 WHERE vacationCode = ${vacationCode} AND
                 userCode = ${userCode}`;
    const info = await dal.execute<OkPacket>(sql);

    if (info.affectedRows === 0) {
        throw new ValidationError("user or vacation do not found")
    }
}
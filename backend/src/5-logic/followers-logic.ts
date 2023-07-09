import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ValidationError } from "../4-models/Error";

export const getFollowersOfVacation =async (vacationCode:number):Promise<number[]> => {
    try {
        const sql = `SELECT userCode FROM followers
                     WHERE vacationCode = ${vacationCode}`;   
        const followers = await dal.execute<{userCode: number}[]>(sql)
        return followers.map(follower => follower.userCode)
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
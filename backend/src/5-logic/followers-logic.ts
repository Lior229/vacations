import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ValidationError } from "../4-models/Error";

export const getFollowingVacationPerUser =async (userCode:number):Promise<{[key: number]: boolean}> => {
    try {
        const sql = `SELECT vacationCode FROM followers
                     WHERE userCode = ${userCode}`; 
                       
        const likedVacationsCode = await dal.execute<{vacationCode: number}[]>(sql)

        let objectLikedVacations = likedVacationsCode.reduce(
            (accumulator, target) => ({ ...accumulator, [target.vacationCode]: true })
            ,{});

        return objectLikedVacations
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
import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/Error";
import Vacation from "../4-models/Vacation";
import moment from 'moment';

export const getAllVacations =async ():Promise<Vacation[]> => {
    try {
        const sql = `SELECT V.*, COUNT(f.userCode) as numberOfFollowers
                     FROM vacations AS V LEFT JOIN followers as F
                     ON V.vacationCode = f.vacationCode
                     GROUP BY V.vacationCode, f.vacationCode
                     ORDER BY startDate`
        let vacations = await dal.execute<Vacation[]>(sql)        
        return vacations
    } catch (err) {
        throw err
    }
}

export const addNewVacation =async (vacationToAdd:Vacation):Promise<Vacation> => {
    const error = vacationToAdd.validation()
    if (error) throw new ValidationError(error)

    const now = new Date();
    if (vacationToAdd.startDate < now || vacationToAdd.endDate < now){
    throw new ValidationError("vacation dates in the past")}

    if (vacationToAdd.endDate < vacationToAdd.startDate){
    throw new ValidationError("end date can not be later then start date")}

    try {
        const sql = `INSERT INTO vacations
        (destination,description,startDate,endDate,price,imageName)
        VALUES ('${vacationToAdd.destination}','${vacationToAdd.description}',
        '${vacationToAdd.startDate}','${vacationToAdd.endDate}',${vacationToAdd.price},'${vacationToAdd.imageName}');`
        const newVacation = await dal.execute<Vacation>(sql)
        vacationToAdd.vacationCode = newVacation.vacationCode

        //TODO: insert followers

        return vacationToAdd
    } catch (err) {
        throw err
    }
}

export const deleteVacation =async (vacationCodeToDelete:number):Promise<void> => {
    const sql = `DELETE FROM vacations WHERE vacationCode = ${vacationCodeToDelete}`;
    const info = await dal.execute<OkPacket>(sql);

    if (info.affectedRows === 0) {
        throw new ResourceNotFoundError(vacationCodeToDelete);
    }

    // TODO: delete all followers
}

export const updateVacation =async (vacationToUpdate:Vacation):Promise<Vacation> => {
        if (vacationToUpdate.vacationCode) {
        const error = vacationToUpdate.validation()
        if (error) throw new ValidationError(error)

        const sql = `UPDATE products SET 
                destination = '${vacationToUpdate.destination}',
                description = '${vacationToUpdate.description}',
                startDate = '${vacationToUpdate.startDate}',
                endDate = '${vacationToUpdate.endDate}',
                price = ${vacationToUpdate.price},
                imageName = '${vacationToUpdate.imageName}'
        WHERE vacationCode = ${vacationToUpdate.vacationCode}
    `;

    const info = await dal.execute<OkPacket>(sql);

    if (info.affectedRows === 0) {
        throw new ResourceNotFoundError(vacationToUpdate.vacationCode);
    }

    vacationToUpdate.vacationCode = info.insertId
    return vacationToUpdate;
    
} else {
    throw new ValidationError("vacation not valid missing vacation id");  
}}
import mysql from "mysql";
import { Error } from "../4-models/Error";
import CONFIG from '../config'

const {DB_DATABASE,DB_HOST,DB_USER,DB_PASSWORD} = CONFIG;

const connection = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
})

const execute = <T>(sqlQuery: string,values?:string[]): Promise<T> => {
    return new Promise<any>((resolve, reject) => {
        connection.query(sqlQuery,values, (err, result) => {
            if (err) {
                reject(new Error(err.sqlMessage || 'sql error', 500));
            } else {
                resolve(result);
            }
        })
    });
}

export default {
    execute
}
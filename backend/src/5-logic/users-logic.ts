import dal from '../2-utils/dal'
import { generateToken } from '../2-utils/jwtAuth';
import { OkPacket } from 'mysql';
import Credentials from '../4-models/Credentials';
import { UnauthorizedError, ValidationError } from '../4-models/Error'
import Role from '../4-models/Role';
import User from '../4-models/User';
import * as EmailValidator from 'email-validator';
import { getFollowingVacationPerUser } from './followers-logic';

export const getUserByEmail = async (email:string):Promise<User> => {
    try {
        const sql = `SELECT * FROM users WHERE email = '${email}'`
        const users = await dal.execute<User[]>(sql)
        const user = users[0]
        return user
    } catch (err) {
        throw err
    }
}

export const register = async (newUser:User):Promise<string> => {
    const error = newUser.validation()
    if (error) throw new ValidationError(error)
    if (!EmailValidator.validate(newUser.email)) throw new ValidationError("email not valid")
    
    // check if there is a user with the same email in the db
    const userWithSameEmail = await getUserByEmail(newUser.email)
    if (userWithSameEmail) throw new ValidationError("email already register")
    
    newUser.role = Role.User
    
    const sql = `INSERT INTO users (firstName,lastName,email,password,role)
    VALUES ('${newUser.firstName}','${newUser.lastName}','${newUser.email}','${newUser.password}','${newUser.role}');`

    try {
        const registeredUser = await dal.execute<OkPacket>(sql)
        newUser.userCode = +registeredUser.insertId
        return generateToken(newUser);
    } catch (err) {
        throw err
    }
}

export const login = async (credentials: Credentials): Promise<string> => {

    // get user by email
    let user = await getUserByEmail(credentials.email)

    //if user not exists 
    if (!user) throw new UnauthorizedError('user was not found');
    
    // check password
    if (user.password != credentials.password){
         throw new UnauthorizedError('Incorrect password');
    }

    // get all vacations the user follow
    user.hashFollowing = await getFollowingVacationPerUser(user.userCode!)

    console.log("user ", user);
    
    //generate token
    return generateToken(user);
}

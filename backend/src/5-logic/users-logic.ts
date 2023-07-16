import dal from '../2-utils/dal'
import { generateToken } from '../2-utils/jwtAuth';
import { OkPacket } from 'mysql';
import Credentials from '../4-models/Credentials';
import {Error, UnauthorizedError, ValidationError } from '../4-models/Error'
import Role from '../4-models/Role';
import User from '../4-models/User';
import * as EmailValidator from 'email-validator';
import { getFollowingVacationPerUser } from './followers-logic';
import { compareHash, hash } from '../2-utils/bcrypt';

export const getUserByEmail = async (email:string):Promise<User> => {
    try {
        const sql = `SELECT * FROM users WHERE email = ?`
        const users = await dal.execute<User[]>(sql,[email])
        const user = users[0]
        return user
    } catch (err) {
        throw err
    }
}

export const register = async (newUser:User):Promise<string> => {
    const error = newUser.validation()
    if (error) throw new ValidationError(error)

    const {firstName,lastName,email} = newUser;

    if (!EmailValidator.validate(email)) throw new ValidationError("email not valid")
    
    // check if there is a user with the same email in the db
    const userWithSameEmail = await getUserByEmail(email)
    if (userWithSameEmail) throw new ValidationError("email already register")
    
    newUser.role = Role.User

    try {
        const password = await hash(newUser.password);
        const sql = "INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)";
        const registeredUser = await dal.execute<OkPacket>(sql,[firstName,lastName,email,password,Role.User]);
        newUser.userCode = +registeredUser.insertId
        return generateToken(newUser);

    }catch(err){
        throw new Error('an error occurred at register',500);
    }
}

export const login = async (credentials: Credentials): Promise<string> => {
    const error = credentials.validate();
    if (error) throw new ValidationError(error);

    try {
        const user = await getUserByEmail(credentials.email)
        if (!user) throw new UnauthorizedError('user was not found');

        const match = await compareHash(credentials.password,user.password);
        if(!match) throw new UnauthorizedError("Incorrect email or password");
        
        // get all vacations the user follow
        user.likedVacations = await getFollowingVacationPerUser(user.userCode!)
    
        return generateToken(user);
    } catch (err) {
        throw new Error('an error occurred at login',500);
    }
}

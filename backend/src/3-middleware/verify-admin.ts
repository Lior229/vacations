import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../4-models/Error';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../4-models/User';
import Role from '../4-models/Role';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

 const verifyAdmin = async (request: Request, response: Response, next: NextFunction) => {

    //get the jwt from the authorization header
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        const error = new UnauthorizedError('Unauthorized');
        next(error);
        return;
    }

    // verify the jwt
    jwt.verify(token, `${process.env.SECRET_KEY}`, (err, decoded) => {
        if (err) {
            // JWT is invalid, return an error response
            console.log('Unauthorized');
            const error = new UnauthorizedError('Unauthorized');
            next(error);
        } else {
            // JWT is valid, save the decoded payload inside the request
            request.user = decoded as User;

            if (request.user.role != Role.Admin) {
                const error = new UnauthorizedError('Unauthorized as admin');
            }

            next();
        }
    })

}

export default verifyAdmin;
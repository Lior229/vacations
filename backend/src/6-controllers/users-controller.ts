import express, { Request, Response, NextFunction } from "express";
import { getUserByEmail, login, register } from '../5-logic/users-logic'
import User from "../4-models/User";
import Credentials from "../4-models/Credentials";
import { log } from "console";

const router = express.Router(); 

// POST http://localhost:3001/api/users/register
router.post('/users/register', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const newUser = new User(request.body);
        const token = await register(newUser);
        response.status(201).json(token);
    } catch (err) {
        next(err)
    }
});

// POST http://localhost:3001/api/users/login
router.post('/users/login', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new Credentials(request.body);
        const token = await login(credentials);
        response.status(200).json(token);
    } catch (err) {
        next(err)
    }
});

export default router;
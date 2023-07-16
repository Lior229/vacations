import express, { Request, Response, NextFunction } from "express";
import { getUserByEmail, login, register } from '../5-logic/users-logic'
import User from "../4-models/User";
import Credentials from "../4-models/Credentials";
import { log } from "console";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { addFollower } from "../5-logic/followers-logic";

const router = express.Router(); 

// POST http://localhost:3001/api/followers/add
router.post('/followers/add',verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follower = request.body;
        console.log(follower);
        // await addFollower(request.body)
        response.status(201).json(true);
    } catch (err) {
        next(err)
    }
});

// POST http://localhost:3001/api/followers/remove
router.delete('/followers/remove',verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follower = request.body;
        console.log(follower);
        //await register(newUser);
        response.status(201).json(true);
    } catch (err) {
        next(err)
    }
});

export default router;
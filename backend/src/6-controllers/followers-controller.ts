import express, { Request, Response, NextFunction } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { addFollower, deleteAllFollowerOfVacation, deleteFollower } from "../5-logic/followers-logic";
import verifyAdmin from "../3-middleware/verify-admin";

const router = express.Router(); 

// POST http://localhost:3001/api/followers/add
router.post('/followers/add',verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {userCode, vacationCode} = request.body;
        console.log(`usrecode: ${userCode} vacationcode: ${vacationCode}`);
        await addFollower(userCode, vacationCode)
        response.status(201).json(true);
    } catch (err) {
        next(err)
    }
});

// DELETE http://localhost:3001/api/followers/remove
router.delete('/followers/remove',verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {userCode, vacationCode} = request.body;
        deleteFollower(userCode, vacationCode)
        response.status(201).json(true);
    } catch (err) {
        next(err)
    }
});

// DELETE http://localhost:3001/api/followers/remove/:vacationCode'
router.delete('/followers/remove/:vacationCode',verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationCode = +request.params.vacationCode
        deleteAllFollowerOfVacation(vacationCode)
        response.status(201).json(true);
    } catch (err) {
        next(err)
    }
});
export default router;
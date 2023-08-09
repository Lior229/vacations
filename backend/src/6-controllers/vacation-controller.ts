import express, { Request, Response, NextFunction } from "express";
import {getAllVacations, addNewVacation, deleteVacation, updateVacation} from '../5-logic/vacation-logic'
import Vacation from "../4-models/Vacation";
import verifyLoggedIn from '../3-middleware/verify-logged-in';
import verifyAdmin from "../3-middleware/verify-admin";
import path from "path";

const router = express.Router(); 

// GET http://localhost:3001/api/vacations
router.get('/vacations',verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await getAllVacations()
        response.status(200).json(vacations)
    } catch (err: any) {
        next(err);
    }
})

// POST http://localhost:3001/api/vacations/
router.post('/vacations',verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log(request.body);
        request.body.image = request.files?.image;
        const newVacation = new Vacation(request.body);
        const addedVacation = await addNewVacation(newVacation);
        response.status(201).json(addedVacation);
    } catch (err) {
        next(err)
    }
});

//PUT http://localhost:3001/api/vacations/update
router.put('/vacations/update',verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log('request.body', request.body);
        
        request.body.image = request.files?.image;
        const vacation = new Vacation(request.body);
        console.log(vacation);
        
        const updatedVacation = await updateVacation(vacation) 
        response.json(updatedVacation);
    } catch (err) {
        next(err);
    }
});

//DELETE http://localhost:3001/api/vacations/:vacationCode
router.delete('/vacations/:vacationCode',verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        await deleteVacation(+request.params.vacationCode)
        response.status(204);
    } catch (err) {
        next(err);
    }
});


//GET http://localhost:3001/api/vacations/images/:imageName
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, '..', 'assets', 'images', imageName);
        response.sendFile(absolutePath);
    } catch (err: any) {
        next(err);
    }
})

export default router;
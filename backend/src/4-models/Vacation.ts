import joi from 'joi'
import { UploadedFile } from 'express-fileupload';

export default class Vacation {
    public vacationCode?: number
    public destination: string
    public description: string
    public startDate: Date
    public endDate: Date
    public price: number
    public imageName: string;
    public image?: UploadedFile;
    public numberOfFollowers: number;

    public constructor(vacation: Vacation) {
        this.vacationCode = vacation.vacationCode
        this.destination = vacation.destination
        this.description = vacation.description 
        this.startDate = vacation.startDate
        this.endDate = vacation.endDate
        this.price = vacation.price
        this.imageName = vacation.imageName 
        this.image = vacation.image 
        this.numberOfFollowers = vacation.numberOfFollowers      
    }

    private static validationSchema = joi.object({
        vacationCode: joi.number().integer().optional().positive(),
        destination: joi.string().required().min(2).max(100),
        description: joi.string().required().min(2).max(1000),
        startDate: joi.date().required(),
        endDate: joi.date().required(),
        price: joi.number().integer().required().positive().max(10000),
        imageName: joi.string().max(45),
        image: joi.object(),
        numberOfFollowers: joi.forbidden()
    })

    public validation(): string | undefined {
        const result = Vacation.validationSchema.validate(this)
        return result.error?.message
    }
}
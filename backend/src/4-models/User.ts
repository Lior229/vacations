import Joi from 'joi'
import Role from "./Role";

export default class User{
    public userCode?: number;
    public firstName: string;
    public lastName:string;
    public email: string;
    public password: string;
    public role: Role;

    public constructor(user:User){
        this.userCode = user.userCode
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.password = user.password
        this.role = user.role
    }

    private static validationSchema = Joi.object({
        userCode: Joi.number().integer().positive().optional(),
        firstName: Joi.string().required().min(2).max(45),
        lastName: Joi.string().required().min(2).max(45),
        email: Joi.string().required().min(2).max(45),
        password: Joi.string().required().min(2).max(45),
        role: Joi.forbidden()
    })

    public validation(): string | undefined{
        const result = User.validationSchema.validate(this)
        return result.error?.message;    
    }
}

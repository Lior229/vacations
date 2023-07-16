import Joi from 'joi';

class Credentials {
    public email: string;
    public password: string;

    public constructor(credentials: Credentials) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    private static validationSchema = Joi.object({
        email: Joi.string().required().min(2).max(45),
        password: Joi.string().required().min(2).max(45)
    });

    public validate(): string | undefined {
        const result = Credentials.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default Credentials;
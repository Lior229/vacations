import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { registerAsync } from '../../../fetch/auth';
import * as Auth from '../../../auth/authSlice';
import User from '../../../models/User';
import Button from '../../Button/Button';
import FormGroupWithError from '../../FormGroupWithError/FormGroupWithError';
import styles from './Register.module.scss';
import { useAppDispatch } from '../../../hooks';

interface RegisterProps { }

const Register: FC<RegisterProps> = () => {
    const dispatch = useAppDispatch();

    const { register, handleSubmit } = useForm<User>();

    const registerHandler = async (user: User) => {
        try {
            const token = await registerAsync(user);
            dispatch(Auth.register(token))
            console.log(token)
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className={`Box ${styles.Register}`}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit(registerHandler)}>

                <FormGroupWithError>
                    <label>First name:</label>
                    <input type="text" {...register('firstName')} />
                </FormGroupWithError>

                <FormGroupWithError>
                    <label>Last name:</label>
                    <input type="text" {...register('lastName')} />
                </FormGroupWithError>

                <FormGroupWithError>
                    <label>Email:</label>
                    <input type="text" {...register('email')} />
                </FormGroupWithError>

                <FormGroupWithError>
                    <label>Password:</label>
                    <input type="password"  {...register('password')} />
                </FormGroupWithError>

                <Button>Register</Button>
            </form>
        </div>
    )
}


export default Register;

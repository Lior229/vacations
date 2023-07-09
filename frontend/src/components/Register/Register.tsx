import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerAsync } from '../../fetch/auth';
import  { useNavigate  } from 'react-router-dom'
import * as Auth from '../../auth/authSlice';
import User from '../../models/User';
import FormGroupWithError from '../FormGroupWithError/FormGroupWithError';
import { NavLink } from 'react-router-dom';
import styles from './Register.module.scss';
import { useAppDispatch } from '../../hooks';
import validation from '../validation';

interface RegisterProps { }

const Register: FC<RegisterProps> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState} = useForm<User>();
    const [registerError, setRegisterError] = useState("");

    const registerHandler = async (user: User) => {
        try {
            const token = await registerAsync(user);
            dispatch(Auth.register(token))
            navigate('/home')
        } catch (err: any) {
            setRegisterError(err.response.data)
        }
    }

    return (
        <div className={styles.Register}>
            <div className={`Box`}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit(registerHandler)}>
                    <FormGroupWithError error={formState.errors.firstName?.message}>
                        <label>First name:</label>
                        <input type="text" {...register('firstName', validation.firstName)} />
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.lastName?.message}>
                        <label>Last name:</label>
                        <input type="text" {...register('lastName', validation.lastName)} />
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.email?.message}>
                            <label>email:</label>
                            <input type="email" {...register('email', validation.email)} />
                        </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.password?.message}>
                            <label>Password:</label>
                            <input type="password"  {...register('password', validation.password)} />
                    </FormGroupWithError>
                    <button className={`Box`}>Register</button>
                    {registerError && <p className={styles.Register__error}>{registerError}</p>}
                </form>
            </div>
            <NavLink to="/login" className={`Box`}>login</NavLink>
        </div>
    )
}


export default Register;

import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../auth/authSlice';
import { loginAsync } from '../../fetch/auth';
import { useAppDispatch, useAppSelector } from '../../hooks'
import { NavLink } from 'react-router-dom';
import Credentials from '../../models/Credentials';
import FormGroupWithError from '../FormGroupWithError/FormGroupWithError';
import styles from './Login.module.scss';
import validation from '../validation';
import Loader from '../Loader/Loader';
import { startLoading, stopLoading } from '../Loader/loaderSlice';

interface LoginProps { }

const Login: FC<LoginProps> = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState} = useForm<Credentials>();
    const navigate = useNavigate();
    const [loginError, setloginError] = useState("");
    const { isLoading } = useAppSelector((state) => state.loaderState);

    const loginHandler = async (credentials: Credentials) => {
        try {
            startLoading()
            const token = await loginAsync(credentials);
            dispatch(login(token));
            navigate('/home')
        } catch (err: any) {
            setloginError(err.response.data)
        } finally{
            stopLoading()
        }
    }

    if (isLoading) {
        return (
            <div className={styles.Login__loaderContainer}>
                <Loader />
            </div>
        )
    }

    return (
        <div className={styles.Login}>
            <div className={`Box`}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit(loginHandler)}>
                    <FormGroupWithError error={formState.errors.email?.message}>
                        <label>email:</label>
                        <input type="email" {...register('email', validation.email)} />
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.password?.message}>
                        <label>Password:</label>
                        <input type="password"  {...register('password', validation.password)} />
                    </FormGroupWithError>
                    <button className={`Box`}>login</button>
                    {loginError && <p className={styles.Login__error}>{loginError}</p>}
                </form>
            </div>
            <NavLink to="/register" className={`Box`}>Create account</NavLink>
        </div>       
    )
}

export default Login;
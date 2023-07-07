import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../auth/authSlice';
import { loginAsync } from '../../fetch/auth';
import { useAppDispatch } from '../../hooks';
import { NavLink } from 'react-router-dom';
import Credentials from '../../models/Credentials';
import FormGroupWithError from '../FormGroupWithError/FormGroupWithError';
import styles from './Login.module.scss';

interface LoginProps { }

const Login: FC<LoginProps> = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm<Credentials>();
    const navigate = useNavigate();

    const loginHandler = async (credentials: Credentials) => {
        try {
            const token = await loginAsync(credentials);
            console.log(token);
            dispatch(login(token));
            navigate('/home')

        } catch (err) {
            console.log('error', err)
        }
    }

    return (
        <div className={`Box ${styles.Login}`}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(loginHandler)}>
                <FormGroupWithError>
                    <label>email:</label>
                    <input type="text"  {...register('email')} />
                </FormGroupWithError>

                <FormGroupWithError>
                    <label>Password:</label>
                    <input type="password"  {...register('password')} />
                </FormGroupWithError>

                <button>Login</button>
            </form>
            <NavLink to="/register">Register</NavLink>
        </div>        
    )
}

export default Login;
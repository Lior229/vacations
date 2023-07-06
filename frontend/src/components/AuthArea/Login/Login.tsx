import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../auth/authSlice';
import { loginAsync } from '../../../fetch/auth';
import { useAppDispatch } from '../../../hooks';
import { NavLink } from 'react-router-dom';
import Credentials from '../../../models/Credentials';
import Button from '../../Button/Button';
import FormGroupWithError from '../../FormGroupWithError/FormGroupWithError';
import styles from './Login.module.scss';

interface LoginProps { }

const Login: FC<LoginProps> = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm<Credentials>();
    const navigate = useNavigate();

    const loginHandler = async (credentials: Credentials) => {
        try {
            console.log("try to login");
            const token = await loginAsync(credentials);
            console.log(token);
            dispatch(login(token));
            // navigate('/home')

        } catch (err) {
            console.log('error', err)
        }
    }

    return (
        <div className={`Box ${styles.Login}`}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(loginHandler)}>
                <FormGroupWithError>
                    <label>Username:</label>
                    <input type="text"  {...register('username')} />
                </FormGroupWithError>

                <FormGroupWithError>
                    <label>Password:</label>
                    <input type="password"  {...register('password')} />
                </FormGroupWithError>

                <Button>Login</Button>
            </form>
            <NavLink to="/register">Register</NavLink>
        </div>        
    )
}

export default Login;
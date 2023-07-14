import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks'
import styles from './Home.module.scss';
import { getVacations } from '../../fetch/vacations';
import { setVacations } from './Vacations/vacationsSlice';
import Loader from '../Loader/Loader';
import Vacations from './Vacations/Vacations';
import {logout} from '../../auth/authSlice'
import { startLoading, stopLoading } from '../Loader/loaderSlice';
import { NavLink } from 'react-router-dom';
import Role from '../../models/Role';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.loaderState);
    const { user } = useAppSelector((state) => state.authState);
    
    useEffect(() => {      
        startLoading()
        getVacations().then((vacations) =>{
            dispatch(setVacations(vacations))  
        }).catch((err) => {
            console.log(err.message)
        }).finally(() => {
            stopLoading()
        });
    },[])

    const logOutHandler = () => {
        dispatch(logout());
    }

    if (isLoading) {
        return (
            <div className={styles.Home__loaderContainer}>
                <Loader />
            </div>
        )
    }

    return (
        <div className={styles.Home}>
            {user?.role===Role.Admin &&  <NavLink to="/add"> Add new vacation </NavLink> }
            {user &&  <NavLink to="/login" onClick={logOutHandler}> Logout </NavLink> }
            <Vacations/>
        </div>
    )
}

export default Home;
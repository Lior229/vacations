import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks'
import styles from './Home.module.scss';
import { getVacations } from '../../fetch/vacations';
import { setVacations } from './Vacations/vacationsSlice';
import Loader from '../Loader/Loader';
import Vacations from './Vacations/Vacations';
import {logout} from '../../auth/authSlice'
import { startLoading, stopLoading } from '../Loader/loaderSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import Role from '../../models/Role';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.loaderState);
    const { user } = useAppSelector((state) => state.authState);
    const [filter, setFilter] = useState("")
    const navigate = useNavigate();
    
    useEffect(() => {      
        startLoading()
        getVacations().then((vacations) =>{
            dispatch(setVacations(vacations))  
        }).catch((err) => {
            console.log(err.message)
        }).finally(() => {
            stopLoading()
        });
    })

    const logOutHandler = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
    }

    if (isLoading) {
        return (
            <div className={styles.Home__loaderContainer}>
                <Loader />
            </div>
        )
    }

    const actionBar = () => {
        if (user?.role===Role.Admin) {
            return(
                <div className={styles.Home__actionBar}>
                    <NavLink to="/add"> Add new vacation </NavLink>
                </div>
            )
        }

        return(
            <div className={styles.Home__actionBar}>
                <button onClick={()=>{setFilter("following")}}>show follow vacation </button>
                <button onClick={()=>{setFilter("future")}}>show future vacations </button>
                <button onClick={()=>{setFilter("active")}}>show active vacations  </button>
            </div>
        )
    }

    return (
        <div className={styles.Home}>
            {actionBar()}
            {user && <button className={styles.Home__Logout} onClick={logOutHandler}> Logout </button> }
            <Vacations filter={filter}/>
        </div>
    )
}

export default Home;
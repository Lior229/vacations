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

    const downloadCsv = () =>{
        alert("download Csv")
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
                    <NavLink to="/report"> Report </NavLink>
                    <button onClick={downloadCsv}>download vacation list </button>
                </div>
            )
        }

        return(
            <div className={styles.Home__actionBar}>
                <button onClick={()=>{setFilter("")}}>Show all vacations  </button>
                <button onClick={()=>{setFilter("following")}}>Show following vacation </button>
                <button onClick={()=>{setFilter("future")}}>Show future vacations </button>
                <button onClick={()=>{setFilter("active")}}>Show active vacations  </button>
            </div>
        )
    }

    return (
        <div className={styles.Home}>
            <div className={styles.Home__userName}> wellcom {user?.firstName} {user?.lastName} </div>
            {actionBar()}
            <button className={styles.Home__Logout} onClick={logOutHandler}> Logout </button>
            <Vacations filter={filter}/>
        </div>
    )
}

export default Home;
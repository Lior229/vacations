import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks'
import styles from './Home.module.scss';
import { getVacations } from '../../fetch/vacations';
import { setVacations } from './vacationsSlice';
import Loader from '../Loader/Loader';
import Vacations from './Vacations/Vacations';
import { startLoading, stopLoading } from '../Loader/loaderSlice';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const dispatch = useAppDispatch();
    const { vacations } = useAppSelector((state) => state.vacationsState);
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

    if (isLoading) {
        return (
            <div className={styles.Home__loaderContainer}>
                <Loader />
            </div>
        )
    }

    return (
        <div className={styles.Home}>
            <Vacations/>
        </div>
    )
}

export default Home;
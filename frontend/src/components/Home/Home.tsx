import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks'
import styles from './Home.module.scss';
import { getVacations } from '../../fetch/vacations';
import { setVacations } from './vacationsSlice';
import Loader from '../Loader/Loader';
import Vacations from './Vacations/Vacations';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const dispatch = useAppDispatch();
    const { vacations } = useAppSelector((state) => state.vacationsState);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAppSelector((state) => state.authState);
    
    useEffect(() => {
        setIsLoading(true);
        getVacations().then((vacations) =>{
            dispatch(setVacations(vacations))  
        }).catch((err) => {
            console.log(err.message)
        }).finally(() => {
            setIsLoading(false);
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
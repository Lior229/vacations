import React, { FC, useState, useEffect } from 'react';
import { useAppSelector } from '../../../hooks'
import styles from './Home.module.scss';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const { user } = useAppSelector((state) => state.authState);
    console.log(user);
    
    return (
        <div className={styles.Home}>
            <h1>home</h1>
        </div>
    )
}

export default Home;
import React, { FC, useState, useEffect } from 'react';
import styles from './Home.module.scss';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    return (
        <div className={styles.Home}>
            <h1>home</h1>
        </div>
    )
}

export default Home;
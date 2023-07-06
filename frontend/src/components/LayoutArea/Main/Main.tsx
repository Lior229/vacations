import React, { FC, useState } from 'react';
import Router from '../../Router/Router';
import styles from './Main.module.scss';

interface MainProps { }

const Main: FC<MainProps> = () => {

    return (

        <main className={styles.Main}>
            <Router />
        </main>
    );
}

export default Main;


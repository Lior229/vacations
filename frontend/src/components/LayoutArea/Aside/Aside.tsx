import React, { FC } from 'react';
import { NavLink } from 'react-router-dom'
import styles from './Aside.module.scss';

interface AsideProps { }

const Aside: FC<AsideProps> = () => (
    <aside className={styles.Aside}>
        <nav>
            <NavLink to="/home">Home  </NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    </aside>
);

export default Aside;




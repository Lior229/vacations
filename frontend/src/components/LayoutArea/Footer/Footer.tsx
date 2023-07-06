import React, { FC } from 'react';
import styles from './Footer.module.scss';

interface FooterProps { }

const Footer: FC<FooterProps> = () => (
    <footer className={styles.Footer}>
        <p> All rights Reserved &copy;</p>
    </footer>
);

export default Footer;

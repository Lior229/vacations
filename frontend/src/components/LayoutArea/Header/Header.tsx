import React, { FC } from 'react';
// import AuthMenu from '../../../../../AuthMenu/AuthMenu';
import styles from './Header.module.scss';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

    return (
        <header className={styles.Header}>
            {/* <AuthMenu /> */}
            <h1>Norhtwind</h1>
        </header>
    )
}





export default React.memo(Header);

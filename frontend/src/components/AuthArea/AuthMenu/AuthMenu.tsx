import React, { FC, useEffect } from 'react';
import  { useNavigate  } from 'react-router-dom'
import { useAppSelector } from '../../../hooks';
import styles from './AuthMenu.module.scss';

interface AuthMenuProps { }

const AuthMenu: FC<AuthMenuProps> = () => {
    const { user } = useAppSelector((state) => state.authState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user){
            navigate('/login')
        }
    }, [user])
    
    const renderContent = () => {
        if (user) {
            return (
                <>
                    <span>Hello {user.firstName} {user.lastName}</span>
                    <p>show vacation</p>
                </>
            )
        }
    }

    return (
        <div className={styles.AuthMenu}>
            {renderContent()}
        </div>
    )
}

export default AuthMenu;
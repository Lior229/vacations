import React, { FC, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
    children: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => (
    <button onClick={onClick} className={styles.Button}>
        {children}
    </button>
);

export default Button;

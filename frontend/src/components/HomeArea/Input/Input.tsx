import React, { FC, useState } from 'react';
import styles from './Input.module.scss';

interface InputProps {
    type: string;
    limit?: number;
    value?: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}




const Input: FC<InputProps> = ({ type, limit, value, onChange, ...props }) => {


    return <input type={type} onChange={onChange} value={value} maxLength={limit} {...props} />
}





export default Input;

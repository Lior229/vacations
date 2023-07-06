import React, { FC, useState } from 'react';
import styles from './Input.module.scss';

interface InputProps { }

const Input: FC<InputProps> = () => {

    const [value, setValue] = useState('');



    const submitHandler = () => {
        console.log(value)
    }



    return (
        <div>
            <input type="text" value={value} onChange={(e) => {
                const { value: newValue } = e.target;

                setValue(newValue);
                //


            }} className={styles.Input} />
            <button onClick={submitHandler}>submit</button>
        </div>
    )
}





export default Input;

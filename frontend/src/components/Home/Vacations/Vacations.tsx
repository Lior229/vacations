import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { NavLink } from 'react-router-dom';
import styles from './Vacations.module.scss';
import Loader from '../../Loader/Loader';
import VacationCard from './VacationCard/VacationCard';


interface VacationsProps {
}

const Vacations: FC<VacationsProps> = () => {
    // const [showAddvacation, setShowAddvacation] = useState(false);
    const dispatch = useAppDispatch();
    const { vacations } = useAppSelector((state) => state.vacationsState);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAppSelector((state) => state.authState);

    // const modalToggleHandler = () => {
    //     setShowAddvacation((prevState) => !prevState);
    // }

    const renderVacations = () => {
        if (vacations.length > 0) {
            return vacations.map((vacation) => {
                const { vacationCode } = vacation;
                return <VacationCard key={vacationCode} vacation={vacation} />
            });
        }
    }

    return (
        <div className={styles.Vacations}>
            {/* {user && <NavLink onClick={modalToggleHandler} to="#"> Add new vacation </NavLink>} */}
                {renderVacations()}
            {/* <button onClick={() => { }}></button>
            {showAddvacation && <Addvacation onClose={modalToggleHandler} />} */}
        </div>
    )
}

export default Vacations;


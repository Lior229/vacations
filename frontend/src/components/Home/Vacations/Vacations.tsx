import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { NavLink } from 'react-router-dom';
import styles from './Vacations.module.scss';
import VacationCard from './VacationCard/VacationCard';
import Role from '../../../models/Role';

interface VacationsProps {
}

const Vacations: FC<VacationsProps> = () => {
    const dispatch = useAppDispatch();
    const { vacations } = useAppSelector((state) => state.vacationsState);
    const { user } = useAppSelector((state) => state.authState);

    const renderVacations = () => {
        if (vacations.length > 0) {
            return vacations.map((vacation) => {
                const { vacationCode } = vacation;
                return <VacationCard key={vacationCode} vacation={vacation}/>
            });
        }

        return (
            <div className={styles.Vacations}>
                <p>no vacations found</p>
            </div>
        )
    }

    return (
        <div className={styles.Vacations}>
            {renderVacations()}
        </div>
    )
}

export default Vacations;

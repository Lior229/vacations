import React, { FC } from 'react';
import { BASE_API_URL } from '../../../../config';
import styles from './VacationCard.module.scss';
import Vacation from '../../../../models/Vacation';
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import CardHeader from './CardHeader/CardHeader';

interface VacationCardProps {
    vacation: Vacation;
}

const VacationCard: FC<VacationCardProps> = ({vacation}) => {
    const { user } = useAppSelector((state) => state.authState);
    const imgSrc = `${BASE_API_URL}/vacations/images/${vacation.imageName}`;
    const startVacationDate = new Date(vacation.startDate)
    const endVacationDate = new Date(vacation.endDate)
    
    return (
        <div className={`Box ${styles.VacationCard}`}>
            <div className={styles.VacationCard__header}>
                <img src={imgSrc} alt={vacation.destination}/>
                <CardHeader vacation={vacation}/>
                <div className={styles.VacationCard__header__title}>
                    <h1>{vacation.destination}</h1>
                    <h3>{startVacationDate.toLocaleDateString()} - {endVacationDate.toLocaleDateString()}</h3>
                </div>
            </div>
            <div className={styles.VacationCard__content}>
                <p>{vacation.description}</p>
                <p>price {vacation.price}</p>
            </div>
        </div>
    )
}


export default VacationCard;

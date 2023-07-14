import React, { FC } from 'react';
import { BASE_API_URL } from '../../../../config';
import styles from './VacationCard.module.scss';
import Vacation from '../../../../models/Vacation';
import { useAppDispatch, useAppSelector } from '../../../../hooks'

interface VacationCardProps {
    vacation: Vacation;
}

const VacationCard: FC<VacationCardProps> = ({ vacation}) => {
    const { user } = useAppSelector((state) => state.authState);
    const imgSrc = `${BASE_API_URL}/vacations/images/${vacation.imageName}`;
    const startVacationDate = new Date(vacation.startDate)
    const endVacationDate = new Date(vacation.endDate)
    const likedstyle = user?.likedVacations[vacation.vacationCode!]? "red" : "black"
    
    return (
        <div className={`Box ${styles.VacationCard}`}>
            <div className={styles.VacationCard__header}>
                <img src={imgSrc} alt={vacation.destination}/>
                <div className={styles.VacationCard__header__followers} style={{color: likedstyle}}>
                    <button style={{color: likedstyle}}>
                        {vacation.numberOfFollowers === 0 && <span>be first to like</span>}
                        {vacation.numberOfFollowers === 1 && user?.likedVacations[vacation.vacationCode!] && <span>you like!</span>}
                        {vacation.numberOfFollowers > 1 && user?.likedVacations[vacation.vacationCode!] && 
                            <span>you and {vacation.numberOfFollowers} liked!</span>}
                        {vacation.numberOfFollowers > 0 && !(user?.likedVacations[vacation.vacationCode!]) && 
                            <span> {vacation.numberOfFollowers} like</span>}
                    </button>
                </div>
                <div className={styles.VacationCard__header__title}>
                    <h1>{vacation.destination}</h1>
                    <h3>{startVacationDate.toLocaleDateString()} - {endVacationDate.toLocaleDateString()}</h3>
                </div>
            </div>
            <div className={styles.VacationCard__content}>
                <p>{vacation.description}</p>
                <p>{vacation.price}</p>
            </div>
        </div>
    )

}




export default VacationCard;

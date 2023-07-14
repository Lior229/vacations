import React, { FC } from 'react';
import styles from './CardHeader.module.scss';
import Vacation from '../../../../../models/Vacation';
import { useAppSelector } from '../../../../../hooks'
import Role from '../../../../../models/Role';

interface CardHeaderProps {
    vacation: Vacation;
}

const CardHeader: FC<CardHeaderProps> = ({ vacation}) => {
    const { user } = useAppSelector((state) => state.authState);
    const isUserLiked = user?.likedVacations[vacation.vacationCode!]
    const likedstyle = isUserLiked? "red" : "black"

    console.log("why not rendering?", isUserLiked, vacation.vacationCode);
    
    const renderCardHeader = () => {
        if (user?.role === Role.Admin) {
            return (
                <div className={styles.CardHeader}>
                    <button>edit</button>
                    <button>delete</button>
                </div>
        )  
        } else {
            return (
                <div className={styles.CardHeader} style={{color: likedstyle}}>
                    <button>
                            {vacation.numberOfFollowers === 0 && <span>be first to like</span>}
                            {vacation.numberOfFollowers === 1 && isUserLiked && <span>you like!</span>}
                            {vacation.numberOfFollowers > 1 && isUserLiked && 
                                <span>you and {vacation.numberOfFollowers} liked!</span>}
                            {vacation.numberOfFollowers > 0 && !isUserLiked && 
                                <span> {vacation.numberOfFollowers} like</span>}
                    </button>
                </div>
            )  
        }
    }

    return (
        <div className={styles.CardHeader}>
            {renderCardHeader()}
        </div>
    )

}

export default CardHeader;

import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './CardHeader.module.scss';
import Vacation from '../../../../../models/Vacation';
import { useAppDispatch, useAppSelector } from '../../../../../hooks'
import Role from '../../../../../models/Role';
import { addFollower, deleteAllFollowerOfVacation, deleteFollower } from '../../../../../fetch/followers';
import { deleteVacation } from '../../vacationsSlice';
import { deleteVacation as deleteVacationaAync } from '../../../../../fetch/vacations'
import { addFollowing, removeFollowing } from '../../../../../auth/authSlice';
import { useNavigate } from 'react-router-dom';

interface CardHeaderProps {
    vacation: Vacation;
}

const CardHeader: FC<CardHeaderProps> = ({ vacation }) => {
    const { user } = useAppSelector((state) => state.authState);
    const isUserLiked = user?.likedVacations?.[vacation.vacationCode!]
    const [isLiked, setLiked] = useState(isUserLiked? true : false)
    const [likeCount, setLikedCount] = useState(vacation.numberOfFollowers)
    let likedstyle = isLiked? "rgba(206, 63, 63, 0.829)" : "rgba(51, 51, 51, 0.05)"
    const prevLike = useRef<boolean>(isLiked);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        likedstyle = isLiked? "rgba(206, 63, 63, 0.829)" : "rgba(51, 51, 51, 0.05)"

        if (isLiked && isLiked !== prevLike.current) {
            setLikedCount((prevCounter) => ++prevCounter)
            try {
                addFollower(user!.userCode,vacation.vacationCode!).then(() =>{
                    dispatch(addFollowing(vacation.vacationCode!)) 
                }).catch((err) => {
                    console.log(err.message)
                })
            } catch (error) {
                console.log(error);
            }finally{
                window.location.reload();
            }         
        }

        if (!isLiked && isLiked !== prevLike.current) {
            setLikedCount((prevCounter) => --prevCounter)
            try {
                deleteFollower(user!.userCode,vacation.vacationCode!).then(() =>{
                    dispatch(removeFollowing(vacation.vacationCode!))
                }).catch((err) => {
                    console.log(err.message)
                })
            } catch (error) {
                console.log(error);
            }finally{
                window.location.reload();
            }
        }

        prevLike.current = isLiked
    }, [isLiked])

    const deleteHandler = async () => {
            try {
                const success = await deleteVacationaAync(vacation.vacationCode!)
                if (success) {
                    dispatch(deleteVacation(vacation.vacationCode!))
                    await deleteAllFollowerOfVacation(vacation.vacationCode!)
                }
            } catch (err) {
                console.log('delete error', err)
            }finally{
                window.location.reload();
            }
    }

    const editHandler =  () => {
        navigate("/edit", {
            state: {
                vacation: vacation
            },
        });
    }

    
    const renderCardHeader = () => {
        if (user?.role === Role.Admin) {
            return (
                <div className={styles.CardHeader}>
                    <button onClick={editHandler}>edit</button>
                    <button onClick={deleteHandler} >delete</button>
                </div>
        )  
        } else {
            return (
                <div className={styles.CardHeader}>
                    <button onClick={() => { setLiked((prev) => !prev)}} style={{backgroundColor: likedstyle}}>
                            {likeCount === 0 && <span>be first to like</span>}
                            {likeCount === 1 && isLiked && <span>you like!</span>}
                            {likeCount > 1 && isLiked && 
                                <span>you and {likeCount - 1} liked!</span>}
                            {likeCount > 0 && !isLiked && 
                                <span> {likeCount} like</span>}
                    </button>
                </div>
            )  
        }
    }

    return (
        <>
            {renderCardHeader()}
        </>
    )

}

export default CardHeader;


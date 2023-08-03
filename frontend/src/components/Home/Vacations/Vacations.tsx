import React, { FC, useState } from 'react';
import { useAppSelector } from '../../../hooks'
import styles from './Vacations.module.scss';
import VacationCard from './VacationCard/VacationCard';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

interface VacationsProps {
    filter?: string
}

const Vacations: FC<VacationsProps> = ({filter}) => {
    let { vacations } = useAppSelector((state) => state.vacationsState);
    let allVacations = vacations
    const { user } = useAppSelector((state) => state.authState);

    const now = moment()

    switch (filter) {
        case "following":
            console.log("following");
            const followingVacations = vacations.filter((vacation)=>{
                // const { vacationCode } = vacation;
                if ( user?.likedVacations?.[vacation.vacationCode!]) return vacation
            })
            vacations = followingVacations;
            break;
        case "future":
            console.log("future");
            const futureVacations = vacations.filter((vacation)=>{
                const { startDate } = vacation;
                console.log(startDate);
                if (now.isBefore(startDate)) return vacation
            })
            vacations = futureVacations;
            break;
        case "active":
            const activeVacations = vacations.filter((vacation)=>{
                const { startDate, endDate } = vacation;
                if (now.isBetween(startDate,endDate)) return vacation
            })
            console.log(activeVacations);
            vacations = activeVacations;
            break;
        default:
            vacations = allVacations
        }
    
    const [itemOffset, setItemOffset] = useState(0);
    const PER_PAGE = 10;
    const endOffset = itemOffset + PER_PAGE;
    const currentPageVacations = vacations.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(vacations.length / PER_PAGE);

    // Invoke when user click to request another page.
    const handlePageChange = (selectedItem: {selected: number}) => {
        const newOffset = (selectedItem.selected  * PER_PAGE) % vacations.length;
        setItemOffset(newOffset);
      };

    const renderVacations = () => {
        if (currentPageVacations.length > 0) {
            return currentPageVacations.map((vacation) => {
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
            {(vacations.length > PER_PAGE) && 
                <ReactPaginate className={styles.react_paginate}
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName={"react_paginate"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                />}
            {renderVacations()}
        </div>
    )
}

export default Vacations;

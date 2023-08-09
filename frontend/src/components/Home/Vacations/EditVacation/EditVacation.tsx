import React, { FC, useState } from 'react';
import Vacation from '../../../../models/Vacation';
import styles from './EditVacation.module.scss';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import FormGroupWithError from '../../../FormGroupWithError/FormGroupWithError';
import validation from './validation';
import moment from 'moment';
import { BASE_API_URL } from '../../../../config';
import { updateVacation as updateVacationAsync } from '../../../../fetch/vacations';
import { useAppDispatch } from '../../../../hooks';
import { updateVacation as updateVacationSlice } from '../vacationsSlice';

interface EditVacationProps {
}

const EditVacation: FC<EditVacationProps> = () => {   
    const dispatch = useAppDispatch(); 
    const navigate = useNavigate();
    const location = useLocation();
    const vacation = location.state.vacation as Vacation
    const { register, handleSubmit, formState, getValues } = useForm<Vacation>(({
        defaultValues: {
            vacationCode: vacation.vacationCode,
            destination: vacation.destination,
            description: vacation.description,
            price: vacation.price
        }}))

    let imgSrc = `${BASE_API_URL}/vacations/images/${vacation.imageName}`;
    const [selectedImage, setSelectedImage] = useState(imgSrc)

    const changeImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const submitUpdateVacationHandler = (updateVacation: Vacation) => {
        if (updateVacation.image[0]){
            updateVacation.imageName = updateVacation.image[0].name
        }

        console.log(updateVacation);
        

        updateVacationAsync(updateVacation).then((updatedVacation) => {
                dispatch(updateVacationSlice(updatedVacation))
            }).catch((err) => {
                console.log("updateVacationAsync err");
                console.log(err)
            }).finally(()=>{
                console.log("updateVacationAsync finally");
                navigate('/home');
            });
    }

    return (
        <div className={styles.EditVacation}>
            <h2>Edit Vacation</h2>
            <form onSubmit={handleSubmit(submitUpdateVacationHandler)} >
                <input type="number"  {...register('vacationCode')} hidden/>
                <div>{formState.errors.vacationCode?.message}</div>
                <FormGroupWithError error={formState.errors.destination?.message}>
                    <label>Destination:</label>
                    <input type="text" {...register('destination', validation.destination)} />
                </FormGroupWithError>

                <FormGroupWithError error={formState.errors.description?.message}>
                    <label>description:</label>
                    <input type="text" {...register('description', validation.description)} />
                </FormGroupWithError>

                <FormGroupWithError error={formState.errors.startDate?.message}>
                    <label>startDate:</label>
                    <input type="date" {...register('startDate', {
                            required: { value: true, message: "Missing start date"},
                        })} defaultValue={moment(vacation.startDate).format('YYYY-MM-DD')}
                         />
                </FormGroupWithError>

                <FormGroupWithError error={formState.errors.endDate?.message}>
                    <label>endDate:</label>
                    <input type="date" {...register('endDate',{
                            required: { value: true, message: "Missing end date"},
                            min: {value: moment(getValues().startDate).format('YYYY-MM-DD'), message: "End date cannot be earlier than start date"}
                        })} defaultValue={moment(vacation.endDate).format('YYYY-MM-DD')} />
                </FormGroupWithError>

                <FormGroupWithError error={formState.errors.price?.message}>
                    <label>price:</label>
                    <input type="number" {...register('price', validation.price)} />
                </FormGroupWithError>

                <FormGroupWithError>
                    <label>Image:</label>
                    <input type="file" accept='image/*' {...register('image')} onChange={changeImageHandler}/>
                </FormGroupWithError>

                <img alt="preview" src={selectedImage}/>
                <br />
                <button>Edit</button>
                <br />
                <button onClick={()=>{navigate('/home')}}>cancel</button>
            </form>
        </div>
    )
}

export default EditVacation;








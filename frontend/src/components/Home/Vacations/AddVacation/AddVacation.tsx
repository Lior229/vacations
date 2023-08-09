import React, { FC } from 'react';
import { useForm } from "react-hook-form";
import validation from './validation';
import styles from './AddVacation.module.scss';
import FormGroupWithError from '../../../FormGroupWithError/FormGroupWithError';
import { addVacation as addVacationAsync } from '../../../../fetch/vacations';
import { useAppDispatch } from '../../../../hooks';
import { addVacation } from '../vacationsSlice';
import Vacation from '../../../../models/Vacation';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

interface AddVacationProps {}

const AddVacation: FC<AddVacationProps> = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState, getValues } = useForm<Vacation>();
    const navigate = useNavigate();
    const now = moment()

    const submitVacationHandler = (vacation: Vacation) => {
        vacation.imageName = vacation.image[0].name;
        addVacationAsync(vacation).then((_vacation) => {
            dispatch(addVacation(_vacation));
        }).catch((err) => {
            console.log(err)
        }).finally(()=>{
            navigate('/home');
        });
    }
    
    const getMinDate = () => {
        if (moment(getValues().startDate).isBefore(now)){
            console.log(moment(getValues().startDate).format('YYYY-MM-DD'));
        return moment(getValues().startDate).format('YYYY-MM-DD')
        }
        return now.format('YYYY-MM-DD')
    }

    return (
            <div className={styles.AddVacation}>
                <h2>Add Vacation</h2>
                <form onSubmit={handleSubmit(submitVacationHandler)} >
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
                                min: {value: now.format('YYYY-MM-DD'), message: "start date too earliery"}
                            })} defaultValue={now.format('YYYY-MM-DD')} />
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.endDate?.message}>
                        <label>endDate:</label>
                        <input type="date" {...register('endDate',{
                                required: { value: true, message: "Missing end date"},
                                min: {value: getMinDate(), message: "end date too earliery"}
                            })} defaultValue={now.format('YYYY-MM-DD')} />
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.price?.message}>
                        <label>price:</label>
                        <input type="number" {...register('price', validation.price)} />
                    </FormGroupWithError>

                    <FormGroupWithError>
                        <label>Image:</label>
                        <input type="file" accept='image/*' {...register('image')} required/>
                    </FormGroupWithError>

                    <button>Add</button>
                    <br />
                    <button onClick={()=>{navigate('/home')}}>cancel</button>
                </form>
            </div>
    )
}

export default AddVacation;
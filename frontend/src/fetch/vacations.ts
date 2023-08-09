import moment from 'moment';
import axios from '../axios/index';
import vacation from '../models/Vacation';

export const getVacations = async (): Promise<vacation[]> => {
    const response = await axios.get<vacation[]>(`/vacations`);
    const vacations = response.data;
    return new Promise((resolve, reject) => {resolve(vacations)});
}

export const addVacation = async (vacation: vacation): Promise<vacation> => {    
    const formData = new FormData(); 
    formData.append('destination', vacation.destination);
    formData.append('description', vacation.description);
    formData.append('startDate', moment(vacation.startDate).format("YYYY-MM-DD"));
    formData.append('endDate', moment(vacation.endDate).format("YYYY-MM-DD"));
    formData.append('price', vacation.price.toString());
    formData.append('imageName', vacation.imageName);
    formData.append('image', vacation.image[0]);

    console.log(Object.fromEntries(formData))

    const response = await axios.post<vacation>(`/vacations`, formData);
    const addedVacation = response.data;

    return new Promise((resolve, reject) => {resolve(addedVacation)});
}

export const updateVacation = async (vacation: vacation): Promise<vacation> => {
    const formData = new FormData(); 
    formData.append('vacationCode', vacation.vacationCode!.toString());
    formData.append('destination', vacation.destination);
    formData.append('description', vacation.description);
    formData.append('startDate', moment(vacation.startDate).format("YYYY-MM-DD"));
    formData.append('endDate', moment(vacation.endDate).format("YYYY-MM-DD"));
    formData.append('price', vacation.price.toString());
    
    
    if(!!vacation.image[0]) {
        formData.append('imageName', vacation.imageName);
        formData.append('image', vacation.image[0])
    }

    const response = await axios.put<vacation>(`/vacations/update`, formData);
    const updatedVacation = response.data;

    return new Promise((resolve, reject) => {resolve(updatedVacation)});
}

export const deleteVacation = async (vacationCode: number): Promise<boolean> => {
    await axios.delete(`/vacations/${vacationCode}`);
    return new Promise((resolve, reject) => {resolve(true);});
}
import axios from 'axios';
import vacation from '../models/Vacation';
import { BASE_API_URL } from '../config';

export const getVacations = async (): Promise<vacation[]> => {
    const response = await axios.get<vacation[]>(`${BASE_API_URL}/vacations`);
    const vacations = response.data;
    return new Promise((resolve, reject) => {resolve(vacations)});
}

export const addVacation = async (vacation: vacation): Promise<vacation> => {
    const formData = new FormData(); 
    formData.append('destination', vacation.destination);
    formData.append('description', vacation.description);
    formData.append('startDate', vacation.startDate.toDateString());
    formData.append('endDate', vacation.endDate.toDateString());
    formData.append('price', vacation.price.toString());
    formData.append('imageName', vacation.imageName);

    // formData.append('image', vacation.image[0]);   //image = FileList image[0] = File  / Blob
    // TODO: save image file at local folder?

    const response = await axios.post<vacation>(`${BASE_API_URL}/vacations`, formData);
    const addedVacation = response.data;

    return new Promise((resolve, reject) => {resolve(addedVacation)});
}

export const updateVacation = async (vacation: vacation): Promise<vacation> => {

    const formData = new FormData(); 
    formData.append('destination', vacation.destination);
    formData.append('description', vacation.description);
    formData.append('startDate', vacation.startDate.toDateString());
    formData.append('endDate', vacation.endDate.toDateString());
    formData.append('price', vacation.price.toString());
    formData.append('imageName', vacation.imageName);

    // formData.append('image', vacation.image[0]);   //image = FileList image[0] = File  / Blob
    // TODO: update image file at local folder?

    const response = await axios.put<vacation>(`${BASE_API_URL}/vacations`, formData);
    const updatedVacation = response.data;

    return new Promise((resolve, reject) => {resolve(updatedVacation)});
}

export const deleteVacation = async (vacationCode: number): Promise<boolean> => {
    await axios.delete(`${BASE_API_URL}/vacations/${vacationCode}`);
    return new Promise((resolve, reject) => {resolve(true);});
}
import axios from 'axios';
import { BASE_API_URL } from '../config';
import Credentials from '../models/Credentials';
import User from '../models/User';

export const registerAsync = async (user: User): Promise<string> => {
    const response = await axios.post(`${BASE_API_URL}/users/register`, user);
    const token = response.data;
    return token;
}

export const loginAsync = async (credentials: Credentials): Promise<string> => {
    const response = await axios.post(`${BASE_API_URL}/users/login`, credentials);
    const token = response.data;
    return token;
}
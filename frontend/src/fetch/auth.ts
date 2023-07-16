import axios from '../axios/index';
import Credentials from '../models/Credentials';
import User from '../models/User';

export const registerAsync = async (user: User): Promise<string> => {
    const response = await axios.post(`/users/register`, user);
    const token = response.data;
    return token;
}

export const loginAsync = async (credentials: Credentials): Promise<string> => {
    const response = await axios.post(`/users/login`, credentials);
    const token = response.data;
    return token;
}
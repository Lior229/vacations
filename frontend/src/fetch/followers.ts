import axios from '../axios/index';

export const addFollower = async (userCode: number, vacationCode: number): Promise<boolean> => {
    await axios.post(`/followers/add`, {userCode, vacationCode});
    return new Promise((resolve, reject) => {resolve(true)});
}

export const deleteFollower = async (userCode: number, vacationCode: number): Promise<boolean> => {
    const follower = {userCode, vacationCode}
    await axios.delete(`followers/remove`,  {data: follower});
    return new Promise((resolve, reject) => {resolve(true);});
}
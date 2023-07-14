import Role from "../models/Role";

interface User {
    userCode: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    likedVacations: {[key: number]: boolean};
    role: Role;
}

export default User;
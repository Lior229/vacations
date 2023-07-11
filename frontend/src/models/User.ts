interface User {
    userCode: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    likedVacations: {[key: number]: boolean};
}

export default User;
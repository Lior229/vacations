interface User {
    userCode: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    likedVacations: {[key: number]: boolean | undefined};
}

export default User;
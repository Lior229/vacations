class Credentials {
    public email: string;
    public password: string;

    public constructor(credentials: Credentials) {
        this.email = credentials.email;
        this.password = credentials.password;
    }
}

export default Credentials;
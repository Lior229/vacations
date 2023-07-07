class Credentials {
    public email: string;
    public password: string;

    public constructor(credentials: Credentials) {
        console.log("what i got ",credentials);
        this.email = credentials.email;
        this.password = credentials.password;
    }
}

export default Credentials;
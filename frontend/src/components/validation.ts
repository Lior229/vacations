export default {
    email: {
        required: { value: true, message: "Please enter your email" }
    },
    password: {
        required: { value: true, message: "Please enter your password" },
        minLength: { value: 4, message: "password too short" },
    },
    firstName: {
        required: { value: true, message: "Please enter your first name" }
    },
    lastName: {
        required: { value: true, message: "Please enter your last name" }
    }
}

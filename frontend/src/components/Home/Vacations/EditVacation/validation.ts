export default {
    vacationCode:{
        required: { value: true, message: "Missing vacationCode" },
    },
    destination: {
        required: { value: true, message: "Missing destination" },
        minLength: { value: 2, message: "destination too short" },
        maxLength: { value: 100, message: "destination too long" }
    },
    description: {
        required: { value: true, message: "Missing description" },
        minLength: { value: 2, message: "description too short" },
        maxLength: { value: 1000, message: "description too long" }
    },
    startDate: {
        required: { value: true, message: "Missing startDate" },
        // min: {value: new Date().toISOString().split("T")[0], message: "start date cant be earlier than today" }
    },
    endDate: {
        // required: { value: true, message: "Missing endDate" },
        // min: {value: new Date().toISOString().split("T")[0], message: "end date cant be earlier than today" }
        // earlierThenStart: {value: getValues().startDate?., message: "end date cant be earlier than start date" }
    },
    price: {
        required: { value: true, message: "Missing price" },
        min: { value: 0, message: "price cant be negative" },
        max: { value: 10000, message: "price cant exceed 10,000" }
    },
    image: {
        // required: { value: true, message: "Missing image" }
    }
}
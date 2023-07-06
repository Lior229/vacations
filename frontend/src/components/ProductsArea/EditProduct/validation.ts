
export default {

    name: {
        required: { value: true, message: "Missing name" },
        minLength: { value: 3, message: "Name too short" },
        maxLength: { value: 30, message: "Name too long" }
    },
    stock: {
        required: { value: true, message: "Missing stock" },
        min: { value: 0, message: "Stock cant be negative" },
        max: { value: 100, message: "Stock cant exceed 100" }
    },
    price: {
        required: { value: true, message: "Missing price" },
        min: { value: 0, message: "price cant be negative" },
        max: { value: 100, message: "price cant exceed 100" }
    },
    image:{}

}

//Record<string, Validation>


// type Validation = {
//     required: { [x: string]: {} },
//     minLength?: { [x: string]: {} },
//     maxLength?: { [x: string]: {} },
//     min?: { [x: string]: {} },
//     max?: { [x: string]: {} },
// }


// export const getValidationByFieldName = (fieldName: string) => {
//     return validation[fieldName];
// }

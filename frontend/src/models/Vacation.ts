interface Vacation {
    vacationCode?: number;
    destination: string
    description: string
    startDate: Date
    endDate: Date
    price: number
    imageName: string;
    numberOfFollowers: number;
}

export default Vacation;
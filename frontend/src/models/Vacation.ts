interface Vacation {
    vacationCode?: number;
    id: number;
    destination: string
    description: string
    startDate: Date
    endDate: Date
    price: number
    imageName: string;
    image: FileList;
    numberOfFollowers: number;
}

export default Vacation;
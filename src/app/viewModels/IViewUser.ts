export interface IViewUser {
    id?: string;
    fullName: string;
    email: string;
    phones: string[];
    address: {
        city: string;
        street: string;
        code: string;
    },
    password: string;
    delivery: string;
    deliveryDays?: string;
    token?: string;
}

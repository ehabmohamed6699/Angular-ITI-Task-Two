export interface IProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
    img: string;
    categoryID: string;
    discount?: number;
}
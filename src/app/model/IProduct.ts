import { DiscountAmount } from "./DiscountAmount.enum";

export interface IProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
    img: string;
    categoryID: number;
    discount?: DiscountAmount;
}
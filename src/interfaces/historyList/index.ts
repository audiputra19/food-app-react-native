import { CartItem } from "../cartList";

export interface HistoryList {
    id: string,
    value: CartItem[],
    date: Date,
}
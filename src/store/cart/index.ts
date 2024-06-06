import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/products";
import { CartItem } from "../../interfaces/carList";

interface CartState {
    items: CartItem[];
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem[]>) {
            const itemToAdd = action.payload;
            itemToAdd.forEach(newItem => {
                const existingItem = state.items.findIndex(item => item.id === newItem.id);
                if(existingItem !== -1){
                    state.items[existingItem].qty += newItem.qty;
                } else {
                    state.items.push(newItem);
                }
            });
            console.log('Items in cart:', state.items);
            state.totalPrice = state.items.reduce((total, item) => total + item.price * item.qty, 0);
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalPrice = state.items.reduce((total, item) => total + item.price * item.qty, 0);
        },
        clearCart(state) {
            state.items = [];
            state.totalPrice = 0;
        },
        increaseQty(state, action: PayloadAction<number>) {
            const item = state.items.find(item => item.id === action.payload);
            if(item){
                item.qty += 1;
                state.totalPrice = state.items.reduce((total, item) => total + item.price * item.qty, 0);
            }
        },
        descreaseQty(state, action: PayloadAction<number>) {
            const item = state.items.find(item => item.id === action.payload);
            if(item && item.qty > 1){
                item.qty -= 1;
                state.totalPrice = state.items.reduce((total, item) => total + item.price * item.qty, 0);
            }
        }
    }
})

export const { addToCart, removeFromCart, clearCart, increaseQty, descreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
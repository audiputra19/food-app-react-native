import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HistoryList } from "../../interfaces/historyList"

interface HistoryState {
    items: HistoryList[];
}

const initialState: HistoryState = {
    items: []
}

const historySlice = createSlice({
    name: 'History',
    initialState,
    reducers: {
        addToHistory(state, action: PayloadAction<HistoryList>) {
            state.items.push(action.payload);
            console.log('Items in History:', state.items);
        },
        clearHistory(state) {
            state.items = [];
        }
    } 
})

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
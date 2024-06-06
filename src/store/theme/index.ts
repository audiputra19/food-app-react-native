import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DarkModeState {
    isDarkMode: boolean;
}

const initialState: DarkModeState = {
    isDarkMode: false,
};

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
            console.log('setDarkMode:', state.isDarkMode);
        }
    }
})

export const { setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
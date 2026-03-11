import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: 'dark'
    },
    reducers: {
        toggleTheme: (state)=>{
            if(state.value === 'dark'){
                state.value = 'light'
            }else{
                state.value = 'dark'
            }
        }
    }
})

export const {toggleTheme} = themeSlice.actions
export default themeSlice.reducer
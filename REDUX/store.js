import { configureStore } from '@reduxjs/toolkit'
import { myReducer } from './createSlice'

export const Store = configureStore({

    reducer: {
        user: myReducer
    }


})
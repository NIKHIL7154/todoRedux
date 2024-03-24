import {configureStore} from '@reduxjs/toolkit';
import todoreducer from './todoSlice'

export const store = configureStore({
    reducer:todoreducer
})


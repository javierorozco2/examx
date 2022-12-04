import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { examxSlice } from './examx/examxSlices'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        examx: examxSlice.reducer
    },
})
import {configureStore} from '@reduxjs/toolkit'
import usersReducer from './features/users/users'
export const store = configureStore({
    reducer: {
        users: usersReducer
    }
})
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
const url = `http://localhost:5000/users`
const initialState = {
    users: [],
    isLoading: false,
    viewDetails:{},
    isEdit:false
}
export const getUsers = createAsyncThunk('users/getUsers',() => {
   return axios.get(url).then((res) => res.data).catch((error) => error)
    
})
export const removeUser = createAsyncThunk('users/removeUser',async (userId, { getState }) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      const { users } = getState().users;
      const updatedUsers = users.filter((user) => user._id !== userId);
      return updatedUsers;
    } catch (error) {
      console.log(error);
      throw error;
    }
  })

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        viewDetails: (state,action) => {
            const id = action.payload
            state.viewDetails = state.users.filter((user) => user._id === id)
        },
        addUser: (state,action) => {
            state.users = [...state.users,action.payload]
        },
        editUser: (state,action) => {
            const id = action.payload
            state.isEdit = true
            state.viewDetails = state.users.filter((user) => user._id === id)
        },
        updateUser: (state,action) => {
            state.isEdit = false
            state.users = state.users.filter((user) => user._id !== action.payload._id)
            state.users = [...state.users,action.payload]
        }
    },
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.isLoading = true
        },
        [getUsers.fulfilled]: (state,action) => {
            state.isLoading = false
            state.users = action.payload
        },
        [getUsers.rejected]: (state) => {
            state.isLoading = false
        },
        [removeUser.pending]: (state) => {
            state.isLoading = true
        },
        [removeUser.fulfilled]: (state,action) => {
            state.isLoading = false
            state.users = action.payload
        },
        [removeUser.rejected]: (state) => {
            state.isLoading = false
        },
    }
})
export const {viewDetails,addUser,editUser,updateUser} = userSlice.actions
export default userSlice.reducer
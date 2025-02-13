import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users'

const userListSlice = createSlice({
  name: "userList",
  initialState: [],
  reducers: {
    setUserList(state, action) {
      return action.payload
    }
  }
})

export const { setUserList } = userListSlice.actions;

export const initializeUserList = () => {
  return async dispatch => {
    const userList = await userService.getAll();
    dispatch(setUserList(userList))
  }
}

export default userListSlice.reducer
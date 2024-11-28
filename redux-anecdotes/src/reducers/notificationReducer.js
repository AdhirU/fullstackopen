import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    updateNotification(state, action) {
      return action.payload
    },
  }
})


export const { updateNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch(updateNotification(content))
    setTimeout(() => {
      dispatch(updateNotification(''))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
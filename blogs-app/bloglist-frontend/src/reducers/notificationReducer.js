import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notificaiton',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return {
        error: false,
        message: action.payload
      };
    },
    setError(state, action) {
      return {
        error: true,
        message: action.payload
      }
    },
    clearNotification(state, payload) {
      return null;
    }
  }
})

export const { setMessage, setError, clearNotification } = notificationSlice.actions

export const setNotification = (content, type, seconds) => {
  return async dispatch => {
    if (type === "message") {
      dispatch(setMessage(content))
    } else if (type === "error") {
      dispatch(setError(content))
    }
    if (seconds > 0) {
      setTimeout(() => {
        dispatch(clearNotification())
      }, seconds * 1000);
    }
  }
}



export default notificationSlice.reducer
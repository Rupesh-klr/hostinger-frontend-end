import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage if it exists
const storedUser = JSON.parse(localStorage.getItem('userInfo'));

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!storedUser,
    userInfo: storedUser || null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload; // Payload contains { name, username }
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
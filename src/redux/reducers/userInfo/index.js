import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

export const userInfoSlice = createSlice({
  name: 'userInfoReducer',
  initialState,
  reducers: {
    userInfoData: (state, action) => {
      state.userInfo = action.payload;
    },
    resetUserInfoData: (state, action) => {
      state.userInfo = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {userInfoData, resetUserInfoData} = userInfoSlice.actions;

export default userInfoSlice.reducer;

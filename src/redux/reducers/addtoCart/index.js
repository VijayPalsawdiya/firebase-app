import {createSlice} from '@reduxjs/toolkit';

const initialState = {addtoCart: []};

export const addtoCartSlice = createSlice({
  name: 'addtoCartReducer',
  initialState,
  reducers: {
    addtoCartData: (state, action) => {
      state.addtoCart.push(action.payload);
    },

    resetAddtoCartData: (state, action) => {
      state.addtoCart = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addtoCartData, resetAddtoCartData} = addtoCartSlice.actions;

export default addtoCartSlice.reducer;

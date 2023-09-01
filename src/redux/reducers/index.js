import {combineReducers} from '@reduxjs/toolkit';
import userInfoReducer from './userInfo';
import addtoCartReducer from './addtoCart';

//add toolkit reducers
const rootReducer = combineReducers({
  userInfoReducer: userInfoReducer,
  addtoCartReducer: addtoCartReducer,
});

export default rootReducer;

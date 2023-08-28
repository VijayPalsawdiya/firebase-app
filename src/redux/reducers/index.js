import {combineReducers} from '@reduxjs/toolkit';
import userInfoReducer from './userInfo';

//add toolkit reducers
const rootReducer = combineReducers({userInfoReducer: userInfoReducer});

export default rootReducer;

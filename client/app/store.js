import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import userReducer from '../store/userSlice'
import employerReducer from '../store/employerSlice'

const store = configureStore({
  reducer: { auth: authReducer, user: userReducer, employer: employerReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';

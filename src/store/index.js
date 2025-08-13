import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth_slice';
import dashboardReducer from './dashboard_slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer
  },
});

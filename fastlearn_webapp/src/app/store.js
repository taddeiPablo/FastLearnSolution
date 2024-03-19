import { configureStore } from '@reduxjs/toolkit';
import { Fastlearn_users_Api } from '../redux/api/fast_users_api';
import { setupListeners } from "@reduxjs/toolkit/query";
//import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    [Fastlearn_users_Api.reducerPath]: Fastlearn_users_Api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Fastlearn_users_Api.middleware),
});

setupListeners(store.dispatch);
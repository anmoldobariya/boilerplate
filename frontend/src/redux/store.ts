import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authSlice } from "./slice/auth";
import { authApi } from "./api/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const createActions = (slice: any) => {
  const actions: any = {};

  Object.keys(slice.actions).forEach((key) => {
    actions[key] = (payload: any) =>
      store.dispatch(slice.actions[key](payload));
  });

  return actions;
};

export const actions = {
  auth: createActions(authSlice)
};

import { createSlice } from '@reduxjs/toolkit';
import { AUTH_TOKEN } from '../../lib/constants';
import { User } from '../../types';

interface AuthState {
  currentUser: null | User;
  loading: boolean;
  token: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  token: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setIsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      localStorage.removeItem(AUTH_TOKEN);
      state.currentUser = null;
      state.token = null;
    }
  }
});

export const { setIsLoading, setCurrentUser, clearToken } = authSlice.actions;
export default authSlice.reducer;

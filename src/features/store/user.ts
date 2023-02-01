/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

// document.cookie = `user=${key}; SameSite=None; Secure`;

const initialState: {
  user: User | null
  loading: boolean
} = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (value, action: PayloadAction<User>) => {
      value.user = action.payload;
    },
    remove: (value) => {
      value.user = null;
    },
    setLoading: (value, action: PayloadAction<boolean>) => {
      value.loading = action.payload;
    },
  },
});

export const { actions } = userSlice;

export default userSlice.reducer;

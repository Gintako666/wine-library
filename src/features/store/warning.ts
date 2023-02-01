/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// document.cookie = `user=${key}; SameSite=None; Secure`;

const initialState: {
  active: boolean
  text: string
} = {
  text: '',
  active: false,
};

const WarningSlice = createSlice({
  name: 'warning',
  initialState,
  reducers: {
    set: (value, action: PayloadAction<string>) => {
      value.text = action.payload;
      value.active = true;
    },
    remove: (value) => {
      value.active = false;
    },
  },
});

export const { actions } = WarningSlice;

export default WarningSlice.reducer;

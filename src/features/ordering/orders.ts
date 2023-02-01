/* eslint-disable no-console */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Orders } from '../../types/Orders';

console.log(JSON.parse(localStorage.getItem('orders') || '[]'));

const initialState: Orders[] = JSON.parse(localStorage.getItem('orders') || '[]');

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    add: (value, action: PayloadAction<Orders[]>) => {
      value.concat(action.payload);
    },
    clear: () => [],
  },
});

export const { actions } = ordersSlice;

export default ordersSlice.reducer;

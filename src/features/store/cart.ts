/* eslint-disable no-console */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductWine } from '../../types/ProductWine';

const initialState: ProductWine[] = JSON.parse(localStorage.getItem('cart') || '[]');

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (value, action: PayloadAction<ProductWine>) => {
      value.push(action.payload);
    },
    remove: (value, action: PayloadAction<ProductWine>) => {
      return value.filter(item => item.id !== action.payload.id);
    },
    edit: (value, action: PayloadAction<ProductWine>) => (
      value.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }

        return item;
      })
    ),
    clear: () => [],
  },
});

export const { actions } = cartSlice;
export const { add, remove, edit } = cartSlice.actions;

export default cartSlice.reducer;

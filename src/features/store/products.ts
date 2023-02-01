import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductWine } from '../../types/ProductWine';

const initialState: {
  products: ProductWine[] | null,
  error: boolean,
  loading: boolean,
  lengthProducts: number,
} = {
  products: null,
  error: false,
  loading: true,
  lengthProducts: 0,
};

const cartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    set: (products, payload: PayloadAction<ProductWine[]>) => {
      // eslint-disable-next-line no-param-reassign
      products.products = payload.payload.map(item => ({ ...item, counter: 1 }));
    },
    setLoading: (products, payload: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      products.loading = payload.payload;
    },
    setLengthProducts: (products, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      products.lengthProducts = action.payload;
    },
    clear: (products) => {
      // eslint-disable-next-line no-param-reassign
      products.products = [];
    },
    error: (products) => {
      // eslint-disable-next-line no-param-reassign
      products.error = true;
    },
  },
});

export const { actions } = cartSlice;

export default cartSlice.reducer;

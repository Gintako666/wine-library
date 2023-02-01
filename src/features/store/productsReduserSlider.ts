import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductWine } from '../../types/ProductWine';

const initialState: {
  products: ProductWine[],
} = {
  products: [],
};

const productsSliderSlice = createSlice({
  name: 'productsSlider',
  initialState,
  reducers: {
    set: (products, payload: PayloadAction<ProductWine[]>) => {
      // eslint-disable-next-line no-param-reassign
      products.products = payload.payload.map(item => ({ ...item, counter: 1 }));
    },
  },
});

export const { actions } = productsSliderSlice;

export default productsSliderSlice.reducer;

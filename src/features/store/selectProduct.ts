import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductWine } from '../../types/ProductWine';

const initialState: {selectProduct: ProductWine | null } = { selectProduct: null };

const cartSlice = createSlice({
  name: 'selectProduct',
  initialState,
  reducers: {
    set: (value, action: PayloadAction<ProductWine>) => {
      // eslint-disable-next-line no-param-reassign
      value.selectProduct = action.payload;
    },
  },
});

export const { actions } = cartSlice;

export default cartSlice.reducer;

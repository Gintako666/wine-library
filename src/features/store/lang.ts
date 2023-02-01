import { createSlice } from '@reduxjs/toolkit';

const langSlice = createSlice({
  name: 'lang',
  initialState: 'uk',
  reducers: {
    set: (newLang: string) => {
      return newLang;
    },
  },
});

export const { actions } = langSlice;

export default langSlice.reducer;

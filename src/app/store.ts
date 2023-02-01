// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import cartReduser from '../features/store/cart';
import userReduser from '../features/store/user';
import langReduser from '../features/store/lang';
import productsReduser from '../features/store/products';
import selectProductReduser from '../features/store/selectProduct';
import productsReduserSlider from '../features/store/productsReduserSlider';
import orderReduser from '../features/ordering/ordering';
import ordersReduser from '../features/ordering/orders';
import warningReduser from '../features/store/warning';

const store = configureStore({
  reducer: {
    user: userReduser,
    cart: cartReduser,
    lang: langReduser,
    products: productsReduser,
    productsSlider: productsReduserSlider,
    selectProduct: selectProductReduser,
    order: orderReduser,
    orders: ordersReduser,
    warning: warningReduser,
  },
});

composeWithDevTools();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

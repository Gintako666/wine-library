/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { LogIn } from './components/LogIn';
// import { Catalog } from './pages/Catalog';
import Home from './pages/Home/Home';
import { autoAuthorization, getWines } from './api/api';
// import 'bulma/css/bulma.min.css';
import './styles/App.scss';
// import 'bulma/css/bulma.min.css';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { actions as productsActions } from './features/store/products';
import { actions as orderingActions } from './features/ordering/ordering';
import AboutUs from './pages/AboutUs/AboutUs';
import Cart from './pages/Cart/Cart';
import WineInfo from './pages/WineInfo/WineInfo';
import Ordering from './pages/Ordering/Ordering';
// import OrderingSecond from './pages/Ordering/OrderingSecond';
import { ProductWine } from './types/ProductWine';
// import OrderingCompleted from './pages/Ordering/OrderingCompleted';
import ServerError from './pages/ServerError/ServerError';
import { actions as productsSlideractions } from './features/store/productsReduserSlider';
import User from './pages/User/User';
// import Development from './pages/Development/Development';
import { useLocalStorage } from './hooks/use-localStorage';
import { actions as userActions } from './features/store/user';
import { Promotions } from './pages/Promotions';
import { Catalog } from './pages/Catalog';
import { getCitys } from './api/NPapi';
import WarningModal from './components/WarningModal/WarningModal';
import { Gastrosommelier } from './pages/Gastrosommelier';

const App = () => {
  const [visibleModalLogin, setVisibleModalLogin] = useState(false);
  const cart = useAppSelector(state => state.cart);
  const { error } = useAppSelector(state => state.products);
  const { user } = useAppSelector(state => state.user);
  const orders = useAppSelector(state => state.orders);
  const [, setOrdersLocalStor] = useLocalStorage('orders', []);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getWines(true)
      .then((wines) => {
        dispatch(productsSlideractions.set(wines));
      })
      .catch(() => dispatch(productsActions.error()));

    const userData = localStorage.getItem('user');

    if (userData) {
      dispatch(userActions.setLoading(true));
      autoAuthorization(userData).then((userInfo) => {
        dispatch(userActions.set(userInfo));
      }).catch(() => {}).finally(() => {
        dispatch(userActions.setLoading(false));
      });
    }

    getCitys('Киев').then((a: any) => {
      console.log(a);
    });
  }, []);

  useEffect(() => {
    dispatch(orderingActions.setPrice(+cart.reduce((sum: number, item: ProductWine) => {
      return sum + ((item.price - ((item.price * item.discount) / 100)) * item.counter);
    }, 0).toFixed()));
  }, [cart]);

  useEffect(() => {
    setOrdersLocalStor(orders);
  }, [orders]);

  document.body.style.overflow = visibleModalLogin ? 'hidden' : 'auto';

  return (
    <div className="App">
      <Header setVisibleModalLogin={setVisibleModalLogin} />
      {!user
        ? <LogIn isOpen={visibleModalLogin} setVisibleModalLogin={setVisibleModalLogin} />
        : null}
      <WarningModal />

      {error ? <ServerError /> : (
        <main>
          <Routes>
            <Route path="/">
              <Route
                index
                element={<Home />}
              />
              <Route
                path="catalog"
              >
                <Route index element={<Catalog />} />
                <Route path=":selektedWine" element={<WineInfo />} />
              </Route>
              <Route path="gastrosommelier">
                <Route index element={<Gastrosommelier />} />
                <Route path=":selektedWine" element={<WineInfo />} />
              </Route>
              <Route path="promotions">
                <Route index element={<Promotions />} />
                <Route path=":selektedWine" element={<WineInfo />} />
              </Route>
              <Route
                path="aboutUs"
                element={<AboutUs />}
              />
              <Route
                path="cart"
                element={<Cart />}
              />
              <Route path="ordering">
                <Route index element={<Ordering />} />
                {/* <Route path=":orderingStage" element={<OrderingSecond />} /> */}
                {/* <Route path="completed" element={<OrderingCompleted />} /> */}
              </Route>
              <Route path="user" element={<User />} />
            </Route>
          </Routes>
        </main>
      )}

      <Footer />

    </div>
  );
};

export default App;

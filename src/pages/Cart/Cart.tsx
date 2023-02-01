/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CounterWines } from '../../components/CounterWines';
import { Location } from '../../components/Location';
import { actions as cartActions } from '../../features/store/cart';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useLocalStorage } from '../../hooks/use-localStorage';
import { ProductWine } from '../../types/ProductWine';
import { CartDeliverys } from './CartDeliverys';

type CartProductType = {
  item: ProductWine;
};

const CartProduct: React.FC<CartProductType> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState(item.counter);

  const price: number = +(item.price - ((item.price * item.discount) / 100)).toFixed();

  return (
    <div className="cart__products__item cart-products-grid">
      <div className="ordering__cart__item__blur"></div>
      <div className="cart__products__item__wrapper">
        <button
          type="button"
          onClick={() => {
            dispatch(cartActions.remove(item));
          }}
        >
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.196 17.021 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.021 17.8043 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#C8AE8E" />
          </svg>
        </button>
        <Link to={`/catalog/${item.name}`}><img src={`./img/${item.id}.png`} alt="Wine" /></Link>
      </div>

      <div className="cart__products__item__info">
        <div className="cart__products__item__name">
          {item.name}
          ,
          {' '}
          {item.volume}
          л
        </div>
        <div className="cart__products__item__sweetness">
          {item.color.name}
          ,
          {' '}
          {item.sweetness.name}
        </div>
      </div>

      <div className="cart__products__item__price">
        {price}
        {' '}
        ₴
      </div>

      <CounterWines item={item} counter={counter} setCounter={setCounter} />

      <div className="cart__products__item__price">
        {price * counter}
        {' '}
        ₴
      </div>
    </div>
  );
};

const Cart: React.FunctionComponent = () => {
  const cart = useAppSelector(state => state.cart);
  const order = useAppSelector(state => state.order);
  const [, setLocalCart] = useLocalStorage('cart', []);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  return (
    <div className="container">
      <Location />

      {cart.length > 0 ? (
        <section className="cart">
          <div className="cart__products">
            <h4 className="cart__title">Кошик</h4>
            <div className="cart__products__header cart-products-grid">
              <h5 className="cart__products__header__item">Товар</h5>
              <h5 className="cart__products__header__item">Ціна</h5>
              <h5 className="cart__products__header__item">Кількість</h5>
              <h5 className="cart__products__header__item">Підсумок</h5>
            </div>
            <ul className="cart__products__items">
              {cart.map(item => {
                return (
                  <li key={item.id}>
                    <CartProduct item={item} />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="cart__results">
            <h4 className="cart__title">Підсумки кошика</h4>
            <div className="cart__result">
              <div className="cart__result__item">
                <h5 className="cart__result__item__title">Підсумок</h5>
                <div className="cart__result__item__price">
                  {order.price}
                  {' '}
                  ₴
                </div>
              </div>
              <div className="cart__result__item">
                <h5 className="cart__result__item__title">Доставка</h5>
                <CartDeliverys openInCart />
              </div>
              <div className="cart__result__item">
                <h5 className="cart__result__item__title">Загалом </h5>
                <div className="cart__result__item__price">
                  {order.price + +order.delivery.price}
                  {' '}
                  ₴
                </div>
              </div>
            </div>
            <Link to="/ordering" className="cart__result__button">
              Перейти до оформлення
            </Link>
          </div>
        </section>
      ) : (
        <section>
          <div className="cart__error">
            <img src="./img/cartError.png" alt="" className="cart__error__img" />
            <h3 className="cart__error__title">
              Ваш кошик порожній
            </h3>
            <p className="cart__error__text">
              Саме час наповнити його якісними винами на свій смак
            </p>
            <Link to="/catalog" className="cart__error__button">
              Перейти до каталогу
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cart;

/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircleCheckbox } from '../../components/CircleCheckbox';
import { Input } from '../../components/Input';
import Loader from '../../components/Loader/Loader';
import { Location } from '../../components/Location';
import { LoginForm } from '../../components/LogIn';
import { actions as orderingActions } from '../../features/ordering/ordering';
import { actions as cartActions } from '../../features/store/cart';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useLocalStorage } from '../../hooks/use-localStorage';
import { ProductWine } from '../../types/ProductWine';
import { regExps } from '../../utils/regExps';
import OrderingCompleted from './OrderingCompleted';
import OrderingSecond from './OrderingSecond';

type OrderingCartItemType = {
  item: ProductWine;
};

const OrderingCartItem: React.FC<OrderingCartItemType> = ({ item }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  // const user = useAppSelector(state => state.user);
  const [counter, setCounter] = useState(item.counter);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_localCart, setLocalCart] = useLocalStorage('cart', []);

  useEffect(() => {
    setLocalCart(cart);
  }, [counter, cart]);

  return (
    <div className="ordering__cart__item">
      <div className="ordering__cart__item__blur"></div>

      <button
        type="button"
        onClick={() => {
          dispatch(cartActions.remove(item));
        }}
        className="ordering__cart__item__remove"
      >
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.196 17.021 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.021 17.8043 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#C8AE8E" />
        </svg>
      </button>

      <Link to={`/catalog/${item.name}`}>
        <img
          src={`./img/${item.id}.png`}
          alt="Wine"
          className="ordering__cart__item__img"
        />
      </Link>

      <div className="ordering__cart__item__info">
        <div className="ordering__cart__item__name">
          {item.name}
          ,
          {' '}
          {item.volume}
          ??
        </div>
        <div className="ordering__cart__item__country">
          {item.country.name}
          ,
          {' '}
          {item.sweetness.name}
        </div>
      </div>

      <div className="cart__products__item__counter ordering__cart__item__counter">
        <div className="ordering__cart__item__counter__text">
          ??????????????????
        </div>
        <button
          type="button"
          className="cart__products__item__counter__button"
          onClick={() => {
            if (counter > 1) {
              setCounter(prev => prev - 1);
              dispatch(cartActions.edit({ ...item, counter: counter - 1 }));
            }
          }}
        >

          -
        </button>
        <div className="cart__products__item__counter__button">
          {counter}
        </div>
        <button
          type="button"
          className="cart__products__item__counter__button"
          onClick={() => {
            if (counter < 10) {
              setCounter(prev => prev + 1);
              dispatch(cartActions.edit({ ...item, counter: counter + 1 }));
            }
          }}
        >
          +
        </button>
      </div>

      <div className="ordering__cart__item__price">
        <h4 className="ordering__cart__item__price__title">???????? :</h4>
        {' '}
        {((item.price - ((item.price * item.discount) / 100)) * counter).toFixed()}
        {' '}
        ???
      </div>
    </div>
  );
};

const Ordering: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const [orderingType, setOrderingType] = useState<'first' | 'second' | 'complete'>('first');
  const cart = useAppSelector(state => state.cart);
  const { user, loading } = useAppSelector(state => state.user);
  const [client, setclient] = useState('new');
  const [canPass, setCanPass] = useState(false);
  const [dataError, setDataError] = useState(false);

  const [name, setname] = useState(user?.firstname || '');
  const [lastName, setlastName] = useState(user?.lastname || '');
  const [email, setemail] = useState(user?.email || '');
  const [tell, settell] = useState(user?.phone || '');
  const [promo, setPromo] = useState('');

  const setNewClient = useCallback(() => {
    setclient('new');
  }, []);

  const set??onstantClient = useCallback(() => {
    setclient('constant');
  }, []);

  useEffect(() => {
    if (user) {
      setname(user.firstname || '');
      setlastName(user.lastname || '');
      setemail(user.email || '');
      settell(user.phone || '');
    }
  }, [user]);

  useEffect(() => {
    console.log(name.match(regExps.firstName));

    if (name.match(regExps.firstName)
      && tell.match(regExps.phone)
      && email.match(regExps.email)
      && lastName.match(regExps.lastName)
    ) {
      setCanPass(true);
    } else {
      setCanPass(false);
    }
  }, [
    name, tell, email, lastName,
  ]);

  return !loading ? (
    <div className="container">
      <Location />
      {orderingType === 'first' && (
        <section className="ordering">
          {!user ? (
            <div className={classNames(
              'ordering__contact-data',
              { 'ordering__contact-data--error': dataError },
            )}
            >
              <h3 className="ordering__title">?????????????????? ????????</h3>
              <div className="ordering__line"></div>
              <div className="ordering__contact-data__chekboxs">
                <div
                  className="ordering__contact-data__chekbox"
                  onClick={setNewClient}
                  aria-hidden="true"
                >
                  <CircleCheckbox activeCheckbox={client === 'new'} fn={setNewClient} />
                  ?? ?????????? ????????????
                </div>
                <div
                  className="ordering__contact-data__chekbox"
                  onClick={set??onstantClient}
                  aria-hidden="true"
                >
                  <CircleCheckbox activeCheckbox={client === 'constant'} fn={set??onstantClient} />
                  ?? ?????????????????? ????????????
                </div>

              </div>
              {client === 'constant' && <LoginForm loginSelect={client === 'constant'} fn={() => {}} />}
              {client === 'new' && (
                <div className="ordering__contact-data__inputs--new">
                  <Input
                    value={lastName}
                    setValue={setlastName}
                    placeholder="????????????????"
                    errorText="???? ?????????? ???????????????????? ????????????????"
                    regExp={regExps.lastName}
                  />
                  <Input
                    value={name}
                    setValue={setname}
                    placeholder="????'??"
                    errorText="???? ?????????? ???????????????????? ????'??"
                    regExp={regExps.firstName}
                  />
                  <Input
                    value={tell}
                    setValue={settell}
                    placeholder="??????????????"
                    errorText="?????????? ?????????????? ?????????????? 10 ????????"
                    regExp={regExps.phone}
                  />
                  <Input
                    value={email}
                    setValue={setemail}
                    placeholder="Email"
                    errorText="???? ?????????? ?????????????????????? Email"
                    regExp={regExps.email}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={classNames(
              'ordering__contact-data',
              { 'ordering__contact-data--error': dataError },
            )}
            >
              <h3 className="ordering__title">?????????????????? ????????</h3>
              <div className="ordering__line"></div>
              <div className="ordering__contact-data__inputs">
                <Input
                  value={lastName}
                  setValue={setlastName}
                  placeholder="????????????????"
                  regExp={regExps.lastName}
                  errorText="???????????????????? ?????????????? ????????????????"
                />
                <Input
                  value={name}
                  setValue={setname}
                  placeholder="????'??"
                  regExp={regExps.firstName}
                  errorText="???????????????????? ?????????????? ????'??"
                />
                <Input
                  value={tell}
                  setValue={settell}
                  placeholder="??????????????"
                  regExp={regExps.phone}
                  errorText="?????????? ?????????????? ?????????????? 10 ????????"
                />

              </div>
            </div>
          )}
          <div className="ordering__cart">
            <h3 className="ordering__title">????????????</h3>
            <div className="ordering__line"></div>
            <ul className="ordering__cart__list">
              {cart.map((item, index) => {
                return (
                  <li key={item.id}>
                    <OrderingCartItem item={item} />
                    {(index !== cart.length - 1) ? (
                      <div className="ordering__line"></div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <form className="ordering__cart__promo">
              <div className="ordering__cart__input">
                <Input
                  value={promo}
                  setValue={setPromo}
                  placeholder="??????????-??????"
                  errorText=""
                />
              </div>
              <button
                type="button"
                className="ordering__cart__promo__button"
                onClick={() => {
                  const activePromo = [{ name: 'pls', discount: 10 }].find(item => item.name === promo);

                  if (activePromo) {
                    dispatch(orderingActions.setDiscount(activePromo.discount));
                  }

                  setPromo('');
                }}
              >
                ????????????
              </button>
            </form>
            <button
              type="button"
              className={classNames(
                'ordering__cart__button',
                { 'is-disable': !canPass },
              )}
              onClick={() => {
                if (!canPass
                ) {
                  setDataError(true);
                  setTimeout(() => setDataError(false), 500);
                  console.log('error');

                  return;
                }

                setOrderingType('second');

                dispatch(orderingActions.setUserInfo({
                  lastName,
                  firstName: name,
                  tel: tell,
                  email,
                }));
              }}
            >
              ?????????????? ????????
            </button>
          </div>
        </section>
      )}
      {orderingType === 'second' && <OrderingSecond setOrderingType={setOrderingType} />}
      {orderingType === 'complete' && <OrderingCompleted />}
    </div>
  ) : (<Loader />);
};

export default Ordering;

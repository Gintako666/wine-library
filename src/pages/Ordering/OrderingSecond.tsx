/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { CircleCheckbox } from '../../components/CircleCheckbox';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { CartDeliverys } from '../Cart/CartDeliverys';
import { useDebounce } from '../../hooks/use-debounce';
import { actions as orderingActions } from '../../features/ordering/ordering';
import { sendNewOrder } from '../../api/api';
import { Orders } from '../../types/Orders';
// import cityUkrain from '../../api/JSONs/CitiesAndVillages - 14 March.json';

type Props = {
  setOrderingType: React.Dispatch<React.SetStateAction<'first' | 'second' | 'complete'>>
};

const OrderingSecond: React.FunctionComponent<Props> = ({ setOrderingType }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const order = useAppSelector(state => state.order);
  const { user } = useAppSelector(state => state.user);
  const [canPass, setCanPass] = useState(false);
  const [canPassError, setCanPassError] = useState(false);
  const [buttonLoading, setbuttonLoading] = useState(false);

  const {
    departmentNp, adress, town, delivery, userInfo, payment, discount,
  } = useAppSelector(state => state.order);

  const [comment, setComment] = useState('');
  const debounceComment = useDebounce(comment, 500);

  useEffect(() => {
    dispatch(orderingActions.setComment(debounceComment));
  }, [debounceComment]);

  const changePaymentCard = useCallback(() => {
    sessionStorage.setItem('selectedPayment', JSON.stringify({ type: 'card', id: 2 }));
    dispatch(orderingActions.setPayment({ type: 'card', id: 2 }));
  }, []);

  const changePaymentCash = useCallback(() => {
    sessionStorage.setItem('selectedPayment', JSON.stringify({ type: 'cash', id: 1 }));
    dispatch(orderingActions.setPayment({ type: 'cash', id: 1 }));
  }, []);

  useEffect(() => {
    setCanPass(false);
  }, []);

  useEffect(() => {
    if (delivery.type === 'city') {
      console.log(adress);
      if (!!adress.Present && !!town.Ref) {
        setCanPass(true);

        return;
      }

      setCanPass(false);

      return;
    }

    if (delivery.type === 'np') {
      if (!!departmentNp.ShortAddress && !!town.Ref) {
        setCanPass(true);

        return;
      }

      setCanPass(false);

      return;
    }

    if (delivery.type === 'pickup') {
      setCanPass(true);
    }
  }, [
    departmentNp, adress, town, delivery,
  ]);

  const totalPrice = order.delivery.price + order.price;
  const discountInPage = (user ? (totalPrice / 50) : 0) + (totalPrice * order.discount) / 100;

  return (
    <section className="ordering">
      <article className="ordering__delivery">
        <h3 className="ordering__title">Доставка</h3>
        <div className="ordering__line"></div>
        <div className={classNames(
          { 'ordering__contact-data--error': canPassError },
        )}
        >
          <CartDeliverys openInCart={false} />
        </div>
        <h3 className="ordering__title ordering__title--payment">Оплата</h3>
        <div className="ordering__line"></div>
        <div
          className="ordering__delivery__payment"
          onClick={changePaymentCard}
          aria-hidden="true"
        >
          <CircleCheckbox activeCheckbox={order.payment.type === 'card'} fn={changePaymentCard} />
          Готівкою при отриманні
        </div>
        <div
          className="ordering__delivery__payment"
          onClick={changePaymentCash}
          aria-hidden="true"
        >
          <CircleCheckbox activeCheckbox={order.payment.type === 'cash'} fn={changePaymentCash} />
          Оплата карткою
          <svg width="30" height="10" viewBox="0 0 30 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5153 3.18406C15.4982 4.57153 16.718 5.34574 17.6368 5.80611C18.5809 6.27839 18.898 6.58129 18.8943 7.0037C18.8872 7.65008 18.1412 7.93538 17.4431 7.94647C16.2252 7.96586 15.517 7.60839 14.9541 7.33803L14.5153 9.44876C15.0802 9.71635 16.1261 9.94972 17.2106 9.95996C19.7565 9.95996 21.4221 8.66791 21.4311 6.66466C21.4411 4.12225 18.0107 3.98153 18.0341 2.84514C18.0422 2.50056 18.362 2.13285 19.0628 2.03936C19.4096 1.99213 20.3672 1.95599 21.4528 2.46996L21.8789 0.427793C21.2951 0.209238 20.5447 -3.91006e-05 19.6105 -3.91006e-05C17.2143 -3.91006e-05 15.5289 1.3096 15.5153 3.18406ZM25.9732 0.175864C25.5083 0.175864 25.1166 0.454659 24.9417 0.88249L21.305 9.80996H23.8491L24.3553 8.37153H27.4641L27.7577 9.80996H30L28.0433 0.175864H25.9732ZM26.3291 2.77839L27.0633 6.39611H25.0526L26.3291 2.77839ZM12.4308 0.175984L10.4255 9.80984H12.8497L14.8541 0.175744H12.4308M8.84449 0.175744L6.32121 6.73321L5.30051 1.15767C5.18074 0.535262 4.70777 0.175864 4.18254 0.175864H0.0577734L0 0.455624C0.846797 0.644539 1.80891 0.949238 2.3918 1.27526C2.74852 1.47442 2.85023 1.64851 2.96742 2.12177L4.90066 9.80996H7.4625L11.3902 0.175864H8.84449" fill="#4043D2" />
          </svg>
          <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.19531 1.10449H10.7873V9.22139H6.19531V1.10449Z" fill="#FF5F00" />
            <path d="M6.48716 5.1627C6.48716 3.51353 7.27434 2.05073 8.48426 1.10422C7.59508 0.415869 6.47262 0 5.24809 0C2.347 0 0 2.30884 0 5.1627C0 8.01649 2.347 10.3254 5.24802 10.3254C6.47255 10.3254 7.59502 9.90953 8.48426 9.22112C7.27434 8.28897 6.48716 6.81187 6.48716 5.1627Z" fill="#EB001B" />
            <path d="M16.9833 5.1627C16.9833 8.01649 14.6363 10.3254 11.7353 10.3254C10.5107 10.3254 9.38827 9.90953 8.49902 9.22112C9.72355 8.27466 10.4962 6.81187 10.4962 5.1627C10.4962 3.51353 9.70895 2.05073 8.49902 1.10422C9.3882 0.415869 10.5107 0 11.7353 0C14.6363 0 16.9834 2.32321 16.9834 5.1627H16.9833Z" fill="#F79E1B" />
          </svg>
        </div>
      </article>
      <article className="ordering__total">
        <h3 className="ordering__title">
          Всього:
          {' '}
          {(totalPrice) - discountInPage }
          {' '}
          ₴
        </h3>
        <div className="ordering__line"></div>
        {cart.map(item => {
          return (
            <div className="ordering__total__info" key={item.id}>
              <div className="ordering__total__info__name">
                {item.counter}
                {' '}
                пл.
                {' '}
                {item.name}
              </div>
              <div className="ordering__total__info__prixe">
                {((item.counter * item.price)
                - ((item.counter * item.price * item.discount) / 100)).toFixed()}
                {' '}
                ₴
              </div>
            </div>
          );
        })}
        <div className="ordering__total__info">
          <div className="ordering__total__info__name">Доставка</div>
          <div className="ordering__total__info__prixe">
            {order.delivery.price}
            {' '}
            ₴
          </div>
        </div>
        {(user || order.discount > 0) ? (
          <div className="ordering__total__info">
            <div className="ordering__total__info__name">Знижка</div>
            <div className="ordering__total__info__prixe">
              -
              {discountInPage}
              {' '}
              ₴
            </div>
          </div>
        ) : null}
        <div className="ordering__line"></div>
        <div className="ordering__total__comment">
          Якщо ви хочете додати коментар до вашого замовлення, напишіть його нижче.
          <textarea
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            className="ordering__total__comment__input"
            placeholder="Повідомлення"
          />
        </div>
        <button
          type="button"
          className={classNames(
            'ordering__total__button',
            { 'is-disable': !canPass },
            { 'is-loading': buttonLoading },
          )}
          // disabled={!canPass}
          onClick={() => {
            if (!canPass) {
              setCanPassError(true);
              setTimeout(() => setCanPassError(false), 500);

              return;
            }

            const newOrder: Orders = {
              userId: user?.id || 1,
              orderDate: new Date().toLocaleDateString().split('.').reverse()
                .join('-'),
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              email: userInfo.email,
              phone: userInfo.tel,
              deliveryTypeId: delivery.id,
              town: `${town.Description} (${town.AreaDescription})` || 'null',
              address: delivery.id === 2 ? adress.Present : departmentNp.ShortAddress,
              paymentTypeId: payment.id,
              discountSum: discount,
              orderStatus: 0,
              orderDetails: cart.map(item => ({
                wine_id: item.id,
                quantity: item.counter,
                price: (item.price - ((item.price * item.discount) / 100)),
              })),
            };

            setbuttonLoading(true);
            dispatch(orderingActions.setTown({
              Description: '',
              Ref: '',
              AreaDescription: '',
            }));
            dispatch(orderingActions.setDepartmentNp({
              ShortAddress: '', Number: '',
            }));

            sendNewOrder(newOrder).then(() => {
              setOrderingType('complete');
            }).finally(() => {
              setbuttonLoading(false);
            });
          }}
        >
          Оформлення замовлення
        </button>
      </article>
    </section>
  );
};

export default OrderingSecond;

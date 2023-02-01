/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from 'react';
import { CircleCheckbox } from '../../components/CircleCheckbox';
import { Input } from '../../components/Input';
import CitySelect from '../../components/Select/CitySelect';
import DepartamentNPSelect from '../../components/Select/DepartamentNPSelect';
import StreetSelect from '../../components/Select/StreetSelect';
import { actions as orderingActions } from '../../features/ordering/ordering';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useDebounce } from '../../hooks/use-debounce';
import { regExps } from '../../utils/regExps';

type CartDeliverysPrors = {
  openInCart: boolean;
};

export const CartDeliverys: React.FC<CartDeliverysPrors> = ({
  openInCart,
}) => {
  const dispatch = useAppDispatch();
  const {
    delivery, adress: adresState, departmentNp: departmentNpState, town: townState,
  } = useAppSelector(state => state.order);

  const [homeAdres, setHomeAdres] = useState('');

  console.log(delivery.id);

  const selectDelivery = useCallback((type: string, price, id) => {
    sessionStorage.setItem('selectedDelivery', JSON.stringify({ type, price, id }));
    dispatch(orderingActions.setDelivery({ type, price, id }));
  }, []);

  const setSelectDeliveryPickup = useCallback(() => {
    selectDelivery('pickup', 0, 1);
  }, []);

  const setSelectDeliveryCity = useCallback(() => {
    selectDelivery('city', 50, 2);
  }, []);

  const setSelectDeliveryNp = useCallback(() => {
    selectDelivery('np', 70, 3);
  }, []);

  const [townn] = useState(townState);
  const debounseTown = useDebounce(townn, 500);

  useEffect(() => {
    dispatch(orderingActions.setTown(debounseTown));
  }, [debounseTown]);

  const [addres] = useState(adresState);
  const debounseAddress = useDebounce(addres, 500);

  useEffect(() => {
    dispatch(orderingActions.setAdress(debounseAddress));
  }, [debounseAddress]);

  const [department] = useState(departmentNpState);
  const debounseDepartment = useDebounce(department, 500);

  useEffect(() => {
    dispatch(orderingActions.setDepartmentNp(debounseDepartment));
  }, [debounseDepartment]);

  return (
    <div className="cart__result__item__deliverys">
      <div
        className="cart__result__item__delivery"
        onClick={setSelectDeliveryPickup}
        aria-hidden="true"
      >
        <CircleCheckbox activeCheckbox={delivery.type === 'pickup'} fn={setSelectDeliveryPickup} />
        <h4 className="cart__result__item__delivery__title">
          Самовивіз
        </h4>
        <div className="cart__result__item__delivery__details">
          Київ, вул. Степана Бандери 8, завод “Маяк”.
          <br />
          Режим роботи:
          <br />
          Пн-Пт 9:00-18:00,
          <br />
          Сб-Нд 10:00- 17:00

          <a
            href="https://www.google.com.ua/maps/place/пр-т.+Степана+Бандеры,+8,+Киев,+02000/@50.4882905,30.4910647,17z/data=!3m1!4b1!4m5!3m4!1s0x40d4cdfba7a3d89b:0x2fc7206de12d620c!8m2!3d50.4882871!4d30.4932587?hl=ru"
            className="cart__result__item__delivery__details__link"
            target="blank"
          >
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.99967 13.1342C4.87993 12.994 4.72388 12.8081 4.54227 12.5843C4.10928 12.0508 3.53253 11.304 2.95648 10.4502C2.37975 9.59545 1.80805 8.63972 1.38159 7.6878C0.95307 6.73129 0.683008 5.80434 0.683008 5.00016C0.683008 2.61346 2.61297 0.683496 4.99967 0.683496C7.38637 0.683496 9.31634 2.61346 9.31634 5.00016C9.31634 5.80434 9.04628 6.73129 8.61776 7.6878C8.1913 8.63972 7.6196 9.59545 7.04287 10.4502C6.46682 11.304 5.89007 12.0508 5.45708 12.5843C5.27547 12.8081 5.11942 12.994 4.99967 13.1342ZM2.98301 5.00016C2.98301 6.11346 3.88637 7.01683 4.99967 7.01683C6.11297 7.01683 7.01634 6.11346 7.01634 5.00016C7.01634 3.88686 6.11297 2.9835 4.99967 2.9835C3.88637 2.9835 2.98301 3.88686 2.98301 5.00016Z" stroke="#C8AE8E" strokeWidth="0.7" />
            </svg>

            Див. на карті
          </a>
        </div>
      </div>
      <div
        className="cart__result__item__delivery"
        onClick={setSelectDeliveryCity}
        aria-hidden="true"
      >
        <CircleCheckbox activeCheckbox={delivery.type === 'city'} fn={setSelectDeliveryCity} />
        <h4 className="cart__result__item__delivery__title">
          {openInCart ? ("По Україні нашим кур'єром - 50 ₴") : ("По Україні нашим кур'єром - безкоштовно від 1000 грн")}
        </h4>
        {!openInCart && delivery.type === 'city' ? (
          <>
            <div className="cart__result__item__delivery__wrapper">
              <CitySelect />
            </div>
            {townState.Ref && (
              <div className="cart__result__item__delivery__wrapper">
                <StreetSelect />
              </div>
            )}
            {adresState.Present && (
              <div className="cart__result__item__delivery__wrapper">
                <Input
                  value={homeAdres}
                  setValue={setHomeAdres}
                  placeholder="Номер дому"
                  errorText="Введіть коректний номер"
                  regExp={regExps.numbers}
                />
              </div>
            )}
          </>
        ) : null}

      </div>
      <div
        className="cart__result__item__delivery"
        onClick={setSelectDeliveryNp}
        aria-hidden="true"
      >
        <CircleCheckbox activeCheckbox={delivery.type === 'np'} fn={setSelectDeliveryNp} />
        <h4 className="cart__result__item__delivery__title">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.86005 9.65576H10.9104V13.7229H13.3711L9.38524 17.7088L5.39941 13.7229H7.86005V9.65576Z" fill="#9D1516" />
            <path d="M7.97529 8.05273H11.0257V3.98556H13.4863L9.50048 -0.000266075L5.51465 3.98556H7.97529V8.05273Z" fill="#D91717" fillOpacity="0.7" />
            <path d="M0.49464 9.05272L4.48047 5.06689L4.48047 13.0386L0.49464 9.05272Z" fill="#9D1516" />
            <path d="M18.5054 9.05272L14.5195 5.06689L14.5195 13.0386L18.5054 9.05272Z" fill="#9D1516" />
          </svg>

          {openInCart ? ('Нова Пошта ') : ('Нова Пошта (безкоштовно від 2500 грн.)')}
        </h4>
        {!openInCart && delivery.type === 'np' ? (
          <>
            <div className="cart__result__item__delivery__wrapper">
              <CitySelect />
            </div>
            {townState.Ref && (
              <div className="cart__result__item__delivery__wrapper">
                <DepartamentNPSelect />
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

/* eslint-disable max-len */
/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserData, getUserOrder, setNewUserData } from '../../api/api';
import { Input } from '../../components/Input';
import Loader from '../../components/Loader/Loader';
import { LoaderItems } from '../../components/LoaderItems';
import { Location } from '../../components/Location';
import { LoginForm } from '../../components/LogIn';
// import { actions as ordersActions } from '../../features/ordering/orders';
import { actions as userActions } from '../../features/store/user';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
// import { useLocalStorage } from '../../hooks/use-localStorage';
import { OrdersGet } from '../../types/Orders';
import { regExps } from '../../utils/regExps';

const PersonalData = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);
  const [loadinggetdData, setloadingGetData] = useState(false);
  const [loadingSendData, setloadingSendData] = useState(false);

  const [name, setname] = useState('');
  const [lastName, setlastName] = useState('');
  // const [surname, setSurname] = useState('');
  // const [email, setemail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [birthday, setbirthday] = useState('');

  useEffect(() => {
    if (user) {
      getUserData(user.id).then(userInfo => {
        setlastName(userInfo.lastname || '');
        setname(userInfo.firstname || '');
        setPhone(userInfo.phone || '');
        if (userInfo.birthday || '') {
          setbirthday(userInfo.birthday.slice(0, 10));
        }

        setloadingGetData(true);
        console.log(userInfo.birthday);
      });
    }
  }, []);

  useEffect(() => {
    console.log(birthday);
  }, [birthday]);

  return loadinggetdData ? (
    <div className="user__info">
      <h3 className="user__info__title">Особисті дані</h3>
      <p className="user__info__text">Редагування контактної інформації</p>

      <div className="user__info__item">
        <h4 className="user__info__item__title">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.6738 14.85V17.25H0.75V14.85C0.75 14.3524 0.878958 13.9049 1.13927 13.4908L1.13943 13.4906C1.40237 13.072 1.74495 12.7592 2.17637 12.5403C3.31712 11.9835 4.47216 11.5675 5.64205 11.2903C6.81357 11.0134 8.00313 10.875 9.2119 10.875C10.4207 10.875 11.6102 11.0134 12.7817 11.2903C13.9516 11.5675 15.1067 11.9835 16.2475 12.5403C16.6789 12.7593 17.0214 13.0721 17.2844 13.4906L17.2845 13.4908C17.5448 13.9049 17.6738 14.3524 17.6738 14.85ZM9.2119 8.25C8.14017 8.25 7.24425 7.88534 6.48307 7.14166C5.72242 6.39851 5.35595 5.53128 5.35595 4.5C5.35595 3.46872 5.72242 2.60149 6.48307 1.85834C7.24425 1.11466 8.14017 0.75 9.2119 0.75C10.2836 0.75 11.1795 1.11466 11.9407 1.85834C12.7014 2.60149 13.0678 3.46872 13.0678 4.5C13.0678 5.53128 12.7014 6.39851 11.9407 7.14166C11.1795 7.88534 10.2836 8.25 9.2119 8.25Z" stroke="white" strokeWidth="1.5" />
          </svg>
          Основна інформація
        </h4>
        <p className="user__info__item__text">
          Вкажіть своє повне
          {" ім'я"}
          , що зазначене у
          паспорті (офіційному документі, що засвідчує особу власника).
        </p>

        <form className="user__info__item__form">
          <Input
            value={lastName}
            setValue={setlastName}
            placeholder="Прізвище"
            errorText=""
            regExp={regExps.lastName}
          />
          <Input
            value={name}
            setValue={setname}
            placeholder="Ім'я"
            errorText=""
            regExp={regExps.firstName}
          />
          <input
            type="date"
            className="user__info__item__input"
            placeholder="Дата народження"
            value={birthday}
            onChange={(e) => {
              setbirthday(e.target.value);
            }}
            min="1900-01-01"
            max="2004-12-31"
          />
        </form>
      </div>
      <div className="user__info__item">
        <h4 className="user__info__item__title">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0.5H2C1.60218 0.5 1.22064 0.658035 0.93934 0.93934C0.658035 1.22064 0.5 1.60218 0.5 2V14C0.5 14.3978 0.658035 14.7794 0.93934 15.0607C1.22064 15.342 1.60218 15.5 2 15.5H20C20.3978 15.5 20.7794 15.342 21.0607 15.0607C21.342 14.7794 21.5 14.3978 21.5 14V2C21.5 1.60218 21.342 1.22064 21.0607 0.93934C20.7794 0.658035 20.3978 0.5 20 0.5ZM18.35 2L11 7.085L3.65 2H18.35ZM2 14V2.6825L10.5725 8.615C10.698 8.7021 10.8472 8.74877 11 8.74877C11.1528 8.74877 11.302 8.7021 11.4275 8.615L20 2.6825V14H2Z" fill="white" />
          </svg>

          Контакти
        </h4>
        <p className="user__info__item__text">
          Ви можете вказати свій номер телефону
        </p>

        <form className="user__info__item__form">
          <Input
            value={phone}
            setValue={setPhone}
            placeholder="Телефон"
            errorText="Номер повинен містити 10 цифр"
            regExp={regExps.phone}
          />
          {/* <input type="tel" className="user__info__item__input" placeholder="Телефон" /> */}
        </form>
      </div>

      <div className="user__info__buttons">
        <button
          type="button"
          className={classNames(
            'user__info__button',
            { 'is-loading': loadingSendData },
            { 'is-disable': +birthday.split('-')[0] > 2005 },
          )}
          disabled={+birthday.split('-')[0] > 2005}
          onClick={() => {
            if (user) {
              setloadingSendData(true);
              setNewUserData(user.id, name, lastName, phone, birthday).then((userInfo) => {
                dispatch(userActions.set(userInfo));
              }).finally(() => {
                // dispatch(userActions.set());
                setloadingSendData(false);
              });
            }
          }}
        >
          Зберегти
        </button>
        <button
          type="button"
          className="user__info__logout"
          onClick={() => {
            localStorage.removeItem('user');
            dispatch(userActions.remove());
          }}
        >
          <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.8002 0.600098C1.37585 0.600098 0.968883 0.768669 0.668824 1.06873C0.368766 1.36878 0.200195 1.77575 0.200195 2.2001V19.8001C0.200195 20.2244 0.368766 20.6314 0.668824 20.9315C0.968883 21.2315 1.37585 21.4001 1.8002 21.4001H13.8002C14.0124 21.4001 14.2159 21.3158 14.3659 21.1658C14.5159 21.0158 14.6002 20.8123 14.6002 20.6001C14.6002 20.3879 14.5159 20.1844 14.3659 20.0344C14.2159 19.8844 14.0124 19.8001 13.8002 19.8001H1.8002V2.2001H13.8002C14.0124 2.2001 14.2159 2.11581 14.3659 1.96578C14.5159 1.81575 14.6002 1.61227 14.6002 1.4001C14.6002 1.18792 14.5159 0.984441 14.3659 0.834412C14.2159 0.684383 14.0124 0.600098 13.8002 0.600098H1.8002ZM17.1666 6.8337C17.0164 6.68348 16.8126 6.59909 16.6002 6.59909C16.3878 6.59909 16.184 6.68348 16.0338 6.8337C15.8836 6.98392 15.7992 7.18766 15.7992 7.4001C15.7992 7.61254 15.8836 7.81628 16.0338 7.9665L18.269 10.2001H7.4002C7.18802 10.2001 6.98454 10.2844 6.83451 10.4344C6.68448 10.5844 6.6002 10.7879 6.6002 11.0001C6.6002 11.2123 6.68448 11.4158 6.83451 11.5658C6.98454 11.7158 7.18802 11.8001 7.4002 11.8001H18.269L16.0338 14.0337C15.8836 14.1839 15.7992 14.3877 15.7992 14.6001C15.7992 14.8125 15.8836 15.0163 16.0338 15.1665C16.184 15.3167 16.3878 15.4011 16.6002 15.4011C16.8126 15.4011 17.0164 15.3167 17.1666 15.1665L20.7666 11.5665C20.8411 11.4922 20.9002 11.4039 20.9405 11.3067C20.9809 11.2095 21.0016 11.1053 21.0016 11.0001C21.0016 10.8949 20.9809 10.7907 20.9405 10.6935C20.9002 10.5963 20.8411 10.508 20.7666 10.4337L17.1666 6.8337Z" fill="#C22E39" />
          </svg>
          Вихід

        </button>
      </div>
    </div>
  ) : (<LoaderItems />);
};

type ToggleChecboxType = {
  numberChecbox: number;
};

const ToggleChecbox: React.FC<ToggleChecboxType> = ({ numberChecbox }) => {
  const activeChecboxesUser = JSON.parse(localStorage.getItem('checboxValues') || '[]');
  const [isAactive, setisAactive] = useState<boolean>(activeChecboxesUser.includes(numberChecbox));
  const setactiveChecboxesUser = (number: number) => {
    if (!isAactive) {
      localStorage.setItem('checboxValues', JSON.stringify([...activeChecboxesUser, number]));
    } else {
      localStorage.setItem('checboxValues', JSON.stringify(activeChecboxesUser.filter((item: number) => item !== number)));
    }
  };

  console.log(activeChecboxesUser);

  return (
    <button
      type="button"
      className={classNames(
        'toggle-checbox',
        { 'toggle-checbox--active': isAactive },
      )}
      onClick={() => {
        setisAactive(prev => !prev);
        setactiveChecboxesUser(numberChecbox);
      }}
    >
      <div
        className={classNames(
          'toggle-checbox__item',
          { 'toggle-checbox__item--active': isAactive },
        )}
      >
      </div>
    </button>
  );
};

const Mailings = () => {
  return (
    <div className="user__info">
      <h3 className="user__info__title">Розсилки</h3>
      <p className="user__info__text">
        Ми
        {" обов'язково "}
        повідомлятимемо вас про важливі зміни, а теми сповіщень ви можете вибрати самостійно.
      </p>

      <div className="user__info__item user__info__item--mailings">
        <h4 className="user__info__item__title">
          Акції та знижки
        </h4>
        <div className="user__info__item__checbox">
          <ToggleChecbox numberChecbox={0} />
        </div>
        <p className="user__info__item__text">
          Ми регулярно проводимо акції та спецпропозиції,
          що допоможуть вам зекономити на покупках та зроблять ваш шопінг ще приємнішим.
        </p>
        <div className="user__info__item__line"></div>

      </div>
      <div className="user__info__item user__info__item--mailings">
        <h4 className="user__info__item__title">
          Персональні рекомендації
        </h4>
        <div className="user__info__item__checbox">
          <ToggleChecbox numberChecbox={1} />
        </div>
        <p className="user__info__item__text">
          Ми вже знаємо, що ви шукаєте на сайті та поділяємо
          ваш смак. На основі попередніх замовлень ми пропонуємо
          напої, які ви ще не спробували, але які точно вам сподобаються!
        </p>

      </div>

      <div className="user__info__buttons user__info__buttons--mailings">
        <h3 className="user__info__buttons__title">Канали комунікації</h3>
        <button type="button" className="user__info__button--mailings">
          E-mail листи
          <ToggleChecbox numberChecbox={2} />
        </button>
        <button type="button" className="user__info__button--mailings">
          SMS повідомлення
          <ToggleChecbox numberChecbox={3} />
        </button>
      </div>
    </div>
  );
};

type OrderType = {
  order: OrdersGet
};

const Order: React.FC<OrderType> = ({ order }) => {
  const [orenOrder, setorenOrder] = useState(false);
  const [closeOrder, setcloseOrder] = useState(false);
  const {
    id,
    orderDate,
    firstName,
    lastName,
    orderStatus,
    town,
    address,
    phone,
    paymentTypeId,
    orderDetails,
    deliveryTypeId,
  } = order;

  console.log(orderStatus);

  return (
    <>
      <div className={classNames(
        'user__info__item',
        'user__info__item--order',
        { 'user__info__item--open': orenOrder },
        { 'user__info__item--close': closeOrder },
      )}
      >
        <div className="user__info__item__order-number">
          <h3 className="user__info__item__oredr-number__title">
            №
            {' '}
            {id}
            {' '}
            від
            {' '}
            {orderDate.slice(0, 10)}
          </h3>
          <h3 className="user__info__item__oredr-number__title">
            Сума замовлення
          </h3>
          <p>
            {orderStatus ? 'Замовлення виконано' : 'Замовлення в обробці'}
          </p>
          <p>
            {orderDetails.reduce((sum: number, item) => (sum + item.price), 0)}
            {' '}
            ₴
          </p>
        </div>
        <div className="user__info__item__order__line"></div>
        <button
          type="button"
          className="user__info__item__order__button"
          onClick={() => {
            if (orenOrder) {
              setcloseOrder(prev => !prev);
              setorenOrder(prev => !prev);

              setTimeout(() => setcloseOrder(prev => !prev), 1000);

              return;
            }

            setorenOrder(prev => !prev);
          }}
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.1 0.900001L0 3L9 12L18 3L15.9 0.900001L9 7.8L2.1 0.900001Z"
              fill="#C8AE8E"
            />
          </svg>
        </button>
        <div className="user__info__item__order__user-info">
          <div className="user__info__item__order__user-info__item">
            <h5 className="user__info__item__order__user-info__item__title">
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-inside-1_869_4500" fill="white">
                  <path d="M4.99967 6.66634C4.55765 6.66634 4.13372 6.49075 3.82116 6.17819C3.5086 5.86562 3.33301 5.4417 3.33301 4.99967C3.33301 4.55765 3.5086 4.13372 3.82116 3.82116C4.13372 3.5086 4.55765 3.33301 4.99967 3.33301C5.4417 3.33301 5.86562 3.5086 6.17819 3.82116C6.49075 4.13372 6.66634 4.55765 6.66634 4.99967C6.66634 5.21854 6.62323 5.43527 6.53947 5.63748C6.45572 5.83969 6.33295 6.02342 6.17819 6.17819C6.02342 6.33295 5.83969 6.45572 5.63748 6.53947C5.43527 6.62323 5.21854 6.66634 4.99967 6.66634ZM4.99967 0.333008C3.762 0.333008 2.57501 0.824673 1.69984 1.69984C0.824673 2.57501 0.333008 3.762 0.333008 4.99967C0.333008 8.49967 4.99967 13.6663 4.99967 13.6663C4.99967 13.6663 9.66634 8.49967 9.66634 4.99967C9.66634 3.762 9.17467 2.57501 8.29951 1.69984C7.42434 0.824673 6.23735 0.333008 4.99967 0.333008Z" />
                </mask>
                <path d="M4.99967 3.33301V2.33301V3.33301ZM0.333008 4.99967H-0.666992H0.333008ZM4.99967 13.6663L4.25757 14.3366L4.99967 15.1582L5.74178 14.3366L4.99967 13.6663ZM4.99967 5.66634C4.82286 5.66634 4.65329 5.5961 4.52827 5.47108L3.11406 6.88529C3.61415 7.38539 4.29243 7.66634 4.99967 7.66634V5.66634ZM4.52827 5.47108C4.40325 5.34605 4.33301 5.17649 4.33301 4.99967H2.33301C2.33301 5.70692 2.61396 6.3852 3.11406 6.88529L4.52827 5.47108ZM4.33301 4.99967C4.33301 4.82286 4.40325 4.65329 4.52827 4.52827L3.11406 3.11406C2.61396 3.61415 2.33301 4.29243 2.33301 4.99967H4.33301ZM4.52827 4.52827C4.65329 4.40325 4.82286 4.33301 4.99967 4.33301V2.33301C4.29243 2.33301 3.61415 2.61396 3.11406 3.11406L4.52827 4.52827ZM4.99967 4.33301C5.17649 4.33301 5.34605 4.40325 5.47108 4.52827L6.88529 3.11406C6.3852 2.61396 5.70692 2.33301 4.99967 2.33301V4.33301ZM5.47108 4.52827C5.5961 4.65329 5.66634 4.82286 5.66634 4.99967H7.66634C7.66634 4.29243 7.38539 3.61415 6.88529 3.11406L5.47108 4.52827ZM5.66634 4.99967C5.66634 5.08722 5.6491 5.17391 5.61559 5.2548L7.46335 6.02016C7.59737 5.69663 7.66634 5.34987 7.66634 4.99967H5.66634ZM5.61559 5.2548C5.58209 5.33568 5.53298 5.40917 5.47108 5.47108L6.88529 6.88529C7.13291 6.63767 7.32934 6.3437 7.46335 6.02016L5.61559 5.2548ZM5.47108 5.47108C5.40917 5.53298 5.33568 5.58209 5.2548 5.61559L6.02016 7.46335C6.3437 7.32934 6.63767 7.13291 6.88529 6.88529L5.47108 5.47108ZM5.2548 5.61559C5.17391 5.6491 5.08722 5.66634 4.99967 5.66634V7.66634C5.34987 7.66634 5.69663 7.59737 6.02016 7.46335L5.2548 5.61559ZM4.99967 -0.666992C3.49678 -0.666992 2.05544 -0.0699702 0.992736 0.992736L2.40695 2.40695C3.09458 1.71932 4.02721 1.33301 4.99967 1.33301V-0.666992ZM0.992736 0.992736C-0.0699702 2.05544 -0.666992 3.49678 -0.666992 4.99967H1.33301C1.33301 4.02721 1.71932 3.09458 2.40695 2.40695L0.992736 0.992736ZM-0.666992 4.99967C-0.666992 6.07701 -0.313598 7.20539 0.149571 8.23925C0.618611 9.28621 1.23516 10.3122 1.83738 11.2048C2.44151 12.1002 3.04366 12.8796 3.49405 13.4345C3.71968 13.7125 3.90833 13.9356 4.04154 14.0902C4.10818 14.1676 4.16102 14.2279 4.19777 14.2695C4.21615 14.2903 4.23051 14.3064 4.24057 14.3177C4.2456 14.3233 4.24956 14.3277 4.2524 14.3309C4.25383 14.3325 4.25497 14.3337 4.25583 14.3347C4.25627 14.3352 4.25663 14.3356 4.25692 14.3359C4.25706 14.3361 4.25723 14.3362 4.2573 14.3363C4.25744 14.3365 4.25757 14.3366 4.99967 13.6663C5.74178 12.9961 5.74187 12.9962 5.74194 12.9962C5.74195 12.9962 5.742 12.9963 5.74201 12.9963C5.74201 12.9963 5.74195 12.9962 5.74181 12.9961C5.74155 12.9958 5.741 12.9952 5.74018 12.9943C5.73854 12.9924 5.7358 12.9894 5.732 12.9851C5.7244 12.9766 5.71256 12.9633 5.69676 12.9454C5.66515 12.9097 5.61773 12.8556 5.55676 12.7848C5.43477 12.6432 5.25883 12.4352 5.04697 12.1742C4.62235 11.651 4.05784 10.92 3.49531 10.0862C2.93085 9.24961 2.38074 8.32772 1.97478 7.42156C1.56295 6.50229 1.33301 5.67234 1.33301 4.99967H-0.666992ZM4.99967 13.6663C5.74178 14.3366 5.74191 14.3365 5.74205 14.3363C5.74212 14.3362 5.74229 14.3361 5.74243 14.3359C5.74272 14.3356 5.74308 14.3352 5.74351 14.3347C5.74438 14.3337 5.74552 14.3325 5.74694 14.3309C5.74979 14.3277 5.75374 14.3233 5.75877 14.3177C5.76883 14.3064 5.7832 14.2903 5.80158 14.2695C5.83833 14.2279 5.89117 14.1676 5.9578 14.0902C6.09102 13.9356 6.27966 13.7125 6.5053 13.4345C6.95568 12.8796 7.55784 12.1002 8.16197 11.2048C8.76419 10.3122 9.38074 9.28621 9.84978 8.23925C10.3129 7.20539 10.6663 6.07701 10.6663 4.99967H8.66634C8.66634 5.67234 8.4364 6.50229 8.02457 7.42156C7.61861 8.32772 7.06849 9.24961 6.50404 10.0862C5.94151 10.92 5.377 11.651 4.95238 12.1742C4.74052 12.4352 4.56458 12.6432 4.44259 12.7848C4.38162 12.8556 4.3342 12.9097 4.30259 12.9454C4.28679 12.9633 4.27495 12.9766 4.26735 12.9851C4.26355 12.9894 4.26081 12.9924 4.25917 12.9943C4.25835 12.9952 4.2578 12.9958 4.25753 12.9961C4.2574 12.9962 4.25734 12.9963 4.25734 12.9963C4.25735 12.9963 4.2574 12.9962 4.2574 12.9962C4.25748 12.9962 4.25757 12.9961 4.99967 13.6663ZM10.6663 4.99967C10.6663 3.49678 10.0693 2.05544 9.00661 0.992736L7.5924 2.40695C8.28003 3.09458 8.66634 4.02721 8.66634 4.99967H10.6663ZM9.00661 0.992736C7.94391 -0.0699702 6.50257 -0.666992 4.99967 -0.666992V1.33301C5.97213 1.33301 6.90477 1.71932 7.5924 2.40695L9.00661 0.992736Z" fill="white" mask="url(#path-1-inside-1_869_4500)" />
              </svg>
              Адреса доставки
            </h5>
            <p>
              {deliveryTypeId === 1 && 'Самовивіз'}
              {deliveryTypeId === 2 && `${town}, ${address}`}
              {deliveryTypeId === 3 && `${town}, ${address}`}
            </p>
          </div>
          <div className="user__info__item__order__user-info__item">
            <h5 className="user__info__item__order__user-info__item__title">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 3C8.5 4.38136 7.38136 5.5 6 5.5C4.61864 5.5 3.5 4.38136 3.5 3C3.5 1.61864 4.61864 0.5 6 0.5C7.38136 0.5 8.5 1.61864 8.5 3ZM0.5 10.5C0.5 10.1849 0.65388 9.87188 0.995012 9.55704C1.33954 9.23906 1.84067 8.95411 2.435 8.71602C3.62446 8.23952 5.06125 8 6 8C6.93875 8 8.37554 8.23952 9.565 8.71602C10.1593 8.95411 10.6605 9.23906 11.005 9.55704C11.3461 9.87188 11.5 10.1849 11.5 10.5V11.25C11.5 11.3864 11.3864 11.5 11.25 11.5H0.75C0.613642 11.5 0.5 11.3864 0.5 11.25V10.5Z" stroke="white" />
              </svg>
              Отримувач
            </h5>
            <p>
              {`${firstName} ${lastName}`}
              <br />
              {phone}
            </p>
          </div>
          <div className="user__info__item__order__user-info__item">
            <h5 className="user__info__item__order__user-info__item__title">
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.66699 0C2.13656 0 1.62785 0.210714 1.25278 0.585787C0.877706 0.960859 0.666992 1.46957 0.666992 2V10.6667C0.666992 11.1971 0.877706 11.7058 1.25278 12.0809C1.62785 12.456 2.13656 12.6667 2.66699 12.6667H11.3337C11.8641 12.6667 12.3728 12.456 12.7479 12.0809C13.1229 11.7058 13.3337 11.1971 13.3337 10.6667V9.48667C13.7537 9.10667 14.0003 8.56667 14.0003 8V4.66667C14.0003 4.1 13.7537 3.56 13.3337 3.18V2C13.3337 1.46957 13.1229 0.960859 12.7479 0.585787C12.3728 0.210714 11.8641 0 11.3337 0H2.66699ZM2.66699 0.666667H11.3337C11.6873 0.666667 12.0264 0.807142 12.2765 1.05719C12.5265 1.30724 12.667 1.64638 12.667 2V2.78C12.4537 2.70667 12.227 2.66667 12.0003 2.66667H8.00033C7.46989 2.66667 6.96118 2.87738 6.58611 3.25245C6.21104 3.62753 6.00033 4.13623 6.00033 4.66667V8C6.00033 8.53043 6.21104 9.03914 6.58611 9.41421C6.96118 9.78929 7.46989 10 8.00033 10H12.0003C12.227 10 12.4537 9.96 12.667 9.88667V10.6667C12.667 11.0203 12.5265 11.3594 12.2765 11.6095C12.0264 11.8595 11.6873 12 11.3337 12H2.66699C2.31337 12 1.97423 11.8595 1.72418 11.6095C1.47413 11.3594 1.33366 11.0203 1.33366 10.6667V2C1.33366 1.64638 1.47413 1.30724 1.72418 1.05719C1.97423 0.807142 2.31337 0.666667 2.66699 0.666667ZM8.00033 3.33333H12.0003C12.3539 3.33333 12.6931 3.47381 12.9431 3.72386C13.1932 3.97391 13.3337 4.31305 13.3337 4.66667V8C13.3337 8.35362 13.1932 8.69276 12.9431 8.94281C12.6931 9.19286 12.3539 9.33333 12.0003 9.33333H8.00033C7.6467 9.33333 7.30756 9.19286 7.05752 8.94281C6.80747 8.69276 6.66699 8.35362 6.66699 8V4.66667C6.66699 4.31305 6.80747 3.97391 7.05752 3.72386C7.30756 3.47381 7.6467 3.33333 8.00033 3.33333ZM9.66699 4.66667C9.22496 4.66667 8.80104 4.84226 8.48848 5.15482C8.17592 5.46738 8.00033 5.89131 8.00033 6.33333C8.00033 6.77536 8.17592 7.19928 8.48848 7.51184C8.80104 7.82441 9.22496 8 9.66699 8C10.109 8 10.5329 7.82441 10.8455 7.51184C11.1581 7.19928 11.3337 6.77536 11.3337 6.33333C11.3337 5.89131 11.1581 5.46738 10.8455 5.15482C10.5329 4.84226 10.109 4.66667 9.66699 4.66667ZM9.66699 5.33333C9.93221 5.33333 10.1866 5.43869 10.3741 5.62623C10.5616 5.81376 10.667 6.06812 10.667 6.33333C10.667 6.59855 10.5616 6.8529 10.3741 7.04044C10.1866 7.22798 9.93221 7.33333 9.66699 7.33333C9.40178 7.33333 9.14742 7.22798 8.95988 7.04044C8.77235 6.8529 8.66699 6.59855 8.66699 6.33333C8.66699 6.06812 8.77235 5.81376 8.95988 5.62623C9.14742 5.43869 9.40178 5.33333 9.66699 5.33333Z" fill="white" />
              </svg>

              Оплата
            </h5>
            <p>
              {paymentTypeId === 1 ? 'Карткою онлайн' : 'Готівкою при отриманні'}
            </p>
          </div>
          <div className="user__info__item__order__user-info__item">
            <h5 className="user__info__item__order__user-info__item__title">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.50033 7.08366V12.7503M8.50033 4.25033V5.66699M8.50033 15.5837C12.4125 15.5837 15.5837 12.4125 15.5837 8.50033C15.5837 4.5882 12.4125 1.41699 8.50033 1.41699C4.5882 1.41699 1.41699 4.5882 1.41699 8.50033C1.41699 12.4125 4.5882 15.5837 8.50033 15.5837Z" stroke="white" />
              </svg>
              Статус оплати
            </h5>
            <p>
              {orderStatus ? 'Сплачено' : 'Не оплачено'}
            </p>
          </div>
        </div>
        <div className="user__info__item__order__user-wines">
          {orderDetails.map(orderWines => {
            const { wine, quantity, price } = orderWines;
            const { id: wineId, name } = wine;

            return (
              <>
                <div key={wineId} className="user__info__item__order__user-wine">
                  <img src={`./img/${wineId}.png`} alt="" className="user__info__item__order__user-wine__img" />

                  <div className="user__info__item__order__user-wine__info">
                    <h4 className="user__info__item__order__user-wine__info__name">
                      {name}
                    </h4>
                    <h4 className="user__info__item__order__user-wine__info__item">
                      {quantity}
                      {' '}
                      шт.
                    </h4>
                    <h4 className="user__info__item__order__user-wine__info__item">
                      {price}
                      {' '}
                      ₴
                    </h4>
                  </div>
                </div>
                <div className="user__info__item__order__line"></div>
              </>
            );
          })}

          <div className="user__info__item__order__user-wines__info">
            <div className="user__info__item__order__user-wines__info__item">
              {orderDetails.reduce((sum, wineItem) => +sum + +wineItem.quantity, 0)}
              {' '}
              {orderDetails.reduce((sum, wineItem) => +sum + +wineItem.quantity, 0) > 1 ? 'товарів' : 'товар'}
              {' '}
              на суму
            </div>
            {orderDetails.reduce((sum: number, item) => (sum + item.price), 0)}
          </div>
          <div className="user__info__item__order__user-wines__info">
            <div className="user__info__item__order__user-wines__info__item">
              Вартість доставки
            </div>
            {paymentTypeId === 3 ? 'За тарифами Нової Пошти' : 'За тарифами'}
          </div>
          <div className="user__info__item__order__line"></div>
          <div className="user__info__item__order__user-wines__info">
            <div className="user__info__item__order__user-wines__info__item">
              До сплати
            </div>
            <p className="user__info__item__order__user-wines__info__price">
              {orderDetails.reduce((sum: number, item) => (sum + item.price), 0)}
              {' '}
              ₴
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const UserOrders = () => {
  const [orders, setOrders] = useState<OrdersGet[]>([]);
  const { user } = useAppSelector(state => state.user);
  const [loadingOrders, setloadingOrders] = useState(false);

  useEffect(() => {
    if (orders.length === 0 && user) {
      getUserOrder(user.email).then((ordersInserver) => {
        setloadingOrders(true);
        setOrders(ordersInserver);
      });
    }
  }, []);

  return loadingOrders ? (
    <div className="user__info">
      {orders.length > 0
        ? (
          <>
            <h3 className="user__info__title">Мої замовлення</h3>

            {orders.map(item => {
              return (
                <>
                  <Order order={item} />
                </>
              );
            })}
          </>
        )
        : (
          <div className="user__info__item--error">
            <img src="./img/cartError.png" alt="" className="cart__error__img" />
            <h3 className="cart__error__title">
              У вас поки немає замовлень
            </h3>
            <p className="cart__error__text">
              Саме час замовити якісного вина на свій смак
            </p>
            <Link to="/catalog" className="cart__error__button">
              Перейти до каталогу
            </Link>
          </div>
        )}
    </div>
  ) : (<LoaderItems />);
};

const User: React.FunctionComponent = () => {
  const { user, loading } = useAppSelector(state => state.user);

  type OpenNav = 'personalData' | 'mailings' | 'myOrders';
  const [openNav, setOpenNav] = useState<OpenNav>('personalData');

  return (loading && <Loader />) || (user ? (
    <div className="container">
      <Location />
      <section className="user">
        <nav className="user__nav">
          <ul>
            <li>
              <button
                type="button"
                className={classNames(
                  'user__nav__link',
                  { 'user__nav__link--active': openNav === 'personalData' },
                )}
                onClick={() => setOpenNav('personalData')}
              >
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.6738 14.85V17.25H0.75V14.85C0.75 14.3524 0.878958 13.9049 1.13927 13.4908L1.13943 13.4906C1.40237 13.072 1.74495 12.7592 2.17637 12.5403C3.31712 11.9835 4.47216 11.5675 5.64205 11.2903C6.81357 11.0134 8.00313 10.875 9.2119 10.875C10.4207 10.875 11.6102 11.0134 12.7817 11.2903C13.9516 11.5675 15.1067 11.9835 16.2475 12.5403C16.6789 12.7593 17.0214 13.0721 17.2844 13.4906L17.2845 13.4908C17.5448 13.9049 17.6738 14.3524 17.6738 14.85ZM9.2119 8.25C8.14017 8.25 7.24425 7.88534 6.48307 7.14166C5.72242 6.39851 5.35595 5.53128 5.35595 4.5C5.35595 3.46872 5.72242 2.60149 6.48307 1.85834C7.24425 1.11466 8.14017 0.75 9.2119 0.75C10.2836 0.75 11.1795 1.11466 11.9407 1.85834C12.7014 2.60149 13.0678 3.46872 13.0678 4.5C13.0678 5.53128 12.7014 6.39851 11.9407 7.14166C11.1795 7.88534 10.2836 8.25 9.2119 8.25Z" stroke={openNav === 'personalData' ? '#C8AE8E' : '#fff'} strokeWidth="1.5" />
                </svg>

                Особисті дані

              </button>
            </li>
            <li>
              <button
                type="button"
                className={classNames(
                  'user__nav__link',
                  { 'user__nav__link--active': openNav === 'mailings' },
                )}
                onClick={() => setOpenNav('mailings')}
              >
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="path-1-inside-1_692_4062" fill={openNav === 'mailings' ? '#C8AE8E' : '#fff'}>
                    <path d="M16 14.5714V15.4286H0V14.5714L1.77778 12.8571V7.71429C1.77778 5.05714 3.58222 2.71714 6.22222 1.96286V1.71429C6.22222 1.25963 6.40952 0.823593 6.74292 0.502103C7.07632 0.180612 7.5285 0 8 0C8.4715 0 8.92368 0.180612 9.25708 0.502103C9.59048 0.823593 9.77778 1.25963 9.77778 1.71429V1.96286C12.4178 2.71714 14.2222 5.05714 14.2222 7.71429V12.8571L16 14.5714ZM9.77778 16.2857C9.77778 16.7404 9.59048 17.1764 9.25708 17.4979C8.92368 17.8194 8.4715 18 8 18C7.5285 18 7.07632 17.8194 6.74292 17.4979C6.40952 17.1764 6.22222 16.7404 6.22222 16.2857" />
                  </mask>
                  <path d="M16 14.5714H17.5V13.9341L17.0412 13.4917L16 14.5714ZM16 15.4286V16.9286H17.5V15.4286H16ZM0 15.4286H-1.5V16.9286H0V15.4286ZM0 14.5714L-1.0412 13.4917L-1.5 13.9341V14.5714H0ZM1.77778 12.8571L2.81898 13.9369L3.27778 13.4945V12.8571H1.77778ZM6.22222 1.96286L6.6343 3.40514L7.72222 3.09431V1.96286H6.22222ZM8 0V-1.5V0ZM9.77778 1.96286H8.27778V3.09431L9.3657 3.40514L9.77778 1.96286ZM14.2222 12.8571H12.7222V13.4945L13.181 13.9369L14.2222 12.8571ZM14.5 14.5714V15.4286H17.5V14.5714H14.5ZM16 13.9286H0V16.9286H16V13.9286ZM1.5 15.4286V14.5714H-1.5V15.4286H1.5ZM1.0412 15.6512L2.81898 13.9369L0.736575 11.7774L-1.0412 13.4917L1.0412 15.6512ZM3.27778 12.8571V7.71429H0.277778V12.8571H3.27778ZM3.27778 7.71429C3.27778 5.75512 4.61068 3.98332 6.6343 3.40514L5.81014 0.520571C2.55377 1.45096 0.277778 4.35917 0.277778 7.71429H3.27778ZM7.72222 1.96286V1.71429H4.72222V1.96286H7.72222ZM7.72222 1.71429C7.72222 1.67542 7.73773 1.62661 7.78413 1.58187L5.70172 -0.577664C5.08132 0.0205751 4.72222 0.843837 4.72222 1.71429H7.72222ZM7.78413 1.58187C7.83238 1.53534 7.90908 1.5 8 1.5V-1.5C7.14793 -1.5 6.32026 -1.17412 5.70172 -0.577664L7.78413 1.58187ZM8 1.5C8.09092 1.5 8.16762 1.53534 8.21587 1.58187L10.2983 -0.577664C9.67974 -1.17412 8.85207 -1.5 8 -1.5V1.5ZM8.21587 1.58187C8.26227 1.62661 8.27778 1.67542 8.27778 1.71429H11.2778C11.2778 0.843839 10.9187 0.0205765 10.2983 -0.577664L8.21587 1.58187ZM8.27778 1.71429V1.96286H11.2778V1.71429H8.27778ZM9.3657 3.40514C11.3893 3.98332 12.7222 5.75512 12.7222 7.71429H15.7222C15.7222 4.35917 13.4462 1.45096 10.1899 0.520571L9.3657 3.40514ZM12.7222 7.71429V12.8571H15.7222V7.71429H12.7222ZM13.181 13.9369L14.9588 15.6512L17.0412 13.4917L15.2634 11.7774L13.181 13.9369ZM8.27778 16.2857C8.27778 16.3246 8.26227 16.3734 8.21587 16.4181L10.2983 18.5777C10.9187 17.9794 11.2778 17.1562 11.2778 16.2857H8.27778ZM8.21587 16.4181C8.16762 16.4647 8.09091 16.5 8 16.5V19.5C8.85208 19.5 9.67974 19.1741 10.2983 18.5777L8.21587 16.4181ZM8 16.5C7.90909 16.5 7.83238 16.4647 7.78413 16.4181L5.70172 18.5777C6.32026 19.1741 7.14792 19.5 8 19.5V16.5ZM7.78413 16.4181C7.73772 16.3734 7.72222 16.3246 7.72222 16.2857H4.72222C4.72222 17.1562 5.08132 17.9794 5.70172 18.5777L7.78413 16.4181Z" fill={openNav === 'mailings' ? '#C8AE8E' : '#fff'} mask="url(#path-1-inside-1_692_4062)" />
                </svg>

                Розсилки

              </button>
            </li>
            <li>
              <button
                type="button"
                className={classNames(
                  'user__nav__link',
                  { 'user__nav__link--active': openNav === 'myOrders' },
                )}
                onClick={() => setOpenNav('myOrders')}
              >
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 13.05C16 13.392 15.8133 13.689 15.5289 13.842L8.50667 17.838C8.36445 17.946 8.18667 18 8 18C7.81334 18 7.63556 17.946 7.49334 17.838L0.471114 13.842C0.328607 13.7662 0.209347 13.6523 0.126291 13.5126C0.0432338 13.373 -0.000443707 13.213 3.39844e-06 13.05V4.95C3.39844e-06 4.608 0.18667 4.311 0.471114 4.158L7.49334 0.162C7.63556 0.0540001 7.81334 0 8 0C8.18667 0 8.36445 0.0540001 8.50667 0.162L15.5289 4.158C15.8133 4.311 16 4.608 16 4.95V13.05ZM8 1.935L2.70222 4.95L8 7.965L13.2978 4.95L8 1.935ZM1.77778 12.519L7.11111 15.561V9.522L1.77778 6.489V12.519ZM14.2222 12.519V6.489L8.88889 9.522V15.561L14.2222 12.519Z" fill={openNav === 'myOrders' ? '#C8AE8E' : '#fff'} />
                </svg>

                Мої замовлення

              </button>
            </li>
          </ul>
        </nav>
        <div className="user__line"></div>
        {openNav === 'personalData' && <PersonalData />}
        {openNav === 'mailings' && <Mailings />}
        {openNav === 'myOrders' && <UserOrders />}
      </section>
    </div>
  ) : (
    <div className="container">
      <section>
        <LoginForm fn={() => {}} loginSelect />
      </section>
    </div>
  ));
};

export default User;

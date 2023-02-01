/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import base64 from 'base-64';
import { sendNewUserInfo, sendLogin } from '../../api/api';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { actions as userActions } from '../../features/store/user';
import { Input } from '../Input';
import { regExps } from '../../utils/regExps';
import { actions as warningActions } from '../../features/store/warning';

interface ModalProps {
  isOpen: boolean,
  setVisibleModalLogin: (newValue: boolean) => void,
}

type LoginFormType = {
  loginSelect: boolean,
  fn: () => void
};

export const LoginForm: React.FC<LoginFormType> = ({
  loginSelect,
  fn,
}) => {
  const dispatch = useAppDispatch();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const [hiddenPassword, sethiddenPassword] = useState(true);

  const setNewUser = useCallback((newUser) => {
    dispatch(userActions.set(newUser));
  }, []);

  return (
    <form action="" className="modal__inputs">
      {!loginSelect ? (
        <Input
          value={name}
          setValue={setname}
          placeholder="Введіть Login"
          regExp={regExps.login}
          errorText="Ти ввів некоректний Login"
        />
      ) : null}

      <Input
        value={email}
        setValue={setemail}
        placeholder="Введіть Email"
        regExp={regExps.email}
        errorText="Ти ввів неправильну електронну адресу"
      />

      <Input
        value={password}
        setValue={setpassword}
        hiddenPassword={hiddenPassword}
        sethiddenPassword={sethiddenPassword}
        placeholder="Введіть Пароль"
        errorText="Не правильно введений Пароль"
      />

      {loginSelect ? (
        <button type="button" className="modal__forgot-password">

        </button>
      ) : null}

      <button
        type="button"
        className="modal__button"
        onClick={(e) => {
          e.preventDefault();
          console.log(1);

          if (email.match(regExps.email)
          && password.length > 7
          ) {
            console.log(2);
            if (loginSelect) {
              sendLogin(email, password)
                .then(userInfo => {
                  localStorage.setItem('user', `${base64.encode(`${email}:${password}`)}`);
                  setNewUser(userInfo);
                  setTimeout(fn, 1000);
                })
                .catch(() => {
                  dispatch(warningActions.set('Неправильно введений Email або Пароль'));
                  setTimeout(() => {
                    dispatch(warningActions.remove());
                  }, 3000);
                });

              return;
            }

            if (name.match(regExps.login)) {
              sendNewUserInfo(name, email, password)
                .then(newUser => {
                  setNewUser(newUser);
                  setTimeout(fn, 1000);
                }).catch(() => {
                  dispatch(warningActions.set('Користувач з таким Email чи Login вже існує'));
                  setTimeout(() => dispatch(warningActions.remove()), 3000);
                });

              return;
            }
          }

          fn();
        }}
      >
        Увійти
      </button>
    </form>
  );
};

export const LogIn: React.FC<ModalProps> = ({
  isOpen,
  setVisibleModalLogin,
}) => {
  const [animationOpen, setAnimationOpen] = useState(false);

  const closeModal = useCallback(() => {
    setAnimationOpen(true);
    setTimeout(() => {
      setVisibleModalLogin(false);
      setAnimationOpen(false);
    }, 400);
  }, []);

  type ModalLoginTypes = 'login' | 'register';
  const [choiseNav, setchoiseNav] = useState<ModalLoginTypes>('login');

  return isOpen ? (
    <div className={classNames(
      'modal',
      { 'modal--close': animationOpen },
    )}
    >
      <div className="modal__item">
        <nav className="modal__item__nav">
          <button
            className={classNames(
              'modal__item__link',
              { 'modal__item__link--active': choiseNav === 'login' },
            )}
            type="button"
            onClick={() => {
              setchoiseNav('login');
            }}
          >
            Вхід
          </button>
          <button
            className={classNames(
              'modal__item__link',
              { 'modal__item__link--active': choiseNav === 'register' },
            )}
            type="button"
            onClick={() => {
              setchoiseNav('register');
            }}
          >
            Реєстрація
          </button>
          <button
            type="button"
            className="modal__item__close"
            onClick={closeModal}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.6 21.5L0.5 19.4L8.9 11L0.5 2.6L2.6 0.5L11 8.9L19.4 0.5L21.5 2.6L13.1 11L21.5 19.4L19.4 21.5L11 13.1L2.6 21.5Z" fill="white" />
            </svg>

          </button>
        </nav>
        <LoginForm fn={closeModal} loginSelect={choiseNav === 'login'} />
      </div>
    </div>
  ) : null;
};

/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getWineInfo } from '../../api/api';
import { ButtonCard } from '../../components/ButtonCard';
import { CounterWines } from '../../components/CounterWines';
import { Input } from '../../components/Input';
import Loader from '../../components/Loader/Loader';
import { Location } from '../../components/Location';
import { Rate } from '../../components/Rate';
import { actions as productsActions } from '../../features/store/products';
import { actions as selectProductActions } from '../../features/store/selectProduct';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { regExps } from '../../utils/regExps';
import ServerError from '../ServerError/ServerError';

const WineInfo: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { selectProduct } = useAppSelector(state => state.selectProduct);
  const { error } = useAppSelector(state => state.products);
  const cart = useAppSelector(state => state.cart);
  const idSelectProduct = useLocation().pathname.split('/');
  const [counter, setCounter] = useState(selectProduct ? selectProduct.counter : 1);
  const [sendingComment, setSendingComment] = useState(false);
  const [ButtonState, setButtonState] = useState(-1);
  const [formError, setFormError] = useState(false);

  const itemInCart = cart.some(item => item.id === (selectProduct && selectProduct.id));
  const [nameInput, setnameInput] = useState('');
  const [emailInput, setemailInput] = useState('');
  const [massegeInput, setmassegeInput] = useState('');

  useEffect(() => {
    getWineInfo(idSelectProduct[idSelectProduct.length - 1])
      .then(([product]) => {
        dispatch(selectProductActions.set({ ...product, counter: 1 }));
      })
      .catch(() => {
        dispatch(productsActions.error());
      });
  }, []);

  return selectProduct ? (
    <div className="container">
      <Location />
      <section className="wineInfo">
        <article className="wineInfo__buy">
          <img src={`./img/${selectProduct.id}.png`} alt="Wine" className="wineInfo__buy__img" />
          <div className="wineInfo__buy__info">
            <h4 className="wineInfo__buy__info__name">
              {selectProduct.name}
              ,
              {' '}
              {selectProduct.volume}
              л
            </h4>
            <Rate stars={selectProduct.rang} />
            <p className="wineInfo__buy__info__color">
              {selectProduct.color.name || 123}
              ,
              {selectProduct.sweetness.name}
            </p>
            <div className="wineInfo__buy__info__countie">
              <img src={`./img/countriesFlag/${selectProduct.country.id}.png`} alt="Flag" className="wineInfo__buy__info__countie__flag" />
              {selectProduct.region.name}
              {'  '}
              |
              {'  '}
              {selectProduct.country.name}
            </div>
            <div className="wineInfo__buy__info__price">
              {selectProduct.price}
              {' '}
              ₴
            </div>
            <div className="wineInfo__buy__info__counter">
              Кількість
              <CounterWines item={selectProduct} counter={counter} setCounter={setCounter} />
            </div>
            <ButtonCard itemInCart={itemInCart} product={selectProduct} />
          </div>
        </article>
        <article className="wineInfo__characteristic">
          <div className="wineInfo__characteristic__item">
            <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.6594 9.31251L13.2219 1.03438C13.1754 0.879337 13.0799 0.743509 12.9498 0.647193C12.8197 0.550878 12.6619 0.499245 12.5 0.500008H3.50002C3.33814 0.499245 3.18036 0.550878 3.05025 0.647193C2.92014 0.743509 2.82469 0.879337 2.77815 1.03438L0.340648 9.31251C0.132782 10.0003 0.182778 10.7402 0.481273 11.3938C1.08314 12.7234 2.0266 13.8698 3.21559 14.7163C4.40458 15.5627 5.79663 16.079 7.25002 16.2125V20H4.25002C4.05111 20 3.86035 20.079 3.71969 20.2197C3.57904 20.3603 3.50002 20.5511 3.50002 20.75C3.50002 20.9489 3.57904 21.1397 3.71969 21.2803C3.86035 21.421 4.05111 21.5 4.25002 21.5H11.75C11.9489 21.5 12.1397 21.421 12.2804 21.2803C12.421 21.1397 12.5 20.9489 12.5 20.75C12.5 20.5511 12.421 20.3603 12.2804 20.2197C12.1397 20.079 11.9489 20 11.75 20H8.75002V16.2125C10.2034 16.079 11.5955 15.5627 12.7845 14.7163C13.9734 13.8698 14.9169 12.7234 15.5188 11.3938C15.8173 10.7402 15.8673 10.0003 15.6594 9.31251ZM8.33752 8.07501C5.88127 6.85626 3.91252 6.85626 2.5344 7.18438L4.06252 2.00001H11.9375L13.8875 8.60938C12.8844 9.03126 10.9813 9.39688 8.33752 8.07501Z" fill="#C8AE8E" />
            </svg>
            <h4 className="wineInfo__characteristic__title">Колір та смак</h4>
            <p className="wineInfo__characteristic__text">
              {selectProduct.description.split('.')[1]}
            </p>
          </div>
          <div className="wineInfo__characteristic__item">
            <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 20C13.7167 20 13.4793 19.904 13.288 19.712C13.096 19.5207 13 19.2833 13 19V12H12C11.45 12 10.9793 11.804 10.588 11.412C10.196 11.0207 10 10.55 10 10V5C10 3.61667 10.4877 2.43767 11.463 1.463C12.4377 0.487667 13.6167 0 15 0V19C15 19.2833 14.904 19.5207 14.712 19.712C14.5207 19.904 14.2833 20 14 20ZM4 20C3.71667 20 3.479 19.904 3.287 19.712C3.09567 19.5207 3 19.2833 3 19V10.85C2.15 10.6167 1.43767 10.15 0.863 9.45C0.287667 8.75 0 7.93333 0 7V1C0 0.716667 0.0956668 0.479 0.287 0.287C0.479 0.0956666 0.716667 0 1 0C1.28333 0 1.521 0.0956666 1.713 0.287C1.90433 0.479 2 0.716667 2 1V7H3V1C3 0.716667 3.09567 0.479 3.287 0.287C3.479 0.0956666 3.71667 0 4 0C4.28333 0 4.521 0.0956666 4.713 0.287C4.90433 0.479 5 0.716667 5 1V7H6V1C6 0.716667 6.096 0.479 6.288 0.287C6.47933 0.0956666 6.71667 0 7 0C7.28333 0 7.521 0.0956666 7.713 0.287C7.90433 0.479 8 0.716667 8 1V7C8 7.93333 7.71233 8.75 7.137 9.45C6.56233 10.15 5.85 10.6167 5 10.85V19C5 19.2833 4.90433 19.5207 4.713 19.712C4.521 19.904 4.28333 20 4 20Z" fill="#C8AE8E" />
            </svg>

            <h4 className="wineInfo__characteristic__title">
              Дегустаційне поєднання
            </h4>
            <p className="wineInfo__characteristic__text">
              Відмінно поєднується з лазаньєю, телятиною, стравами із трюфелем.
            </p>
          </div>
          <div className="wineInfo__characteristic__item">
            <svg width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1665 12.0002C10.1665 13.1918 9.1915 14.1668 7.99984 14.1668C6.80817 14.1668 5.83317 13.1918 5.83317 12.0002C5.83317 10.8085 6.80817 9.8335 7.99984 9.8335C9.1915 9.8335 10.1665 10.8085 10.1665 12.0002ZM2.58317 9.8335C1.3915 9.8335 0.416504 10.8085 0.416504 12.0002C0.416504 13.1918 1.3915 14.1668 2.58317 14.1668C3.77484 14.1668 4.74984 13.1918 4.74984 12.0002C4.74984 10.8085 3.77484 9.8335 2.58317 9.8335ZM13.4165 9.8335C12.2248 9.8335 11.2498 10.8085 11.2498 12.0002C11.2498 13.1918 12.2248 14.1668 13.4165 14.1668C14.6082 14.1668 15.5832 13.1918 15.5832 12.0002C15.5832 10.8085 14.6082 9.8335 13.4165 9.8335ZM10.7082 5.50016C9.5165 5.50016 8.5415 6.47516 8.5415 7.66683C8.5415 8.8585 9.5165 9.8335 10.7082 9.8335C11.8998 9.8335 12.8748 8.8585 12.8748 7.66683C12.8748 6.47516 11.8998 5.50016 10.7082 5.50016ZM5.2915 5.50016C4.09984 5.50016 3.12484 6.47516 3.12484 7.66683C3.12484 8.8585 4.09984 9.8335 5.2915 9.8335C6.48317 9.8335 7.45817 8.8585 7.45817 7.66683C7.45817 6.47516 6.48317 5.50016 5.2915 5.50016ZM10.7082 14.1668C9.5165 14.1668 8.5415 15.1418 8.5415 16.3335C8.5415 17.5252 9.5165 18.5002 10.7082 18.5002C11.8998 18.5002 12.8748 17.5252 12.8748 16.3335C12.8748 15.1418 11.8998 14.1668 10.7082 14.1668ZM5.2915 14.1668C4.09984 14.1668 3.12484 15.1418 3.12484 16.3335C3.12484 17.5252 4.09984 18.5002 5.2915 18.5002C6.48317 18.5002 7.45817 17.5252 7.45817 16.3335C7.45817 15.1418 6.48317 14.1668 5.2915 14.1668ZM7.99984 18.5002C6.80817 18.5002 5.83317 19.4752 5.83317 20.6668C5.83317 21.8585 6.80817 22.8335 7.99984 22.8335C9.1915 22.8335 10.1665 21.8585 10.1665 20.6668C10.1665 19.4752 9.1915 18.5002 7.99984 18.5002ZM10.5998 1.3835L9.73317 0.0834961C7.34984 1.16683 7.13317 5.06683 7.13317 5.50016H8.75817C8.8665 4.6335 9.1915 1.92516 10.5998 1.3835Z" fill="#C8AE8E" />
            </svg>

            <h4 className="wineInfo__characteristic__title">
              Сорт винограду
            </h4>
            <p className="wineInfo__characteristic__text">
              {selectProduct.sort.name}
            </p>
          </div>
          <div className="wineInfo__characteristic__item">
            <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7242 17.4804C11.7242 17.7107 11.5969 17.9106 11.403 18.0136L6.61638 20.7039C6.51944 20.7766 6.39826 20.8129 6.27102 20.8129C6.14378 20.8129 6.0226 20.7766 5.92565 20.7039L1.139 18.0136C1.04186 17.9626 0.960571 17.8859 0.903956 17.7919C0.847341 17.6979 0.817569 17.5902 0.817873 17.4804V12.0273C0.817873 11.7971 0.945113 11.5971 1.139 11.4941L5.92565 8.80389C6.0226 8.73118 6.14378 8.69482 6.27102 8.69482C6.39826 8.69482 6.51944 8.73118 6.61638 8.80389L11.403 11.4941C11.5969 11.5971 11.7242 11.7971 11.7242 12.0273V17.4804ZM6.27102 9.99752L2.65982 12.0273L6.27102 14.0571L9.88221 12.0273L6.27102 9.99752ZM2.02968 17.123L5.66511 19.1709V15.1053L2.02968 13.0634V17.123ZM10.5124 17.123V13.0634L6.87692 15.1053V19.1709L10.5124 17.123Z" fill="#C8AE8E" />
              <path d="M22.0249 17.4804C22.0249 17.7107 21.8977 17.9106 21.7038 18.0136L16.9172 20.7039C16.8202 20.7766 16.699 20.8129 16.5718 20.8129C16.4446 20.8129 16.3234 20.7766 16.2264 20.7039L11.4398 18.0136C11.3426 17.9626 11.2614 17.8859 11.2047 17.7919C11.1481 17.6979 11.1183 17.5902 11.1187 17.4804V12.0273C11.1187 11.7971 11.2459 11.5971 11.4398 11.4941L16.2264 8.80389C16.3234 8.73118 16.4446 8.69482 16.5718 8.69482C16.699 8.69482 16.8202 8.73118 16.9172 8.80389L21.7038 11.4941C21.8977 11.5971 22.0249 11.7971 22.0249 12.0273V17.4804ZM16.5718 9.99752L12.9606 12.0273L16.5718 14.0571L20.183 12.0273L16.5718 9.99752ZM12.3305 17.123L15.9659 19.1709V15.1053L12.3305 13.0634V17.123ZM20.8131 17.123V13.0634L17.1777 15.1053V19.1709L20.8131 17.123Z" fill="#C8AE8E" />
              <path d="M16.6215 9.08905L16.6112 9.09486L11.8245 11.7851L11.7958 11.8012L11.7695 11.821C11.7693 11.8211 11.7665 11.8232 11.7594 11.8254C11.7521 11.8277 11.7403 11.83 11.7241 11.83C11.7079 11.83 11.6962 11.8277 11.6889 11.8254C11.6818 11.8232 11.679 11.8211 11.6788 11.821L11.6524 11.8012L11.6238 11.7851L6.8371 9.09486L6.8372 9.09468L6.82472 9.08812C6.80847 9.07958 6.79487 9.06676 6.7854 9.05103L6.35708 9.30899L6.7854 9.05103C6.77593 9.03531 6.77095 9.01728 6.771 8.99893V8.99754V3.54439C6.771 3.50501 6.79086 3.4718 6.82671 3.45275L6.82677 3.45288L6.8371 3.44707L11.6238 0.756853L11.6524 0.740726L11.6788 0.720977C11.679 0.720831 11.6818 0.718752 11.6889 0.71653C11.6962 0.714244 11.7079 0.711914 11.7241 0.711914C11.7403 0.711914 11.7521 0.714244 11.7594 0.71653C11.7665 0.718752 11.7693 0.720831 11.7695 0.720977L11.7958 0.740726L11.8245 0.756853L16.6112 3.44707L16.6111 3.44719L16.6216 3.45275C16.6574 3.4718 16.6773 3.50501 16.6773 3.54439V8.99754C16.6773 9.03692 16.6574 9.07013 16.6216 9.08917L16.6215 9.08905ZM11.9691 1.07874L11.7241 0.941039L11.4792 1.07874L7.86796 3.10853L7.09251 3.54439L7.86796 3.98026L11.4792 6.01004L11.7241 6.14774L11.9691 6.01004L15.5803 3.98026L16.3558 3.54439L15.5803 3.10853L11.9691 1.07874ZM6.98281 8.64005V8.93226L7.2374 9.07569L10.8728 11.1236L11.6182 11.5436V10.688V6.62239V6.32975L11.3631 6.18645L7.72766 4.14455L6.98281 3.72619V4.58049V8.64005ZM16.2109 9.07569L16.4655 8.93226V8.64005V4.58049V3.72619L15.7206 4.14455L12.0852 6.18645L11.83 6.32975V6.62239V10.688V11.5436L12.5755 11.1236L16.2109 9.07569Z" stroke="#C8AE8E" />
            </svg>

            <h4 className="wineInfo__characteristic__title">
              Солодкість
            </h4>
            <p className="wineInfo__characteristic__text">
              {selectProduct.sweetness.name}
            </p>
          </div>
          <div className="wineInfo__characteristic__item">
            <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="21" y="7" width="5.11106" height="0.851843" fill="#C8AE8E" />
              <rect x="22.9927" y="9.55957" width="2.51717" height="0.961124" transform="rotate(-90.2558 22.9927 9.55957)" fill="#C8AE8E" />
              <rect x="20.5322" y="10.5137" width="4.04625" height="4.31245" fill="#C8AE8E" />
              <path d="M26.4678 13.8813C25.8843 13.7457 27.2723 13.3606 27.2723 13.3606L28.0168 14.5109L27.2123 15.0316C27.0906 14.4693 27.0512 14.0169 26.4678 13.8813Z" fill="#C8AE8E" />
              <rect x="27.1577" y="13.937" width="2.55553" height="3.03469" fill="#C8AE8E" />
              <path d="M25.5605 13.937L25.5605 11.3815L27.3175 11.3815L27.3175 13.937L25.5605 13.937Z" fill="#C8AE8E" />
              <path d="M26.0457 12.7966C25.9414 11.4265 26.9323 11.1988 28.0836 11.5283C29.235 11.8578 29.74 12.4666 29.7084 14.139L27.6704 15.4073C27.7543 14.0327 26.1499 14.1667 26.0457 12.7966Z" fill="#C8AE8E" />
              <path d="M7.278 4H16.722C17.1148 4.00012 17.4988 4.11588 17.8262 4.33284C18.1536 4.5498 18.4098 4.85835 18.563 5.22C19.521 7.48 20 9.74 20 12C20 14.26 19.521 16.52 18.563 18.78C18.4098 19.1417 18.1536 19.4502 17.8262 19.6672C17.4988 19.8841 17.1148 19.9999 16.722 20H7.278C6.88525 19.9999 6.50122 19.8841 6.17383 19.6672C5.84644 19.4502 5.59017 19.1417 5.437 18.78C4.479 16.52 4 14.26 4 12C4 9.74 4.479 7.48 5.437 5.22C5.59017 4.85835 5.84644 4.5498 6.17383 4.33284C6.50122 4.11588 6.88525 4.00012 7.278 4V4Z" stroke="#C8AE8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 4C14.667 6.667 15 9.333 15 12C15 14.667 14.667 17.333 14 20M10 4C9.333 6.667 9 9.333 9 12C9 14.667 9.333 17.333 10 20M4.5 16H19.5M19.5 8H4.5" stroke="#C8AE8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <h4 className="wineInfo__characteristic__title">
              Рік розливу
            </h4>
            <p className="wineInfo__characteristic__text">
              {selectProduct.year}
            </p>
          </div>
        </article>
        <article className="wineInfo__description">
          <h3 className="wineInfo__description__title">Опис</h3>

          <p className="wineInfo__description__text">
            {selectProduct.description}
          </p>

        </article>
        <article className="wineInfo__description">
          <h3 className="wineInfo__description__title">Інформація про регіон</h3>

          <p className="wineInfo__description__text">
            {selectProduct.region?.description}
          </p>

        </article>
        <div className="wineInfo__line"></div>
        <article className="wineInfo__delivery">
          <h3 className="wineInfo__description__title">Доставка</h3>

          <ul>
            <li className="wineInfo__delivery__item">

              Безкоштовна Доставка по Києву при замовленні на суму від 1000 грн.
            </li>
            <li className="wineInfo__delivery__item">
              Доставка по Україні (до 2-х днів, для замовлень до 17:00) - 200 грн.
            </li>
            <li className="wineInfo__delivery__item">
              Безкоштовна Доставка по Україні (Нова Пошта) при замовленні на суму від 2 500 грн.
            </li>
            <li className="wineInfo__delivery__item">
              Доставка по України до відділення
              Нової Пошти (вартість згідно тарифів НП - від 75 грн.)
            </li>
          </ul>

          <h3 className="wineInfo__description__title wineInfo__description__title--last">Оплата</h3>

          <ul>
            <li className="wineInfo__delivery__item">
              Visa / MasterCard
            </li>
            <li className="wineInfo__delivery__item">
              Готівкою при отриманні
            </li>
          </ul>
        </article>

        <article className="wineInfo__form">
          <h3 className="wineInfo__description__title">Новий відгук або коментар</h3>
          <form
            action=""
            className={classNames(
              { 'ordering__contact-data--error': formError },
            )}
          >
            <Input
              value={nameInput}
              setValue={setnameInput}
              placeholder="Введіть ім’я"
              errorText="Введіть коректне ім'я"
              regExp={regExps.firstName}
            />
            <Input
              value={emailInput}
              setValue={setemailInput}
              placeholder="Введіть ваш email"
              errorText="Введіть коректний email"
              regExp={regExps.email}
            />
            <textarea
              value={massegeInput}
              onChange={(e) => setmassegeInput(e.target.value)}
              className="wineInfo__form__textarea"
              placeholder="Повідомлення"
            />
          </form>
          <div className="wineInfo__form__rate">
            Оцініть будь-ласка товар
            <Rate stars={-1} />
          </div>
          <button
            type="button"
            className={classNames(
              'wineInfo__form__button',
              { 'is-error': ButtonState === 0 },
              { 'is-save': ButtonState === 1 },
              { 'is-loading': sendingComment },
            )}
            onClick={() => {
              if (emailInput.match(regExps.email)
              && nameInput.match(regExps.firstName)
              && massegeInput.length > 0) {
                setSendingComment(true);

                setTimeout(() => {
                  setnameInput('');
                  setmassegeInput('');
                  setemailInput('');
                  setSendingComment(false);
                  setButtonState(1);
                  setTimeout(() => {
                    setButtonState(-1);
                  }, 1000);
                }, 1000);
              } else {
                setFormError(true);
                setTimeout(() => setFormError(false), 500);
              }
            }}
          >
            Надіслати
          </button>
        </article>
        {/* {selectProduct} */}
      </section>
    </div>
  ) : ((error && <ServerError />) || (<Loader />));
};

export default WineInfo;

/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { actions as selectedProductActions } from '../../features/store/selectProduct';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { ProductWine } from '../../types/ProductWine';

interface VerticalSliderProps {
  items: ProductWine[];
  botSlider?: boolean;
}

const GradientLine = () => {
  return (
    <svg width="77" height="1" viewBox="0 0 77 1" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line y1="-0.5" x2="77" y2="-0.5" transform="matrix(-1 8.74228e-08 8.74228e-08 1 77 1)" stroke="url(#paint0_angular_217_363)" />
      <defs>
        <radialGradient id="paint0_angular_217_363" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21 -54) rotate(135) scale(72.832 5608.06)">
          <stop stopColor="#BD9565" stopOpacity="0" />
          <stop offset="0.984375" stopColor="#BF9A6D" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const VerticalSlider: React.FunctionComponent<VerticalSliderProps> = ({
  items,
  botSlider,
}) => {
  const location = useLocation().pathname;
  const dispatch = useAppDispatch();
  const [selectItem, setselectItem] = useState(0);

  return (
    <div className="slider-vertical">
      <div className="slider-vertical__blur" style={{ transform: botSlider ? 'translateX(250px)' : '' }}></div>
      <div className="slider-vertical__list">
        <div className="slider-vertical__track" style={{ transform: `translateY(-${selectItem * 480}px)` }}>
          {items.map(item => {
            return (
              <Link
                key={item.id}
                className="slider-vertical__item"
                // style={{ backgroundImage: `url(img/${item.id}.png)` }}
                to={`${location.length > 1 ? location : 'catalog'}/${item.name.split(' ').join('+')}`}
                onClick={() => {
                  dispatch(selectedProductActions.set(item));
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
              >
                <img
                  src={`img/${item.id}.png`}
                  alt=""
                  className={classNames(
                    'slider-vertical__item',
                    { 'slider-vertical__item--bot': botSlider },
                  )}
                />
                {botSlider && <img src={`./img/dop${item.id}.png`} alt="" className="slider-vertical__item__dop" />}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="slider-vertical__nav">
        <button
          type="button"
          className="slider-vertical__button"
          onClick={() => {
            if (selectItem > 0) {
              setselectItem(prev => prev - 1);
            } else {
              setselectItem(items.length - 1);
            }
          }}
        >
          <svg width="6" height="39" viewBox="0 0 6 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="slider-vertical__arrow" d="M3 0L0.113249 5L5.88675 5L3 0ZM2.5 4.5L2.5 39L3.5 39L3.5 4.5L2.5 4.5Z" />
          </svg>
        </button>
        <ul className="slider-vertical__dots">
          {items.map((item, index) => {
            return (
              <li
                key={item.id}
              >
                <button
                  type="button"
                  className={classNames(
                    'slider-vertical__dot',
                    { 'slider-vertical__dot--active': items[selectItem].id === item.id },
                  )}
                  aria-label="123"
                  onClick={() => {
                    setselectItem(index);
                  }}
                />
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="slider-vertical__button"
          onClick={() => {
            if (selectItem < items.length - 1) {
              setselectItem(prev => prev + 1);
            } else {
              setselectItem(0);
            }
          }}
        >
          <svg width="6" height="39" viewBox="0 0 6 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="slider-vertical__arrow" d="M3.00732 39L5.89313 33.9995L0.119629 34.0005L3.00732 39ZM2.5 9.38264e-05L2.50647 34.5001L3.50647 34.4999L3.5 -9.38264e-05L2.5 9.38264e-05Z" fill="#C7C7C7" />
          </svg>

        </button>
      </div>
      <div className="slider-vertical__info">
        {botSlider
          ? (
            <>
              <div className="slider-vertical__info__top-line">
                <GradientLine />
              </div>
              <div className="slider-vertical__info__left-line">
                <GradientLine />
              </div>
            </>
          )
          : null}
        <p className="slider-vertical__info__text">
          {items[selectItem].name}
          {' — '}
          {items[selectItem].description}
        </p>
        <Link to={`/catalog/${items[selectItem].name.split(' ').join('+')}`} className="slider-vertical__info__button">
          Детальніше
        </Link>
        <div className="price">
          {items[selectItem].price}
          {' '}
          ₴
        </div>
        {botSlider
          ? (
            <>
              <div className="slider-vertical__info__bot-slider">
                <p className="slider-vertical__info__bot-slider__item">
                  {items[selectItem].year}
                </p>
                <div className="slider-vertical__info__bot-slider__line"></div>
                <p className="slider-vertical__info__bot-slider__item">
                  {items[selectItem].country.name}
                </p>
                <div className="slider-vertical__info__bot-slider__line"></div>
                <p className="slider-vertical__info__bot-slider__item">
                  {items[selectItem].sweetness.name}
                </p>
              </div>
              <div className="slider-vertical__info__bot-line">
                <GradientLine />
              </div>
              <div className="slider-vertical__info__right-line">
                <GradientLine />
              </div>
            </>
          )
          : null}
      </div>
    </div>
  );
};

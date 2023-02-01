/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductWine } from '../../types/ProductWine';
import { useLocalStorage } from '../../hooks/use-localStorage';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { actions as selectedProductActions } from '../../features/store/selectProduct';
import { Rate } from '../Rate';
import { ButtonCard } from '../ButtonCard/ButtonCard';

interface CardProps {
  product: ProductWine
}

export const Card: React.FunctionComponent<CardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const [, setLocalCart] = useLocalStorage('cart', []);
  const location = useLocation().pathname;

  const itemInCart = cart.some(item => item.id === product.id);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  return (
    <div className="card">
      <Rate stars={product.rang} />
      {product.discount ? (
        <div className="card__discount">
          -
          {' '}
          {product.discount}
          %
        </div>
      ) : null}

      <Link
        to={`${location.length > 1 ? location : 'catalog'}/${product.name.split(' ').join('+')}`}
        onClick={() => {
          dispatch(selectedProductActions.set(product));
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        <div className="card__blur"></div>
        <img src={`img/${product.id}.png`} alt="Wine" className="card__img" />
      </Link>
      <h5 className="card__name">
        {product.name }
        ,
        <br />
        {' '}
        {product.volume}
        {' '}
        л
      </h5>
      <h4 className="card__price">
        {product.discount ? (
          <div className="card__price__discount">
            {product.price}
            ₴
          </div>
        ) : null}

        {(product.price - ((product.price * product.discount) / 100)).toFixed()}
        {' '}
        ₴
      </h4>
      <ButtonCard itemInCart={itemInCart} product={product} />
    </div>
  );
};

// export default Card;

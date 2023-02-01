import React from 'react';
import classNames from 'classnames';
import { ProductWine } from '../../types/ProductWine';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { actions as CartActions } from '../../features/store/cart';

type ButtonCardType = {
  itemInCart: boolean
  product: ProductWine
};

export const ButtonCard: React.FC<ButtonCardType> = ({ product, itemInCart }) => {
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className={classNames(
        'card__button',
        { 'card__button--in-cart': itemInCart },
      )}
      onClick={() => {
        if (!itemInCart) {
          dispatch(CartActions.add({ ...product }));
        }
      }}
    >
      {itemInCart ? ('В корзині') : ('Купити')}
    </button>
  );
};

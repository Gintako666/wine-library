import React, { useEffect } from 'react';
import { actions as cartActions } from '../../features/store/cart';
import { actions as productsActions } from '../../features/store/products';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useLocalStorage } from '../../hooks/use-localStorage';
import { ProductWine } from '../../types/ProductWine';

type CounterProductType = {
  item: ProductWine;
  counter: number
  setCounter: React.Dispatch<React.SetStateAction<number>>
};

export const CounterWines: React.FC<CounterProductType> = ({ item, counter, setCounter }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const { products } = useAppSelector(state => state.products);

  const [, setLocalCart] = useLocalStorage('cart', []);

  useEffect(() => {
    setLocalCart(cart);
  }, [counter]);

  return (
    <div className="cart__products__item__counter">
      <button
        type="button"
        className="cart__products__item__counter__button"
        onClick={() => {
          if (counter > 1) {
            setCounter(prev => prev - 1);
            if (products) {
              dispatch(productsActions.set(products.map(itemProd => {
                if (itemProd.id === item.id) {
                  return { ...itemProd, counter: counter - 1 };
                }

                return itemProd;
              })));
            }

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
          if (counter < 50) {
            setCounter(prev => prev + 1);
            if (products) {
              dispatch(productsActions.set(products.map(itemProd => {
                if (itemProd.id === item.id) {
                  return { ...itemProd, counter: counter + 1 };
                }

                return itemProd;
              })));
            }

            dispatch(cartActions.edit({ ...item, counter: counter + 1 }));
          }
        }}
      >
        +
      </button>
    </div>
  );
};

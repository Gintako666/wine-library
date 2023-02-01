import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { actions as cartActions } from '../../features/store/cart';
import { useAppDispatch } from '../../hooks/reduxHooks';

const OrderingCompleted: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartActions.clear());
  }, []);

  return (
    <div className="container">
      <section className="ordering__completed">
        <article className="ordering__completed__item">
          <h2 className="ordering__completed__item__title">
            Ваше замовлення оформлено.
            Дякуємо за покупку!
          </h2>
          <h4 className="ordering__completed__item__text">
            Ви отримаєте лист на електронну пошту з деталями замовлення.
            Наш менеджер скоро звʼяжеться з вами.
          </h4>
          <Link
            to="/catalog"
            className="ordering__completed__item__button"
          >
            Повернутися до каталогу
          </Link>
        </article>
        <img
          src="./img/orderingCompletedBg.svg"
          alt=""
          className="ordering__completed__img"
        />
      </section>
    </div>
  );
};

export default OrderingCompleted;

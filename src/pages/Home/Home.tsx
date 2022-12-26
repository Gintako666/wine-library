/* eslint-disable no-console */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../components/GlobalContext';
import { VerticalSlider } from '../../components/VerticalSlider';
import Slider from '../../components/Slider/Slider';

const Home: React.FunctionComponent = () => {
  const { products } = useContext(GlobalContext);

  const settingsSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="container home">
        <section className="home__info">
          <article className="home__info__content">
            <h2 className="home__info__title">
              ОБИРАЙТЕ ВИНА НА БУДЬ-ЯКИЙ СМАК
            </h2>
            <p className="home__info__text">
              В нашому інтернет-магазині Ви точно знайдете вино по душі.
              Ми піклуємося про наших клієнтів та вибираємо тільки краще.
            </p>
            <Link to="catalog" className="home__info__button">
              Перейти до каталогу
            </Link>
          </article>
          <VerticalSlider items={products} />
        </section>
        <section className="home__hit">
          <h1 className="home__title">ХІТИ ПРОДАЖ</h1>
          <Slider
            products={products}
            settingsSlider={settingsSlider}
          />
        </section>
        <section className="home__new">
          <h1 className="home__info__title">
            ГАРЯЧІ НОВИНКИ
          </h1>
          <VerticalSlider items={products} botSlider />
        </section>
      </div>
      <section className="home__interesting">
        <div className="container">
          <h2 className="home__interesting__title">ЦІКАВЕ НА САЙТІ</h2>

          <h3 className="home__interesting__subtitle">Гастросомельє</h3>

          <p className="home__interesting__text">
            Допоможемо зробити Ваш вечір ідеальним
            та підберемо найкраще поєднання вина з
            будь-якимии стравами.
          </p>

          <button type="button" className="home__interesting__button">Підібрати</button>
        </div>
      </section>
    </>
  );
};

export default Home;

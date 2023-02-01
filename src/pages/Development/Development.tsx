import React from 'react';
import { Link } from 'react-router-dom';

const Development: React.FunctionComponent = () => {
  return (
    <div className="container server-error">
      <section>
        <h1 className="server-error__title">
          Сторінка знаходиться
          <br />
          в розробці!
        </h1>
        <br />
        <br />
        <br />
        <p className="server-error__text">
          В даний час ми працюємо над створенням цієї сторінки.
          <br />
          Вибачте за тимчасові незручності!
        </p>
        <Link to="/" className="server-error__button">
          Головна сторінка
        </Link>
      </section>
      <section>
        <img src="./img/developing.png" alt="" />
      </section>
    </div>
  );
};

export default Development;

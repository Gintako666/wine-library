import React from 'react';
import { useLocation } from 'react-router-dom';

const ServerError: React.FunctionComponent = () => {
  const location = useLocation();

  return (
    <div className="container">
      <section className="server-error">
        <div className="server-error__wrapper">
          <h1 className="server-error__title">Сервер не відповідає!</h1>
          <p className="server-error__text">
            Можливо відсутнє інтернет з’єднання.
            <br />
            Спробуйте будь-ласка пізніше
          </p>
          <a href={location.pathname} className="server-error__button">
            Спробувати ще раз
          </a>
        </div>
        <div className="server-error__img-wrapper">
          <div className="server-error__img-wrapper__blur"></div>
          <svg width="172" height="253" viewBox="0 0 172 253" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M106.404 204H6.837L0.558001 192.04C13.714 167.123 29.0627 136.426 46.604 99.948C64.1453 63.47 79.494 30.4803 92.65 0.978994H99.826L117.467 10.846L33.747 172.605L22.385 190.246L106.404 186.06V126.26L127.633 124.466V185.163L171.885 183.07V204H127.633V252.139H106.404V204Z" fill="#78706B" fillOpacity="0.6" />
          </svg>
          <img src="./img/serverError.png" alt="" />
          <svg width="172" height="253" viewBox="0 0 172 253" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M106.404 204H6.837L0.558001 192.04C13.714 167.123 29.0627 136.426 46.604 99.948C64.1453 63.47 79.494 30.4803 92.65 0.978994H99.826L117.467 10.846L33.747 172.605L22.385 190.246L106.404 186.06V126.26L127.633 124.466V185.163L171.885 183.07V204H127.633V252.139H106.404V204Z" fill="#78706B" fillOpacity="0.6" />
          </svg>
        </div>

      </section>
    </div>
  );
};

export default ServerError;

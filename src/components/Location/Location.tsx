import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const locationTranslate = {
  catalog: 'Каталог',
  ordering: 'Оформлення замовлення',
  qwe: 'Крок 1/2',
  gastrosommelier: 'Гастросомельє',
  promotions: 'Акції',
  aboutUs: 'Про нас',
  cart: 'Кошик',
  user: 'Мій профіль',
  2: 'Крок 2',
};

export const Location: React.FC = () => {
  const location: LinkType[] = useLocation().pathname.split('/');

  type LinkType = 'catalog' | 'ordering' | 'qwe';

  return (
    <div className="location">
      {location.map((link, index) => {
        return (
          <React.Fragment key={link}>
            {index !== 0 ? (
              (index === (location.length - 1) && (
                <p className="location__link--disabled">
                  {link in locationTranslate ? locationTranslate[link] : link.split('+').join(' ')}
                </p>
              ))
                || (
                  <Link
                    key={link}
                    to={`/${link}`}
                    className="location__link"
                  >
                    {locationTranslate[link]}
                  </Link>
                )
            ) : (
              <Link to="/" key={link}>
                Головна
              </Link>
            )}
            {index !== (location.length - 1) && (
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.16667 0.166828L7 6.00016L1.16667 11.8335L0.13125 10.7981L4.92917 6.00016L0.13125 1.20224L1.16667 0.166828Z" fill="white" />
              </svg>
            )}

          </React.Fragment>
        );
      })}
    </div>
  );
};

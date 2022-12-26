/* eslint-disable no-console */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { getTranslation } from '../../translations';
import { GlobalContext } from '../GlobalContext';
import { useTheme } from '../../hooks/use-theme';
import { UserContext } from '../UserContext';
import Logo from '../Logo/Logo';
import { getWines } from '../../api/api';

export interface Good {
  id: number;
  name: string;
  color: string;
}

const Header: React.FunctionComponent = () => {
  const { lang } = useContext(GlobalContext);
  const { setVisibleModalLogin, setLoginOpen } = useContext(UserContext);

  getWines().then((a) => console.log(a)).catch((a) => console.log(a));

  const { setTheme } = useTheme();

  const API_URL = 'http://winelibraryapp-env.eba-4ybrh5hi.eu-west-1.elasticbeanstalk.com/wines';

  function getAll(): Promise<Good[] | Response> {
    return fetch(API_URL)
      .then(response => response.json())
      .catch(error => {
        console.log(error);

        return error;
      });
  }

  console.log(getAll());

  console.log(setTheme);

  return (
    <header>
      <div className="container">
        <div className="header">
          <Logo />
          <nav className="header__nav">
            <ul>
              <li>
                <NavLink to="/catalog" className="header__nav__link">
                  {getTranslation('nav.catalog', lang)}
                </NavLink>
              </li>
              <li>
                <NavLink to="/gastrosommelier" className="header__nav__link">
                  {getTranslation('nav.gastrosommelier', lang)}
                </NavLink>
              </li>
              <li>
                <NavLink to="/gift-sets" className="header__nav__link">
                  {getTranslation('nav.gift-sets', lang)}
                </NavLink>
              </li>
              <li>
                <NavLink to="/promotions" className="header__nav__link">
                  {getTranslation('nav.promotions', lang)}
                </NavLink>
              </li>
            </ul>
          </nav>
          <ul className="header__user">
            <li>
              <button type="button">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.4333 16.4336L11.9 11.9002M7.36665 14.1669C6.47366 14.1669 5.58942 13.991 4.7644 13.6493C3.93939 13.3075 3.18976 12.8067 2.55832 12.1752C1.92689 11.5438 1.426 10.7942 1.08427 9.96914C0.742538 9.14413 0.56665 8.25988 0.56665 7.36689C0.56665 6.47391 0.742538 5.58966 1.08427 4.76465C1.426 3.93963 1.92689 3.19001 2.55832 2.55857C3.18976 1.92713 3.93939 1.42625 4.7644 1.08451C5.58942 0.742782 6.47366 0.566895 7.36665 0.566895C9.17012 0.566895 10.8997 1.28332 12.175 2.55857C13.4502 3.83382 14.1667 5.56342 14.1667 7.36689C14.1667 9.17037 13.4502 10.9 12.175 12.1752C10.8997 13.4505 9.17012 14.1669 7.36665 14.1669Z" stroke="white" />
                </svg>
                <h5 className="header__user__text">{getTranslation('header.search', lang)}</h5>
              </button>
            </li>
            <li>
              <button type="button">
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.83331 17.3332C5.37498 17.3332 4.98276 17.1701 4.65665 16.844C4.32998 16.5173 4.16665 16.1248 4.16665 15.6665C4.16665 15.2082 4.32998 14.8157 4.65665 14.489C4.98276 14.1629 5.37498 13.9998 5.83331 13.9998C6.29165 13.9998 6.68387 14.1629 7.00998 14.489C7.33665 14.8157 7.49998 15.2082 7.49998 15.6665C7.49998 16.1248 7.33665 16.5173 7.00998 16.844C6.68387 17.1701 6.29165 17.3332 5.83331 17.3332ZM14.1666 17.3332C13.7083 17.3332 13.3161 17.1701 12.99 16.844C12.6633 16.5173 12.5 16.1248 12.5 15.6665C12.5 15.2082 12.6633 14.8157 12.99 14.489C13.3161 14.1629 13.7083 13.9998 14.1666 13.9998C14.625 13.9998 15.0175 14.1629 15.3441 14.489C15.6703 14.8157 15.8333 15.2082 15.8333 15.6665C15.8333 16.1248 15.6703 16.5173 15.3441 16.844C15.0175 17.1701 14.625 17.3332 14.1666 17.3332ZM4.58331 3.1665L7.49998 8.99984H13.3333L16.6666 3.1665H4.58331ZM4.99998 12.3332L6.66665 8.99984L2.91665 1.49984H0.833313V0.666504H3.33331L4.16665 2.33317H18.0833L13.9375 9.83317H7.08331L6.24998 11.4998H15.8333V12.3332H4.99998Z" fill="white" />
                </svg>
                <h5 className="header__user__text">{getTranslation('header.cart', lang)}</h5>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="user"
                onClick={() => {
                  setVisibleModalLogin(true);
                  setLoginOpen(true);
                }}
              >
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.3519 15.5V13.2C16.3519 12.728 16.2273 12.3002 15.9759 11.9056L15.9758 11.9055C15.7228 11.5079 15.3906 11.2081 14.9724 10.9989C13.9332 10.4981 12.8799 10.1236 11.8121 9.87387C10.7434 9.62463 9.65815 9.5 8.55557 9.5C7.45299 9.5 6.36774 9.62463 5.29905 9.87387L16.3519 15.5ZM16.3519 15.5H0.759277V13.2C0.759277 12.728 0.883816 12.3002 1.1352 11.9056L1.13531 11.9055C1.38834 11.5079 1.72055 11.2081 2.1388 10.9989C3.17787 10.4982 4.23107 10.1236 5.29877 9.87393L16.3519 15.5ZM8.55557 7.5C7.54272 7.5 6.69104 7.15746 5.97301 6.46508C5.25554 5.77323 4.90743 4.96033 4.90743 4C4.90743 3.03967 5.25554 2.22677 5.97301 1.53492C6.69104 0.842536 7.54272 0.5 8.55557 0.5C9.56842 0.5 10.4201 0.842536 11.1381 1.53492C11.8556 2.22677 12.2037 3.03967 12.2037 4C12.2037 4.96033 11.8556 5.77323 11.1381 6.46508C10.4201 7.15746 9.56842 7.5 8.55557 7.5Z" stroke="white" />
                </svg>
                <h5 className="header__user__text">{getTranslation('log-in', lang)}</h5>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

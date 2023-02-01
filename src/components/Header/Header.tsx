/* eslint-disable no-console */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import { useTheme } from '../../hooks/use-theme';
import Logo from '../Logo/Logo';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getSearchWith } from '../../utils/searchHelper';

export interface Good {
  id: number;
  name: string;
  color: string;
}

type LinkProps = {
  name: string,
  to: string,
};

const CastomNavLink: React.FC<LinkProps> = ({ name, to }) => {
  const location = useLocation();

  return (
    <NavLink
      to={location.pathname === to ? location.pathname + location.search : to}
      className={({ isActive }) => classNames(
        'header__nav__link',
        { 'header__nav__link--active': isActive },
      )}
    >
      {name}
    </NavLink>
  );
};

type Props = {
  setVisibleModalLogin: (newValue: boolean) => void;
};

const Header: React.FunctionComponent<Props> = ({ setVisibleModalLogin }) => {
  const { user } = useAppSelector((state) => state.user);
  const cart = useAppSelector((state) => state.cart);
  const { setTheme } = useTheme();
  const location = useLocation();
  // const [openSearch, setopenSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  // const history = useNavigate();

  // console.log(user);

  useEffect(() => {
    setTheme('light');
  }, []);

  return (
    <header>
      <div className="container">
        <div className="header">
          <Logo />
          <nav className="header__nav">
            <ul>
              <li>
                <CastomNavLink to="/catalog" name="Каталог" />
              </li>
              <li>
                <CastomNavLink to="/gastrosommelier" name="Гастросомельє" />
              </li>
              <li>
                <CastomNavLink to="/promotions" name="Акції" />

              </li>
              <li>
                <CastomNavLink to="/aboutUs" name="Про нас" />
              </li>
            </ul>
          </nav>
          <ul className="header__user">
            {(location.pathname === '/promotions' || location.pathname === '/catalog' || location.pathname === '/gastrosommelier') && (
              <li className="header__user__li">
                <div>
                  <svg width="23" height="23" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4333 16.4336L11.9 11.9002M7.36665 14.1669C6.47366 14.1669 5.58942 13.991 4.7644 13.6493C3.93939 13.3075 3.18976 12.8067 2.55832 12.1752C1.92689 11.5438 1.426 10.7942 1.08427 9.96914C0.742538 9.14413 0.56665 8.25988 0.56665 7.36689C0.56665 6.47391 0.742538 5.58966 1.08427 4.76465C1.426 3.93963 1.92689 3.19001 2.55832 2.55857C3.18976 1.92713 3.93939 1.42625 4.7644 1.08451C5.58942 0.742782 6.47366 0.566895 7.36665 0.566895C9.17012 0.566895 10.8997 1.28332 12.175 2.55857C13.4502 3.83382 14.1667 5.56342 14.1667 7.36689C14.1667 9.17037 13.4502 10.9 12.175 12.1752C10.8997 13.4505 9.17012 14.1669 7.36665 14.1669Z" stroke="white" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="header__user__input"
                  value={search}
                  onChange={(e) => {
                    setSearchParams(getSearchWith(searchParams, {
                      search: e.target.value,
                    }));
                  }}
                />
              </li>
            )}
            <li>
              <NavLink
                to="cart"
                className="header__button"
              >
                <svg width="24" height="23" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.83331 17.3332C5.37498 17.3332 4.98276 17.1701 4.65665 16.844C4.32998 16.5173 4.16665 16.1248 4.16665 15.6665C4.16665 15.2082 4.32998 14.8157 4.65665 14.489C4.98276 14.1629 5.37498 13.9998 5.83331 13.9998C6.29165 13.9998 6.68387 14.1629 7.00998 14.489C7.33665 14.8157 7.49998 15.2082 7.49998 15.6665C7.49998 16.1248 7.33665 16.5173 7.00998 16.844C6.68387 17.1701 6.29165 17.3332 5.83331 17.3332ZM14.1666 17.3332C13.7083 17.3332 13.3161 17.1701 12.99 16.844C12.6633 16.5173 12.5 16.1248 12.5 15.6665C12.5 15.2082 12.6633 14.8157 12.99 14.489C13.3161 14.1629 13.7083 13.9998 14.1666 13.9998C14.625 13.9998 15.0175 14.1629 15.3441 14.489C15.6703 14.8157 15.8333 15.2082 15.8333 15.6665C15.8333 16.1248 15.6703 16.5173 15.3441 16.844C15.0175 17.1701 14.625 17.3332 14.1666 17.3332ZM4.58331 3.1665L7.49998 8.99984H13.3333L16.6666 3.1665H4.58331ZM4.99998 12.3332L6.66665 8.99984L2.91665 1.49984H0.833313V0.666504H3.33331L4.16665 2.33317H18.0833L13.9375 9.83317H7.08331L6.24998 11.4998H15.8333V12.3332H4.99998Z"
                    fill={(location.pathname !== '/cart') ? 'white' : '#C8AE8E'}
                  />
                </svg>
                {cart.length > 0 ? (
                  <div className="header__cart-counter">
                    {cart.length}
                  </div>
                ) : null}
              </NavLink>
            </li>
            <li>
              <Link
                to={user ? '/user' : location.pathname + location.search}
                className="user-link"
                onClick={() => {
                  if (!user) {
                    setVisibleModalLogin(true);
                  }
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.03765 17.0285L2.03755 17.0287C1.6666 17.6329 1.48132 18.2922 1.48132 19.0171V22.548H23.4992V19.0171C23.4992 18.2922 23.3139 17.6329 22.9429 17.0287L22.9428 17.0285C22.5707 16.4218 22.0816 15.9648 21.4705 15.6478C20.0169 14.9208 18.5428 14.3767 17.0478 14.0139C15.552 13.6519 14.0331 13.4709 12.4902 13.4709C10.9474 13.4709 9.42848 13.6519 7.93266 14.0139L2.03765 17.0285ZM2.03765 17.0285C2.40976 16.4218 2.89892 15.9648 3.51 15.6478M2.03765 17.0285L3.51 15.6478M3.51 15.6478C4.9636 14.9208 6.43768 14.3767 7.93261 14.0139L3.51 15.6478ZM12.4902 11.0313C11.0415 11.0313 9.81375 10.521 8.77983 9.48637C7.7459 8.45174 7.23578 7.22297 7.23578 5.77298C7.23578 4.32299 7.7459 3.09422 8.77983 2.05959C9.81375 1.02498 11.0415 0.514648 12.4902 0.514648C13.9389 0.514648 15.1667 1.02498 16.2007 2.05959C17.2346 3.09422 17.7447 4.32299 17.7447 5.77298C17.7447 7.22297 17.2346 8.45174 16.2007 9.48637C15.1667 10.521 13.9389 11.0313 12.4902 11.0313Z" stroke="white" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

import classNames from 'classnames';
import React, { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Countries } from '../../types/Countries';
import { getSearchWith } from '../../utils/searchHelper';
import { CheckBox } from '../ChekBox';

type NewFilterParamProps = {
  name: string,
  link: string,
  openFilters: string[],
  setOpenFilters: React.Dispatch<React.SetStateAction<string[]>>,
  listParams: Countries[],
  openFilterLink: string,
};

export const NewFilterParam: React.FC<NewFilterParamProps> = ({
  name,
  link,
  openFilters,
  setOpenFilters,
  listParams,
  openFilterLink,
}) => {
  const [searchParams] = useSearchParams();
  const searchName = searchParams.get(link)?.split('*') || [];

  const openFilter = openFilters.includes(openFilterLink);

  const setNewOpenFilters = useCallback(
    (nameParam) => {
      setOpenFilters(prev => {
        if (prev.includes(nameParam)) {
          return prev.filter(params => params !== nameParam);
        }

        return [...prev, nameParam];
      });
    },
    [],
  );

  return (
    <>
      <button
        type="button"
        className="catalog__filters__button-open"
        onClick={() => setNewOpenFilters(openFilterLink)}
      >
        <h5 className="catalog__filters__title">
          {name}
        </h5>
        <svg
          width="15"
          height="9"
          viewBox="0 0 15 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classNames({ 'catalog__filters__title--active': openFilter })}
        >
          <path d="M1.7625 9L7.5 3.43725L13.2375 9L15 7.28745L7.5 0L0 7.28745L1.7625 9Z" fill="white" />
        </svg>
      </button>
      <ul
        className={classNames(
          'catalog__filters__list',
          { 'catalog__filters__list--active': openFilter },
        )}
        style={{ maxHeight: openFilter ? `${listParams.length * 41}px` : '0' }}
      >
        {listParams.map(param => (
          <li key={param.name}>
            <Link
              to={{
                search: getSearchWith(
                  searchParams,
                  {
                    [link]: searchName.includes(`${param.id}`)
                      ? [...searchName.filter(centuriesItem => {
                        return centuriesItem !== `${param.id}`;
                      })]
                      : [...searchName, `${param.id}`],
                    page: '0',
                  },
                ),
              }}
              className="catalog__filters__item"
            >
              <CheckBox isActive={searchName.includes(`${param.id}`)} />
              <div className="catalog__filters__item__name">{param.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

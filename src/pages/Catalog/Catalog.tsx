/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PriceSlider from '../../components/PriceSlider/PriceSlider';
import '../../styles/utils/nouislider.css';
import { getSearchWith } from '../../utils/searchHelper';
// import { useDebounce } from '../../hooks/use-debounce';
type CheckBoxProps = {
  isActive: boolean;
};

const CheckBox: React.FC<CheckBoxProps> = ({ isActive }) => {
  return (
    <div
      className={classNames(
        'check-box',
        { 'check-box--active': isActive },
      )}
    >
    </div>
  );
};

type NewFilterParamProps = {
  name: string,
  link: string,
  openFilters: string[],
  setOpenFilters: React.Dispatch<React.SetStateAction<string[]>>,
  listParams: string[],
};

const NewFilterParam: React.FC<NewFilterParamProps> = ({
  name,
  link,
  openFilters,
  setOpenFilters,
  listParams,

}) => {
  const [searchParams] = useSearchParams();
  const searchName = searchParams.getAll(link) || [];

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
        onClick={() => setNewOpenFilters(link)}
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
          className={classNames({ 'catalog__filters__title--active': openFilters.includes(link) })}
        >
          <path d="M1.7625 9L7.5 3.43725L13.2375 9L15 7.28745L7.5 0L0 7.28745L1.7625 9Z" fill="white" />
        </svg>
      </button>
      <ul
        className={classNames(
          'catalog__filters__list',
          { 'catalog__filters__list--active': openFilters.includes(link) },
        )}
      >
        {listParams.map(param => (
          <li key={param}>
            <Link
              to={{
                search: getSearchWith(
                  searchParams,
                  {
                    [link]: searchName.includes(param)
                      ? [...searchName.filter(centuriesItem => {
                        return centuriesItem !== param;
                      })]
                      : [...searchName, param],
                  },
                ),
              }}
              className="catalog__filters__item"
            >
              <CheckBox isActive={searchName.includes(param)} />
              <div className="catalog__filters__item__name">{param}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const Catalog: React.FunctionComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const countries = ['Україна', 'Франція', 'Іспаныя'];
  const grapeSort = ['Бsdленд', 'Бордо sdf', 'Каsadfsdберне савіньйон', 'Блед', 'Бодо asasбленд', 'Каберdfgdfgне савінйон', 'Бенд', 'Брдasasfо бленд', 'Каерне савіньйон'];
  const years = ['1989', '1998', '1979', '1997', '1996', '1995'];

  const [start, setstart] = useState<number>(Number(searchParams.get('startPrice') || 0));
  const [end, setend] = useState<number>(Number(searchParams.get('endPrice') || 10000));
  const [openFilters, setOpenFilters] = useState<string[]>([]);

  // const a = useDebounce(start + 1000, 1000);

  // console.log(a);

  // useEffect(() => {
  //   setOpenFilters(prev => {
  //     SearchCountries.length >= 1
  //       ? []
  //       : [...prev]
  //   });
  // }, []);

  useEffect(() => {
    setSearchParams(getSearchWith(searchParams, { startPrice: `${start}`, endPrice: `${end}` }));
  }, [start, end]);

  return (
    <div className="container">
      <section className="catalog">
        <article className="catalog__filters">
          <div className="catalog__filters__price">
            <h5 className="catalog__filters__title">Ціна</h5>
            <form action="">
              <input
                type="number"
                className="catalog__filters__min-price"
                maxLength={6}
                value={start}
                min={0}
                max={10000}
                step={100}
                onChange={(e) => {
                  setstart(+e.target.value);

                  if (start + 1000 > end) {
                    setstart(end - 1000);
                  }
                }}
              />
              <div className="catalog__filters__price__line"></div>
              <input
                type="number"
                className="catalog__filters__min-price"
                maxLength={6}
                value={end}
                min={0}
                max={10000}
                step={100}
                onChange={(e) => {
                  setend(+e.target.value);

                  if (start > end - 1000) {
                    setend(start + 1000);
                  }
                }}
              />
            </form>
            <PriceSlider
              min={0}
              max={10000}
              start={start}
              end={end}
              setstart={setstart}
              setend={setend}
            />
          </div>
          <div className="catalog__filters__line"></div>
          <div className="catalog__filters__countries">
            <NewFilterParam
              openFilters={openFilters}
              setOpenFilters={setOpenFilters}
              name="Країни"
              link="countries"
              listParams={countries}

            />
          </div>
          <div className="catalog__filters__line"></div>
          <div className="catalog__filters__grape-sort">
            <NewFilterParam
              openFilters={openFilters}
              setOpenFilters={setOpenFilters}
              name="Сорт винограду"
              link="grapeSort"
              listParams={grapeSort}

            />
          </div>
          <div className="catalog__filters__line"></div>
          <div className="catalog__filters__year">
            <NewFilterParam
              openFilters={openFilters}
              setOpenFilters={setOpenFilters}
              name="Рік"
              link="years"
              listParams={years}

            />
          </div>
        </article>
        <article className="catalog__products"></article>
      </section>
    </div>
  );
};

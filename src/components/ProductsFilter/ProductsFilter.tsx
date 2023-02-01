/* eslint-disable no-console */
import React, { useState, useCallback, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import PriceSlider from '../PriceSlider/PriceSlider';
import { actions as productsActions } from '../../features/store/products';
import { useAppDispatch } from '../../hooks/reduxHooks';
import {
  getTotalCount, getWinesSearch,
} from '../../api/api';
import { useDebounce } from '../../hooks/use-debounce';
import { NewFilterParam } from '../NewFilterParam';
import { filterNames } from '../../utils/filterNames';
import { FiltersType } from '../../types/Filters';

interface ProductsFilterProps {
  typeFilter: 'catalog' | 'promotions' | 'gastrosommelier';
  setFilters: () => void
  filters: FiltersType
}

const ProductsFilter: React.FunctionComponent<ProductsFilterProps> = ({
  typeFilter, setFilters, filters,
}) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [start, setstart] = useState<number>(Number(searchParams.get('startPrice') || 0));
  const [end, setend] = useState<number>(Number(searchParams.get('endPrice') || 10000));
  const [openFilters, setOpenFilters] = useState<string[]>([]);
  const location = useLocation();

  const [, setcounterClearFilters] = useState(0);

  const page = searchParams.get('startPrice') || 0;
  const count = searchParams.get('count') || 9;

  const searchString = useDebounce(getSearchWith(searchParams, {}).split('*').join(','), 500);
  const heandError = () => dispatch(productsActions.error());
  const clearFilters = useCallback(() => {
    setstart(0);
    setend(10000);
  }, []);

  // useEffect(() => {
  //   setOpenFilters(filters.map(item => item[0]));
  // }, [filters]);

  useEffect(() => {
    clearFilters();
    dispatch(productsActions.clear());
    setSearchParams('page=0&count=9&minPrice=0&maxPrice=10000');
    dispatch(productsActions.setLoading(true));

    setFilters();

    return () => {
    };
  }, []);

  useEffect(() => {
    setSearchParams(getSearchWith(searchParams, {
      page: `${page}`,
      count: `${count}`,
      minPrice: `${start}`,
      maxPrice: `${end}`,
    }));
  }, [start, end]);

  useEffect(() => {
    dispatch(productsActions.setLoading(true));
    dispatch(productsActions.clear());
    if (searchString.length > 1) {
      getWinesSearch(searchString, typeFilter).then((wines) => {
        dispatch(productsActions.set(wines));
        dispatch(productsActions.setLoading(false));
      }).catch(heandError);
      getTotalCount(
        searchString
          .split('&')
          .filter((item: string) => !item.includes('sortBy'))
          .join('&'),
        typeFilter,
      )
        .then((length) => {
          dispatch(productsActions.setLengthProducts(length));
        }).catch(heandError);
    }
  }, [searchString]);

  const startDebounce = useDebounce(start, 500);
  const endDebounce = useDebounce(end, 500);

  useEffect(() => {
    if (startDebounce > endDebounce) {
      const startt = start;

      setstart(end);
      setend(startt);
    }
  }, [startDebounce, endDebounce]);

  return (
    <article className="catalog__filters">
      <div className="catalog__filters__price">
        <h5 className="catalog__filters__title catalog__filters__title--first ">Ціна</h5>
        <form action="">
          <input
            className="catalog__filters__min-price"
            maxLength={6}
            value={start}
            min={0}
            max={10000}
            step={100}
            onChange={(e) => {
              if (e.target.value.match(/^[0-9]{0,5}$$/)) {
                if (+e.target.value > 10000) {
                  setstart(10000);

                  return;
                }

                // if (startDebounce > endDebounce) {
                //   console.log('swap');
                //   setstart(end);
                //   setend(start);
                // }

                setstart(+e.target.value);
              }
            }}
          />
          <div className="catalog__filters__price__line"></div>
          <input
            className="catalog__filters__min-price"
            maxLength={6}
            value={end}
            min={0}
            max={10000}
            step={100}
            onChange={(e) => {
              if (e.target.value.match(/^[0-9]{0,5}$$/)) {
                if (+e.target.value > 10000) {
                  setstart(10000);

                  return;
                }

                // if (startDebounce > endDebounce) {
                //   setstart(end);
                //   setend(start);
                // }

                if (e.target.value[0] === '0') {
                  setstart(+e.target.value.slice(1));

                  return;
                }

                setend(+e.target.value);
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
      {(filters.length === 0 && (
        <div className="catalog__filters__loader">
          <div className="catalog__filters__loader__item"></div>
        </div>
      )) || (
        filters.map(item => {
          const [key, value] = item;

          return (
            <React.Fragment key={key}>
              <div className="catalog__filters__filter-peram">
                {value && (
                  <NewFilterParam
                    openFilters={openFilters}
                    setOpenFilters={setOpenFilters}
                    name={filterNames[key]}
                    openFilterLink={key}
                    link={key === 'Салати' || key === 'Морепродукти' || key === 'Риба' || key === 'Різотто' || key === 'Паста' ? 'dish' : key}
                    listParams={value}
                  />
                )}
              </div>
              <div className="catalog__filters__line"></div>
            </React.Fragment>
          );
        })
      )}
      <Link
        to={`${location.pathname}?page=${page}&count=${count}`}
        onClick={() => {
          clearFilters();
          setOpenFilters([]);
          setSearchParams(getSearchWith(searchParams, {
            page: `${page}`,
            count: `${count}`,
          }));
          setcounterClearFilters(prev => prev + 1);
        }}
        className="catalog__filters__button"
      >
        Очистити фільтр
      </Link>
    </article>
  );
};

export default ProductsFilter;

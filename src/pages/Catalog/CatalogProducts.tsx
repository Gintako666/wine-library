/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useCallback, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
// import { getTotalCount } from '../../api/api';
import { Card } from '../../components/Card/Card';
import { Select } from '../../components/Select';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getSearchWith } from '../../utils/searchHelper';
import { LoaderItems } from '../../components/LoaderItems';

type Props = {
  counterClearFilters?: number,
};

const CatalogProducts: React.FunctionComponent<Props> = React.memo(({ counterClearFilters }) => {
  const { products, loading, lengthProducts } = useAppSelector(state => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '0';
  const count = searchParams.get('count') || '9';
  const [pagination, setPagination] = useState<number[]>([]);

  const setSearchParamsSelect = useCallback((value) => {
    setSearchParams(prev => getSearchWith(prev, { sortBy: value }));
  }, [searchParams]);

  useEffect(() => {
    setPagination([]);
    for (let i = 0; i < Math.ceil(lengthProducts / +count); i += 1) {
      setPagination(prev => [...prev, i]);
    }
  }, [lengthProducts]);

  return (
    <article className="catalog__products">
      <div className="catalog__products__filters">
        <div className="catalog__products__amount">
          {(loading && 'Пошук') || (
            `Знайдено
            
            ${lengthProducts}
            
            товарів`
          )}
        </div>

        <div className="catalog__products__sort">
          Сортувати:
          <Select
            options={[
              {
                value: 'name',
                name: 'за іменем',
              },
              {
                value: 'rang:DESC',
                name: 'за рейтингом',
              },
              {
                value: 'created',
                name: 'новинки',
              },
              {
                value: 'price',
                name: 'від дешевших до дорогих',
              },
              {
                value: 'price:DESC',
                name: 'від дорогих до дешевших',
              },
            ]}
            fn={setSearchParamsSelect}
            selectOption={{ value: searchParams.get('sortBy') || 'name', name: 'за іменем' }}
            rerender={counterClearFilters}
          />
        </div>

      </div>
      {(loading && <LoaderItems />) || (
        <>
          <ul className="catalog__products__list">
            {products?.length === 0
              ? (
                <div className="catalog__products__find-error">
                  <svg width="141" height="144" viewBox="0 0 141 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M117.623 72.9277L102.84 22.9707C102.706 22.5017 102.424 22.0885 102.036 21.7925C101.648 21.4966 101.175 21.3337 100.687 21.3281H46.3125C45.8247 21.3337 45.3518 21.4966 44.964 21.7925C44.5762 22.0885 44.2943 22.5017 44.1601 22.9707L29.3769 72.9277C28.308 76.5806 28.5689 80.4941 30.1133 83.9727C33.7482 91.9501 39.5068 98.7744 46.7592 103.699C54.0117 108.624 62.4787 111.46 71.2344 111.896V139.141H50.8437C50.2429 139.141 49.6666 139.379 49.2417 139.804C48.8168 140.229 48.5781 140.805 48.5781 141.406C48.5781 142.007 48.8168 142.583 49.2417 143.008C49.6666 143.433 50.2429 143.672 50.8437 143.672H96.1562C96.7571 143.672 97.3334 143.433 97.7583 143.008C98.1832 142.583 98.4219 142.007 98.4219 141.406C98.4219 140.805 98.1832 140.229 97.7583 139.804C97.3334 139.379 96.7571 139.141 96.1562 139.141H75.7656V111.896C84.5213 111.46 92.9883 108.624 100.241 103.699C107.493 98.7744 113.252 91.9501 116.887 83.9727C118.431 80.4941 118.692 76.5806 117.623 72.9277ZM48.0117 25.8594H98.9883L111.846 69.3027C105.955 72.248 92.9844 76.0996 74.5195 66.8672C57.7539 58.4844 44.9531 59.957 37.1367 62.7891L48.0117 25.8594ZM112.752 82.1035C109.33 89.6446 103.809 96.0404 96.8478 100.526C89.8868 105.012 81.781 107.397 73.5 107.397C65.2189 107.397 57.1132 105.012 50.1522 100.526C43.1912 96.0404 37.6697 89.6446 34.248 82.1035C33.1452 79.6238 32.9644 76.8317 33.7383 74.2305L35.4375 68.3965C41.8379 65.2246 54.5254 61.9395 72.4805 70.9453C81.8828 75.6465 90.0391 77.2324 96.7793 77.2324C102.41 77.2866 107.982 76.087 113.092 73.7207L113.262 74.2305C114.036 76.8317 113.855 79.6238 112.752 82.1035Z" fill="#9C9B9D" />
                    <line x1="139.414" y1="1.41421" x2="1.41422" y2="139.414" stroke="#787878" strokeWidth="4" />
                  </svg>
                  <h3 className="catalog__products__find-error__titel">
                    На жаль, ми не можемо знайти даний напій
                  </h3>

                </div>
              )
              : (
                products?.map(product => {
                  return (
                    <Card product={product} key={product.id} />
                  );
                })
              )}
          </ul>
          {pagination.length > 1 ? (
            <ul className="catalog__pagination">
              {pagination.map(item => {
                return (
                  <li
                    key={item}
                  >
                    <Link
                      className={classNames(
                        'catalog__pagination__item',
                        { 'catalog__pagination__item--active': +page === item },
                      )}
                      to={{
                        search: getSearchWith(
                          searchParams,
                          {
                            page: `${item}`,
                          },
                        ),
                      }}
                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}
                    >
                      {item + 1}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </>
      )}

    </article>
  );
});

export default CatalogProducts;

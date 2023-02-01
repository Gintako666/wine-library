/* eslint-disable no-console */
import React, {
  useState, useCallback,
} from 'react';
import { Location } from '../../components/Location';
import ProductsFilter from '../../components/ProductsFilter/ProductsFilter';
// import { Countries } from '../../types/Countries';
import CatalogProducts from '../Catalog/CatalogProducts';
import {
  getDishsCategoris,
} from '../../api/api';
import { actions as productsActions } from '../../features/store/products';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { FiltersType } from '../../types/Filters';

export const Gastrosommelier: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<FiltersType>([]);

  const heandError = () => dispatch(productsActions.error());

  const setFiltersFn = useCallback(() => {
    getDishsCategoris().then((dishCategoris) => {
      const a: FiltersType = dishCategoris
        .map(item => (Object.values({ key: item.name, value: item.dishes })));

      setFilters(a);
    })
      .catch(heandError);
  }, []);

  return (
    <div className="container">
      <Location />
      <section className="catalog">
        <ProductsFilter typeFilter="gastrosommelier" setFilters={setFiltersFn} filters={filters} />
        <CatalogProducts />
      </section>
    </div>
  );
};

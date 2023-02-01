import React, {
  useState, useCallback,
} from 'react';
import { Location } from '../../components/Location';
import ProductsFilter from '../../components/ProductsFilter/ProductsFilter';
import { Countries } from '../../types/Countries';
import CatalogProducts from '../Catalog/CatalogProducts';
import {
  getCountries, getManufacturers, getSorts, getYears,
} from '../../api/api';
import { actions as productsActions } from '../../features/store/products';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { FiltersType } from '../../types/Filters';

export const Promotions: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<FiltersType>([]);

  const heandError = () => dispatch(productsActions.error());

  const setFiltersFn = useCallback(() => {
    Promise.all([
      getCountries(),
      getSorts(),
      getManufacturers(),
      getYears(),
    ])
      .then(([country, sort, manufacturer, year]) => {
        const yearsNew: Countries[] = year.map<Countries>(name => ({ id: name, name: `${name}` })).sort((a, b) => a.id - b.id);

        setFilters((prev) => ([...prev, ['country', country], ['sort', sort], ['year', yearsNew], ['manufacturer', manufacturer]]));
      })
      .catch(heandError);
  }, []);

  return (
    <div className="container">
      <Location />
      <section className="catalog">
        <ProductsFilter typeFilter="promotions" setFilters={setFiltersFn} filters={filters} />
        <CatalogProducts />
      </section>
    </div>
  );
};

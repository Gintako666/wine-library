/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { getStreets } from '../../api/NPapi';
import { actions as orderingActions } from '../../features/ordering/ordering';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useDebounce } from '../../hooks/use-debounce';
// import { StreetsType } from '../../types/StreetsType';

const StreetSelect: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { town, adress } = useAppSelector(state => state.order);
  const [openOptions, setOpenOptions] = useState(false);
  const [valueSelect, setvalueSelect] = useState(adress.Present);
  const [selectCity, setSelectCity] = useState<{
    Present: string
    SettlementRef: string
  }>(adress);
  const [renderStreets, setRenderStreets] = useState<{
    Present: string
    SettlementRef: string
  }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);

  const searchCity = useDebounce(valueSelect, 1000);

  useEffect(() => {
    setLoading(true);
  }, [valueSelect]);

  useEffect(() => {
    setLoading(true);
    getStreets(searchCity, town.Ref).then((streets) => {
      if (streets[0]) {
        setRenderStreets(streets[0].Addresses);

        // return;
      }

      // seterror(true);
    }).finally(() => {
      setLoading(false);
    });

    // if (selectCity && selectCity.SettlementRef !== '') {
    //   dispatch(orderingActions.setAdress(selectCity));
    // }
  }, [searchCity]);

  useEffect(() => {
    if (selectCity) {
      dispatch(orderingActions.setAdress(selectCity));
    }
  }, [selectCity]);

  return (
    <div className="city-select">
      <input
        type="text"
        value={valueSelect}
        placeholder="Введіть вулицю"
        onChange={(e) => {
          seterror(false);
          setvalueSelect(e.target.value);
          setOpenOptions(true);
          if (e.target.value.length === 0) {
            setOpenOptions(false);
          }
        }}
        onClick={() => {
          setOpenOptions(true);
          if (valueSelect.length === 0) {
            setOpenOptions(false);
          }
        }}
        onBlur={() => {
          if (valueSelect.length > 0 && !error && !loading && renderStreets.length > 0) {
            setSelectCity(renderStreets[0]);
            setvalueSelect(renderStreets[0].Present);
          }

          if (renderStreets.length === 0) {
            setSelectCity({ Present: valueSelect, SettlementRef: '' });
          }

          setTimeout(() => {
            setOpenOptions(false);
          }, 100);
        }}
        onKeyDown={(e) => {
          if (e.code === 'Enter' && (valueSelect.length > 0 && !error && !loading && renderStreets.length > 0)) {
            setSelectCity(renderStreets[0]);
            setvalueSelect(renderStreets[0].Present);
            setOpenOptions(false);
          }
        }}
        className={classNames(
          'modal__input',
          { 'modal__input--error': error },
        )}
      />
      {openOptions && (
        <ul className="city-select__options">
          {!loading ? ((renderStreets.length === 0 && (
            <div className="city-select__error">
              Даної вулиці не знайденно, введіть назву самостійно
            </div>
          )) || (renderStreets.map(item => {
            return (
              <li
                className="city-select__option"
                key={item.Present}
                onClick={() => {
                  setSelectCity(item);
                  setvalueSelect(item.Present);
                  setOpenOptions(false);
                }}
                aria-hidden
              >
                {`${item.Present} (${item.Present})`}
              </li>
            );
          }))) : (
            <div className="catalog__filters__loader">
              <div className="catalog__filters__loader__item"></div>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default StreetSelect;

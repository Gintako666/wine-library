/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { getCitys } from '../../api/NPapi';
import { actions as orderingActions } from '../../features/ordering/ordering';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useDebounce } from '../../hooks/use-debounce';
import { CityType } from '../../types/CityType';

const CitySelect: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { town } = useAppSelector(state => state.order);
  const [openOptions, setOpenOptions] = useState(false);
  const [valueSelect, setvalueSelect] = useState(town.Description);
  const [selectCity, setSelectCity] = useState<CityType>(town);
  const [renderCitys, setRenderCitys] = useState<CityType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);

  const searchCity = useDebounce(valueSelect, 1000);

  useEffect(() => {
    setLoading(true);

    if (valueSelect.length === 0) {
      setSelectCity({ Description: '', Ref: '', AreaDescription: '' });
      dispatch(orderingActions.setTown({ Description: '', Ref: '', AreaDescription: '' }));
    }
  }, [valueSelect]);

  useEffect(() => {
    setLoading(true);
    getCitys(searchCity).then((citys: CityType[]) => {
      setRenderCitys(citys);
      setLoading(false);

      if (citys.length === 0) {
        seterror(true);
      }
    });

    if (searchCity.length > 0 && selectCity) {
      console.log(selectCity);
      dispatch(orderingActions.setTown(selectCity));
    }
  }, [searchCity]);

  return (
    <div className="city-select">
      <input
        type="text"
        value={valueSelect}
        placeholder="Введіть місто"
        onChange={(e) => {
          seterror(false);
          setvalueSelect(e.target.value);
          setOpenOptions(true);
        }}
        onClick={() => {
          setOpenOptions(true);
        }}
        onBlur={() => {
          // if (valueSelect.length > 0 && !error) {
          //   setSelectCity(renderCitys[0]);
          //   setvalueSelect(renderCitys[0].Description);
          // }

          setTimeout(() => {
            setOpenOptions(false);
          }, 100);
        }}
        onKeyDown={(e) => {
          if (e.code === 'Enter' && (valueSelect.length > 0 && !error && !loading && renderCitys.length > 0)) {
            setSelectCity(renderCitys[0]);
            setvalueSelect(renderCitys[0].Description);
            setOpenOptions(false);
          }
        }}
        className={classNames(
          'modal__input',
          { 'modal__input--error': error },
        )}
      />
      {openOptions && !error && (
        <ul className="city-select__options">
          {!loading ? (renderCitys.map(item => {
            return (
              <li
                className="city-select__option"
                key={item.Ref}
                onClick={() => {
                  // setTimeout(() => {
                  //   setSelectCity(item);
                  //   setvalueSelect(item.Description);
                  //   setOpenOptions(false);
                  // }, 0);

                  setSelectCity(item);
                  setvalueSelect(item.Description);
                  setOpenOptions(false);
                }}
                aria-hidden
              >
                {`${item.Description} (${item.AreaDescription})`}
              </li>
            );
          })) : (
            <div className="catalog__filters__loader">
              <div className="catalog__filters__loader__item"></div>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default CitySelect;

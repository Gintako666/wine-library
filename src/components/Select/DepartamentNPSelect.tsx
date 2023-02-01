/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { getDepartaments } from '../../api/NPapi';
import { actions as orderingActions } from '../../features/ordering/ordering';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useDebounce } from '../../hooks/use-debounce';

const DepartamentNPSelect: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { town, departmentNp } = useAppSelector(state => state.order);
  const [openOptions, setOpenOptions] = useState(false);
  const [valueSelect, setvalueSelect] = useState(departmentNp.ShortAddress);
  const [selectDepartaments, setSelectDepartaments] = useState<{
    ShortAddress: string
    Number: string
  }>({ ShortAddress: '', Number: '' });
  const [renderDepartaments, setRenderDepartaments] = useState<{
    ShortAddress: string
    Number: string
  }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);

  const searchCity = useDebounce(valueSelect, 1000);

  useEffect(() => {
    setLoading(true);

    if (valueSelect.length === 0) {
      setSelectDepartaments({ ShortAddress: '', Number: '' });
      dispatch(orderingActions.setDepartmentNp({ ShortAddress: '', Number: '' }));
    }
  }, [valueSelect]);

  useEffect(() => {
    setLoading(true);
    getDepartaments(town.Description, searchCity).then((departaments) => {
      if (departaments.length > 0) {
        setRenderDepartaments(departaments);
      }

      setLoading(false);

      // if (departaments.length === 0) {
      //   seterror(true);
      // }
    });

    if (searchCity.length > 0 && selectDepartaments) {
      console.log(selectDepartaments);
      dispatch(orderingActions.setDepartmentNp(selectDepartaments));
    }
  }, [searchCity]);

  return (
    <div className="city-select">
      <input
        type="text"
        value={valueSelect}
        placeholder="Введіть номер відділення"
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
          if (e.code === 'Enter' && (valueSelect.length > 0 && !error && !loading && renderDepartaments.length > 0)) {
            setSelectDepartaments(renderDepartaments[0]);
            setvalueSelect(renderDepartaments[0].ShortAddress);
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
          {!loading ? (renderDepartaments.map(item => {
            return (
              <li
                className="city-select__option"
                key={item.Number}
                onClick={() => {
                  // setTimeout(() => {
                  //   setSelectCity(item);
                  //   setvalueSelect(item.Description);
                  //   setOpenOptions(false);
                  // }, 0);

                  setSelectDepartaments(item);
                  setvalueSelect(item.ShortAddress);
                  setOpenOptions(false);
                }}
                aria-hidden
              >
                {`№${item.Number} ${item.ShortAddress}`}
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

export default DepartamentNPSelect;

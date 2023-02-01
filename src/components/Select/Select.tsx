/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

interface SelectProps {
  fn: (value: string) => void
  options: {name: string, value: string}[]
  selectOption: {name: string, value: string}
  rerender?: number
}

export const Select: React.FC<SelectProps> = ({
  fn,
  options,
  // selectOption,
  rerender,
}) => {
  const [openSlecet, setopenSlecet] = useState(false);
  const [selectOptoin, setselectOptoin] = useState(options[0]);

  useEffect(() => {
  }, [rerender]);

  useEffect(() => {
    fn(selectOptoin.value);
  }, [selectOptoin]);

  return (
    <div className="select">
      <button
        type="button"
        className="active-option"
        onClick={() => {
          setopenSlecet(prev => !prev);
        }}
      >
        {selectOptoin.name}

        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="select__item"
          style={{ transform: openSlecet ? 'rotateX(0deg)' : 'rotateX(180deg)' }}
        >
          <path d="M1.4 0.6L0 2L6 8L12 2L10.6 0.6L6 5.2L1.4 0.6Z" fill="white" />
        </svg>

      </button>
      <div
        className={classNames(
          'options',
          { 'options--open': openSlecet },
        )}
      >
        {options.map(option => {
          return (
            <button
              type="button"
              className="select__option"
              key={option.value}
              onClick={() => {
                setselectOptoin(option);
                setopenSlecet(false);
              }}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

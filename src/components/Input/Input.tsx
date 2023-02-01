import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

type InputType = {
  value: string,
  setValue: (newValue: string) => void,
  hiddenPassword?: boolean,
  sethiddenPassword?: (newValue: boolean) => void,
  placeholder: string,
  regExp?: RegExp;
  errorText: string,
};

export const Input: React.FC<InputType> = ({
  value,
  setValue,
  hiddenPassword,
  sethiddenPassword,
  placeholder,
  regExp = new RegExp(''),
  errorText,
}) => {
  const [errorInput, setErrorInput] = useState(false);
  const [accessInput, setaccessInput] = useState(false);

  useEffect(() => {
    if (value.length === 0) {
      setaccessInput(false);
      setErrorInput(false);
    }
  }, [value]);

  return (
    <div className="modal__input__wrapper">
      <input
        type={hiddenPassword ? 'password' : 'text'}
        className={classNames(
          'modal__input',
          { 'modal__input--error': errorInput },
          { 'modal__input--access': accessInput },
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setErrorInput(false);
          setaccessInput(false);
        }}
        onBlur={() => {
          if (value.length > 0) {
            if (!value.match(regExp) || (sethiddenPassword && value.length < 8)) {
              setErrorInput(true);
            } else if (!sethiddenPassword) {
              setaccessInput(true);
            }
          } else {
            setaccessInput(false);
            setErrorInput(false);
          }
        }}
      />
      {accessInput ? (
        <svg className="modal__input__access-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.3" y="0.3" width="23.4" height="23.4" stroke="#179A8A" strokeWidth="0.6" />
          <path d="M9.5 18L4.5 12.8936L6.25 11.1064L9.5 14.4255L17.75 6L19.5 7.78723L9.5 18Z" fill="#179A8A" />
        </svg>
      ) : null}
      {errorInput ? (
        <p className="modal__input__error">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 17C11.2091 17 13.2091 16.1046 14.6568 14.6568C16.1046 13.2091 17 11.2091 17 9C17 6.79088 16.1046 4.79088 14.6568 3.34314C13.2091 1.89543 11.2091 1 9 1C6.79088 1 4.79088 1.89543 3.34314 3.34314C1.89543 4.79088 1 6.79088 1 9C1 11.2091 1.89543 13.2091 3.34314 14.6568C4.79088 16.1046 6.79088 17 9 17Z" stroke="#C92A35" strokeLinejoin="round" />
            <path fillRule="evenodd" clipRule="evenodd" d="M9 14.3334C9.49092 14.3334 9.88889 13.9355 9.88889 13.4446C9.88889 12.9536 9.49092 12.5557 9 12.5557C8.50909 12.5557 8.11111 12.9536 8.11111 13.4446C8.11111 13.9355 8.50909 14.3334 9 14.3334Z" fill="#C92A35" />
            <path d="M9.00269 4.55566L9 9.889" stroke="#C92A35" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {errorText}
        </p>
      ) : null}
      {sethiddenPassword
        ? (
          <button
            type="button"
            onClick={() => {
              sethiddenPassword(!hiddenPassword);
            }}
          >
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="modal__input__show-password"
            >
              {hiddenPassword
                ? <path d="M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 13C8.24 13 6 10.76 6 8C6 5.24 8.24 3 11 3C13.76 3 16 5.24 16 8C16 10.76 13.76 13 11 13ZM11 5C9.34 5 8 6.34 8 8C8 9.66 9.34 11 11 11C12.66 11 14 9.66 14 8C14 6.34 12.66 5 11 5Z" fill="#505151" />
                : <path d="M10.83 6L14 9.16V9C14 8.20435 13.6839 7.44129 13.1213 6.87868C12.5587 6.31607 11.7956 6 11 6H10.83ZM6.53 6.8L8.08 8.35C8.03 8.56 8 8.77 8 9C8 9.79565 8.31607 10.5587 8.87868 11.1213C9.44129 11.6839 10.2044 12 11 12C11.22 12 11.44 11.97 11.65 11.92L13.2 13.47C12.53 13.8 11.79 14 11 14C9.67392 14 8.40215 13.4732 7.46447 12.5355C6.52678 11.5979 6 10.3261 6 9C6 8.21 6.2 7.47 6.53 6.8ZM1 1.27L3.28 3.55L3.73 4C2.08 5.3 0.78 7 0 9C1.73 13.39 6 16.5 11 16.5C12.55 16.5 14.03 16.2 15.38 15.66L15.81 16.08L18.73 19L20 17.73L2.27 0M11 4C12.3261 4 13.5979 4.52678 14.5355 5.46447C15.4732 6.40215 16 7.67392 16 9C16 9.64 15.87 10.26 15.64 10.82L18.57 13.75C20.07 12.5 21.27 10.86 22 9C20.27 4.61 16 1.5 11 1.5C9.6 1.5 8.26 1.75 7 2.2L9.17 4.35C9.74 4.13 10.35 4 11 4Z" fill="#505151" />}
            </svg>
          </button>
        ) : null}
    </div>
  );
};

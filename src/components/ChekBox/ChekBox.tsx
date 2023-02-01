import classNames from 'classnames';
import React from 'react';

type CheckBoxProps = {
  isActive: boolean;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ isActive }) => {
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

import * as React from 'react';
import classNames from 'classnames';

interface CircleCheckboxProps {
  activeCheckbox: boolean
  fn: () => void
}

export const CircleCheckbox: React.FunctionComponent<CircleCheckboxProps> = ({
  activeCheckbox,
  fn,
}) => {
  return (
    <button
      type="button"
      className={classNames(
        'circle-checkbox',
        { 'circle-checkbox--active': activeCheckbox },
      )}
      aria-label="checkbox"
      onClick={() => fn()}
    />
  );
};

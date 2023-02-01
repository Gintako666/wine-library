import * as React from 'react';
import { actions as warningActions } from '../../features/store/warning';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

const WarningModal: React.FunctionComponent = () => {
  const { text, active } = useAppSelector(state => state.warning);
  const dispatch = useAppDispatch();

  return active ? (
    <div className="warning-modal">
      {text}

      <button
        type="button"
        className="warning-modal__close"
        onClick={() => {
          dispatch(warningActions.remove());
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="white" />
        </svg>

      </button>
    </div>
  ) : null;
};

export default WarningModal;

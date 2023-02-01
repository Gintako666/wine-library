/* eslint-disable max-len */
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
// import { AppDispatchOrderingStore, RootStateOrderingStore } from '../app/';
import { AppDispatch, RootState } from '../app/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

// export const useAppSelectorOrderingStore: TypedUseSelectorHook<RootStateOrderingStore> = useSelector;
// export const useAppDispatchOrderingStore: () => AppDispatchOrderingStore = useDispatch;

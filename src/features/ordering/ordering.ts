/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityType } from '../../types/CityType';

type InitialState = {
  delivery: {
    id: number,
    type: string,
    price: number,
  },
  userInfo: {
    lastName: string,
    firstName: string,
    tel: string,
    email: string,
  }
  town: CityType,
  adress: {
    SettlementRef: string,
    Present: string,
  },
  departmentNp: {
    ShortAddress: string
    Number: string
  },
  price: number,
  payment: {
    type: string,
    id: number,
  },
  comment: string | null,
  discount: number,
};

const initialState: InitialState = {
  delivery: JSON.parse(sessionStorage.getItem('selectedDelivery') || '{"type":"pickup","price":0,"id":1}'),
  town: { Description: '', Ref: '', AreaDescription: '' },
  adress: {
    SettlementRef: '',
    Present: '',
  },
  departmentNp: {
    ShortAddress: '',
    Number: '',
  },
  price: 0,
  payment: JSON.parse(sessionStorage.getItem('selectedPayment') || '{"id":1,"type":"cash"}'),
  comment: null,
  discount: 0,
  userInfo: {
    lastName: '',
    firstName: '',
    tel: '',
    email: '',
  },
};

const orderingSlice = createSlice({
  name: 'ordering',
  initialState,
  reducers: {
    setUserInfo: (value, action: PayloadAction<{
      lastName: string,
      firstName: string,
      tel: string,
      email: string,
    }>) => {
      value.userInfo = action.payload;
    },
    setDiscount: (value, action: PayloadAction<number>) => {
      value.discount = action.payload;
    },
    setDelivery: (value, action: PayloadAction<{type: string, price: number, id: number}>) => {
      value.delivery = action.payload;
      if (value.price > 1000 && action.payload.type === 'city') {
        value.delivery.price = 0;

        return;
      }

      if (value.price > 2500 && action.payload.type === 'np') {
        value.delivery.price = 0;
      }
    },
    setTown: (value, action: PayloadAction<CityType>) => {
      value.town = action.payload;
    },
    setAdress: (value, action: PayloadAction<{
      SettlementRef: string,
      Present: string,
    }>) => {
      value.adress = action.payload;
    },
    setDepartmentNp: (value, action: PayloadAction<{
      ShortAddress: string
      Number: string
    }>) => {
      value.departmentNp = action.payload;
    },
    setPrice: (value, action: PayloadAction<number>) => {
      value.price = action.payload;

      if (value.delivery.type === 'city') {
        if (value.price > 1000) {
          value.delivery.price = 0;
        } else {
          value.delivery.price = 50;
        }
      }

      if (value.delivery.type === 'np') {
        if (value.price > 2500) {
          value.delivery.price = 0;
        } else {
          value.delivery.price = 70;
        }
      }
    },
    setPayment: (value, action: PayloadAction<{
      id: 1,
      type: 'cash'
    } | {
      id: 2,
      type: 'card'
    }>) => {
      value.payment = action.payload;
    },
    setComment: (value, action: PayloadAction<string>) => {
      value.comment = action.payload;
    },
  },
});

export const { actions } = orderingSlice;

export default orderingSlice.reducer;

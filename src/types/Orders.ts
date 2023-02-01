// import { ProductWine } from './ProductWine';

import { ProductWine } from './ProductWine';

// export type Orders = {
// number: string;
// date: string;
// price: string;
// wines: ProductWine[];
// contact: {
//   town: string;
//   adress: string;
//   fullname: string;
//   tel: string;
//   payment: {
//     name: string;
//     status: boolean;
//   };
// };
//   userId: number;
//   orderDate: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   deliveryTypeId: number;
//   town: string;
//   address: string;
//   paymentTypeId: number;
//   discountSum: number;
//   orderStatus: number;
//   orderDetails: [{ wine_id: number; quantity: number; price: number }];
// };

export type Orders = {
  id?: number,
  userId: number | null;
  orderDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deliveryTypeId: number;
  town: string;
  address: string;
  paymentTypeId: number;
  discountSum: number;
  orderStatus: number;
  orderDetails: { wine_id: number; quantity: number; price: number }[];
};

export type OrdersGet = {
  id?: number,
  userId: number | null;
  orderDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deliveryTypeId: number;
  town: string;
  address: string;
  paymentTypeId: number;
  discountSum: number;
  orderStatus: number;
  orderDetails: { wine: ProductWine; quantity: number; price: number }[];
};

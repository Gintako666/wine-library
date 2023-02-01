/* eslint-disable no-console */
import base64 from 'base-64';
// import axios from 'axios';
import { Countries } from '../types/Countries';
import { DishCategoris } from '../types/DishCategoris';
import { Orders, OrdersGet } from '../types/Orders';
import { ProductWine } from '../types/ProductWine';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

// ======================================
// Get wines
// ======================================

export const getWines = (isCatalog: boolean) => {
  if (isCatalog) {
    return client.get<ProductWine[]>('/wines');
  }

  return client.get<ProductWine[]>('/wines?minDiscount=0');
};

export const getWineInfo = (name: string) => {
  return client.get<ProductWine[]>(`/wines?search=${name}`);
};

export const getWinesSearch = (searchParams: string, isCatalog: 'catalog' | 'promotions' | 'gastrosommelier') => {
  if (isCatalog === 'catalog') {
    return client.get<ProductWine[]>(`/wines?${searchParams}`);
  }

  if (isCatalog === 'promotions') {
    return client.get<ProductWine[]>(`/wines?minDiscount=0&${searchParams}`);
  }

  return client.get<ProductWine[]>(`/wines?${searchParams}`);
};

// ======================================
// Get Count wines for pagination
// ======================================

export const getTotalCount = (searchParams: string, typeFilter: string) => {
  if (typeFilter !== 'promotions') {
    return client.get<number>(`/wines/quantity?${searchParams}`);
  }

  return client.get<number>(`/wines/quantity?${searchParams}&minDiscount=0`);
};

// ======================================
// Get sort params
// ======================================

export const getCountries = () => {
  return client.get<Countries[]>('/countries');
};

export const getColors = () => {
  return client.get<Countries[]>('/colors');
};

export const getSorts = () => {
  return client.get<Countries[]>('/sorts');
};

export const getManufacturers = () => {
  return client.get<Countries[]>('/manufacturers');
};

export const getYears = () => {
  return client.get<number[]>('/wines/years');
};

export const getDishsCategoris = () => {
  return client.get<DishCategoris[]>('/dish-categories');
};

// ======================================
// User
// ======================================

export const sendNewUserInfo = (login: string, email: string, password: string) => {
  // localStorage.setItem('user', `${base64.encode(`${email}:${password}`)}`);

  return client.post<User>('/register', { login, email, password });
};

export const sendLogin = (email: string, password: string) => {
  return fetch('http://winelibrary-env.eba-vbamhmxv.eu-west-1.elasticbeanstalk.com/login', {
    credentials: 'include',
    headers: {
      Authorization: `Basic ${base64.encode(`${email}:${password}`)}`,
    },
  }).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error('Error');
    }

    return response.json();
  });
};

export const autoAuthorization = (data: string) => {
  return fetch('http://winelibrary-env.eba-vbamhmxv.eu-west-1.elasticbeanstalk.com/login', {
    credentials: 'include',
    headers: {
      Authorization: `Basic ${data}`,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Error');
    }

    return response.json();
  });
};

export const setNewUserData = (
  id: number,
  firstname: string,
  lastname: string,
  phone: string,
  birthday: string,
) => {
  console.log(JSON.stringify({
    firstname,
    lastname,
    phone,
    birthday,
  }));

  return client.put<User>(`/users/${id}`, {
    firstname,
    lastname,
    phone,
    birthday,
  });
};

export const getUserData = (id: number) => {
  return client.get<User>(`/users/${id}`);
};

// ======================================
// Orders get and push in server
// ======================================

export const sendNewOrder = (order: Orders) => {
  return client.post('/orders', order);
};

export const getUserOrder = (email: string) => {
  console.log(`/orders?email=${email}`);

  return client.get<OrdersGet[]>(`/orders?email=${email}`);
};

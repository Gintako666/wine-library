import { ProductWine } from '../types/ProductWine';
import { client } from '../utils/fetchClient';

export const getWines = () => {
  return client.get<ProductWine[]>('/wine');
};

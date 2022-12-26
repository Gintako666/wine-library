type rate = 1 | 2 | 3 | 4 | 5;

export interface ProductWine {
  id: number;
  name: string;
  size: string;
  price: string;
  rate: rate;
  info: string;
  type: string,
  country: string,
  img: string,
  year: string
}

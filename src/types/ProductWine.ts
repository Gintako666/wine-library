export interface ProductWine {
  id: number,
  pictureId: number,
  name: string,
  color: {
    id: number,
    name: string
  },
  sweetness: {
    id: number,
    name: string,
  },
  country: {
    id: 1,
    name: string,
  },
  region: {
    id: 1,
    name: string,
    description: string,
  };
  price: number,
  volume: number,
  year: number,
  composition: null,
  discount: number,
  description: string,
  rang: number,
  sort: {
    id: number,
    name: string,
  }

  counter: number,
}

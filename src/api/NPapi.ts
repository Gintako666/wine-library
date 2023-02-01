import { CityType } from '../types/CityType';
import { DepartamentNP } from '../types/DepartamentNPType';
import { StreetsType } from '../types/StreetsType';
import { NPclient } from '../utils/novaPoshtaFetch';

export const getCitys = (name: string) => {
  return NPclient.post<CityType[]>({
    apiKey: '',
    modelName: 'Address',
    calledMethod: 'getSettlements',
    methodProperties: {
      FindByString: name,
      Limit: '20',
    },
  });
};

export const getStreets = (name: string, ref: string) => {
  return NPclient.post<StreetsType>({
    apiKey: '',
    modelName: 'Address',
    calledMethod: 'searchSettlementStreets',
    methodProperties: {
      StreetName: name,
      SettlementRef: ref,
      Limit: '20',
    },
  });
};

export const getDepartaments = (CityName: string, WarehouseId: string) => {
  return NPclient.post<DepartamentNP>({
    apiKey: '',
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      WarehouseId,
      CityName,
      Limit: '20',
    },
  });
};

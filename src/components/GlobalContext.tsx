import React, { useState, ReactNode, useEffect } from 'react';
import { ProductWine } from '../types/ProductWine';

type ContextValue = {
  lang: string,
  setlang: React.Dispatch<React.SetStateAction<string>>,
  products: ProductWine[],
};

export const GlobalContext = React.createContext<ContextValue>({
  lang: '',
  setlang: () => {},
  products: [],
});

type Props = {
  children: ReactNode
};

export const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  // const [lang, setlang] = useState(window.navigator.language === 'uk' ? 'uk' : 'en');
  const [lang, setlang] = useState('uk');
  const [products] = useState<ProductWine[]>([
    {
      id: 1,
      name: 'Nau Mai Sauvignon Blanc',
      size: '1 л',
      price: '400$',
      rate: 3,
      info: 'Насич’який смак, з фруктово-ягідною солодкістю та дрібною танінною структурою, нотами ванільного бісквіта, прянощів, гвоздики, м’яти, шоколаду.',
      type: 'Біле Сухе',
      country: 'Іспанія',
      img: './img/wine2.svg',
      year: '2017 рік',
    },
    {
      id: 2,
      name: 'Nau Mai Sauvignon Blanc',
      size: '1 л',
      price: '400$',
      rate: 3,
      info: 'Насичене червоне вино від найвідооздики, м’яти, шоколаду.',
      type: 'Біле Сухе',
      country: 'Іспанія',
      img: '../../img/wine2.svg',
      year: '2014 рік',
    },
    {
      id: 3,
      name: 'Nau Mai Sauvignon Blanc',
      size: '1 л',
      price: '400$',
      rate: 3,
      info: 'Насичене червоне344444444444444444444444йвідомішого австралійського виробника Hardys. М’який смак, з фруктово-ягідною солодкістю та дрібною танінною структурою, нотами ванільного бісквіта, прянощів, гвоздики, м’яти, шоколаду.',
      type: 'Біле Сухе',
      country: 'Іспанія',
      img: '../../../img/wine2.svg',
      year: '2015 рік',
    },
    {
      id: 4,
      name: 'Nau Mai Sauvignon Blanc',
      size: '1 л',
      price: '400$',
      rate: 3,
      info: 'Насичене червоне вино від найвідомішого австралійського виробника Hardys. М’який смак, з фруктово-ягідною солодкістю та дрібною танінною структурою, нотами ванільного бісквіта, прянощів, гвоздики, м’яти, шоколаду.',
      type: 'Біле Сухе',
      country: 'Іспанія',
      img: '../img/wine2.svg',
      year: '2022 рік',
    },
  ]);

  useEffect(() => {

  }, []);

  const contextValue:ContextValue = {
    lang,
    setlang,

    products,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

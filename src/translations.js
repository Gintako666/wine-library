const translations = {
  en: {
    'header.cart': 'Cart',
    'header.favorites': 'Favorites',
    'log-in': 'Log in',
    registration: 'Registration',
    'nav.catalog': 'Catalog',
    'nav.gastrosommelier': 'Gastrosommelier',
    'nav.gift-sets': 'Gift sets',
    'nav.promotions': 'Promotions',
  },
  uk: {
    'header.search': 'Пошук',
    'header.cart': 'Кошик',
    'log-in': 'Вхід',
    'nav.catalog': 'Каталог',
    'nav.gastrosommelier': 'Гастросомельє',
    'nav.gift-sets': 'Подарункові набори',
    'nav.promotions': 'Акції',
  },
};

export const getTranslation = (text, lang) => {
  return translations[lang][text];
};

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import SlickSlider from 'react-slick';
import Card from '../Card/Card';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SliderProps {
  products: any[];
  settingsSlider: {
    'dots': boolean,
    infinite: boolean,
    speed: number,
    slidesToShow: number,
    slidesToScroll: number,
    autoplay?: boolean,
    autoplaySpeed?: number,
  }
}

const Slider: React.FunctionComponent<SliderProps> = ({
  products,
  settingsSlider,
}) => {
  return (
    <SlickSlider {...settingsSlider}>
      {products.map(product => {
        return (<Card product={product} key={product.id} />);
      })}
    </SlickSlider>
  );
};

export default Slider;

/* eslint-disable no-console */
import React, { useState } from 'react';
import { ProductWine } from '../../types/ProductWine';

interface CardProps {
  product: ProductWine
}

type PropsRate = {
  stars: number
};

const Rate: React.FC<PropsRate> = ({ stars }) => {
  const [mouseOver, setmouseOver] = useState(-1);
  const rate: number[] = [0, 0, 0, 0, 0];

  return (
    <div
      className="card__rate"
    >
      {rate.map((_itemRate, index) => (
        <svg
          key={Math.random()}
          width="22"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseOver={() => {
            setmouseOver(index);
          }}
          onMouseOut={() => {
            setmouseOver(-1);
          }}
          onClick={() => {
            console.log(mouseOver + 1);
          }}
        >
          <path
            d="M3.61147 15.4167L4.89793 9.85521L0.583344 6.11458L6.28334 5.61979L8.50001 0.375L10.7167 5.61979L16.4167 6.11458L12.1021 9.85521L13.3886 15.4167L8.50001 12.4677L3.61147 15.4167Z"
            stroke="#bf9a6d"
            fill={index <= mouseOver
              ? 'yellow'
              : (index >= stars && '#000') || '#bf9a6d'}
            // fill={index <= mouseOver ? '#000' : '#bf9a6d'}
          />
        </svg>
      ))}
    </div>
  );
};

const Card: React.FunctionComponent<CardProps> = ({ product }) => {
  return (
    <div className="card">
      <Rate stars={product.rate} />

      <img src={product.img} alt="Wine" className="card__img" />
      <h5 className="card__name">
        {product.name }
        ,
        <br />
        {product.size}
      </h5>
      <h4 className="card__price">{product.price}</h4>
      <button
        type="button"
        className="card__button"
        onClick={() => {}}
      >
        Купити
      </button>
    </div>
  );
};

export default Card;

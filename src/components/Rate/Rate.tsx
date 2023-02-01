/* eslint-disable no-console */
import React, { useState } from 'react';

type PropsRate = {
  stars: number
};

export const Rate: React.FC<PropsRate> = ({ stars }) => {
  const [mouseOver, setmouseOver] = useState(stars);
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
          // onMouseOver={() => {
          //   setmouseOver(index);
          // }}
          // onMouseOut={() => {
          //   setmouseOver(-1);
          // }}
          onClick={() => {
            setmouseOver(index + 1);
          }}
        >
          <path
            d="M3.61147 15.4167L4.89793 9.85521L0.583344 6.11458L6.28334 5.61979L8.50001 0.375L10.7167 5.61979L16.4167 6.11458L12.1021 9.85521L13.3886 15.4167L8.50001 12.4677L3.61147 15.4167Z"
            stroke="#bf9a6d"
            // fill={!mouseOver
            //   ? (index <= mouseOver ? '#bf9a6d' : '#bf9a6d') || '#000'
            //   : (index >= stars && '#000') || '#bf9a6d'}
            fill={index < mouseOver ? '#bf9a6d' : '#000'}
          />
        </svg>
      ))}
    </div>
  );
};

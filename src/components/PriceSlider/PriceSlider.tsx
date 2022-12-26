/* eslint-disable no-console */
import React from 'react';

// import a from '../../scripts/nouislider.mjs';

type PriceSliderProps = {
  min: number,
  max: number,
  start: number,
  end: number,
  setstart: React.Dispatch<React.SetStateAction<number>>,
  setend: React.Dispatch<React.SetStateAction<number>>,
};

const PriseClider: React.FunctionComponent<PriceSliderProps> = ({
  min,
  max,
  start,
  end,
  setstart,
  setend,
}) => {
  const minVal = (start / max) * 100;
  const maxVal = (100 - (end / max) * 100);

  return (
    <>
      <div className="price-slider">
        <div className="slider-progres" style={{ left: `${minVal}%`, right: `${maxVal}%` }}></div>
        <div className="slider-input">
          <input
            type="range"
            value={start}
            onChange={(e) => {
              setstart(+e.target.value);
            }}
            min={min}
            max={max}
            step={200}
            onMouseUp={() => {
              if (start + 1000 > end) {
                setstart(end - 1000);
              }
            }}
          />
        </div>
        <div className="slider-input">
          <input
            type="range"
            value={end}
            onChange={(e) => {
              // if (start + 500 > end) {
              //   setstart(+e.target.value);
              // } else {
              //   console.log(e.target.value);
              setend(+e.target.value);
              // }
            }}
            step={200}
            min={min}
            max={max}
            onMouseUp={() => {
              if (start > end - 1000) {
                setend(start + 1000);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PriseClider;

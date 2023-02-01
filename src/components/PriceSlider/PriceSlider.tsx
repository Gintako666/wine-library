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
        <div
          className="slider-progres"
          style={start > end
            ? { right: `${100 - minVal}%`, left: `${100 - maxVal}%` }
            : { left: `${minVal}%`, right: `${maxVal}%` }}
        >
        </div>
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
              if (start > end) {
                setstart(end);
                setend(start);
              }
            }}
          />
        </div>
        <div className="slider-input">
          <input
            type="range"
            value={end}
            onChange={(e) => {
              setend(+e.target.value);
              // }
            }}
            step={200}
            min={min}
            max={max}
            onMouseUp={() => {
              if (start > end) {
                setstart(end);
                setend(start);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PriseClider;

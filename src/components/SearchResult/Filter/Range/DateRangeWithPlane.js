import React, { useEffect, useState } from 'react';
import planeLogo from '../../../../assets/media/flight-search/plane2.svg';
import './DateRangeWithPlane.scss';
import RCSlider from 'rc-slider';
import {formatDate} from '../../../../utils';

const DateRangeWithPlane = ({
  from,
  to,
  fromValue,
  toValue,
  onChange,
}) => {
  const [values, setValues] = useState({ from: fromValue, to: toValue });
  
  useEffect(() => {
    setValues({ from: fromValue, to: toValue });
  }, [from, to]);

  const handleChangeFrom = (val) => {
    setValues((vals) => {
      return { ...vals, from: val };
    });
  };

  const handleChangeTo = (val) => {
    setValues((vals) => {
      return { ...vals, to: val };
    });
  };

  const handleOnAfterChangeFrom = (val) => {
    onChange('from', val);
  };

  const handleOnAfterChangeTo = (val) => {
    onChange('to', val);
  };

  return (
    <div className='fs-search-filter-date-range'>
        <div className='fs-search-filter-date-range__head'>
          <span className='fs-search-filter-date-range__head__text'>{from.city}</span>
          <img className='fs-search-filter-date-range__head__icon' src={planeLogo} width={24} />
          <span className='fs-search-filter-date-range__head__text'>{to.city}</span>
        </div>
      <div style={{marginBottom: 16}}>
        <span className='fs-search-filter-date-range__city fs-search-filter-date-range--small-text'>{from.label}</span>
        <div className='fs-search-filter-date-range__values'>
          <span className='fs-search-filter-date-range--small-text'>от {timeFormatted(values.from[0])}</span>
          <span className='fs-search-filter-date-range--small-text'>до {timeFormatted(values.from[1])}</span>
        </div>
        <div className='fs-search-filter-range-wrapper'>
          <RCSlider
            className='fs-search-filter-range'
            onAfterChange={handleOnAfterChangeFrom}
            step={100}
            min={from.min}
            max={from.max}
            onChange={handleChangeFrom}
            value={values.from}
            range
          />
        </div>
      </div>
      <div>
        <span className='fs-search-filter-date-range__city fs-search-filter-date-range--small-text'>{to.label}</span>
        <div className='fs-search-filter-date-range__values'>
          <span className='fs-search-filter-date-range--small-text'>от {timeFormatted(values.to[0])}</span>
          <span className='fs-search-filter-date-range--small-text'>до {timeFormatted(values.to[1])}</span>
        </div>
        <div className='fs-search-filter-range-wrapper'>
          <RCSlider
            className='fs-search-filter-range'
            range
            onAfterChange={handleOnAfterChangeTo}
            step={100}
            min={to.min}
            max={to.max}
            onChange={handleChangeTo}
            value={values.to}
          />
        </div>
      </div>
    </div>
  );
};

function timeFormatted(val) {
  return formatDate(new Date(val),'HH:mm d MMM',)
}

export default DateRangeWithPlane;

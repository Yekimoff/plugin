import React from 'react';
import planeLogo from '../../../../assets/media/flight-search/plane2.svg';
import TimeRange from './TimeRange';

export const TimeRangeWithPlane = ({
  from,
  to,
  ...props
}) => {
  return (
    <div className="fs-search-filter-date-range">
        <div className='fs-search-filter-date-range__head'>
          <span className='fs-search-filter-date-range__head__text'>{from.city}</span>
          <img className='fs-search-filter-date-range__head__icon' src={planeLogo} width={24} />
          <span className='fs-search-filter-date-range__head__text'>{to.city}</span>
        </div>
      <TimeRange {...props} />
    </div>
  );
};

export default TimeRangeWithPlane;
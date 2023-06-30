import React from 'react';
import RCSlider from 'rc-slider';
import './Range.scss';

const Range = (props) => {
  return (
    <div className='fs-search-filter-range-wrapper'>
      <RCSlider range {...props} className='fs-search-filter-range'/>
    </div>
  );
};

export default Range;

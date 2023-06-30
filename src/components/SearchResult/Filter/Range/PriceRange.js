import React from 'react';
import { throttle } from 'lodash';
import  './PriceRange.scss';
import { formatPrice } from '../../../../utils';
import RCSlider from 'rc-slider';

const PriceRange = ({
  min,
  max,
  onChange,
  value,
  ...props
}) => {
  const [valuesS, setValues] = React.useState(value);


  React.useEffect(() => {
    setValues(value);
  }, [value]);

  const formattedValues = React.useMemo(() => {
    return valuesS.map((val) => formatPrice(val));
  }, [valuesS]);
  
  const setValuesThrottled = React.useCallback(
    throttle((val) => {
      setValues(val);
    }, 20),
    []
  );

  const handleChange = (vals) => {
    setValuesThrottled(vals);
  };
  return (
    <div className='fs-search-filter__price-range'>
      <div className='fs-search-filter__price-range__desc'>
        <span className='fs-search-filter__price-range__desc__text'>от {formattedValues[0]}</span>
        <span className='fs-search-filter__price-range__desc__text'>до {formattedValues[1]}</span>
      </div>
      <div className='fs-search-filter-range-wrapper'>
        <RCSlider
          className='fs-search-filter-range'
          // {...props}
          onAfterChange={onChange}
          onChange={handleChange}
          // defaultValue={values}
          range
          value={valuesS}
          min={min}
          max={max}
          allowCross={false}
          draggableTrack
        />
      </div>
    </div>
  );
};

export default PriceRange;
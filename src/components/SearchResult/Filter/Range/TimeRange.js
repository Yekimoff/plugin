import React from 'react';
import './TimeRange.scss';
import {formatDuration} from '../../../../utils';
import RCSlider from 'rc-slider';
import { throttle } from 'lodash';

const TimeRange = ({
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
    return valuesS.map((val) => formatDuration(val));
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
    <div>
      <div className='fs-search-filter__price-range__desc'>
        <span className='fs-search-filter__price-range__desc__text'>от {formattedValues[0]}</span>
        <span className='fs-search-filter__price-range__desc__text'>до {formattedValues[1]}</span>
      </div>
      <div className='fs-search-filter-range-wrapper'>
        <RCSlider
          className='fs-search-filter-range'
          range
          {...props}
          onChange={handleChange}
          value={valuesS}
          min={min}
          max={max}
          allowCross={false}
        />
      </div>
    </div>
  );
};

export default TimeRange;
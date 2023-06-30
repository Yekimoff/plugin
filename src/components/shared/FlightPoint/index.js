import React from 'react';
import './FlightPoint.scss'

export default function FlightPoint({upperText,...props}) {
  return (
    <div {...props} className='fs-ui-flight-point'>
    {upperText && <span className='fs-ui-flight-point__upper-text'>{upperText}</span>}
    <div className='fs-ui-flight-point__inner-round'/>
  </div>
  );
}
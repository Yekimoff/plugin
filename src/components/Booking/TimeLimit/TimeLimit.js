import React from 'react';
import './TimeLimit.scss';
import clockIcon from '../../../assets/media/booking/clock.svg';

export default function TimeLimit(props) {
  return (
    <div className='fs-booking-time-limit'>
      <img  className='fs-booking-time-limit__icon' src={clockIcon}/>
      <span className='fs-booking-time-limit__text'>
        После оформления бронирования у вас будет{' '}
        <strong>{props.duration}</strong> на оплату
      </span>
    </div>
  );
}
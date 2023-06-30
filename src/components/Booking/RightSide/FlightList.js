import React from 'react';
import './FlightList.scss';
import {formatDate,formatDuration} from '../../../utils'

export default function FlightsList(props) {
  return (
    <div className='fs-booking-right-side-flight-list'>
    {props.items.map((x,key) => {
      const from = x.segments[0];
      const to = x.segments[x.segments.length - 1];
      const fromDate = formatDate(new Date(`${from.fromDate} ${from.fromTime}`),'dd MMM, HH:mm');
      const toDate = formatDate(new Date(`${to.toDate} ${to.toTime}`),'dd MMM, HH:mm');
      
      const formattedDuration = formatDuration(x.duration);

      return  (
        <div key={key} className='fs-booking-right-side-flight-list__item'>
          <div className='item-row item-row--first'>
            <span className='item-row__text'>
              {fromDate}
            </span>
            <span className='item-row__text'>
              {toDate}
            </span>
          </div>
          <div className='item-row item-row--second'>
            <span className='item-row__text item-row__text--blue'>
              {from.from.code}
            </span>
            <div className='item-row item-row__line'>
              <span className='item-row item-row__line__text'>
                {formattedDuration}
              </span>
            </div>
            <span className='item-row__text item-row__text--blue'>
              {to.to.code}
            </span>
          </div>
          <div className='item-row'>
            <span className='item-row__text'>
              {from.from.city}
            </span>
            <span className='item-row__text'>
              {to.to.city}
            </span>
          </div>
      </div>
      );
    })}
    </div>
  )
}

function getFormattedDate(date, time) {
  return moment(`${date} ${time}`).format('DD MMM, HH:mm');
}
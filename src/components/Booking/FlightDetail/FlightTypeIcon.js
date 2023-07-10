import React from 'react';
import planeSrc from '../../../assets/media/flight-search/plane.svg';


export default function FlightTypeIcon(props) {
  return (
    <div
      className={`fs-search-flight-item__right-side__head__right__flight-type ${props.className || ''}`}
      style={{background: props.flightType === 'Charter' ? '#FFF3CD' : '#E3EAFF' }}
    >
      <img src={planeSrc} />
      <span>{props.flightType  === 'Charter' ? 'Чартерный' : 'Регулярный'}</span>
    </div>
  );
}
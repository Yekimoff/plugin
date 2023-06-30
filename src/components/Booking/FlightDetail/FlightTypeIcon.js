import React from 'react';
import planeSrc from '../../../assets/media/flight-search/plane.svg';


export default function FlightTypeIcon(props) {
  return (
    <div
      className={`fs-search-flight-item__right-side__head__right__flight-type ${props.className || ''}`}
      style={{background: props.flightType === 'Regular' ? '#E3EAFF' : '#FFF3CD'}}
    >
      <img src={planeSrc} />
      <span>{props.flightType  === 'Regular' ? ' Регулярный' : 'Чартерный'}</span>
    </div>
  );
}
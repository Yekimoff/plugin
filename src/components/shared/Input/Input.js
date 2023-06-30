import React from 'react';
import './Input.scss';

export default function Input(props) {
  return (    
    <div className={`fs-ui-input__container`}>
      <label className='fs-ui-input__label fs-ui-input__label--active'>{props.label}</label>
      <input className='fs-ui-input__input' />
      {props.code && <span className='fs-ui-input__code'>{props.code}</span>}
    </div>
  )
}
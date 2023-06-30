import React from 'react';
import './ContactInformation.scss';
import Field from '../../shared/Field';

export default function ContactInformation() {
  return (
    <div className='fs-booking-block'>
      <span className='fs-booking-block__title'>Контактная информация</span>
      <div className='fs-booking-contact-information-content'>
        <Field
          name="name"
          style={{ width: '100%' }}
          label="Имя"
        />
        <Field
          label="Телефон"
          name="phone"
          style={{ width: '100%' }}
        />
        <Field
          label="Email"
          name="email"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}
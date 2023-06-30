import React from 'react';
import './ExtraServices.scss';
import PrintServiceTemplate from './Templates/PrintServiceTemplate';
import RefundServiceTemplate from './Templates/RefundServiceTemplate';
import SmsServiceTemplate from './Templates/SmsServiceTemplate';

const ITEMS = {
  addictionalServices: [
    {
      id: '4c6548f1-8f44-4cfc-be04-e27f8593de47',
      type: 'SMS_Service',
      amount: 99,
      basePrice: 99,
      subAgentExtraCharge: 0,
      checked: false
    },
    {
      id: 'c257ce5c-c2cf-44c4-b301-1ef321a8e507',
      type: 'Return_Guarantee',
      amount: 290,
      basePrice: 290,
      subAgentExtraCharge: 0,
      checked: false
    },
    {
      id: '91bf9f0a-6c29-4964-8930-820e54841835',
      type: 'Payment_Receipt',
      amount: 75,
      basePrice: 75,
      subAgentExtraCharge: 0,
      checked: false
    }
  ]
}




export default function AddictionalServices() {

  const onClick = (index, checked) => {
  };

  return !!ITEMS.addictionalServices.length ? (
    <div className='fs-booking-block fs-extra-services-block'>
      <span className='fs-booking-block__title'>Дополнительные услуги</span>
      <span className='fs-booking-block__description'>
        Сделайте Ваше путешествие наиболее комфортным и создайте для себя
        максимум удобств с помощью дополнительных услуг.
      </span>
      <div className='fs-extra-services-block__list'>
        {ITEMS.addictionalServices.map((x, index) => (
          <React.Fragment key={x.id}>
            {getTemplate({ ...x, index }, onClick)}
          </React.Fragment>
        ))}
      </div>
    </div>
  ) : null;
}

function getTemplate(x, cb) {
  switch (x.type) {
    case 'SMS_Service':
      return <SmsServiceTemplate {...x} onClick={cb} />;
    case 'Return_Guarantee':
      return <RefundServiceTemplate {...x} onClick={cb} />;
    case 'Payment_Receipt':
      return <PrintServiceTemplate {...x} onClick={cb} />;
    default:
      return null;
  }
}

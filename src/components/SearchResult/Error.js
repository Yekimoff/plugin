import React from 'react';
import Notification from './Notification';

const Error = () => (
  <Notification
    subTitle="Это могло произойти из-за следующих причин:"
    title="Билеты не найдены"
  >
    <Notification.Ul>
      <li>
        На эти даты все билеты куплены. Попробуйте поискать билеты на соседние
        даты
      </li>
      <li>Неправильно выбраны даты. Проверьте год вылета и прилета</li>
      <li>В этот аэропорт не летают самолёты</li>
    </Notification.Ul>
  </Notification>
);

export default Error;

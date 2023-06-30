import React from 'react';
import { DoubleView } from './double-view';

import {
  CalendarProvider,
} from './context';

/** Кастомный каледарь для выбора даты вылета и прилёта*/
export const Calendar = (props) => (
  <CalendarProvider {...props}>
    <DoubleView />
  </CalendarProvider>
);


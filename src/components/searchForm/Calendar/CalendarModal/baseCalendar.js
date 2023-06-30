import React from 'react';
import { Table } from './table';
import { Month } from './month';
import { BaseCalendarWrapper } from './styles';


export const BaseCalendar = ({
  month,
  ...props
}) => {
  return (
    <BaseCalendarWrapper {...props}>
      <Month {...month} />
      <Table index={month.index} />
    </BaseCalendarWrapper>
  );
};

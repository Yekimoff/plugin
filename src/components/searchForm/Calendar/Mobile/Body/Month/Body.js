import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useCalendar } from '../../useCalendar';
import {changeDates} from '../../../../../../store/slices/FligthsSlice';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: black;
`;

const DayDescription = styled.div`
  font-weight: 600;
  color: #9ea9b7;
  text-transform: uppercase;
  padding-bottom: 12px;
  font-family:Open sans;
`;

const Day = styled.div`
  padding: 12px 0;
`;

const weekDays = moment.weekdaysShort(true);

const Body = ({ focus, days, testChange }) => {
  const { setDate, direction } = useCalendar();
  return ( 
    <Wrapper>
      {weekDays.map((value, key) => (
        <DayDescription key={key}>{value}</DayDescription>
      ))}

      {days.map((item, key) => (
        
        <Day
          onClick={() => {
            if (!item.disabled && item.isVisible) {
              testChange(item.dateStr, direction)
              setDate(item.dateStr, direction);
            }
          }}
          key={key}
          style={{
            background: createBackground(item),
            color: createFontColor(item),
            visibility: item.isVisible ? 'visible' : 'hidden',
          }}
        >

          {item.value}
        </Day>
      ))}
    </Wrapper>
  );
};

function createBackground(day) {
  if (day.selected) {
    return '#4872f2';
  }
  if (day.isBetween) {
    return '#EDF1FE';
  }
  return 'white';
}

function createFontColor(day) {
  if (day.disabled) return 'rgb(185, 185, 185)';
  return day.selected ? 'white' : 'black';
}

export default Body;

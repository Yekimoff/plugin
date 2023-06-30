import React from 'react';
import MonthSelect from './MonthSelect';
import YearSelect from './YearSelect';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #ffffff;
  width: calc(100% - 40px);
  height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Head = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  return (
    <Wrapper>
      <MonthSelect
        onDecrease={decreaseMonth}
        onIncrease={increaseMonth}
        onSelect={(value) => changeMonth(value)}
        value={date.getMonth()}
      />
      <YearSelect onSelect={changeYear} year={date.getFullYear()} />
    </Wrapper>
  );
};

export default Head;

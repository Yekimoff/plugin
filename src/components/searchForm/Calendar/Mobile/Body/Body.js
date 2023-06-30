import React from 'react';
import styled from 'styled-components';
import Month from './Month';
import { useCalendar } from '../useCalendar';

const Wrapper = styled.div`
  padding: 0 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Body = ({direction, testChange}) => {
  const { months } = useCalendar();
  return (
    <Wrapper>
      {months.map((item, key) => (
        <Month key={key} direction={direction} testChange={testChange} {...item} />
      ))}
    </Wrapper>
  );
};

export default Body;

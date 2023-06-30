import React from 'react';
import styled from 'styled-components';
import { useCalendar } from '../useCalendar';
import moment from 'moment';

const Wrapper = styled.div`
  height: 50px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
`;



const Field = styled.div`
  width: 50%;
  margin: 0;
  box-sizing: border-box;
  ${({ active, theme }) =>
    active ? `box-shadow: 0 0 0 2px ${theme.colors.main};` : ''}
`;

const Input = styled.input`
  max-height: 100%;
  -webkit-appearance: none;
  border: none;
  border-radius: 0;
  width: 100%;
  height: 60px;
  padding-left: 15px;
  box-sizing: border-box;
  outline: none;
`;

const Head = () => {
  const { direction, setDirection, dateForward, dateBack } = useCalendar();

  const handleClick= (e) => {
    e.stopPropagation();
    const target = e.target 
    setDirection(target.name);
  };

  return (
    <Wrapper>
      <Field
        active={direction === 'forward'}
        style={{ width: 'calc(50% - 2px)' }}
      >
        <Input
          onClick={handleClick}
          name="forward"
          readOnly
          value={formatDate(dateForward)}
          placeholder="Когда"
        />
      </Field>
      <Field active={direction === 'backward'}>
        <Input
          onClick={handleClick}
          name="backward"
          readOnly
          value={formatDate(dateBack)}
          placeholder="Обратно"
        />
      </Field>
    </Wrapper>
  );
};

function formatDate(date) {
  return date ? moment(date).format('DD MMMM, dd') : '';
}

export default Head;

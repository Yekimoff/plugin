import React from 'react';
import styled from 'styled-components';
import { useCalendar } from '../useCalendar';

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  postion: relative;
  border-bottom: 1px solid rgb(239, 241, 244);
  height: 40px;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 16px;
  top: 25px;
  width: 14px;
  height: 14px;
`;




const Title = () => {
  const { direction, onClose } = useCalendar();
  const formattedTarget =
    direction === 'forward' ? 'Дата вылета' : 'Дата возвращения';

  return (
    <Wrapper>
      <div>{formattedTarget}</div>
      <CloseButton onClick={onClose} />
    </Wrapper>
  );
};

export default Title;

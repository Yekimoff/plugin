import React, { useEffect, useState } from 'react';
import {Calendar} from '../CalendarModal';
import { Button } from '../../../shared';
import styled from 'styled-components';

export const Title = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: ${({ theme: { colors } }) => colors.blackGray};

  @media (max-width: 425px) {
    margin: auto 0px;
    font-size: 12px; 
    line-height: 16px;
  }
`;

const CalendareWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  background: #ffffff;
  right: 0;
  ${({ active }) => (active ? 'display: block;' : 'display: none;')}

  @media (max-width:1024px) {
    right: 20px;
    left: 20px;
  }

  @media (max-width: 768px) {
    top: 1%;
    width: 100%;
    left: -5px;
  }
`;

const OutlinedButton = styled(Button).attrs({
  type: 'outlined',
  htmlType: 'button',
})`
  @media (max-width: 425px) {
    font-size: 10px;
    line-height: 12px;
  }
`;

/** Simple form */
export const SimpleFormWrapper = styled.div`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  padding: 32px 24px 24px 24px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05), 0px 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme: { borderRadius } }) => borderRadius};
`;

export const SimpleFormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const SwitchButton = styled(OutlinedButton)`
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  &.active {
    background-color: #4872f2;
    color: #fff;
  }
`;


const CalendarComponent = ({
  type = 'default',
  open,
  onTypeChange,
  ...props
}) => {
  const [calendarType, setType] = useState(type);

  const handleTypeChange = (e) => {
    e.preventDefault();
    if (calendarType === 'default') {
      setType('range');
      typeof onTypeChange === 'function' && onTypeChange('range');
    } else {
      setType('default');
      typeof onTypeChange === 'function' && onTypeChange('default');
      if (props.direction === 'backward') {
        props.setDirection(null);
      }
    }
  };

  useEffect(() => {
    if (type !== calendarType) {
      setType(type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <CalendareWrapper
      active={props.direction === 'backward' || props.direction === 'forward'}
    >
      <SimpleFormWrapper>
        <SimpleFormHeader>
          <Title>Выберите дату отправления</Title>
          <SwitchButton
            onClick={handleTypeChange}
            className={calendarType === 'range' ? undefined : 'active'}
          >
            Обратный билет не нужен
          </SwitchButton>
        </SimpleFormHeader>
        <Calendar type={calendarType} {...props} />
      </SimpleFormWrapper>
    </CalendareWrapper>
  );
};

export default CalendarComponent;

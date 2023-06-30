import React from 'react';
import styled from 'styled-components';
import { useCalendar } from './useCalendar';
import { Button } from '../../../shared';

const Wrapper = styled.div`
  min-height: 71px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: sticky;
  bottom: 0;
  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    opacity: 0.8;
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


const SwitchButton = styled(OutlinedButton)`
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  width:90%;
  height: 35px;
  &.active {
    background-color: #4872f2;
    color: #fff;
  }
`;

const Footer = () => {
  const { direction, setDate } = useCalendar();

  return direction === 'backward' ? (
    <Wrapper>
      <SwitchButton onClick={() => setDate(null, 'backward')}>
        Обратный билет не нужен
      </SwitchButton>
    </Wrapper>
  ) : null;
};

export default Footer;

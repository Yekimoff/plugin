import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {Text} from '../../../shared';
import { getFlights } from '../../../../store/booking';
import FlightsList from './FlightsList';

const Wrapper = styled.div`
  padding: 0 24px;
`;

const Title = styled(Text)`
  @media (max-width: 1024px) {
    font-size: 14px;
    line-height: 18px;
    color: #3c3c3c;
  }
`;

const YourFlight = () => {
  const flights = useSelector(getFlights);

  return (
    <Wrapper>
      <Title fontWeight="600" size="big">
        Ваш перелёт
      </Title>
      <FlightsList items={flights} />
    </Wrapper>
  );
};

export default YourFlight;

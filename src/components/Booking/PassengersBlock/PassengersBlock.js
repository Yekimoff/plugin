import React from 'react';
import InfoBlock from '../InfoBlock';
import Text, { Header } from '../../shared/Typography';
import { useSelector } from 'react-redux';
import PassengerList from './List';
import styled from 'styled-components';

const Body = styled.div`
  margin-top: 15px;
  ${({ theme }) => `
      ${theme.max('767px')} {
        margin-top: 10px;
      }
  `}
`;

const DesktopDescription = styled(Text)`
  margin-bottom: 32px;
  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileDescription = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #737373;
  & > p {
    margin: 10px 0;
  }
  margin-bottom: 10px;
  @media (min-width: 768px) {
    display: none;
  }
`;

const Wrapper = styled(InfoBlock)`
  @media (max-width: 1023px) {
    padding: 20px 20px;
  }
  @media (max-width: 767px) {
    padding: 14px;
  }
`;

const Passengers = () => {
  const frequentFlyerAirlines = useSelector(
    (state) => state.booking.ticket.frequentFlyerAirlines
  );

  return (
    <Wrapper>
      <Header size="h4">Пассажиры</Header>
      <Body id="passengers">
        <DesktopDescription color="black" size="normal">
          Внимательно внесите данные пассажиров. После оплаты внос изменений
          платный. Авиакомпания может отказать в посадке, если данные не
          совпадут с документами.
        </DesktopDescription>
        <MobileDescription>
          <p>
            Заполните данные пассажиров. После оплаты внесение изменений
            платное.
          </p>
          <p>
            Авиакомпания может отказать в посадке, если данные не совпадут с
            документами.
          </p>
        </MobileDescription>
        <PassengerList
          frequentFlyerAirlines={frequentFlyerAirlines}
          onChange={(data, index) => {}}
        />
      </Body>
    </Wrapper>
  );
};

export default Passengers;

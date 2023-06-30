import React from 'react';
import InfoBlock from '../InfoBlock';
import { Header, Text as BaseText } from '../../shared';
import { useSelector } from 'react-redux';
import { getFlights, getSelectedFare } from '../../../store/booking';
import List from './List';
import styled from 'styled-components';
import mobileArrowPath from '../../../assets/media/flight-search/mobile-arrow.svg';
import { ReactComponent as LuggageIcon } from '../../../assets/media/flight-search/luggage-round-icon.svg';

const StyledHeader = styled(Header)`
  padding: 0 24px;
  ${({ theme }) => `
    ${theme.max('1024px')} {
      display: none;
    }
  `}
`;

const StyledInfoBlock = styled(InfoBlock)`
  padding: 24px 0;
  @media (max-width: 767px) {
    padding: 14px 0;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const FlexSpaceBetween = styled(Flex)`
  justify-content: space-between;
`;

const Bottom = styled(FlexSpaceBetween)`
  padding: 0 14px;
  padding-top: 14px;
  margin-top: 14px;
  border-top: 1px solid #f2f2f2;

  @media (min-width: 768px) {
    display: none;
  }
`;

const BaggageWrapper = styled(Flex)`
  & > :first-child {
    margin-right: 5px;
  }
`;

const Text = styled(BaseText)`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #3c3c3c;
`;

const MobileDetailButton = styled.button`
  @media (min-width: 768px) {
    display: none;
  }

  text-decoration: none;
  border: none;
  padding: 0;
  outline: none;
  display: block;
  background: transparent;
  position: relative;
  margin-right: 14px;

  font-family: Open Sans;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #4872f2;
`;

const MobileArrow = styled.img`
  position: absolute;
  right: -16px;
  top: 6px;
  width: 10px;
  transition: transform 0.2s ease-in-out;

  ${({ reverse }) => (reverse ? 'transform: rotate(180deg);' : '')}
`;

const FlightDetail = () => {
  const data = useSelector(getFlights);
  const fare = useSelector(getSelectedFare);
  const baggage = fare.features
    ? fare.features.find((x) => x.type === 'Baggage')
    : undefined;

  const [isActive, setActive] = React.useState(false);
  return (
    <StyledInfoBlock>
      <StyledHeader size="h4">Детали перелета</StyledHeader>
      <List active={isActive} items={data} />
      <Bottom>
        <BaggageWrapper>
          <LuggageIcon />
          <Text>
            {baggage ? getBaggageDescription(baggage) : 'Багаж не включен'}
          </Text>
        </BaggageWrapper>
        <MobileDetailButton
          onClick={() => {
            setActive((x) => !x);
          }}
          type="button"
        >
          Детали перелета{' '}
          <MobileArrow src={mobileArrowPath} reverse={isActive} />
        </MobileDetailButton>
      </Bottom>
    </StyledInfoBlock>
  );
};

function getBaggageDescription(x) {
  switch (x.applicability) {
    case 'Included':
      return x.shortDescriptionRus;
    case 'NotOffered':
      return 'Без багажа';
    case 'AtCharge':
      return 'Багаж платный';
  }
}

export default FlightDetail;

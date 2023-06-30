import React from 'react';
import moment from 'moment';
import styled, { css } from 'styled-components';
import Point from '../FlightPoint';
import * as Helper from '../../../utils';
import Text from '../Typography';

const Container = styled.div``;

const FlexBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Cities = styled.div`
  ${FlexBox}
`;

const Line = styled.div`
  flex-grow: 0.9;
  background-color: ${({ theme }) => theme.colors.lightGray};
  height: 2px;
  position: relative;
  & > div {
    top: -8px;
    position: absolute;
  }
  & > :last-child {
    right: 0;
  }
`;

const Airports = styled.div`
  ${FlexBox}
  margin-top: 4px;
  position: relative;
  & > :last-child {
    text-align: right;
  }
`;

const Duration = styled(Text)`
  position: absolute;
  top: -21px;
  left: 50%;
  transform: translateX(-50%);
`;

const PointDescBlock = styled.div`
  & > span {
    display: block;
  }
`;

const GrayText = styled(Text)`
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
`;
const AirportCode = styled(GrayText)`
  font-weight: 600;
  color: #4872f2;
`;

const Time = styled(Text)`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
`;

const Segment = ({ from, to, duration }) => {
  const fromTime = getFormattedDate(from.date, 'time');
  const toTime = getFormattedDate(to.date, 'time');
  const fromDate = getFormattedDate(from.date, 'date');
  const toDate = getFormattedDate(to.date, 'date');
  const formattedDuration = `В пути: ${Helper.formatDuration(duration)}`;

  return (
    <Container>
      {/* <Dates>
        <Text> {fromDate}</Text>
        <AirlineLogo
          src={Helper.getAirlinesLogoUrl(airlineCode || '')}
          alt={airlineCode}
        />
        <Text> {toDate}</Text>
      </Dates> */}
      <Cities>
        <Time>{fromTime}</Time>
        <Line>
          <Point />
          <Duration size="small" color="dark-gray">
            {formattedDuration}
          </Duration>
          <Point />
        </Line>
        <Time>{toTime}</Time>
      </Cities>
      <Airports>
        <PointDescBlock>
          <GrayText>
            <AirportCode>{from.airport.code}</AirportCode> {from.city.name}
          </GrayText>
          <GrayText>{fromDate}</GrayText>
        </PointDescBlock>
        <PointDescBlock>
          <GrayText>
            <AirportCode>{to.airport.code}</AirportCode> {to.city.name}
          </GrayText>
          <GrayText>{toDate}</GrayText>
        </PointDescBlock>
      </Airports>
    </Container>
  );
};

function getFormattedDate(date, type) {
  return moment(date).format(type === 'time' ? 'HH:mm' : 'DD MMM YYYY, dd');
}

export default Segment;

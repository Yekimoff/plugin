import React from 'react';
import styled, { css } from 'styled-components';
import {Text} from '../../../shared';
import moment from 'moment';
import * as Helper from '../../../../utils';
import MobileSegment from '../../../shared/flights/MobileSegment';
import {useMediaQuery} from 'react-responsive';

const Container = styled.div``;

const FlexBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dates = styled.div`
  ${FlexBox}
  margin-bottom: 7px;
`;

const Cities = styled.div`
  ${FlexBox}
`;

const Line = styled.div`
  flex-grow: 0.8;
  background-color: ${({ theme }) => theme.colors.lightGray};
  height: 2px;
  position: relative;
`;

const Airports = styled.div`
  ${FlexBox}
  margin-top: 4px;
`;

const Duration = styled(Text)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -17px;
  white-space: nowrap;
`;

const Item = ({ segments, ...props }) => {
  const from = segments[0];
  const to = segments[segments.length - 1];
  const fromDate = getFormattedDate(from.fromDate, from.fromTime);
  const toDate = getFormattedDate(to.toDate, to.toTime);
  const formattedDuration = Helper.formatDuration(props.duration);
  const isLaptopOrBigTablet = useMediaQuery({ maxWidth: 1024 });

  const mobileProps = {
    from: {
      ...from,
      date: `${from.fromDate} ${from.fromTime}`,
      city: { name: from.from.city, code: '' },
      airport: { name: from.from.airport, code: from.from.code },
      terminal: from.from.terminal,
    },
    to: {
      ...to,
      date: `${to.toDate} ${to.toTime}`,
      city: { name: to.to.city, code: '' },
      airport: { name: to.to.airport, code: to.to.code },
      terminal: to.to.terminal,
    },
    duration: props.duration,
    airlines: segments.map((x) => ({ name: x.airline, code: x.airlineCode })),
    active: true,
    flightNo: ``,
    stops: props.stops.map((x) => ({
      duration: x.duration,
      time: x.time,
      city: {
        ...x.city,
        terminal: '',
      },
    })),
  };

  const item = isLaptopOrBigTablet ? (
    <MobileSegment {...mobileProps} />
  ) : (
    <Container>
      <Dates>
        <Text size="small" color="#3C3C3C">
          {fromDate}
        </Text>
        <Text size="small" color="#3C3C3C">
          {toDate}
        </Text>
      </Dates>
      <Cities>
        <Text color="blue" fontWeight="600">
          {from.from.code}
        </Text>
        <Line>
          <Duration size={10} color="dark-gray">
            {formattedDuration}
          </Duration>
        </Line>
        <Text color="blue" fontWeight="600">
          {to.to.code}
        </Text>
      </Cities>
      <Airports>
        <Text size="small" color="dark-gray">
          {from.from.city}
        </Text>
        <Text size="small" color="dark-gray">
          {to.to.city}
        </Text>
      </Airports>
    </Container>
  );

  return (
    <div>
      {item}
    </div>
  );
};

function getFormattedDate(date, time) {
  return moment(`${date} ${time}`).format('DD MMM, HH:mm');
}

export default Item;

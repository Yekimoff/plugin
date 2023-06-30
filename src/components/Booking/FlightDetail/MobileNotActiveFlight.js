import React from 'react';
import styled from 'styled-components';
import FLighTypeIcon from './FlightTypeIcon';
import FlightSegment from '../../shared/flights/Segment';
import _ from 'lodash';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 0 14px;
`;

const StyledFLighTypeIcon = styled(FLighTypeIcon)`
  margin-bottom: 17px;
  width: min-content;
`;

const MobileSeparator = styled.div`
  width: 100%;
  height: 1px;
  background: #f2f2f2;
  margin: 14px 0;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Item = React.memo(
  ({ separator, segments, stops, flightIndex, ...props }) => {
    const endSegment = segments[segments.length - 1];

    const detailProps = {
      from: {
        ...segments[0],
        date: `${segments[0].fromDate} ${segments[0].fromTime}`,
        city: { name: segments[0].from.city, code: '' },
        airport: {
          name: segments[0].from.airport,
          code: segments[0].from.code,
        },
        terminal: segments[0].from.terminal,
      },
      to: {
        ...endSegment.to,
        date: `${endSegment.toDate} ${endSegment.toTime}`,
        city: { name: endSegment.to.city, code: '' },
        airport: { name: endSegment.to.airport, code: endSegment.to.code },
        terminal: endSegment.to.terminal,
      },
      duration: props.duration,
      airlines: _.uniqBy(
        segments.map((x) => ({ name: x.airline, code: x.airlineCode })),
        'name'
      ),
      active: props.active,
      flightNo: ``,
      stops: stops.map((x) => ({
        duration: x.duration,
        time: x.time,
        city: {
          ...x.city,
          terminal: '',
        },
      })),
    };

    return (
      <Wrapper>
        <Container>
          <StyledFLighTypeIcon flightType={props.flight_Type} />
          <FlightSegment {...detailProps} />
          {separator && <MobileSeparator />}
        </Container>
      </Wrapper>
    );
  }
);
export default Item;

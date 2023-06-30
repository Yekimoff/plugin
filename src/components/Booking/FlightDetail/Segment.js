import React from 'react';
import Separator from '../Separator';
import styled from 'styled-components';
// import Transfer from './Transfer';
import Terminals from './Terminals';
import AdditionalInfo from './SegmentAdditionalInfo';
import {
  Segment as FlightSegment,
  Transfer,
} from '../../shared/flights';
import { useMediaQuery } from 'react-responsive';
import FLighTypeIcon from './FlightTypeIcon';
import { Text as BaseText } from '../../shared';

const Container = styled.div`
  @media (max-width: 1024px) {
    margin-bottom: 30px;
  }
  @media (max-width: 767px) {
    margin-bottom: 0;
  }
`;
const Content = styled.div`
  & > div {
    margin-bottom: 16px;
  }
  & > :last-child {
    margin-bottom: 0;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 67px 1fr;
`;

const StyledFLighTypeIcon = styled(FLighTypeIcon)`
  margin-bottom: 17px;
  width: min-content;
`;

const FromToText = styled(BaseText)`
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #737373;
  display: block;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const MobileSeparator = styled.div`
  width: 100%;
  height: 1px;
  background: #f2f2f2;
  margin: 14px 0;
`;

const Segment = ({ separator, transfer, ...props }) => {
  const isLaptopOrBigTablet = useMediaQuery({ maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const detailProps = {
    from: {
      ...props.from,
      date: `${props.fromDate} ${props.fromTime}`,
      city: { name: props.from.city, code: '' },
      airport: { name: props.from.airport, code: props.from.code },
    },
    to: {
      ...props.to,
      date: `${props.toDate} ${props.toTime}`,
      city: { name: props.to.city, code: '' },
      airport: { name: props.to.airport, code: props.to.code },
    },
    duration: props.duration,
    airlines: [{ name: props.airline, code: props.airlineCode }],
    active: props.active,
    flightNo: `${props.airlineCode} ${props.flightNo} • ${props.airplane}`,
    stops: transfer
      ? [
          {
            duration: transfer.duration,
            time: transfer.time,
            city: {
              ...transfer.city,
              terminal: '',
            },
          },
        ]
      : [],
  };

  const flightDesc = `${props.operatingAirlineCode} ${props.flightNo} • ${props.airplane}`;

  const terminals = `${
    props.from.terminal
      ? `вылет-${props.from.terminal}${props.to.terminal ? ', ' : ''}`
      : ''
  }${props.to.terminal ? `прилет-${props.to.terminal}` : ''}`;

  return isLaptopOrBigTablet ? (
    <div>
      <Container>
        {props.fromTo && <StyledFLighTypeIcon flightType={props.flightType} />}
        {props.fromTo && <FromToText>{props.fromTo}</FromToText>}
        <FlightSegment {...detailProps} />
        {separator && <MobileSeparator />}

        {/* <div style={{ marginTop: 20 }}>
          <StyledMobileAddictionalDescription
            airlane={props.airline}
            duration={props.duration}
            luggage={formattedBaggage}
            transfersCount={0}
            operatingAirlane={props.operatingAirline}
            terminalA={props.from.terminal}
            terminalB={props.to.terminal}
            airplane={`${props.airlineCode} ${props.flightNo} • ${props.airplane}`}
          />
        </div> */}
      </Container>
      {!isMobile && separator && <Separator />}
    </div>
  ) : (
    <Container>
      <Content>
        <Row>
          <FlightSegment {...detailProps} />

          <div />
          <AdditionalInfo
            plane={props.airplane}
            flightCode={props.flightNo}
            company={props.operatingAirlineCode}
            companyRusName={props.operatingAirline}
          />
        </Row>
        <div style={{ marginTop: 20, maxWidth: 550 }}>
          <Terminals
            from={flightDesc}
            to={terminals}
            operatingCompany={props.operatingAirline}
            payCompany={props.airline}
          />
        </div>
      </Content>
      {transfer && (
        <Transfer city={transfer.city.city} duration={transfer.duration} />
      )}
      {separator && <Separator />}
    </Container>
  );
};

export default Segment;

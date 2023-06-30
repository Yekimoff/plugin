import React from 'react';
import styled from 'styled-components';
import {Text} from '../../shared';
import { getSelectedFare } from '../../../store/booking';
import { useSelector } from 'react-redux';
import * as Helper from '../../../utils';
import baggageSrc from '../../../assets/media/shared/baggage.svg';

const Container = styled.div`
  & > span {
    display: block;
  }
  max-width: 204px;
  overflow: hidden;
  & > div {
    margin-bottom: 10px;
  }
  & > :last-child {
    margin-bottom: 0;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  & > :first-child {
    margin-right: 5px;
  }
`;

const AirlineContainer = styled.div`
  display: flex;
  align-items: center;
  & > :first-child {
    margin-right: 7px;
  }
`;

const Airline = styled.img.attrs({ width: 25, height: 25 })`
  border-radius: 50%;
`;

const AirlineName = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;

const AdditionalInfo = ({
  plane,
  flightCode,
  company,
  companyRusName,
}) => {
  const fare = useSelector(getSelectedFare);

  const baggage = fare.features
    ? fare.features.find((x) => x.type === 'Baggage')
    : undefined;

  const formattedBaggage = baggage
    ? (baggage.shortDescriptionRus || baggage.descriptionRus)
        .charAt(0)
        .toUpperCase() +
      (baggage.shortDescriptionRus || baggage.descriptionRus).substring(1)
    : '';

  return (
    <Container>
      <AirlineContainer>
        <Airline
          src={Helper.getAirlineLogo(company, 50, 50)}
          alt={company}
        />
        <AirlineName>{companyRusName}</AirlineName>
      </AirlineContainer>
      <Row>
        {fare.features && (
          <>
            <img src={baggageSrc} alt="" />
            <AirlineName
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {formattedBaggage}
            </AirlineName>
          </>
        )}
      </Row>
    </Container>
  );
};

export default AdditionalInfo;

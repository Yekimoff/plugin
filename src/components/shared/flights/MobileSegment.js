import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {Text} from '../index';
import * as Helper from '../../../utils';
import Point from '../FlightPoint';
import Place from './Place';
import PlaneIcon from './Plane';
import ManIcon from './Man';
import { cityIn } from 'lvovich';


const Time = styled(Text)`
  font-size: 24px;
  line-height: 32px;
  display: inline-block;
  margin-bottom: 9px;

  @media (max-width: 767px) {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }
`;

const ItemContainer = styled.li`
  list-style-type: none;
  position: relative;
  font-family: ${({ theme: { fonts } }) => fonts.regular};
`;

const FlightTime = styled.span`
  display: inline;
  font-size: 12px;
  line-height: 16px;
  color: ${({ blue, theme: { colors } }) => (blue ? colors.main : '#737373')};

  @media (max-width: 767px) {
    display: none;
  }
`;

const ProgressInfo = styled.div`
  text-align: center;
  width: 100%;
  margin: 0 10px;
  span {
    margin-bottom: 7px;
  }
`;

const ProgressLine = styled.div`
  margin-top: 20px;
  height: 2px;
  background-color: #dcdcdc;
  position: relative;
  & > div {
    top: -8px;
  }

  & > :last-child {
    right: 0;
  }

  @media (max-width: 767px) {
    margin-top: 13px;
    & > div {
      top: -6px;
    }
  }
`;

const PlaceTimeWrapper = styled.div`
  display: flex;
`;

const PlaceDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  & > :last-child {
    text-align: right;
  }
`;

const PointsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
`;

const CompanyLogoMobile = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12.5px;

  & > :first-child {
    margin-right: 5px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const LogoDescription = styled(Text)`
  font-size: 12px;
  line-height: 16px;
  color: #3c3c3c;
`;

const Image = styled.img.attrs({ width: 21.45, height: 21.45 })`
  border-radius: 50%;
  background: #9097ce;
`;

const PathTime = styled(Text)`
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #737373;
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  bottom: 3px;

  @media (min-width: 768px) {
    display: none;
  }
`;
const Description = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlaneIcon = styled(PlaneIcon)`
  width: 20px;
  height: 20px;
  fill: #737373;
  margin-right: 10px;
`;

const StyledManIcon = styled(ManIcon)`
  width: 16px;
  height: 16px;
  fill: #737373;
  margin-right: 14px;
`;

const DescriptionText = styled(Text)`
  font-size: 12px;
  line-height: 16px;
  color: #3c3c3c;
`;

const DescriptionBlock = styled.div`
  background: #edf1fe;
  border-radius: 4px;
  padding: 10px 12px;
  margin-top: 10px;

  & > div {
    margin-bottom: 7px;
  }

  & > :last-child {
    margin-bottom: 0;
  }
  @media (max-width: 767px) {
    padding: 8px;
  }
`;

const ActiveDescriptionBlock = styled.div`
  margin-top: 12px;
  & > span {
    display: block;
    margin-bottom: 5px;
  }

  & > :last-child {
    margin-bottom: 0;
  }
`;

const GrayText = styled(Text)`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #737373;
`;

const Segment= ({
  from,
  to,
  className,
  ...props
}) => {
  const fromDate = moment(from.date);
  const toDate = moment(to.date);

  const travelTime = Helper.formatDuration(props.duration);
  const showDefaultTravelTime = props.active || (!props.active && props.stops.length === 0);

  const stopString =
    props.stops.length > 0
      ? `${props.stops.length} ${Helper.pluralWord(
        props.stops.length,
        'пересадка',
        'пересадки',
        'пересадок'
      )}`
      : 'прямой';

  return (
    <div>
      <ItemContainer>
        <PlaceTimeWrapper>
          <Time color="#3C3C3C" bold>
            {fromDate.format('HH:mm')}
          </Time>
          <ProgressInfo>
            {/* <Text size="small" color="dark-gray">
            В пути: {travelTime}
          </Text> */}
            <ProgressLine>
              <PointsContainer>
                <Point />
                {!props.active && props.stops.length > 0 && <Point mobileProps={{
                  duration: props.duration,
                  stopDuration: props.stops[0].duration,
                  stopCount: props.stops.length,
                  city: { name: props.stops[0].city.city, code: props.stops[0].city.code },
                  airport: { name: props.stops[0].city.airport, code: props.stops[0].city.code },
                }} />
                }
                <Point />
                {showDefaultTravelTime && (
                  <PathTime>{Helper.formatDuration(props.duration)}</PathTime>
                )}
              </PointsContainer>
            </ProgressLine>
          </ProgressInfo>
          <Time color="#3C3C3C" bold>
            {toDate.format('HH:mm')}
          </Time>
        </PlaceTimeWrapper>
        <PlaceDateWrapper>
          <Place
            code={from.airport.code}
            airport={from.airport.name}
            date={fromDate}
          />
          <FlightTime>
            В пути: {travelTime},{' '}
            <FlightTime blue={props.stops.length > 0}>{stopString}</FlightTime>{' '}
          </FlightTime>
          <Place
            code={to.airport.code}
            airport={to.airport.name}
            date={toDate}
          />
        </PlaceDateWrapper>
      </ItemContainer>
      {(props.airlines || []).map((x, key) => (
        <CompanyLogoMobile key={key}>
          <Image src={Helper.getAirlineLogo(x.code, 65, 65)} alt={x.code} />{' '}
          <LogoDescription>{x.name}</LogoDescription>
        </CompanyLogoMobile>
      ))}
      {props.active && (
        <>
          <DescriptionBlock>
            <Description>
              <StyledPlaneIcon />

              <DescriptionText>Рейс: {props.flightNo}</DescriptionText>
            </Description>
            {props.stops.map((x, key) => (
              <Description key={x.duration}>
                <StyledManIcon />
                <DescriptionText>
                  Пересадка в {cityIn(x.city.city)}{' '}
                  {Helper.formatDuration(x.duration)}
                </DescriptionText>{' '}
              </Description>
            ))}
          </DescriptionBlock>
          <ActiveDescriptionBlock>
            <GrayText>Терминалы: {from.terminal} - вылет,  {to.terminal} - прилет</GrayText>
            <GrayText>Рейс выполняет: {(props.airlines || [])[0].name}</GrayText>
          </ActiveDescriptionBlock>
        </>
      )}
    </div>
  );
};

export default Segment;

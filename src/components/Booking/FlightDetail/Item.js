import React from 'react';
import  Separator  from '../Separator';
import {Text} from '../../shared';
import Segment from './Segment';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import FlightTypeIcon from './FlightTypeIcon';

const Container = styled.div``;

const Content = styled.div`
  padding: 0 24px;
  padding-bottom: 24px;
  ${({ theme }) => `
    ${theme.max('767px')} {
      padding: 0 14px;
      padding-bottom: 0;
    }
  `}
`;

const SegmentsContainer = styled.div`
  margin-top: 25px;
  @media (max-width: 1024px) {
    margin-top: 0;
  }
`;

const FromToText = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #737373;

  @media (max-width: 1024px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

const StyledSeparator = styled(Separator)`
  margin-top: 0;
`;

const FromTo = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;

  @media (max-width: 1024px) {
    margin-top: 0;
    margin-bottom: 35px;
  }

  @media (max-width: 767px) {
    margin-bottom: 20px;
    display: none;
    & > :last-child {
      display: none;
    }
  }
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
    const from = segments[0].from.city;
    const to = segments[segments.length - 1].to.city;
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
      <Container>
        <Content>
          <FromTo>
            <FromToText>
              {formatDirectionName(flightIndex, props.length)}
              {from}-{to}
            </FromToText>
            <FlightTypeIcon flightType={props.flight_Type}/>
          </FromTo>
          <SegmentsContainer>
            {segments.map((segment, key) => (
              <Segment
                fromTo={
                  key === 0
                    ? `${formatDirectionName(
                        flightIndex,
                        props.length
                      )} ${from}-${to}`
                    : undefined
                }
                flightType={props.flight_Type}
                key={key}
                active={props.active}
                separator={key !== segments.length - 1}
                transfer={stops[key]}
                {...segment}
              />
            ))}
          </SegmentsContainer>
        </Content>
        {!isMobile && separator && <StyledSeparator />}
        {isMobile && separator && <MobileSeparator />}
      </Container>
    );
  }
);

function formatDirectionName(index, length) {
  if (length === 1) return '';
  return index === 0 ? 'Туда: ' : 'Обратно: ';
}

export default Item;

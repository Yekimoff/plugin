import React from 'react';
import styled from 'styled-components';

const PlaceContainer = styled.div``;

const Description = styled.span`
  display: block;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme: { colors } }) => colors.darkGray};

  & > strong {
    display: inline;
    font-weight: 600;
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const Place = (props) => {
  const { code, airport, date } = props;
  const dateString = date.format('DD MMMM YYYY, dd');
  return (
    <PlaceContainer>
      <Description>
        <strong>{code}</strong> {airport}
      </Description>
      <Description>{dateString}</Description>
    </PlaceContainer>
  );
};

export default Place;

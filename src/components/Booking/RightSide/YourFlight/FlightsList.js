import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import {useMediaQuery} from 'react-responsive';

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.lightGray};
  margin: 24px 0;
  @media (max-width: 1024px) {
    margin: 20px 0;
  }
`;

const Container = styled.div`
  margin: 20px 0;
  & > div {
    margin-bottom: 30px;
  }
  & > :last-child {
    margin-bottom: 0;
  }
  @media (max-width: 1024px) {
    & > div {
      margin-bottom: 14px;
    }
  }
`;

const StyledSeparator = styled(Separator)`
  margin: 14px 0;
`;

const FlightsList= ({ items }) => {
  const isLaptopOrBigTablet = useMediaQuery({ maxWidth: 1024 });
  return (
    <Container>
      {items.map((props, key) => (
        <React.Fragment key={key}>
          <Item {...props} />
          {isLaptopOrBigTablet && key !== items.length - 1 && (
            <StyledSeparator />
          )}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default FlightsList;

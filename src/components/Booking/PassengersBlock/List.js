import React from 'react';
import styled from 'styled-components';
import Separator from '../Separator';
import PassengerItem from './Item';
import { useFormikContext } from 'formik';

const Container = styled.div`
  & > div {
    margin: 24px 0;
    margin-bottom: 0;
  }
`;

const PassengerList= ({
  frequentFlyerAirlines,
  onChange,
}) => {
  const formikContext = useFormikContext();
  return (
    <Container>
      {formikContext.values.passengers.map((props, key) => {
        return (
          <React.Fragment key={key}>
            <PassengerItem
              index={key}
              frequentFlyerAirlines={frequentFlyerAirlines}
              onChange={(data) => {
                onChange(data, key);
              }}
              {...props}
            />
            {key !== formikContext.values.passengers.length - 1 && (
              <Separator key={key} />
            )}
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default PassengerList;

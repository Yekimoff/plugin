import React from 'react';
import styled from 'styled-components';
import ManIcon from './Man';
import Text from '../Typography';
import { cityIn } from 'lvovich';
import * as Helper from '../../../utils';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #edf1fe;
  border-radius: 4px;
  padding: 12px;
  margin-top: 15px;
`;
const CityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledManIcon = styled(ManIcon)`
  margin-right: 10px;
`;

const Transfer = (props) => (
  <Row className={props.className}>
    <CityContainer>
      <StyledManIcon />
      <Text>
        Пересадка в {cityIn(props.city)} {Helper.formatDuration(props.duration)}
      </Text>
    </CityContainer>
    {/* <Text>{Helper.formatDuration(props.duration)}</Text> */}
  </Row>
);

export default Transfer;

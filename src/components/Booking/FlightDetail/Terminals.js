import React from 'react';
import styled from 'styled-components';
import {Text} from '../../shared';


const Wrapper = styled.div`
  // display: grid;
  // grid-template-columns: 1fr 1fr;
  // row-gap: 17px;
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  margin-right: 15px;
`;

const Row = styled.div`
  white-space: nowrap;
`;

const Terminals = ({
  from,
  to,
  operatingCompany,
  payCompany,
}) => (
  <Wrapper>
    <Column>
      <Row>
        <Text color="dark-gray">Рейс: </Text>{' '}
        <Text>{from === '' ? '-' : from}</Text>
      </Row>
      <Row>
        <Text color="dark-gray">Терминалы: </Text>{' '}
        <Text>{to === '' ? '-' : to}</Text>
      </Row>
    </Column>
    <div>
      <Row>
        <Text color="dark-gray">Авиакомпания: </Text>{' '}
        <Text>{payCompany === '' ? '-' : payCompany}</Text>
      </Row>

      <Row>
        <Text color="dark-gray">Рейс выполняет: </Text>{' '}
        <Text>{operatingCompany === '' ? '-' : operatingCompany}</Text>
      </Row>
    </div>
  </Wrapper>
);

export default Terminals;

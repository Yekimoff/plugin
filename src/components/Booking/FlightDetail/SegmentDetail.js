import React from 'react';
import moment from 'moment';
import styled, { css } from 'styled-components';
import * as Helper from '../../../utils';
import {Text} from '../../shared';

const Container = styled.div``;

const FlexBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dates = styled.div`
  ${FlexBox}
  position: relative;
  margin-bottom: 7px;
`;

const Cities = styled.div`
  ${FlexBox}
`;

const Line = styled.div`
  flex-grow: 0.8;
  background-color: ${({ theme }) => theme.colors.lightGray};
  height: 2px;
`;

const Airports = styled.div`
  ${FlexBox}
  margin-top: 4px;
  position: relative;
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: green;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Duration = styled(Text)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Segment = ({ from, to, duration }) => {
  const fromDate = getFormattedDate(from.date, from.time);
  const toDate = getFormattedDate(to.date, to.time);
  const formattedDuration = `В пути: ${Helper.formatDuration(duration)}`;

  return (
    <Container>
      <Dates>
        <Text> {fromDate}</Text>
        <Icon />
        <Text> {toDate}</Text>
      </Dates>
      <Cities>
        <Text size="big" color="blue" bold>
          {from.code}
        </Text>
        <Line />
        <Text size="big" color="blue" bold>
          {to.code}
        </Text>
      </Cities>
      <Airports>
        <Text size="small" color="dark-gray">
          {from.city}
        </Text>
        <Duration size="small" color="dark-gray">
          {formattedDuration}
        </Duration>
        <Text size="small" color="dark-gray">
          {to.city}
        </Text>
      </Airports>
    </Container>
  );
};

function getFormattedDate(date, time) {
  return moment(`${date} ${time}`).format('DD MMM, HH:mm');
}

export default Segment;
